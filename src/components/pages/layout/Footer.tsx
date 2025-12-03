import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="shadow-lg font-futura relative z-2 w-screen bg-background border-t-4 border-white flex flex-col">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-start p-8 gap-8 w-[80%]">
        <div className="flex flex-col justify-center items-center lg:items-start gap-4">
          <div className="flex gap-1 items-center justify-center">
            <Image
              src="/vercel.svg"
              alt="Enthusiast Logo"
              width={48}
              height={48}
            />
            <h2 className="text-2xl font-impact">ENTHUSIAST</h2>
          </div>
          <div className="flex gap-4 items-center">
            
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="flex text-lg flex-col gap-4 items-center lg:items-start">
            <h2 className="text-2xl font-impact">Registrations</h2>
            <Link
              href="/register/CATEGORY_5K"
              className="font-normal text-white mb-0 text-center lg:text-start"
            >
              5K RUN
            </Link>
            <Link
              href="/register/CATEGORY_10K"
              className="font-normal text-white mb-0 text-center lg:text-start"
            >
              10K RUN
            </Link>
          </div>
          <div className="flex text-lg flex-col gap-4 items-center lg:items-start max-w-[400px]">
            <h2 className="text-2xl font-impact">Contact us</h2>
            <p className="font-normal mb-0 text-center text-lg-start">
              +62 812-5999-0845 (Satria)
            </p>
            <p className="font-normal mb-0 text-center text-lg-start">
              +62 812-5279-5787 (Kelvin)
            </p>
            <Link
              href="mailto:enthusiast@gmail.com"
              className="font-normal mb-0 text-center text-white lg:text-start"
            >
              enthusiastibm@gmail.com
            </Link>
            <p className="font-normal mb-0 text-center lg:text-start">
              CitraLand CBD Boulevard, Jl. Waterpark Boulevard, Made, Kec.
              Sambikerep, Surabaya, Jawa Timur 60219
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black/10 w-full">
        <p className="text-xl fw-normal py-4 text-center m-0 text-white">
          © 2026 ENTHUSIAST. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
