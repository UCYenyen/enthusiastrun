import React from "react";
import Image from "next/image";
import UserNotRegisteredToCompetition from "@/components/pages/dashboard/UserNotRegisteredToCompetition";
import { getUserRegistration } from "@/lib/registration";
import { getServerSession } from "next-auth/next";
import UserNotLoggedIn from "@/components/auth/UserNotLoggedIn";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Enthusiast Run - enthusiastrun.com",
  description: "Access your personal dashboard for Enthusiast Run Vol. 2. Manage your registration, view your racepack QR code, and stay updated with the latest event information and announcements.",
};


export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return <UserNotLoggedIn />;
  }

  const isRegistered = await getUserRegistration(session.user.id);
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
          {!isRegistered ? (
            <UserNotRegisteredToCompetition />
          ) : (
            <div className="mt-[2.5%] flex flex-col gap-4 items-center text-center sm:text-start">
              <h1 className="text-4xl w-[90%] text-center sm:w-full">
                WELCOME TO YOUR DASHBOARD!
              </h1>
              <h3 className="text-xl w-[80%] font-futura text-justify max-h-[250px] overflow-y-auto">
                Thank you for registering for Enthusiast Run 2025! We're excited
                to have you on board for an unforgettable experience filled with
                fun, fitness, and community spirit. Stay tuned for more updates
                and get ready to run with enthusiasm!
              </h3>
              <h1 className="text-4xl w-[90%] text-center sm:w-full">
                RACEPACK QR-CODE!
              </h1>
              <Image
                src={
                  isRegistered.qrCodeUrl || "/home/enthusiast-text-logo.webp"
                }
                unoptimized
                alt={`Racepack ${isRegistered.fullName} QR Code`}
                width={200}
                height={200}
              />
              {isRegistered.qrCodeUrl ? (
                <Link
                  href="/about"
                  className="bg-[#4BCFFC] border-2 hover:bg-[#3AA9D1] border-white px-6 py-2 rounded-lg w-fit text-white"
                >
                  JOIN GROUP WA
                </Link>
              ) : (
                <div className="bg-red-500 border-2 border-white px-6 py-2 rounded-lg w-fit text-white">
                  RACEPACK QR CODE NOT AVAILABLE YET, PLEASE CHECK BACK IN
                  MAX 3x24 JAM
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
