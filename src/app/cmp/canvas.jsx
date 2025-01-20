import React, { useRef, useState, useEffect } from 'react';
import SelectedStudent from '../cmp/selectedStudent';
import { client } from '../libs/microcms';

// カラーコードをRGBに変換する関数
const rgbConverter = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

// RGBをHSLに変換する関数
const hslConverter = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = 0; // グレースケールの場合は色相を0に設定
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const Canvas = () => {
  const canvasRef = useRef(null);
  // 画面サイズ
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  // 学生情報
  const [userData, setUserData] = useState([]);
  // 座標情報
  const [studentCoordinates, setStudentCoordinates] = useState([]);
  // パス情報
  const [pathData, setPathData] = useState([]);
  // パス内学生情報
  const [selectedDatas, setSelectedDatas] = useState([]);
  // クリック状態
  const [drawing, setDrawing] = useState(false);
  // 吹き出し位置
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  // セレクトされた学生画面
  const [selectView, setSelectView] = useState(false);

  // 画面サイズ
  useEffect(() => {
    const viewResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    viewResize();
    window.addEventListener('resize', viewResize);
    return () => {
      window.removeEventListener('resize', viewResize);
    };
  }, []);

  // 背景描画
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    for (let x = 0; x < canvasSize.width; x += 7) {
      for (let y = 0; y < canvasSize.height; y += 7) {
        const hue = (x / canvasSize.width) * 360;
        const lightness = 100 - (y / canvasSize.height) * 100;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        ctx.fillRect(x, y, 7, 7);
      }
    }
  }, [canvasSize]);

  // 学生情報取得
  useEffect(() => {
    const fetchData = async () => {
      const limit = 100;
      let allData = [];
      let offset = 0;
      while (true) {
        const data = await client.get({
          endpoint: 'works',
          queries: {
            limit,
            offset,
          },
        });
        allData = [...allData, ...data.contents];
        if (data.contents.length < limit) break;
        offset += limit;
      }
      setUserData(allData);
    };
    fetchData();
  }, []);

  // 学生の座標計算
  useEffect(() => {
    const studentCoordinate = userData.map((e) => {
      const rgb = rgbConverter(e.color);
      const [hue, saturation, lightness] = hslConverter(rgb.r, rgb.g, rgb.b);

      const x = saturation === 0
        ? (lightness / 100) * canvasSize.width
        : ((hue / 360) * canvasSize.width);
      const y = ((100 - lightness) / 100) * canvasSize.height;

      return { ...e, x, y };
    });
    setStudentCoordinates(studentCoordinate);
  }, [userData, canvasSize]);

  // 座標の相対位置を計算
  const getRelativeCoordinates = (e) => {
    const canvasPosition = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      const touch = e.touches[0];
      return { x: touch.clientX - canvasPosition.left, y: touch.clientY - canvasPosition.top };
    } else {
      return { x: e.clientX - canvasPosition.left, y: e.clientY - canvasPosition.top };
    }
  };

  // パス内に学生がいるかを判定
  const judgmentChain = (path, px, py) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    return ctx.isPointInPath(px, py);
  };

  // パスの範囲を計算する関数
  const getPathBounds = (path) => {
    if (path.length === 0) return { width: 0, height: 0 };

    let minX = path[0].x;
    let maxX = path[0].x;
    let minY = path[0].y;
    let maxY = path[0].y;

    path.forEach(point => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });

    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      maxX,
      minY,
      maxY
    };
  };

  // 吹き出しの位置を計算
  const calculateBubblePosition = (pathCenter) => {
    const BUBBLE_WIDTH = 200;
    const BUBBLE_HEIGHT = 100;
    const SPACING = 50; // パスと吹き出しの間の距離

    // キャンバスの中央のX座標を計算
    const middleX = canvasSize.width / 2;
    
    // パスの範囲を取得
    const pathBounds = getPathBounds(pathData);
    
    let bubbleX;

    if (pathCenter.x > middleX) {
      // パスが右側にある場合、パスの左端からSPACING分左に表示
      bubbleX = pathBounds.minX - BUBBLE_WIDTH - SPACING;
    } else {
      // パスが左側にある場合、パスの右端からSPACING分右に表示
      bubbleX = pathBounds.maxX + SPACING;
    }

    // Y座標は画面の中央に配置
    const bubbleY = (canvasSize.height - BUBBLE_HEIGHT) / 2;

    // キャンバスの境界をチェック（画面外にはみ出さないように）
    bubbleX = Math.max(0, Math.min(canvasSize.width - BUBBLE_WIDTH, bubbleX));

    return { x: bubbleX, y: bubbleY };
  };

  // クリックしたとき
  const handleMouseDown = (e) => {
    setDrawing(true);
    const { x, y } = getRelativeCoordinates(e);
    setPathData([{ x, y }]);
  };

  // ドラッグ中の座標を追加
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { x, y } = getRelativeCoordinates(e);
    const newPath = [...pathData, { x, y }];
    setPathData(newPath);
    drawCanvas(newPath, []);
  };

  // クリックが終わったとき
  const handleMouseUp = () => {
    setDrawing(false);
    const selectedData = studentCoordinates.filter((e) =>
      judgmentChain(pathData, e.x, e.y)
    );
    setSelectedDatas(selectedData);
    drawCanvas(pathData, selectedData);

    if (pathData.length > 0) {
      // パスの中心を計算
      const centerX = pathData.reduce((sum, point) => sum + point.x, 0) / pathData.length;
      const centerY = pathData.reduce((sum, point) => sum + point.y, 0) / pathData.length;
      
      // 新しい吹き出しの位置を計算
      const newBubblePosition = calculateBubblePosition({ x: centerX, y: centerY });
      setBubblePosition(newBubblePosition);
    }
  };

  // タッチした時
  const handleTouchStart = (e) => {
    handleMouseDown(e);
  };

  // タッチでドラックしているとき
  const handleTouchMove = (e) => {
    handleMouseMove(e);
  };

  // タッチが終わった時
  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // キャンバス描画
  const drawCanvas = (path, selectedStudents) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景描画
    for (let x = 0; x < canvas.width; x += 7) {
      for (let y = 0; y < canvas.height; y += 7) {
        const hue = (x / canvas.width) * 360;
        const lightness = 100 - (y / canvas.height) * 100;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        ctx.fillRect(x, y, 7, 7);
      }
    }

    // パス描画
    if (path.length > 1) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath(); // パスを閉じる
    
      // 塗りつぶし設定
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // 透明度25%の黒
      ctx.fill(); // 塗りつぶし
    
      // 線の描画設定
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = 5;
      ctx.stroke();
    }

    // 学生描画
    selectedStudents.forEach((e) => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = e.color;
      ctx.fill();
      ctx.stroke();
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      {bubblePosition && bubblePosition.x !== 0 && bubblePosition.y !== 0 && (
        <div 
          className='bg-white bg-opacity-75 p-10 rounded-lg text-center' 
          style={{ 
            position: 'absolute', 
            left: bubblePosition.x, 
            top: bubblePosition.y,
          }}
        >
          <p className='text-2xl font-bold'>学生{selectedDatas.length}人を発見した</p>
          <button
            className='text-white text-2xl font-bold py-[11px] bg-black w-full rounded-full mt-8'
            style={{
              opacity: selectedDatas.length === 0 ? 0.2 : 1,
            }}
            onClick={() => setSelectView(!selectView)}
            disabled={selectedDatas.length === 0}
          >
            見る
          </button>
        </div>
      )}
      {selectView && (
        <SelectedStudent 
          selectedDatas={selectedDatas} 
          selectView={selectView} 
          setSelectView={setSelectView}
        />
      )}
    </div>
  );
};

export default Canvas;