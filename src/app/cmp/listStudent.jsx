import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import supabase from '../supabase'; // Supabaseクライアントをインポート
import QRCode from 'react-qr-code'; // QRコード生成用ライブラリをインポート
import html2canvas from 'html2canvas'; // スクリーンショットを撮るためのライブラリをインポート
import MoonLoader from 'react-spinners/MoonLoader';

const listStudent = ({ starData, starView, setStarView }) => {

  const captureRef = useRef(null); // スクリーンショット対象の要素参照
  const [imageUrl, setImageUrl] = useState(null); // アップロード後の画像URL
  const [uploading, setUploading] = useState(false); // アップロード中の状態

  // starView が true になったときにスクリーンショットを撮る
  useEffect(() => {
    if (starView) {
      handleScreenshot(); // starView が true のときにスクリーンショットを撮る
    }
  }, [starView]); // starView が変更されるたびに実行される

  // スクリーンショットを撮る
  const handleScreenshot = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current); // スクリーンショットを撮影
      const imageDataUrl = canvas.toDataURL(); // Data URL形式で取得
      uploadImage(imageDataUrl); // Supabaseにアップロード
    }
  };

  // 画像をSupabaseにアップロード
  const uploadImage = async (imageDataUrl) => {
    setUploading(true);

    // Data URLをBlobに変換
    const blob = dataURLtoBlob(imageDataUrl);
    const fileName = `screenshots/${Date.now()}_screenshot.png`; // ユニークなファイル名を生成

    // Supabaseストレージにアップロード
    const { data, error } = await supabase.storage
      .from('screenshots') // 使用するバケット名
      .upload(fileName, blob);

    if (error) {
      console.error('ファイルアップロードエラー:', error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('screenshots')
        .getPublicUrl(fileName); // 公開URLを取得
      setImageUrl(urlData.publicUrl); // 公開URLを保存
    }

    setUploading(false);
  };

  // Data URLをBlobに変換する関数
  const dataURLtoBlob = (dataUrl) => {
    const [header, base64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const length = binary.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < length; i++) {
      view[i] = binary.charCodeAt(i);
    }

    return new Blob([view], { type: mime });
  };

  return (
    <div className='fixed w-screen h-screen top-0 left-0 bg-[#E6EBEF] z-10'>

      <header className="w-screen relative h-[60px] bg-white shadow-lg flex justify-center items-center">
        <Link
          href='/'
          className='absolute left-8 top-1/2 transform -translate-y-1/2 text-[16px] py-2 px-5 text-black rounded-full'
          style={{boxShadow: '0 0px 8px rgba(0, 0, 0, 0.25)'}}
        >TOP</Link>
        <p className="font-bold text-xl text-black">気になるリスト</p>
      </header>

      <div
        className='flex justify-center items-center h-full'
        style={{height: 'calc(100vh - 60px)'}}
      >
        <div className='relative mx-5'>
          <div
            ref={captureRef}
            className="flex flex-wrap w-fit max-w-[410px] p-[10px]"
          >
            {starData.map((e) => (
              <div
                key={e.expo_number}
                className="w-[55px] h-[55px] rounded-full m-[5px]"
                style={{ backgroundColor: e.color }}
              >
                <p className="w-[55px] text-white text-center text-2xl font-bold" >
                  {e.expo_number}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap w-fit absolute top-0 left-0 max-w-[410px] p-[10px] rounded-xl"
            style={{boxShadow: 'inset 0 0px 8px rgba(0, 0, 0, 0.25)'}}
          >
            {starData.map((e) => (
              <div
                key={e.expo_number}
                className="w-[55px] h-[55px] rounded-full border-white border-4 m-[5px] flex items-center"
                style={{ backgroundColor: e.color }}
              >
                <p className="w-[47px] text-white text-center text-2xl font-bold -mt-[2px]" >
                  {e.expo_number}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='w-[320px] h-[320px] mx-5 flex justify-center items-center bg-white rounded-xl'>
          {uploading &&
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MoonLoader
                  cssOverride={{ borderColor: 'red' }} // 任意のCSSプロパティを指定可能
                  loading={true} // ローダーを表示するかどうか
                  size={64} // ローダーのサイズ
                  speedMultiplier={0.7} // アニメーション速度の倍率
                />
              </div>
              <p className="text-black text-xl font-bold mt-4">QR生成中...</p>
            </div>
          }
          {imageUrl && (
            <QRCode value={imageUrl} size={256} />
          )}
        </div>
      </div>

    </div>
  );
};

export default listStudent;
