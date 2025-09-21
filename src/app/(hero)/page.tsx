import HomeImage from "public/images/1.jpg";
import Hero from "src/components/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};

export default function Home() {
  return <Hero imgUrl={HomeImage} content="welcome to Home" altText="homepage" />;
}
