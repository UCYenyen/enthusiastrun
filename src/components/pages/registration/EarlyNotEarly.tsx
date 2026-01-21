import React from 'react'
import Link from 'next/link';
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
export interface EarlyNotEarlyProps {
  title: string;
  price?: string;
  href: string;
  count?: number;
  maxCount?: number;
  isActive?: boolean;
}
export default function EarlyNotEarly(props: EarlyNotEarlyProps) {
  return (
    <Link href={`${props.isActive ? props.href : '#'}`} className="relative w-full flex justify-center items-center">
      {props.isActive ? null : <div className='absolute w-full bg-black/25 h-full backdrop-blur-xs opacity-50'></div>}
      <div className={`w-[80%] sm:w-full transition-colors duration-300 border-4 border-white shadow-lg flex flex-col items-center py-6 px-4 'opacity-100 cursor-pointer  bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] hover:from-[#FEB47B] hover:to-[#FF7E5F]`}>
        <h2 className="text-4xl font-impact text-center text-white mb-2">{props.isActive ? props.title : <h1 className='text-red-800 font-regular font-impact'>SOLD OUT</h1>}</h2>
        {/* {props.price && (
          <p className="text-xl font-futura text-white">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
              Number(String(props.price).replace(/[^\d.-]/g, '')) || 0
            )}
          </p>
        )} */}
      </div>
    </Link>
  )
}
