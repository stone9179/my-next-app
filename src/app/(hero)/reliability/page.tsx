import React from "react";
import Hero from "src/components/hero";
import reliabilityImage from "public/images/3.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "reliability Page",
  description: "This is the reliability page",
};

export default function page() {
  return <Hero imgUrl={reliabilityImage} content="welcome to reliability page" altText="reliabilityImage" />;
}
