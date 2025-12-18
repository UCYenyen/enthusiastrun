import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <div className="overflow-hidden">
      <div className="h-[7vh]"></div>
      <div className="relative min-h-[90vh] xl:min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#73DADB] to-[#FFEBCE] text-white px-4 py-8">
        <Image
          src="/about/city-light.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-16 md:bottom-28 xl:bottom-48 w-screen h-auto"
        />
        <Image
          src="/about/city-dark.webp"
          draggable={false}
          alt="Description"
          width={900}
          height={900}
          className="absolute bottom-8 md:bottom-14 xl:bottom-16 w-screen h-auto"
        />
        <Image
          src="/home/cloud.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-0 md:bottom-0 xl:-bottom-32 w-screen h-auto"
        />
        <div className="w-[80%] sm:p-8 shadow-lg relative z-2 bg-background border-4 border-white flex flex-col py-[10%] items-center gap-8 font-impact">
          <Image
            src="/home/enthusiast-text-logo.webp"
            draggable={false}
            alt="Enthusiast Logo"
            width={500}
            height={500}
            className="absolute -top-8 md:-top-14 lg:-top-12 xl:-top-14 w-[80%] md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto"
          />
          <div className="mt-[2.5%] flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
            <h1 className="text-4xl w-[90%] sm:w-full">
              WHAT IS ENTHUSIAST RUN?
            </h1>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <h3 className="text-xl w-[80%] font-futura text-justify max-h-[250px] overflow-y-auto">
              <span className="font-bold">Enthusiast Run</span> is an event that invites you to push your limits and share the fun with friends. <span className="font-bold"> Enthusiast Vol. 2 presents</span> with <span className="font-bold">Foam Run theme</span> and offers a unique experience to running through foam.
            </h3>
            <h3 className="text-xl w-[80%] font-futura text-justify max-h-[250px] overflow-y-auto">
              <span className="font-bold">Enthusiast Foam Run</span> creates a space to enjoy exercise without pressure.
              A bigger concept and more excitement awaits, Join us and break your limits.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
