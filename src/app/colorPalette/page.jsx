'use client'

import React, { useRef, useState, useEffect } from 'react';
import Canvas from '../cmp/canvas'
import Tutorial from '../cmp/tutorial'

const Page = () => {

  return (
    <div className='relative bg-black w-screen h-screen'>
      <Tutorial/>
      <Canvas/>
    </div>
  );
};

export default Page;
