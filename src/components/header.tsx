"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const linkData = [
  { href: "/performance", label: "Performance" },
  { href: "/reliability", label: "Reliability" },
  { href: "/scale", label: "Scale" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="fixed w-full z-10">
      <div className="flex gap-4 p-8 justify-between container mx-auto text-white">
        <Link className="text-3xl" href="/">
          Home
        </Link>
        <div className="flex gap-4 text-xl">
          {linkData.map((link) => (
            <Link key={link.href} className={pathname === link.href ? "text-purple-500" : ""} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
