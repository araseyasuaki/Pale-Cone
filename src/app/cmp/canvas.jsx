import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({  }) => {

    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const viewResize = () => {
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      viewResize();
      window.addEventListener('resize', viewResize);
    }, []);

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

  return (
    <canvas
    ref={canvasRef}
    width={canvasSize.width}
    height={canvasSize.height}
    />
  );
};

export default Canvas;
