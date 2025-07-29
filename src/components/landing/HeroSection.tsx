import React from "react";
import { Button } from "../ui/button";
import Logo from "../../assets/images/logo.png"
import HeroBackground from "../../assets/images/hero/BACKGROUND.png";
import HeroForegroundLeft from "../../assets/images/hero/FOREGROUND1.png"
import HeroForegroundRight from "../../assets/images/hero/FOREGROUND2.png"

const HeroSection = () => {
  return (
    <section className="w-dvw h-dvh flex justify-center items-center overflow-hidden relative">
        <img 
          src={HeroBackground} 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          alt="Hero Background"
        />
        <img 
          src={HeroForegroundLeft} 
          className="absolute inset-0 w-full h-full object-cover z-0 -left-44 hidden md:block" 
          alt="Hero Foreground Maxi"
        />
        <img 
          src={HeroForegroundRight} 
          className="absolute right-0 md:-right-44 top-0 w-full h-full object-cover z-0 " 
          alt="Hero Foreground Xima"
        />
      <div className="flex flex-col-reverse justify-center items-center md:flex-row">
        <div className="flex flex-col gap-2 z-1 p-5 items-center text-center md:text-start md:items-start">
          <h1 className="font-fraunces font-semibold text-3xl md:text-4xl">
            Explore with Curiosity,<br/> Discover the Mistery!
          </h1>
          <div className="font-futura font-medium text-lg ">
            <p className="text-center md:text-start">Kenali kegiatan-kegiatan di UMN bersama MAXIMA 2025</p>
            <p className="text-center md:text-start">Yuk, kita menjelajah bersama-sama!</p>
          </div>
          <Button className="w-[64%] md:w-[50%] mt-2" variant="clay">Jelajahi Bersama!</Button>
        </div>
        <img className="w-34 z-1 md:w-40" src={Logo}/>
      </div>
    </section>
  );
};

export default HeroSection;
