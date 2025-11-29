import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CalloutSection() {
  return (
    <div className="sm:p-8 shadow-lg relative z-2 w-screen bg-background border-y-4 border-white flex flex-col py-[10%] items-center sm:items-start gap-8 font-impact">
      <Image src={"/home/rainbow-bolt.svg"} draggable={false} width={900} height={900} alt="enthusiast-bolt" className="absolute hidden sm:inline-block right-0 top-[15%] w-[15%] h-auto"></Image>
      <div className="flex flex-col gap-2 text-center sm:text-start">
        <h1 className="text-4xl">ARE YOU READY FOR ENTHUSIAST RUN?</h1>
        <h3 className="text-xl text-[#9ED486]">21 - 23 NOVEMBER</h3>
      </div>
      <h3 className="text-xl w-[80%] font-futura text-justify">
        Bersiaplah ambil bagian dan sebarkan semangat hidup sehat di event lari
        terbesar persembahan JETE Indonesia di UC Citraland - Surabaya dengan
        penampilan spesial dari RAN di panggung utama. Catat rangkaian acara
        JETE RUN 2025 dan klik tombol di bawah untuk informasi selengkapnya!
      </h3>
      <Link
        href="/about"
        className="bg-[#4BCFFC] border-2 border-white px-4 py-2 rounded-lg w-fit font-bold text-background"
      >
        SEE MORE
      </Link>
    </div>
  );
}
