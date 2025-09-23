"use client";
import React from "react";
import { data } from "src/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const item = data.find((d) => d.id === parseInt(params.id))!;
  const router = useRouter();
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500[.8]" onClick={router.back}>
      <Image src={item.imageUrl} alt={item.name} height={500} width={500} className="rounded-lg" onClick={(e) => e.stopPropagation()}></Image>
    </div>
  );
}
