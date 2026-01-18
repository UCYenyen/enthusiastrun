import Image from "next/image";
import { HeroCarousel } from "@/components/pages/home/HeroCarousel";
import CalloutSection from "@/components/pages/home/CalloutSection";
import FlagOffSection from "@/components/pages/home/FlagOffSection";
import SponsorSlider from "@/components/pages/home/SponsorSlider";
import RecapVideo from "@/components/pages/home/RecapVideo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enthusiast Foam Run",
  description: "Join the Enthusiast Foam Run! Experience an exciting running event with categories for all levels, from 5K to Half Marathon. Register now and be part of the fun!",
};

export default function Home() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-linear-to-b from-[#2A35BC] to-[#5B4F9E]">
      <div className="h-[7vh]"></div>
      <HeroCarousel />
      <section className="relative flex flex-col overflow-hidden">
        <CalloutSection />
        {/* <FlagOffSection /> */}
      </section>
      {/* <SponsorSlider /> */}
      {/* <RecapVideo /> */}
      {/* <SponsorSlider src="co-sponsors.webp" /> */}
      <Image
        src="/home/recap-foto.webp"
        draggable={false}
        alt="Footer Background"
        width={1920}
        height={1080}
        className="w-full h-full"
      />
    </div>
  );
}
