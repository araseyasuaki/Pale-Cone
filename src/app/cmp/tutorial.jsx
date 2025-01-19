import React, { useState, useEffect, useRef } from "react";
import NextText from './nextText';
import { gsap } from "gsap";

const Tutorial = () => {

  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const [timer, setTimer] = useState(true);

  // タイマー
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimer(false);
    }, 1000000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const pathLength = path.getTotalLength();

    gsap.timeline()
      .to(svg, { opacity: 1 })
      .fromTo(
        path,
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "linear",
        }
      )
      .to(svg, { opacity: 0, duration: 1 });
  }, []);

  return (
    <>
      {timer && (

        <div className='fixed flex w-screen h-screen bg-black bg-opacity-25 justify-center items-center' onClick={() => setTimer(false)}>

          <h2 className='text-white text-[32px] font-bold text-center'>
            今の感情を色に例えると何色かな？<br/>（ 指でなぞる ）
          </h2>

          {/* <div className="absolute top-[60%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">

            <p className="text-[32px] font-bold text-white">失敗したから<br/>次はもっと頑張る</p>

            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="absolute w-[500px] h-[500px] top-[-90%] left-[-25%]">
              <path
                id="motionPath"
                d="M232.646 257.569C204.979 262.069 106.846 264.669 59.6455 233.069C44.6455 223.402 13.0455 194.369 6.64552 155.569C3.81218 139.402 8.84552 97.2686 51.6455 58.0686C65.1455 45.0686 107.246 16.8686 167.646 8.06856C193.646 4.23523 256.545 3.06856 300.146 29.0686C320.312 39.7352 361.145 72.3686 363.146 117.569C363.812 137.735 353.646 185.969 307.646 217.569C285.812 231.735 227.446 262.069 168.646 270.069"
                stroke="black"
                strokeWidth="0"
                strokeLinecap="round"
                fill="none"
              />
              <image href="/hando.png" width="100" height="100" className='opacity-0'>
                <animateMotion dur="3s" repeatCount="1" begin="0.5s">
                  <mpath href="#motionPath" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="3s"
                  begin="0.5s"
                  fill="freeze"
                />
              </image>
            </svg>

            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="absolute opacity-0 w-[500px] h-[500px] top-[-90%] left-[-25%]"
            >
              <path
                ref={pathRef}
                d="M232.646 257.569C204.979 262.069 106.846 264.669 59.6455 233.069C44.6455 223.402 13.0455 194.369 6.64552 155.569C3.81218 139.402 8.84552 97.2686 51.6455 58.0686C65.1455 45.0686 107.246 16.8686 167.646 8.06856C193.646 4.23523 256.545 3.06856 300.146 29.0686C320.312 39.7352 361.145 72.3686 363.146 117.569C363.812 137.735 353.646 185.969 307.646 217.569C285.812 231.735 227.446 262.069 168.646 270.069"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div> */}


          {/* <div className="absolute top-[20%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">

            <p className="text-[32px] font-bold whitespace-nowrap">楽しい1日にすっぞー！</p>

            <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" className="absolute w-[600px] h-[500px] top-[-220%] left-[-14%]">
              <path
                id="motionPath"
                d="M194.516 230.154C167.349 231.987 100.516 228.854 50.5156 201.654C35.349 192.487 5.21562 167.854 6.01562 142.654C5.84895 131.321 10.7156 103.754 31.5156 84.1539C43.349 71.9873 83.6156 42.4539 150.016 21.6539C169.349 15.8206 218.616 4.55394 261.016 6.15394C283.849 6.3206 339.116 10.4539 377.516 25.6539C401.016 34.3206 447.216 61.3539 444.016 100.154C443.349 114.321 433.916 147.654 401.516 167.654C386.182 179.154 344.316 204.954 299.516 216.154C275.349 221.987 216.716 234.654 175.516 238.654"
                stroke="black"
                strokeWidth="0"
                strokeLinecap="round"
                fill="none"
              />
              <image href="/hando.png" width="100" height="100" className='opacity-0'>
                <animateMotion dur="3s" repeatCount="1" begin="0.5s">
                  <mpath href="#motionPath" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="3s"
                  begin="0.5s"
                  fill="freeze"
                />
              </image>
            </svg>

            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 500"
              className="absolute opacity-0 w-[600px] h-[500px] top-[-220%] left-[-14%]"
            >
              <path
                ref={pathRef}
                d="M194.516 230.154C167.349 231.987 100.516 228.854 50.5156 201.654C35.349 192.487 5.21562 167.854 6.01562 142.654C5.84895 131.321 10.7156 103.754 31.5156 84.1539C43.349 71.9873 83.6156 42.4539 150.016 21.6539C169.349 15.8206 218.616 4.55394 261.016 6.15394C283.849 6.3206 339.116 10.4539 377.516 25.6539C401.016 34.3206 447.216 61.3539 444.016 100.154C443.349 114.321 433.916 147.654 401.516 167.654C386.182 179.154 344.316 204.954 299.516 216.154C275.349 221.987 216.716 234.654 175.516 238.654"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div> */}



          <div className="absolute top-[73%] left-[67%] transform -translate-x-1/2 -translate-y-1/2">

            <p className="text-[24px] font-bold text-white text-center">怒られて<br/>悲しいなー</p>

            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="absolute w-[400px] h-[300px] top-[-75%] left-[-32%]">
              <path
                id="motionPath"
                d="M70.5 163C56 160.167 23.5 144.8 9.50002 106C3.66669 89.3334 2.40003 49.3 44 22.5C58.5 12.3334 99.1 -3.19996 145.5 16C167.333 25.3334 207.4 56.4001 193 106C185.667 129.333 153.8 174.1 85 166.5"
                stroke="black"
                strokeWidth="0"
                strokeLinecap="round"
                fill="none"
              />
              <image href="/hando.png" width="70" height="70" className='opacity-0'>
                <animateMotion dur="3s" repeatCount="1" begin="0.5s">
                  <mpath href="#motionPath" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="3s"
                  begin="0.5s"
                  fill="freeze"
                />
              </image>
            </svg>

            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 300"
              className="absolute opacity-0 w-[400px] h-[300px] top-[-75%] left-[-32%]"
            >
              <path
                ref={pathRef}
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
