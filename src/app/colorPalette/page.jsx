'use client'

import React, { useRef, useState, useEffect } from 'react';
import Canvas from '../cmp/canvas'
import Tutorial from '../cmp/tutorial'

const Page = () => {

const [tutorialView, setTutorialView] = useState(true)

  return (
    <div className='relative w-screen h-screen'>
      <Tutorial tutorialView={tutorialView} setTutorialView={setTutorialView}/>
      <Canvas/>
    </div>
  );
};

export default Page;
