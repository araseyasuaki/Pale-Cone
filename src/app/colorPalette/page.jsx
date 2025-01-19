'use client'

import React, { useRef, useState, useEffect } from 'react';
import Canvas from '../cmp/canvas'
import Tutorial from '../cmp/tutorial'
import Question from '../cmp/question';

const Page = () => {

  const [timer, setTimer] = useState(true);

  return (
    <div className='relative w-screen h-screen'>
      <Tutorial timer={timer} setTimer={setTimer}/>
      <Question timer={timer}/>
      <Canvas/>
    </div>
  );
};

export default Page;
