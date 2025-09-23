import React from "react";
import { data } from "src/data";
import Image from "next/image";
import Link from "next/link";

export default function page({ params }: { params: { id: string } }) {
  const item = data.find((d) => d.id === parseInt(params.id))!;
  return (
    <div className="pt-10 container mx-auto">
      <Image src={item?.imageUrl} alt={item?.name} width={400} height={400} className="rounded-lg block mx-auto"></Image>
      <div className="border-2 border-dashed border-gray-500 rounded-lg p-2 mt-10 leading-8">
        <p>
          <strong>Title：</strong>
          {item?.name}
        </p>
        <p>
          <strong>Price：</strong>
          {item?.price}
        </p>
        <p>
          <strong>Desc：</strong>Velit laborum aute commodo fugiat elit mollit ea.Velit aute ad amet in voluptate voluptate id et adipisicing commodo sit aliquip. Tempor sint pariatur exercitation
          officia minim elit adipisicing nostrud aute officia ut laborum. Commodo reprehenderit laboris nulla ex nulla nostrud veniam est consectetur est. Anim deserunt sint duis sint. Et cillum
          mollit voluptate quis dolore qui anim ut ullamco commodo tempor velit dolor minim. Voluptate ea anim est eu nisi irure dolor. Excepteur labore ad magna Lorem id. Id incididunt consequat
          culpa ut do nulla commodo dolore et eiusmod sint. Reprehenderit culpa aliqua labore ea qui cupidatat.
        </p>
      </div>
      <div className="mt-5 mb-5 flex justify-center h-[50px] w-full">
        <Link className="text-xl text-center border-[2px] leading-[50px]  w-[200px] rounded-2xl h-[50px] text-black" href="/routeInterception">
          返回图片列表
        </Link>
      </div>
    </div>
  );
}
