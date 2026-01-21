"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";

export interface TextDropdownPanelProps {
  label: string;
  items?: Links[];
}

export interface Links{
    item_label: string;
    item_href: string;
}

export default function TextDropdownPanel({label, items} : TextDropdownPanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
        <button
        type="button"
        aria-label={`${label} menu`}
        onClick={() => setOpen((v) => !v)}
        className="flex hover:underline items-center justify-center gap-1"
      >
        {label}
        <RiArrowDropDownLine />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-[9999]">
        {(items || []).map((it, idx) => (
            <Link
                key={it.item_href ?? idx}
                href={it.item_href}
                className="block px-4 py-2 text-sm text-white hover:bg-[#4BCFFC] bg-background"
                onClick={() => setOpen(false)}
            >
                {it.item_label}
            </Link>
        ))}
        </div>
      )}
    </div>
  );
}

export function TextDropdownPanelCallout({label, items} : TextDropdownPanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
        <button
        type="button"
        aria-label={`${label} menu`}
        onClick={() => setOpen((v) => !v)}
        className="flex bg-[#4BCFFC] hover:bg-[#3AA9D1] border-white border-3 rounded-lg px-4 py-2 hover:underline items-center justify-center gap-1"
      >
        {label}
        <RiArrowDropDownLine />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-9999">
        {(items || []).map((it, idx) => (
            <Link
                key={it.item_href ?? idx}
                href={it.item_href}
                className="block px-4 py-2 text-sm text-white hover:bg-[#3AA9D1] bg-[#4BCFFC]"
                onClick={() => setOpen(false)}
            >
                {it.item_label}
            </Link>
        ))}
        </div>
      )}
    </div>
  );
}
