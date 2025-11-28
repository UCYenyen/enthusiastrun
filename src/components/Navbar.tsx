import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className='fixed z-100 w-screen bg-background h-[7vh] px-[7.5%] sm:px-[1.5%] flex justify-between items-center border-b-4 border-white shadow-2xl'>
      <h1 className='text-white font-impact text-2xl'>ENTHUSIAST</h1>
      <div className='flex flex-col gap-1 md:hidden'>
        <div className='w-6 h-1 bg-white'></div>
        <div className='w-6 h-1 bg-white'></div>
        <div className='w-6 h-1 bg-white'></div>
      </div>
      <div className='hidden md:flex font-impact text-xl gap-4 justify-center items-center font-regular'>
        <Link href='/' className='text-white'>HOME</Link>
        <Link href='/about' className='text-white'>ABOUT</Link>
        <Link href='/registration' className='text-white'>REGISTRATION</Link>
        <Link href='/partnership' className='text-white'>PARTNERSHIP</Link>
        <Link href='/route' className='text-white'>ROUTE</Link>
        <Link href='/contact' className='text-white'>CONTACT</Link>
      </div>
    </nav>
  )
}
