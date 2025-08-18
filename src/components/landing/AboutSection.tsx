import React from "react";
import backgroundImg from "@/assets/images/hero/ABOUT.webp";
import { Button } from "@/components/ui/button";
import about1 from "";

const AboutSection = () => {
  return (
    <section className="w-dvw h-[300dvh] flex justify-center items-start pt-64 overflow-hidden relative -top-50 z-10">
      <img
        src={backgroundImg}
        className="absolute h-full inset-0 w-full object-cover z-10 object-top"
        alt="Hero Background"
      />
      <div className="z-20">
        <div className="backdrop-blur-2xl w-full rounded-2xl p-4">
          <h1 className="font-fraunces text-4xl font-semibold">Apa itu MAXIMA?</h1>
          <div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
