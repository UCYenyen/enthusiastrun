"use client";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import GoogleLogin from "../../auth/GoogleLogin";
import UserProfileButton from "../../auth/UserProfileButton";
import { useSession } from "next-auth/react";
import TextDropdownPanel from "./TextDropdownPanel";
export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed z-100 w-screen bg-background h-[7vh] px-[7.5%] sm:px-[1.5%] flex justify-between items-center border-b-4 border-white shadow-2xl">
      <Link href="/" className="text-white font-impact text-2xl">
        ENTHUSIAST
      </Link>
      <div className="flex flex-col gap-1 md:hidden">
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
      </div>
      <div className="hidden md:flex font-impact text-xl gap-4 justify-center items-center font-regular">
        <TextDropdownPanel
          label="ABOUT"
          items={[
            { item_label: "ENTHUSIAST RUN", item_href: "/about#our-story" },
            { item_label: "JERSEY & MEDAL", item_href: "/about#team" },
            { item_label: "RACE PACK COLLECTION VENUE", item_href: "/about#careers" },
          ]}
        ></TextDropdownPanel>
        <TextDropdownPanel label="REGISTRATION" items={[
          { item_label: "5K RUN", item_href: "/" },
          { item_label: "10K RUN", item_href: "/" },
        ]}></TextDropdownPanel>
        <Link href="/partnership" className="text-white hover:underline">
          PARTNERSHIP
        </Link>
        <Link href="/route" className="text-white hover:underline">
          ROUTE
        </Link>
        <Link href="/contact" className="text-white hover:underline">
          CONTACT
        </Link>
        <div className="flex items-center">
          {status === "loading" ? (
            // placeholder ukuran sama dengan avatar agar layout tidak bergeser
            <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
          ) : session ? (
            <UserProfileButton />
          ) : (
            <GoogleLogin />
          )}
        </div>
      </div>
    </nav>
  );
}
