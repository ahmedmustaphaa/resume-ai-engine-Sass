import Image from "next/image";
import Hero from "./pages/Hero";
import BgColor from "./pages/BgColor";
import MainBanner from "./pages/MainBanner";
import Testimonial from "./pages/Testimonial";

export default function Home() {
  return (
    <div className="">
    
         <Hero/>
         <MainBanner/>
         <Testimonial/>

    </div>
  );
}
