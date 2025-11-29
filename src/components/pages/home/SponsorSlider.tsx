'use client'
import React from "react";
import LogoLoop from "@/components/LogoLoop";
import Image from "next/image";
export default function SponsorSlider({src="main-sponsors.svg"} : {src?: string}) {
  const techLogos = [
  { src: "/home/enthusiast-text-logo.svg", title: "Enthusiast Logo", href: "https://react.dev" },
  { src: "/home/enthusiast-text-logo.svg", title: "Enthusiast Logo", href: "https://react.dev" },
  { src: "/home/enthusiast-text-logo.svg", title: "Enthusiast Logo", href: "https://react.dev" },
  { src: "/home/enthusiast-text-logo.svg", title: "Enthusiast Logo", href: "https://react.dev" },
];
  return (
    <div className="shadow-lg relative z-20 w-screen bg-background border-y-4 border-white flex flex-col items-center justify-center gap-8 font-futura min-h-64">
      <Image src={`/home/${src}`} draggable={false} width={900} height={900} alt="main-sponsors" className="absolute -top-6 lg:-top-8 xl:-top-12 w-[80%] sm:w-1/4" />
      <LogoLoop logos={techLogos} logoHeight={120}/>
    </div>
  );
}
