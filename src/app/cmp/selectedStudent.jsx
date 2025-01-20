import React, { useState } from 'react';
import ListStudent from '@/app/cmp/listStudent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SelectedStudent = ({ selectedDatas, selectView, setSelectView }) => {
  const colorCodes = [
    "#FF5733", "#33FF57", "#5733FF", "#F3FF33", "#33FFF5",
    "#FF33F5", "#33F5FF", "#F533FF", "#FFC300", "#DAF7A6",
    "#C70039", "#900C3F", "#581845", "#28B463", "#1F618D",
    "#AF7AC5", "#F5B041", "#85C1E9", "#45B39D", "#E74C3C"
  ];

  // 背景色メイン
  const [bgColorMain, setBgColorMain] = useState('');
  // 背景色サブ
  const [bgColorSub, setBgColorSub] = useState('');
  // お気に入り学生
  const [starData, setStarData] = useState([]);
  // お気に色画面状態管理
  const [starView, setStarView] = useState(false)

  // 背景色切り替え
  const handleSlideChange = (swiper) => {
    if (!selectedDatas || selectedDatas.length === 0) return;
    const realIndex = swiper.realIndex;
    console.log(realIndex)
    const currentData = selectedDatas[realIndex];
    console.log(currentData)
    if (currentData) {
      setBgColorMain(currentData.color || '#000');
      setBgColorSub(colorCodes[realIndex % colorCodes.length] || '#FFF');
    }
  };

  const toggleStar = (e) => {
    setStarData((prevstar) => {
      // すでに登録済みか確認
      const exists = prevstar.some(item => item.expo_number === e.expo_number);
      if (exists) {
        // 存在していれば削除
        return prevstar.filter(item => item.expo_number !== e.expo_number);
      } else {
        // 存在していなければ追加
        return [...prevstar, { expo_number: e.expo_number, color: e.color }];
      }
    });
  };

  return (
    <div
      className='fixed w-screen h-screen top-0 left-0'
      style={{ background: `linear-gradient(to bottom right, ${bgColorMain}, ${bgColorSub})` }}
    >
      <div
        className='fixed w-screen h-screen top-0 left-0 -z-10'
        onClick={() => setSelectView(!selectView)}
      />
      <div style={{ width: '80%', margin: 'auto' }}>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">${index + 1}</span>`;
            },
          }}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          navigation
          onSlideChange={handleSlideChange}
        >
          {selectedDatas.map((e) => (
            <SwiperSlide key={e.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '150px',
                  background: '#f3f4f6',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  position: 'relative',
                }}
              >
                <h3>{e.name}</h3>
                <button
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    padding: '5px 10px',
                    background: starData.some(item => item.expo_number === e.expo_number) ? '#FF5733' : '#ddd',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleStar(e)}
                >
                  {starData.some(item => item.expo_number === e.expo_number) ? 'チェック中' : '気になる'}
                </button>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className='fixed bottom-8 left-8 w-[190px] h-[70px] bg-white rounded-full z-20'
        onClick={() => setStarView(!starView)}
        disabled={starData.length == 0}
        style={{opacity: starData.length === 0 ? 0.5 : 1,}}
      >
        {starView ? (
          <div className='flex items-center ml-[19px]'>
            <div className="relative w-8 h-8 flex justify-center items-center">
              <div className="absolute w-[22px] h-[2px] bg-black rounded-full transform rotate-45"></div>
              <div className="absolute w-[22px] h-[2px] bg-black rounded-full transform -rotate-45"></div>
            </div>
            <p className='tex-[16px] font-bold mx-auto'>閉じる</p>
          </div>
        ):(
          <div className='flex items-cente'>
            <Image
              src="/qrCode.webp"
              width={30}
              height={30}
              alt="気になるリストのQRコード"
              className='ml-5'
            />
            <p className='tex-[16px] font-bold h-fit my-[3px] ml-2'>気になるリスト</p>
          </div>
        )}
      </button>

      {starView && (
        <ListStudent starData={starData} starView={starView} setStarView={setStarView}/>
      )}

    </div>
  );
};

export default SelectedStudent;
