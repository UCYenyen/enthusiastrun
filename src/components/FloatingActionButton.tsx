import React from 'react'
import Link from 'next/link'
export default function FloatingActionButton() {
  return (
    <Link href="/" className='bg-[#4BCFFC] text-background fixed bottom-8 gap-2 right-8 px-4 py-2 font-impact shadow-2xl border-3 border-white rounded-full flex justify-center items-center z-50'>
        <div className='bg-white rounded-full'>
            <h1 className='font-impact py-2 px-4'>?</h1>
        </div>
        <div className='flex flex-col text-white font-futura font-bold justify-center items-start'>
            <h1 className='text-sm'>Butuh bantuan?</h1>
            <h1 className='text-sm'>Hubungi kami sekarang</h1>
        </div>
    </Link>
  )
}
