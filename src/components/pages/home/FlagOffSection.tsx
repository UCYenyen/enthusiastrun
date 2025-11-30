import React from "react";
import Image from "next/image";
import Link from "next/link";
import FlagOffItem from "./FlagOffItem";
export default function FlagOffSection() {
  return (
    <div className="relative items-end min-h-[40rem] justify-center z-1 w-screen bg-linear-to-b from-0% from-[#00C1C0] to-40% to-[#FFF8E1] border-y-4 border-white flex flex-col gap-8 font-bold">
      <div className="absolute w-full h-full bg-linear-to-bl from-[#00CADE] to[#00CADE]/0"></div>
      <Image
          src={"/home/z-background.svg"}
          draggable={false}
          width={900}
          height={900}
          alt="enthusiast-background-z"
          className="absolute z-1 opacity-75 top-0 left-0 w-full h-auto"
        ></Image>
      <Image
        src={"/home/rainbow-scythe.svg"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-scythe"
        className="absolute top-0 left-1/4 w-full sm:w-[40%] h-auto opacity-100"
      ></Image>
      <Image
        src={"/home/cloud.webp"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-cloud"
        className="absolute -bottom-4 left-0 w-full h-auto opacity-100"
      ></Image>
      <Image
        src={"/home/panet.webp"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-planet"
        className="absolute top-56 -left-30 sm:top-34 lg:top-0 sm:left-0 w-full sm:w-[40%] h-auto opacity-100"
      ></Image>

      <div className="flex w-[80%] sm:w-[60%] z-5 bg-background border-y-8 border-l-8 border-white flex-col items-end relative gap-12 py-12 shadow-lg">
        <FlagOffItem />
        <FlagOffItem />
      </div>
    </div>
  );
}
