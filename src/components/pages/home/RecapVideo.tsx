import React from "react";
import Image from "next/image";
export default function RecapVideo() {
  return (
    <div className="flex relative z-20 w-screen flex-col gap-8 font-bold min-h-[95vh] items-center justify-center">
      <iframe
        className="w-full h-full absolute inset-0 z-10"
        src="https://www.youtube.com/embed/VGaAr9MJTfs?autoplay=1&mute=1&loop=1&playlist=VGaAr9MJTfs"
        title="Enthusiast Foam Run Recap"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Image src={"/home/video-overlay-cloud.webp"} draggable={false} width={900} height={900} alt="recap-video-overlay-cloud" className="hidden sm:inline-block absolute bottom-0 left-0 w-[20vw] h-auto z-20"></Image>
      <Image src={"/home/video-overlay-border.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-border" className="hidden sm:inline-block absolute bottom-0 left-0 h-screen w-auto z-20"></Image>
      <Image src={"/home/video-overlay-cloud.webp"} draggable={false} width={900} height={900} alt="recap-video-overlay-cloud" className="hidden sm:inline-block scale-x-[-1] absolute bottom-0 right-0 w-[20vw] h-auto z-20"></Image>
      <Image src={"/home/video-overlay-border.svg"} draggable={false} width={900} height={900} alt="recap-video-overlay-border" className="hidden sm:inline-block scale-x-[-1] absolute bottom-0 right-0 h-screen w-auto z-20"></Image>
    </div>
  );
}
