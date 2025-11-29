import React from 'react'
import Link from 'next/link';
export interface EarlyNotEarlyProps {
    title: string;
    price: string;
    href: string;
    isActive?: boolean;
}
export default function EarlyNotEarly(props: EarlyNotEarlyProps) {
  return (
    <Link href={`${props.isActive ? props.href : '#'}`} className="w-full">
        
      <div className={`w-full transition-colors duration-300 border-4 border-white shadow-lg flex flex-col items-center py-6 px-4 ${props.isActive ? 'opacity-100 cursor-pointer  bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] hover:from-[#FEB47B] hover:to-[#FF7E5F]' : 'opacity-75 bg-amber-900'}`}>
        <h2 className="text-3xl font-impact text-white mb-2">{props.title}</h2>
        <p className="text-xl font-futura text-white">Rp {props.price}</p>
      </div>
    </Link>
  )
}
