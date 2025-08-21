import React from "react";
import backgroundImage from "@/assets/asset_maxlearn/BACKGROUND CHALLENGE STATION.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Maxlearn from "@/assets/asset_maxlearn/HANDBOOK MAXLEARN.png";
import Maxsnap from "@/assets/asset_maxlearn/HANDBOOK MAXSNAP.png";
import Photobooth from "@/assets/asset_maxlearn/Photobooth Challenge .png";
import Maxtivity from "@/assets/asset_maxlearn/HANDBOOK MAXTIVITY.png";
import CardSwap, { Card as Cardrousel } from "./CardSwap/CardSwap";

const ChallengeMaxima = () => {
  return (
    <section
      className="min-h-lvh w-full flex flex-col items-center gap-4 justify-center px-2 py-32 sm:px-4 md:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-start w-3/4">
        {/* <img className="size-30 lg:size-50 " src={LogoStation} /> */}
        <div className="flex flex-col items-center lg:items-start gap-2 w-3/4 mt-4">
          <h1 className="font-fraunces text-center text-4xl lg:text-start lg:text-6xl font-medium text-shadow-lg">
            CHALLENGES
          </h1>
          <h2 className="font-futura font-medium text-xl lg:text-2xl text-center lg:text-start">
            Berkreasi bersama MAXIMA!
          </h2>
        </div>
      </div>
  <Card className="font-futura w-1/2 py-2 bg-gradient-to-r from-white to-yellow-200 border-7 border-[#90171a] rounded-2xl overflow-hidden flex flex-col">
    <div className="flex flex-col-reverse lg:flex-row h-full">
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        <CardHeader className="p-0 space-y-2 sm:space-y-3">
          <div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2B2B2B] mb-1 sm:mb-2 leading-tight">
              Berkesempatan untuk mendapatkan SKKM!
            </CardTitle>
            <CardDescription className="text-[#2B2B2B] text-sm sm:text-base lg:text-lg leading-relaxed">
              Belajar bersama MAXLEARN, mengabadikan momen dengan MAXSNAP,
              berkreasi bersama MAXTIVITY, hingga foto bersama
              teman-temanmu di Photobooth! Jangan lewatkan kesempatan ini,
              MAXIMERS!
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="px-0 flex flex-col md:flex-row">
          <Button variant="clay">
            Baca Handbook <ArrowRight />
          </Button>
        </CardFooter>
      </div>
    </div>
  </Card>

  {/* Right Section */}
  <div className="w-1/2 h-[500px] relative">
    <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
      <Cardrousel>
        <h3>Cardrousel 1</h3>
        <p>Your content here</p>
      </Cardrousel>
      <Cardrousel>
        <h3>Cardrousel 2</h3>
        <p>Your content here</p>
      </Cardrousel>
      <Cardrousel>
        <h3>Cardrousel 3</h3>
        <p>Your content here</p>
      </Cardrousel>
    </CardSwap>
</div>

    </section>
  );
};

export default ChallengeMaxima;
