'use client'
import React, { useRef, useEffect } from "react";
import LogoLoop from "@/components/LogoLoop";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SponsorSlider({ sponsors }: { sponsors: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoLoopRef = useRef<HTMLDivElement>(null);

  const techLogos = sponsors.map((src) => ({ src, title: "Sponsor Logo", href: "#" }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoLoopRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="shadow-lg relative z-20 w-screen bg-background border-y-4 border-white flex flex-col items-center justify-center gap-8 font-futura min-h-64"
    >
      <div ref={logoLoopRef} className="w-full">
        <LogoLoop logos={techLogos} logoHeight={80} />
      </div>
    </div>
  );
}
