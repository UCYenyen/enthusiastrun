'use client'
import React, { useRef, useEffect } from "react";
import LogoLoop from "@/components/LogoLoop";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SponsorSlider({ src = "main-sponsors.svg" }: { src?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const logoLoopRef = useRef<HTMLDivElement>(null);

  const techLogos = [
    { src: "/home/calling-out.svg", title: "Enthusiast Logo", href: "#" },
    { src: "/home/calling-out.svg", title: "Enthusiast Logo", href: "#" },
    { src: "/home/calling-out.svg", title: "Enthusiast Logo", href: "#" },
    { src: "/home/calling-out.svg", title: "Enthusiast Logo", href: "#" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        y: -20,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(imageRef.current, {
        y: -2,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

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
      <Image
        ref={imageRef}
        src={`/home/${src}`}
        draggable={false}
        width={900}
        height={900}
        alt="main-sponsors"
        className="absolute -top-6 lg:-top-8 xl:-top-12 w-[80%] sm:w-1/4"
      />
      <div ref={logoLoopRef} className="w-full">
        <LogoLoop logos={techLogos} logoHeight={80} />
      </div>
    </div>
  );
}