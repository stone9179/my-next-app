import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-[url(public/images/1.jpg)] object-cover min-h-screen flex flex-col ">
      <div className="text-white h-50 w-full flex p-10 gap-10 text-[20px]">
        <Link href="/routeInterception">路由拦截</Link>
        <Link href="/table/list">表格</Link>
      </div>
    </div>
  );
}
