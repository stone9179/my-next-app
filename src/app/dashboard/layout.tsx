"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  console.log("dashboard layout", pathname);
  return (
    <div className="border-2 border-dashed p-4 border-black w-1/2 mx-auto mt-10">
      <div className="flex gap-4 mb-4 font-bold text-lg ">
        <Link href="/dashboard/about" className={pathname === "/dashboard/about" ? "text-purple-600" : ""}>
          About
        </Link>
        <Link href="/dashboard/settings" className={pathname === "/dashboard/settings" ? "text-purple-600" : ""}>
          settings
        </Link>
      </div>
      <h2>Dashboard Layout {count}</h2>
      <button className="bg-black text-white p-2 my-4 rounded-md" onClick={() => setCount((v) => v + 1)}>
        Increment
      </button>
      {children}
    </div>
  );
}
