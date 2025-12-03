"use client";
import React from "react";
import Image from "next/image";
import EarlyNotEarly from "@/components/pages/registration/EarlyNotEarly";
import { useParams } from "next/dist/client/components/navigation";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function page() {
  const slug = useParams().slug;

  if (slug !== "10k" && slug !== "5k") {
    return redirect("/not-found");
  }

  const is5K = slug === "5k";
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
            <h1 className="text-4xl w-[90%] sm:w-full">REGISTRATION</h1>
          </div>
          <EarlyNotEarly
            title="Super Early Bird"
            price={is5K ? "150000" : "200000"}
            href={`/register/${slug}/super-early-bird`}
            isActive={true}
          />
          <EarlyNotEarly
            title="Early Bird"
            price={is5K ? "180000" : "230000"}
            href={`/register/${slug}/early-bird`}
            isActive={false}
          />
          <EarlyNotEarly
            title="Regular"
            price={is5K ? "250000" : "300000"}
            href={`/register/${slug}/regular`}
            isActive={false}
          />
          <div className="flex flex-col font-futura w-full justify-center items-center gap-1">
            <h3 className="text-xl">Punya voucher?</h3>
            <Link
              href={"/register/redeem-code"}
              className="bg-[#4BCFFC] text-background gap-2 px-4 py-2 font-impact shadow-2xl border-3 border-white rounded-lg hover:bg-[#3AA9D1] flex justify-center items-center z-50"
            >
              REDEEM CODE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
