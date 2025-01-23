'use client'

import React, { useState, useEffect } from 'react';
import { client } from './libs/microcms';
import Link from 'next/link';
import Image from 'next/image';

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
    <Link
        className='relative w-screen h-screen flex justify-center items-center'
        href="/colorPalette"
    >
    {/* 外枠 */}
    <div
      className="relative w-full h-full bg-[#ECECEC] overflow-hidden"
      style={{
        width: 'calc(100% - 4.2vw)',
        height: 'calc(100% - 4.2vw)',
        boxShadow: 'inset 0 0px 8px rgba(0, 0, 0, 0.25)',
      }}
    >

      {/* タイトル */}
      <div className="absolute w-fit ml-10 top-[20.8%] transform -translate-y-1/2 z-10 flex">
        <div className="absolute w-[1.2%] h-[93%] aspect-[10/218] bg-black left-0 bottom-0" />
        <h1 className="text-[9vw] font-bold leading-[90%] ml-[2%] text-black">
          <span
            style={{
              background: 'linear-gradient(135deg, #FF6289 0%, #F6B538 25%, #9BEA19 50%, #17B5F9 75%, #9D6FEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            PALLET
          </span><br />
          CONNECTION
        </h1>
      </div>

      {/* 右上の丸み */}
      <Image
        className='absolute w-[20%] top-[-1px] right-[-1px] z-10'
        src='/kv-dec-img-1.webp'
        alt='キービジュアルデコレーション画像１'
        width={700}
        height={700}
      />

      {/* 左下のテキストエリア */}
      <div className='absolute w-[40%] aspect-[1100/776] bottom-0 left-0'>

        <div
          className='absolute bottom-0 left-0 w-[100%] h-[100%] flex justify-center items-center rounded-[1.3vw]'
          style={{
            width: 'calc(100% - 6.7vw)',
            height: 'calc(100% - 6.7vw)',
            boxShadow: 'inset 0 0px 8px rgba(0, 0, 0, 0.25)',
          }}
        >
          <h2 className="text-black font-bold text-[2vw]">
            このシステムでは、<br/>
            あなたの気持ちに近い色を<br/>
            指でなぞって表し、<br/>
            学生たちと出会う<br/>
            <strong className="text-[2.7vw] text-white mt-4 leading-[4vw] bg-black">
              キッカケ
            </strong>
            を作ります。
          </h2>
        </div>

        <Image
          className="w-full h-full"
          src="/kv-dec-img-2.webp"
          alt="装飾"
          width="1100"
          height="776"
        />
      </div>

      {/* スライダー1:下〜上 */}
      <div className="absolute w-[25%] h-[200%] overflow-hidden top-[-20%] right-[32%] rotate-[17deg]">
        <ul
          className="slider-list flex flex-col"
          style={{ animation: 'slideVertically1 120s linear infinite' }}
        >
          {[...userData.slice(0, 31), ...userData.slice(0, 31)].map((e, index) => (
            <li
              key={index}
              className="slider-item w-full h-[20%] aspect-[1920/1080] flex-shrink-0"
              style={{
                height: 'auto',
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

          {/* スライダー2:上〜下 */}
          <div className="absolute w-[25%] h-[200%] overflow-hidden bottom-[-90%] right-[5%] rotate-[17deg]">
            <ul
              className="slider-list flex flex-col"
              style={{ animation: 'slideVertically2 120s linear infinite' }}
            >
    {[...userData.slice(32, 63), ...userData.slice(32, 63)].map((e, index) => (
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

    </div>

    <div className='absolute bottom-[0.4vw] right-0 flex items-center justify-center h-[1.3vw] mr-[2.1vw]'>
      <Image
        className='w-[3.2vw] aspect-[236/54]'
        src='/kv-dec-img-3.webp'
        alt='装飾'
        width={236}
        height={54}
      />
      <p className='ml-[0.7vw] mt-[-0.2vw] font-bold text-[1.2vw] text-black'>画面をタッチしてスタート</p>
    </div>

    </Link>
  );
};

export default page;