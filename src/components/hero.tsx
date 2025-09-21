import React from "react";
import Image, { StaticImageData } from "next/image";

interface IProp {
  imgUrl: StaticImageData;
  altText: string;
  content: string;
}

export default function Hero(prop: IProp) {
  return (
    <div className="text-white h-screen relative">
      <div className="absolute inset-0 -z-10">
        <Image src={prop.imgUrl} alt={prop.altText} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900"></div>
      </div>
      <div className="flex justify-center pt-48">
        <h1 className="text-white text-6xl">{prop.content}</h1>
      </div>
    </div>
  );
}
