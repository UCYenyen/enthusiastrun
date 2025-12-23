"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlagOffItem from "./FlagOffItem";

gsap.registerPlugin(ScrollTrigger);

export default function FlagOffSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const planetWrapperRef = useRef<HTMLDivElement>(null); // Wrapper untuk parallax
  const planetRef = useRef<HTMLImageElement>(null); // Image untuk floating
  const scytheRef = useRef<HTMLImageElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const flagOffItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Planet parallax animation - pada WRAPPER
      gsap.to(planetWrapperRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Floating animation for planet - pada IMAGE (terpisah dari parallax)
      gsap.to(planetRef.current, {
        y: 20,
        rotation: 5,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Scythe animation
      gsap.from(scytheRef.current, {
        x: -100,
        opacity: 0,
        rotation: -10,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Cloud parallax
      gsap.to(cloudRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Flag off container slide in
      gsap.from(containerRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Flag off items stagger animation
      const flagOffItems = flagOffItemsRef.current?.children;
      if (flagOffItems) {
        gsap.from(flagOffItems, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative items-center min-h-[40rem] justify-center z-1 w-screen bg-linear-to-b from-0% from-[#00C1C0] to-40% to-[#FFF8E1] border-y-4 border-white flex flex-col gap-8 font-bold"
    >
      <div className="absolute w-full h-full bg-linear-to-bl from-[#00CADE] to-[#00CADE]/0"></div>
      <Image
        src={"/home/z-background.svg"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-background-z"
        className="absolute z-1 opacity-75 top-0 left-0 w-full h-auto"
      />
      <Image
        ref={scytheRef}
        src={"/home/rainbow-scythe.svg"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-scythe"
        className="absolute top-0 left-1/4 w-full sm:w-[40%] h-auto opacity-100"
      />
      <Image
        ref={cloudRef}
        src={"/home/cloud.webp"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-cloud"
        className="absolute -bottom-8 left-0 w-full h-auto opacity-100"
      />

      {/* Wrapper untuk parallax, Image di dalam untuk floating */}
      <div
        ref={planetWrapperRef}
        className="absolute top-56 -left-30 sm:top-34 lg:top-0 sm:left-0 w-full sm:w-[40%] h-auto"
      >
        <Image
          ref={planetRef}
          src={"/home/planet.webp"}
          draggable={false}
          width={900}
          height={900}
          alt="enthusiast-planet"
          className="w-full h-auto"
        />
      </div>

      <div
        ref={containerRef}
        className="flex w-[80%] sm:w-[60%] z-5 rounded-lg bg-background border-8 border-white flex-col items-end relative gap-12 py-12 shadow-lg"
      >
        <div ref={flagOffItemsRef} className="w-full flex flex-col items-center p-4 sm:p-0 gap-12">
          <FlagOffItem flagType="10K" flagOffTime="05:30" cutOffTime="02:30:00" />
          <FlagOffItem flagType="5K" flagOffTime="05:45" cutOffTime="01:30:00" />
        </div>
      </div>
    </div>
  );
}
