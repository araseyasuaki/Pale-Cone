import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const Tutorial = ({ tutorialView, setTutorialView }) => {

  const textRef1 = useRef(null);
  const imageRef1 = useRef(null);
  const pathRef1 = useRef(null);
  const svgRef1 = useRef(null);
  const textRef2 = useRef(null);
  const imageRef2 = useRef(null);
  const pathRef2 = useRef(null);
  const svgRef2= useRef(null);
  const textRef3 = useRef(null);
  const imageRef3 = useRef(null);
  const pathRef3 = useRef(null);
  const svgRef3 = useRef(null);

  useEffect(() => {
    // 条件変更必至
    if (!tutorialView) {
      gsap.globalTimeline.clear();
      return;
    }

    const path1 = pathRef1.current;
    const svg1 = svgRef1.current;
    const pathLength1 = path1.getTotalLength();
    const path2 = pathRef2.current;
    const svg2 = svgRef2.current;
    const pathLength2 = path2.getTotalLength();
    const path3 = pathRef3.current;
    const svg3 = svgRef3.current;
    const pathLength3 = path3.getTotalLength();

    // 円のパスのアニメーション
    const masterTimeline = gsap.timeline({ repeat: -1 }); // メインタイムライン

// SVG アニメーション
const svgTimeline = gsap.timeline();
svgTimeline
  .to(svg1, { opacity: 1, duration: 0 })
  .fromTo(
    path1,
    { strokeDasharray: pathLength1, strokeDashoffset: pathLength1 },
    { strokeDashoffset: 0, duration: 3, ease: "linear" }
  )
  .to(svg1, { opacity: 0, duration: 1 })
  .to(svg2, { opacity: 1, duration: 0, delay: 3 })
  .fromTo(
    path2,
    { strokeDasharray: pathLength2, strokeDashoffset: pathLength2 },
    { strokeDashoffset: 0, duration: 3, ease: "linear" }
  )
  .to(svg2, { opacity: 0, duration: 1 })
  .to(svg3, { opacity: 1, duration: 0, delay: 3 })
  .fromTo(
    path3,
    { strokeDasharray: pathLength3, strokeDashoffset: pathLength3 },
    { strokeDashoffset: 0, duration: 3, ease: "linear" }
  )
  .to(svg3, { opacity: 0, duration: 1 });

// 手の画像のアニメーション
const imageTimeline = gsap.timeline();
imageTimeline
  .to(imageRef1.current, { opacity: 1, duration: 0 })
  .to(imageRef1.current, { 
    duration: 3, 
    ease: "none",
    motionPath: {
      path: "#motionPath1",
      align: "#motionPath1",
      alignOrigin: [0, 0]
    }
  })
  .to(imageRef1.current, { opacity: 0, duration: 1 })
  .to(imageRef2.current, { opacity: 1, duration: 0, delay: 3 })
  .to(imageRef2.current, { 
    duration: 3, 
    ease: "none",
    motionPath: {
      path: "#motionPath2",
      align: "#motionPath2",
      alignOrigin: [0, 0]
    }
  })
  .to(imageRef2.current, { opacity: 0, duration: 1 })
  .to(imageRef3.current, { opacity: 1, duration: 0, delay: 3 })
  .to(imageRef3.current, { 
    duration: 3, 
    ease: "none",
    motionPath: {
      path: "#motionPath3",
      align: "#motionPath3",
      alignOrigin: [0, 0]
    }
  })
  .to(imageRef3.current, { opacity: 0, duration: 1 });

// テキストのアニメーション
const textTimeline = gsap.timeline();
textTimeline
  .to(textRef1.current, { opacity: 0, y: 50, duration: 0 })
  .to(textRef1.current, { opacity: 1, y: 0, duration: 2, delay: 2.5 })
  .to(textRef1.current, { opacity: 0, y: 50, duration: 2, delay: 0.5 })
  .to(textRef2.current, { opacity: 0, y: 50, duration: 0 })
  .to(textRef2.current, { opacity: 1, y: 0, duration: 2, delay: 2.5 })
  .to(textRef2.current, { opacity: 0, y: 50, duration: 2, delay: 0.5 })
  .to(textRef3.current, { opacity: 0, y: 50, duration: 0 })
  .to(textRef3.current, { opacity: 1, y: 0, duration: 2, delay: 2.5 })
  .to(textRef3.current, { opacity: 0, y: 50, duration: 2, delay: 0.5 });

// メインタイムラインに各タイムラインを追加
masterTimeline
  .add(svgTimeline, 0)       // 全てのタイムラインの開始タイミングを揃える
  .add(imageTimeline, 0)
  .add(textTimeline, 0);

  }, [tutorialView]);


  return (
    <>
      {tutorialView && (
        <div className='fixed w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10'>
        <div className="flex flex-col items-center">
          <h2 className='text-white text-[32px] font-bold text-center'>
            あなたにとってForwardは何色？<br/>指でなぞってみよう
          </h2>
          <button
            className="text-black text-2xl font-bold py-5 px-14 rounded-full w-fit bg-white mt-10"
            onClick={() => setTutorialView(!tutorialView)}
          >
            はじめる
          </button>
        </div>

        <div className="absolute top-[60%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
          <p ref={textRef1} className="text-[32px] font-bold text-white opacity-0">失敗したから<br/>次はもっと頑張る</p>

          <svg viewBox="0 0 500 500" className="absolute opacity-0 w-[500px] h-[500px] top-[-90%] left-[-25%]">
            <path
              id="motionPath1"
              d="M232.646 257.569C204.979 262.069 106.846 264.669 59.6455 233.069C44.6455 223.402 13.0455 194.369 6.64552 155.569C3.81218 139.402 8.84552 97.2686 51.6455 58.0686C65.1455 45.0686 107.246 16.8686 167.646 8.06856C193.646 4.23523 256.545 3.06856 300.146 29.0686C320.312 39.7352 361.145 72.3686 363.146 117.569C363.812 137.735 353.646 185.969 307.646 217.569C285.812 231.735 227.446 262.069 168.646 270.069"
              stroke="black"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <img
            ref={imageRef1}
            src="/hando.png"
            alt="Moving object"
            className="absolute w-12 h-12 object-contain opacity-0"
          />

          <svg
            ref={svgRef1}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="absolute opacity-0 w-[500px] h-[500px] top-[-90%] left-[-25%]"
          >
            <path
              ref={pathRef1}
              d="M232.646 257.569C204.979 262.069 106.846 264.669 59.6455 233.069C44.6455 223.402 13.0455 194.369 6.64552 155.569C3.81218 139.402 8.84552 97.2686 51.6455 58.0686C65.1455 45.0686 107.246 16.8686 167.646 8.06856C193.646 4.23523 256.545 3.06856 300.146 29.0686C320.312 39.7352 361.145 72.3686 363.146 117.569C363.812 137.735 353.646 185.969 307.646 217.569C285.812 231.735 227.446 262.069 168.646 270.069"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute top-[20%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
          <p ref={textRef2} className="text-[32px] font-bold whitespace-nowrap text-white opacity-0">楽しい1日にすっぞー！</p>

          <svg viewBox="0 0 600 500" className="absolute opacity-0 w-[600px] h-[500px] top-[-195%] left-[-14%]">
            <path
              id="motionPath2"
              d="M194.516 230.154C167.349 231.987 100.516 228.854 50.5156 201.654C35.349 192.487 5.21562 167.854 6.01562 142.654C5.84895 131.321 10.7156 103.754 31.5156 84.1539C43.349 71.9873 83.6156 42.4539 150.016 21.6539C169.349 15.8206 218.616 4.55394 261.016 6.15394C283.849 6.3206 339.116 10.4539 377.516 25.6539C401.016 34.3206 447.216 61.3539 444.016 100.154C443.349 114.321 433.916 147.654 401.516 167.654C386.182 179.154 344.316 204.954 299.516 216.154C275.349 221.987 216.716 234.654 175.516 238.654"
              stroke="black"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <img
            ref={imageRef2}
            src="/hando.png"
            alt="Moving object"
            className="absolute w-12 h-12 object-contain opacity-0"
          />

          <svg
            ref={svgRef2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 500"
            className="absolute opacity-0 w-[600px] h-[500px] top-[-195%] left-[-14%]"
          >
            <path
              ref={pathRef2}
              d="M194.516 230.154C167.349 231.987 100.516 228.854 50.5156 201.654C35.349 192.487 5.21562 167.854 6.01562 142.654C5.84895 131.321 10.7156 103.754 31.5156 84.1539C43.349 71.9873 83.6156 42.4539 150.016 21.6539C169.349 15.8206 218.616 4.55394 261.016 6.15394C283.849 6.3206 339.116 10.4539 377.516 25.6539C401.016 34.3206 447.216 61.3539 444.016 100.154C443.349 114.321 433.916 147.654 401.516 167.654C386.182 179.154 344.316 204.954 299.516 216.154C275.349 221.987 216.716 234.654 175.516 238.654"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute top-[73%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">

          <p ref={textRef3} className="text-[24px] font-bold text-white text-center opacity-0">怒られて<br/>悲しいなー</p>

          <svg viewBox="0 0 400 300"className="absolute opacity-0 w-[400px] h-[300px] top-[-75%] left-[-32%]">
            <path
              id="motionPath3"
              d="M70.5 163C56 160.167 23.5 144.8 9.50002 106C3.66669 89.3334 2.40003 49.3 44 22.5C58.5 12.3334 99.1 -3.19996 145.5 16C167.333 25.3334 207.4 56.4001 193 106C185.667 129.333 153.8 174.1 85 166.5"
              stroke="black"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <img
            ref={imageRef3}
            src="/hando.png"
            alt="Moving object"
            className="absolute w-12 h-12 object-contain opacity-0"
          />


          <svg
            ref={svgRef3}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 300"
            className="absolute opacity-0 w-[400px] h-[300px] top-[-75%] left-[-32%]"
          >
            <path
              ref={pathRef3}
              d="M70.5 163C56 160.167 23.5 144.8 9.50002 106C3.66669 89.3334 2.40003 49.3 44 22.5C58.5 12.3334 99.1 -3.19996 145.5 16C167.333 25.3334 207.4 56.4001 193 106C185.667 129.333 153.8 174.1 85 166.5"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

      </div>
      )}
    </>
  );
};

export default Tutorial;