import React from "react";
import Image from "next/image";
export default function SponsorSlider({src="main-sponsors.svg"} : {src?: string}) {
  return (
    <div className="shadow-lg relative z-20 w-screen bg-background border-y-4 border-white flex flex-col items-center justify-center gap-8 font-futura min-h-64">
      <Image src={`/home/${src}`} width={900} height={900} alt="main-sponsors" className="absolute lg:-top-8 xl:-top-12 w-1/4" />
    </div>
  );
}
