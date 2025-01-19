import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TitleAnimation = ({ text, color = "white" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll(".line");

    gsap.fromTo(
      lines,
      { opacity: 0, y: 20 }, // 初期状態: 非表示で下に位置
      {
        opacity: 1,
        y: 0, // 最終状態: 表示で元の位置
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.3, // 各行の遅延時間
      }
    );
  }, []);

  return (
    <h2
      ref={textRef}
      className="w-fit text-[32px] font-bold text-center leading-relaxed"
      style={{ color: color }} // プロップスで渡された色を適用
    >
      {text.split("\n").map((line, index) => (
        <span key={index} className="line block">
          {line}
        </span>
      ))}
    </h2>
  );
};

export default TitleAnimation;
