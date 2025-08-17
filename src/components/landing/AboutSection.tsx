import React from "react";
import backgroundImg from "@/assets/images/hero/ABOUT.webp";

const AboutSection = () => {
  return (
    <section className="w-dvw h-dvh flex justify-center items-center overflow-hidden relative -top-30 z-10">
      <img
        src={backgroundImg}
        className="absolute inset-0 w-full object-cover z-10"
        alt="Hero Background"
      />
    </section>
  );
};

export default AboutSection;
