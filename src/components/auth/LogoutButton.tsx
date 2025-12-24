"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      className="block px-4 py-2 text-sm text-white hover:bg-[#4BCFFC] bg-background w-full text-start" 
      onClick={() => signOut({ 
        callbackUrl: "/", // Arahkan ke home setelah logout
        redirect: true 
      })}
    >
      Logout
    </button>
  );
}