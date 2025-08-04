import React from "react";
import backgroundImg from "../../assets/images/main/WELCOME-01.webp";
import { Button } from "../ui/button";
import Logo from "../../assets/images/logo.png";
import { ArrowDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "../ui/card";
import Front1 from "@/assets/images/main/carousel/FRONT1.webp"
import Front2 from "@/assets/images/main/carousel/FRONT2.webp"
import Front3 from "@/assets/images/main/carousel/DSC_0091 (1).jpg"
import Front4 from "@/assets/images/main/carousel/DSC_0331 (1).jpg"

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
      <div className="flex flex-col-reverse gap-2 justify-center items-center md:flex-row">
        <div className="flex text-shadow-lg flex-col gap-2 z-1 p-5 items-center text-center md:text-start md:items-start">
          <div className="flex flex-col gap-0">
            <h1 className="font-fraunces text-blue-900 font-semibold text-md md:text-lg">
              MAXIMA <span className="text-primary">- 2025 -</span>
            </h1>
            <h1 className="font-fraunces font-semibold text-3xl md:text-4xl">
              Beli tiket konser STATION <br /> sekarang juga!
            </h1>
          </div>
          <div className="font-futura font-medium text-lg ">
            <p className="text-center md:text-start">
              Segera amankan kesempatan untuk bergabung
            </p>
            <p className="text-center md:text-start">
              dengan STATION MAXIMA 2025, starring JAZ!
            </p>
          </div>
          <Button
            className="w-[64%] md:w-[50%] mt-2"
            variant="clay"
            onClick={handleClick}
          >
            Cek STATION <ArrowDown />
          </Button>
        </div>
        <Card className="w-[18%] p-2">
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem>
          <div className="flex items-center justify-center p-1">
            <img
              src={Front4}
              alt="Image"
              width={340}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex items-center justify-center p-1">
            <img
              src={Front2}
              alt="Image"
              width={340}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex items-center justify-center p-1">
            <img
              src={Front1}
              alt="Image"
              width={340}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex items-center justify-center p-1">
            <img
              src={Front3}
              alt="Image"
              width={340}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
        </Card>
        {/* <img className="w-34 z-1 md:w-40" src={Logo} /> */}
      </div>
    </section>
  );
};

export default HeroMain;
