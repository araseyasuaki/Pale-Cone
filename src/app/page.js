'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from './libs/microcms';

const page = () => {
  const [userData, setUserData] = useState([]);

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

  return (
    <div className="relative flex w-screen h-screen justify-center items-center">
      <Link href="/colorPalette">
        <div
          className="w-screen h-screen bg-[#ECECEC] relative overflow-hidden"
          style={{
            width: 'calc(100vw - 90px)',
            height: 'calc(100vh - 90px)',
            boxShadow: 'inset 0 0px 8px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="absolute ml-10 top-[20%] transform -translate-y-1/2 z-10">
            <div className="w-[1.2%] bg-black aspect-[10/218] absolute left-0 bottom-0" />
            <p className="text-[128px] font-bold leading-[120px] ml-5">
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #FF6289 0%, #F6B538 25%, #9BEA19 50%, #17B5F9 75%, #9D6FEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                PALLET
              </span>
              <br />
              CONNECTION
            </p>
          </div>

          {/* スライダー1 */}
          <div className="absolute w-[25%] h-[200%] overflow-hidden top-[-10%] right-[33%] rotate-[17deg]">
            <ul
              className="slider-list flex flex-col"
              style={{ animation: 'slideVertically1 190s linear infinite' }}
            >
    {[...userData.slice(0, 32), ...userData.slice(0, 31)].map((e, index) => (
      <li
        key={index}
        className="slider-item w-full h-[20%] aspect-[1920/1080] flex-shrink-0"
        style={{
          height: 'auto', // 画像の高さに合わせてliの高さを調整
        }}
      >
        <img
          className="my-[8%] h-[84%]"
          src={e.firstview.url}
          alt="キービジュアル装飾"
          width={e.firstview.width}
          height={e.firstview.height}
          style={{
            objectFit: 'cover', // 画像を枠に合わせて拡大
            borderRadius: '8px',
            border: '2px solid black',
          }}
        />
      </li>
    ))}
  </ul>
          </div>

          {/* スライダー2 */}
          <div className="absolute w-[25%] h-[200%] overflow-hidden bottom-[-90%] right-[5%] rotate-[17deg]">
            <ul
              className="slider-list flex flex-col"
              style={{ animation: 'slideVertically2 120s linear infinite' }}
            >
    {[...userData.slice(0, 32), ...userData.slice(32, 63)].map((e, index) => (
      <li
        key={index}
        className="slider-item w-full h-[20%] aspect-[1920/1080] flex-shrink-0"
        style={{
          height: 'auto', // 画像の高さに合わせてliの高さを調整
        }}
      >
        <img
          className="my-[8%] h-[84%]"
          src={e.firstview.url}
          alt="キービジュアル装飾"
          width={e.firstview.width}
          height={e.firstview.height}
          style={{
            objectFit: 'cover', // 画像を枠に合わせて拡大
            borderRadius: '8px',
            border: '2px solid black',
          }}
        />
      </li>
    ))}
  </ul>
          </div>

          <div
            className="absolute bottom-0 left-0 z-10 w-[464px] h-[298px] flex justify-center items-center rounded-[32px]"
            style={{ boxShadow: 'inset 0 0px 8px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className="text-black font-bold text-[32px]">
              このシステムでは、
              <br />
              あなたの気持ちに近い色を
              <br />
              指でなぞって表し、
              <br />
              学生たちと出会う
              <br />
              <strong className="text-5xl text-white mt-4 leading-[68px] bg-black">キッカケ</strong>を作ります。
            </h2>
          </div>

          <img
  className="absolute bottom-[-1px] left-[-1px]"
  src="/kado.png"
  alt="装飾"
  width="549"
  height="383"
  style={{ objectFit: 'cover' }}  // アスペクト比を保ちながら、余白を埋める
/>
        </div>
      </Link>
    </div>
  );
};

export default page;

















// 'use client';
// import React, { useState, useEffect } from 'react';

// const Page = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // データを非同期で取得
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/students'); // APIエンドポイントにリクエスト
//         const result = await response.json();

//         if (response.ok) {
//           setData(result);
//         } else {
//           throw new Error(result.error || 'データ取得に失敗しました');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // 空の依存配列なので、コンポーネントが最初にレンダリングされる時に一度だけ実行される

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>学生データ</h1>
//       {data.length === 0 ? (
//         <p>データがありません。</p>
//       ) : (
//         <ul>
//           {data.map((student) => (
//             <li key={student.id}>
//               <strong>{student.id}</strong>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Page;
