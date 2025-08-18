import React from "react";
import backgroundImg from "@/assets/images/hero/ABOUT.webp";
import { Button } from "@/components/ui/button";
import about1 from "@/assets/images/hero/about/about1.webp";
import about2 from "@/assets/images/hero/about/about2.webp";
import about3 from "@/assets/images/hero/about/about3.webp";
import about4 from "@/assets/images/hero/about/about4.webp";

const AboutSection = () => {
  return (
    <section className="w-dvw h-[300dvh] flex justify-center items-start pt-64 overflow-hidden relative -top-50 z-10">
      <img
        src={backgroundImg}
        className="absolute h-full inset-0 w-full object-cover z-10 object-top"
        alt="Hero Background"
      />
      <div className="z-20 flex flex-col items-center justify-center">
        <h1
          className="font-fraunces text-center text-4xl font-semibold  drop-shadow-xl mb-4
             [text-shadow:1px_1px_0_white,_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white]"
        >
          Apa itu MAXIMA?
        </h1>
        <div className="backdrop-blur-2xl w-[80%] gap-6 flex flex-col items-center justify-center rounded-2xl p-4 border-4 border-white/60 shadow-2xl">
          <p className="font-futura text-center text-xl text-blue-950 font-medium">
            Malam Ekspresi Mahasiswa atau MAXIMA merupakan rangkaian acara
            terbesar di Universitas Multimedia Nusantara yang berada di bawah
            naungan BEM. Kegiatan ini bertujuan membantu para mahasiswa baru
            untuk dapat mengenal dan mempelajari organisasi yang terdapat di
            dunia perkuliahan.
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
            <img
              src={about1}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white hover:-translate-y-1 transition-transform"
            />
            <img
              src={about2}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white hover:-translate-y-1 transition-transform"
            />
            <img
              src={about3}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white hover:-translate-y-1 transition-transform"
            />
            <img
              src={about4}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white hover:-translate-y-1 transition-transform"
            />
          </div>
          <Button variant="clay">
            Bergabung bersama!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
