

import Image from "next/image";
import Hero from "./(home)/_components/herong";
import HeroCartWrapper from "./(home)/_components/herrocartwrapper";
import ParallaxText from "./(home)/_components/ParallaxText";
import "./styles.css";
import { motion } from "framer-motion";
import NexventHeroText from "./(home)/_components/nexventhero";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-darkblue/35 to-lightpurplered/20 bg-cover bg-center">
      <div className="relative -top-5">
        <ParallaxText baseVelocity={-3} maindiv="parallax">Nexvent</ParallaxText>
      </div>
      <NexventHeroText />
      <div className="relative -top-80 w-full">
        <ParallaxText baseVelocity={2} maindiv="parallax">the next gen Event.</ParallaxText>
        <p className="bg-white h-1 w-full"></p>
      </div>
      <p className="relative -top-56 w-full px-12 text-[32px] font-extrabold text-white">TOP VENT</p>
      <HeroCartWrapper />
      <div className="relative ">
        <ParallaxText baseVelocity={-3} maindiv="parallaxmedium"> NEXVENT.NEXVENT.NEXVENT. </ParallaxText>
      </div>
    </main>
  );
}
