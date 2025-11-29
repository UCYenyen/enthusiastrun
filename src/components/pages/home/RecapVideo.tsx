import React from "react";
import Image from "next/image";
export default function RecapVideo() {
  return (
    <div className="flex relative z-20 w-screen flex-col gap-8 font-bold min-h-[95vh]">
      <Image src={"/home/video-overlay-cloud.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-cloud" className="hidden sm:inline-block absolute bottom-0 left-0 w-[20vw] h-auto"></Image>
      <Image src={"/home/video-overlay-border.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-border" className="hidden sm:inline-block absolute bottom-0 left-0 h-screen w-auto"></Image>
      <Image src={"/home/video-overlay-cloud.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-cloud" className="hidden sm:inline-block scale-x-[-1] absolute bottom-0 right-0 w-[20vw] h-auto"></Image>
      <Image src={"/home/video-overlay-border.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-border" className="hidden sm:inline-block scale-x-[-1] absolute bottom-0 right-0 h-screen w-auto"></Image>
    </div>
  );
}
