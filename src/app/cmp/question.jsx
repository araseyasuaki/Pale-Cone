import React, { useState } from 'react'
import NextText from './nextText'

const Question = ({ timer }) => {

  const [viewTap, setViewTap] = useState(true);

  return (
    <>
    {!timer && (
      viewTap && (
        <div className='fixed w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center' onClick={() => setViewTap(false)}>
          <h2 className='text-white text-[32px] font-bold text-center'>あなたにとって<br/>愛って何色？</h2>
          <NextText text={'画面をタップしてスタート'} color={'#fff'}/>
        </div>
      )
    )}
    </>
  )
}

export default Question