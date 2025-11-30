import Image from "next/image";
import { HeroCarousel } from "@/components/pages/home/HeroCarousel";
import CalloutSection from "@/components/pages/home/CalloutSection";
import FlagOffSection from "@/components/pages/home/FlagOffSection";
import SponsorSlider from "@/components/pages/home/SponsorSlider";
import RecapVideo from "@/components/pages/home/RecapVideo";
export default function Home() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-linear-to-b from-[#2A35BC] to-[#5B4F9E]">
      <div className="h-[7vh]"></div>
      <HeroCarousel />
      <section className="relative flex flex-col overflow-hidden">
        <CalloutSection />
        <FlagOffSection />
      </section>
      <SponsorSlider />
      <RecapVideo />
      <SponsorSlider src="co-sponsors.webp"/>
      <div className="min-h-screen w-screen"></div>
    </div>
  );
}
