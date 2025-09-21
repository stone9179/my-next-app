import React from "react";
import Hero from "src/components/hero";
import reliabilityImage from "public/images/3.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "performance Page",
  description: "This is the performance page",
};

export default function page() {
  return <Hero imgUrl={reliabilityImage} content="welcome to performance page" altText="reliabilityImage" />;
}
