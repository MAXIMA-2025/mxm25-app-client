import React from "react";
import backgroundImg from "../../assets/images/main/WELCOME-01.webp";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import StationCollage from "@/assets/images/main/carousel/StationCollage.webp";

interface HeroMainProps {
  scrollToRef: React.RefObject<HTMLElement>;
}

const HeroMain: React.FC<HeroMainProps> = ({ scrollToRef }) => {
  const handleClick = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      className="min-h-screen w-full bg-white flex flex-col gap-4 items-center justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col-reverse gap-2 justify-center items-start md:ml-16 md:flex-row">
        <div className="p-4 flex text-shadow-lg flex-col gap-2 items-center text-center md:text-start md:items-start">
          <div className="flex flex-col gap-0">
            <h1 className="font-fraunces text-blue-900 font-semibold text-md md:text-lg">
              MAXIMA <span className="text-primary">- 2025 -</span>
            </h1>
            <h1 className="font-fraunces font-semibold text-2xl md:text-4xl">
              Beli tiket STATION
            </h1>
            <h2 className="font-fraunces font-semibold text-2xl md:text-4xl">
              sekarang juga!
            </h2>
          </div>
          <div className="font-futura font-medium text-lg ">
            <p className="text-center md:text-start">
              Amankan kesempatan untuk bergabung
            </p>
            <p className="text-center md:text-start">
              dengan MAXIMA 2025, starring JAZ!
            </p>
          </div>
          <Button className="mt-2 z-50" variant="clay" onClick={handleClick}>
            Cek STATION <ArrowDown />
          </Button>
        </div>
        <div className="flex w-full md:w-80 md:m-auto items-center justify-center">
          <img src={StationCollage} className="h-56 md:h-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
