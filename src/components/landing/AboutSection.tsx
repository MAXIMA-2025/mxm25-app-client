import React from "react";
import backgroundImg from "@/assets/images/hero/ABOUT.webp";
import { Button } from "@/components/ui/button";
import about1 from "@/assets/images/hero/about/about1.webp";
import about2 from "@/assets/images/hero/about/about2.webp";
import about3 from "@/assets/images/hero/about/about3.webp";
import about4 from "@/assets/images/hero/about/about4.webp";
import { useNavigate } from "react-router";
import { Separator } from "@radix-ui/react-menubar";

const AboutSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
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
          <p className="font-futura text-center text-lg md:text-xl text-blue-950 font-medium">
            Malam Ekspresi Mahasiswa merupakan rangkaian acara terbesar di
            Universitas Multimedia Nusantara yang berada di bawah naungan BEM,
            untuk para mahasiswa baru untuk mengenal dan mempelajari organisasi
            yang terdapat di perkuliahan
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
            <img
              src={about1}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:wiggle_7s_ease-in-out_infinite]"
              style={{
                animationName: "wiggle",
                animationDuration: "7s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about2}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:float_9s_ease-in-out_infinite]"
              style={{
                animationName: "float",
                animationDuration: "9s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about3}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:tilt_8s_ease-in-out_infinite]"
              style={{
                animationName: "tilt",
                animationDuration: "8s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about4}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:drift_10s_ease-in-out_infinite]"
              style={{
                animationName: "drift",
                animationDuration: "10s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />
          </div>
          <Button
            className="w-full md:w-1/4"
            variant="clay"
            onClick={handleClick}
          >
            Bergabung Bersama!
          </Button>
        </div>
      </div>
      <style>{`
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg) translateX(0px) translateY(0px); }
  25% { transform: rotate(1deg) translateX(2px) translateY(-1px); }
  50% { transform: rotate(-1deg) translateX(-2px) translateY(1px); }
  75% { transform: rotate(0.5deg) translateX(1px) translateY(0px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

@keyframes tilt {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg) translateX(1px); }
  50% { transform: rotate(-1deg) translateX(-1px); }
  75% { transform: rotate(0.5deg) translateX(0.5px); }
}

@keyframes drift {
  0%, 100% { transform: translateX(0px) translateY(0px); }
  25% { transform: translateX(3px) translateY(-2px); }
  50% { transform: translateX(-3px) translateY(2px); }
  75% { transform: translateX(1px) translateY(-1px); }
}
`}</style>
    </section>
  );
};

export default AboutSection;
