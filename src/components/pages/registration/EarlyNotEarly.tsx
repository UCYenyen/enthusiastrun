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
    <Link href={`${props.isActive ? props.href : '#'}`} className="w-full flex justify-center">
        
      <div className={`w-[80%] sm:w-full transition-colors duration-300 border-4 border-white shadow-lg flex flex-col items-center py-6 px-4 'opacity-100 cursor-pointer  bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] hover:from-[#FEB47B] hover:to-[#FF7E5F]`}>
        {props.isActive ? null : <><HiLockClosed size={50} width={300} height={300}/><br /></> }
        <h2 className="text-3xl font-impact text-white mb-2">{props.title}</h2>
        {props.price && (
          <p className="text-xl font-futura text-white">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
              Number(String(props.price).replace(/[^\d.-]/g, '')) || 0
            )}
          </p>
        )}
      </div>
    </Link>
  )
}
