import React from "react";
import Hero from "src/components/hero";
import ScaleImage from "public/images/2.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "scale Page",
  description: "This is the scale page",
};

export default function page() {
  return <Hero imgUrl={ScaleImage} content="welcome to scale page" altText="ScaleImage" />;
}
