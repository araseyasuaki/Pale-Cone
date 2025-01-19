import React from 'react'
import Link from 'next/link'

const Page = () => {

  return (
    <div className="w-screen h-screen">
      <Link
        href="/colorPalette"
        className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl"
      >
        <div className='flex justify-center items-center flex-col h-screen relative w-screen'>
          <h1 className='text-4xl font-bold'>パレコネ</h1>
          <button className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
            - 画面をタップ -
          </button>
        </div>
      </Link>
    </div>
  )
}

export default Page
