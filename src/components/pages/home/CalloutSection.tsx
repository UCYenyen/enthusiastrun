'use server'

import Image from "next/image";
import Link from "next/link";

export default async function CalloutSection() {
  return (
    <div
      className="sm:p-8 shadow-lg relative z-2 w-screen bg-background border-y-4 border-white flex flex-col py-[10%] items-center sm:items-start gap-8 font-impact"
    >
      <Image
        src={"/home/rainbow-bolt.webp"}
        draggable={false}
        width={900}
        height={900}
        alt="enthusiast-bolt"
        className="absolute hidden sm:inline-block right-0 top-[15%] w-[15%] h-auto"
      />
      <div
        className="flex flex-col gap-2 text-center sm:text-start items-center sm:items-start"
      >
        <h1 className="text-4xl w-[80%] sm:w-full">ARE YOU READY FOR ENTHUSIAST?</h1>
        <h3 className="text-xl text-[#9ED486]">3 MEI 2026</h3>
      </div>
      <div className="flex flex-col gap-1 items-center sm:items-start">
        <h3 className="about text-2xl w-[80%] font-futura text-center sm:text-justify">
          {" "}
          <span className="about font-bold">Enthusiast is an annual event held by Ciputra University Surabaya under the Student Organization Department of the Student Union IBM. This event serves as a platform for everyone to embrace an active lifestyle while enjoying a fun and unique running experience through foam-filled courses.</span>
          <br/>
          <br />
          <span className="about font-bold">
            The purpose of this website is to allow participants to join the Enthusiast. Log in to secure your spot, view race routes, and manage your registration details.</span>
          <br/>
          <br />
          <span>To maintain the integrity, Enthusiast web uses Google OAuth (Google Sign-In) specifically to ensure that all registered participants are using a valid email. We use your Google profile information (name and email) solely for identity verification and registration management. Your data is used internally and will not be shared with any third parties.</span>
          <br/>
          <br />
        </h3>
        <a className="about text-2xl w-[80%] font-futura text-center sm:text-justify" href="https://new.enthusiastrun.com/privacy-policy">See the privacy policy here</a>
        <Link href={"/privacy-policy"} className="text-xl text-white underline font-impact">Privacy Policy</Link>
      </div>
      <div className="flex gap-1 flex-col w-[80%] items-center sm:items-start">
        <h3  className="text-xl font-futura text-center sm:text-justify">
          Click the button below to view more informations{" "}
        </h3>
        <h3  className="text-xl font-futura font-bold text-justify">
          {"Let's"} run, splash, and have fun!
        </h3>
      </div>
      <Link
        // ref={buttonRef}
        href="/about"
        className="bg-[#4BCFFC] border-2 hover:bg-[#3AA9D1] border-white px-4 py-2 rounded-lg w-fit text-white"
      >
        SEE MORE
      </Link>
    </div>
  );
}
