'use client'
import React from 'react'
import { signIn } from 'next-auth/react';
export default function GoogleLogin() {
  return (
    <button
      type="button"
      aria-label="Sign in"
      className="w-full flex justify-end rounded-lg bg-[#4BCFFC] border-white border-3 items-center whitespace-nowrap px-2 py-1"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in
    </button>
  )
}
