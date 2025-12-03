"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CalloutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const boltRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Description animation
      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Button animation
      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Bolt image animation
      gsap.from(boltRef.current, {
        x: 100,
        opacity: 0,
        rotation: 15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating animation for bolt
      gsap.to(boltRef.current, {
        y: -15,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="sm:p-8 shadow-lg relative z-2 w-screen bg-background border-y-4 border-white flex flex-col py-[10%] items-center sm:items-start gap-8 font-impact"
    >
      <Image
        ref={boltRef}
        src={"/home/rainbow-bolt.webp"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-bolt"
        className="absolute hidden sm:inline-block right-0 top-[15%] w-[15%] h-auto"
      />
      <div
        ref={titleRef}
        className="flex flex-col gap-2 text-center sm:text-start"
      >
        <h1 className="text-4xl">ARE YOU READY FOR FOAM RUN ENTHUSIAST RUN?</h1>
        <h3 className="text-xl text-[#9ED486]">3 MEI 2026</h3>
      </div>
      <div className="flex flex-col gap-1">
        <h3
          ref={descRef}
          className="text-xl w-[80%] font-bold font-futura text-justify"
        >
          Bersiaplah! Saatnya bergabung dalam gelombang energi dan keseruan di
          Enthusiast Foam Run Vol. 2!
        </h3>
        <h3 ref={descRef} className="text-xl w-[80%] font-futura text-justify">
          {" "}
          Ayo raih langkah baru, tembus batas diri, dan rasakan pengalaman lari
          penuh busa yang paling seru di Universitas Ciputra Surabaya, Citraland
          Surabaya! Sudah siap Break the Limits bersama Enthusiast Vol. 2?
        </h3>
      </div>
      <div className="flex gap-1 flex-col w-[80%">
        <h3 ref={descRef} className="text-xl ] font-futura text-justify">
          Klik tombol di bawah ini dan temukan semua informasi lengkapnya{" "}
        </h3>
        <h3 ref={descRef} className="text-xl font-futura font-bold text-justify">
          {"Let's"} run, splash, and have fun!
        </h3>
      </div>
      <Link
        ref={buttonRef}
        href="/about"
        className="bg-[#4BCFFC] border-2 hover:bg-[#3AA9D1] border-white px-4 py-2 rounded-lg w-fit text-white"
      >
        SEE MORE
      </Link>
    </div>
  );
}
