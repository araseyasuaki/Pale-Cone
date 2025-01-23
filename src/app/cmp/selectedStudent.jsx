import React, { useState, useEffect } from 'react';
import ListStudent from '@/app/cmp/listStudent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import NextText from '@/app/cmp/nextText';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../globals.css';

const SelectedStudent = ({ selectedDatas, selectView, setSelectView, oorData, oorNoData }) => {
  const [bgColorMain, setBgColorMain] = useState('');
  const [bgColorSub, setBgColorSub] = useState('');
  const [starData, setStarData] = useState([]);
  const [starView, setStarView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    if (!selectedDatas || selectedDatas.length === 0) return;
    const realIndex = swiper.realIndex;
    const currentData = selectedDatas[realIndex];
    if (currentData) {
      setBgColorMain(currentData.color || '#000');
      setBgColorSub(oorNoData[realIndex % oorNoData.length] || '#000');
    }
    setCurrentSlide(realIndex);
  };

  const toggleStar = (e) => {
    setStarData((prevstar) => {
      const exists = prevstar.some(item => item.expo_number === e.expo_number);
      if (exists) {
        return prevstar.filter(item => item.expo_number !== e.expo_number);
      } else {
        return [...prevstar, { expo_number: e.expo_number, color: e.color }];
      }
    });
  };

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0"
      style={{ background: `linear-gradient(to bottom right, ${bgColorMain}, ${bgColorSub})` }}
    >
      <div
        className="fixed w-screen h-screen top-0 left-0 -z-10"
        onClick={() => setSelectView(!selectView)}
      />
      <header className="w-screen relative h-[60px] bg-white shadow-lg flex justify-center items-center">
        <Link
          href='/'
          className='absolute left-8 top-1/2 transform -translate-y-1/2 text-[16px] py-2 px-5 text-black rounded-full transition duration-300 hover:scale-110 hover:bg-[#E6EBEF]'
          style={{ boxShadow: '0 0px 8px rgba(0, 0, 0, 0.25)' }}
        >TOP</Link>
        <p className="font-bold text-xl text-black">発見した学生一覧</p>
      </header>
      <div className="w-[60%] m-auto mt-[3%] relative">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={false}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={handleSlideChange}
          style={{ paddingBottom: '40px' }}
        >
          {selectedDatas.map((e) => (
            <SwiperSlide key={e.id}>
              <div
                className="w-full h-full m-auto bg-[#E6EBEF] rounded-xl"
                style={{ height: "67vh" }}
              >
                <div className="bg-white rounded-tl-xl rounded-tr-xl relative p-4">
                  <div className='flex items-end'>
                    <p className="text-4xl font-bold text-black">{e.expo_number}</p>
                    <p className="text-4xl font-bold text-black ml-6">{e.name}</p>
                    <div className='ml-2'>
                      <p className={`text-[16px] font-bold px-2 ${
                          e.grade === '2年' ? 'text-orange-500 border-2 border-orange-500' :
                          e.grade === '1年' ? 'text-blue-500 border-2 border-blue-500' :
                          'text-black border-2'
                        }`}
                      >
                        {e.grade}生
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center mt-1'>
                    <div
                      className='w-5 h-5 rounded-full'
                      style={{ backgroundColor: e.color }}
                    />
                    <p className='ml-4 text-black'>{e.features}</p>
                  </div>
                  <button
                    className="absolute top-1/2 transform -translate-y-1/2 right-[16px] py-[5px] w-[160px] text-xl text-black rounded-full"
                    style={{
                      boxShadow: starData.some(item => item.expo_number === e.expo_number)
                        ? 'inset 0 0px 8px rgba(0, 0, 0, 0.25)'
                        : '0 0px 8px rgba(0, 0, 0, 0.25)',
                      backgroundColor: starData.some(item => item.expo_number === e.expo_number)
                        ? '#E6EBEF'
                        : '#fff',
                    }}
                    onClick={() => toggleStar(e)}
                  >
                    {starData.some(item => item.expo_number === e.expo_number)
                      ? 'チェック中'
                      : '気になる'}
                  </button>
                </div>
                <div
                  className="flex w-full h-full justify-center items-center px-20 overflow-y-scroll"
                  style={{ height: "calc(100% - 100px)" }}
                >
                  <p className="text-2xl text-black">{e.forward}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ページネーション表示 */}
        <div className="absolute bottom-0 left-0 w-full text-center">
          <p className="text-xl font-bold text-white">
            {currentSlide + 1} / {selectedDatas.length}
          </p>
        </div>

        {/* カスタムナビゲーションボタン */}
        <div
          className="swiper-button-prev absolute top-1/2 transform -translate-y-1/2"
          style={{left: '-15%', width: '10%'}}
        >
          <Image src="/hidari.png" alt="前へ" width={108} height={121} />
        </div>
        <div
          className="swiper-button-next absolute top-1/2 right-[-15%] transform -translate-y-1/2"
          style={{right: '-15%', width: '10%'}}
        >
          <Image src="/migi.png" alt="次へ" width={108} height={121} />
        </div>
      </div>

      <button
        className="fixed bottom-8 right-8 w-[190px] h-[70px] bg-white rounded-full z-20"
        onClick={() => setStarView(!starView)}
        disabled={starData.length === 0}
        style={{ opacity: starData.length === 0 ? 0.5 : 1 }}
      >
        {starView ? (
          <div className="flex items-center ml-[19px]">
            <div className="relative w-8 h-8 flex justify-center items-center">
              <div className="absolute w-[22px] h-[2px] bg-black rounded-full transform rotate-45"></div>
              <div className="absolute w-[22px] h-[2px] bg-black rounded-full transform -rotate-45"></div>
            </div>
            <p className="tex-[16px] font-bold mx-auto text-black">閉じる</p>
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              src="/qrCode.webp"
              width={30}
              height={30}
              alt="気になるリストのQRコード"
              className="ml-5"
            />
            <p className="tex-[16px] font-bold h-fit my-[3px] ml-2 text-black">気になるリスト</p>
          </div>
        )}
      </button>

      {starView && (
        <ListStudent starData={starData} starView={starView} setStarView={setStarView} />
      )}

      <NextText text={'空白部分をタップして閉じる'} color={'#fff'} />
    </div>
  );
};

export default SelectedStudent;
