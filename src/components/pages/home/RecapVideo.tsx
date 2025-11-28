import React from "react";
import Image from "next/image";
export default function RecapVideo() {
  return (
    <div className="hidden sm:flex relative z-20 w-screen flex-col gap-8 font-bold min-h-[95vh]">
      <Image src={"/home/video-overlay-cloud.svg"} width={900} height={900} alt="recap-video-overlay-cloud" className="absolute bottom-0 left-0 w-[20vw] h-auto"></Image>
      <Image src={"/home/video-overlay-border.svg"} width={900} height={900} alt="recap-video-overlay-border" className="absolute bottom-0 left-0 h-screen w-auto"></Image>
      <Image src={"/home/video-overlay-cloud.svg"} width={900} height={900} alt="recap-video-overlay-cloud" className="scale-x-[-1] absolute bottom-0 right-0 w-[20vw] h-auto"></Image>
      <Image src={"/home/video-overlay-border.svg"} width={900} height={900} alt="recap-video-overlay-border" className="scale-x-[-1] absolute bottom-0 right-0 h-screen w-auto"></Image>
    </div>
  );
}
