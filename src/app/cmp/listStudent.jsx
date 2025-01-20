import React, { useState, useRef } from 'react';
import supabase from '../supabase'; // Supabaseクライアントをインポート
import QRCode from 'react-qr-code'; // QRコード生成用ライブラリをインポート
import html2canvas from 'html2canvas'; // スクリーンショットを撮るためのライブラリをインポート

const listStudent = ({ starData, starView, setStarView }) => {

  const captureRef = useRef(null); // スクリーンショット対象の要素参照
  const [imageUrl, setImageUrl] = useState(null); // アップロード後の画像URL
  const [uploading, setUploading] = useState(false); // アップロード中の状態

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
      {/* <div
        className='fixed w-screen h-screen top-0 left-0'
        onClick={() => setSelectView(!selectView)}
      /> */}

    <div
      ref={captureRef}
      className="flex absolute -z-10 bg-[#E6EBEF]"
    >
      {starData.map((e) => (
        <div
          key={e.expo_number}
          className="relative z-10"
        >
          <p className="font-bold text-2xl text-white w-[55px] text-center m-[5px] pb-2" style={{ backgroundColor: e.color }}>
            {e.expo_number}
          </p>
        </div>
      ))}
    </div>
      <button
          onClick={handleScreenshot}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          スクリーンショットを撮る
        </button>
        {uploading && <p className="text-white text-xl mt-4">アップロード中...</p>} {/* アップロード中メッセージ */}

{imageUrl && (
  <div className="mt-6 flex flex-col items-center">
    <h3 className="text-white text-2xl md:text-3xl font-semibold">保存した画像のQRコード</h3>
    <div className="mt-4">
      <QRCode value={imageUrl} size={256} />
    </div>
  </div>
)}
    </div>
  )
}

export default listStudent
