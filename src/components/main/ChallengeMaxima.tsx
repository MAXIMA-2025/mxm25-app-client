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
import { Badge } from "../ui/badge";
import { Link } from "react-router";

const ChallengeMaxima = () => {
  return (
    <section
      className="relative overflow-hidden min-h-lvh w-full flex flex-col items-center justify-center gap-6 px-4 py-24 sm:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Title & Badge */}
      <div className="flex flex-col items-center text-center z-20 mt-20 md:mb-8">
        <h1
          className="font-fraunces text-4xl md:text-6xl font-semibold drop-shadow-xl
          [text-shadow:2px_1px_0_white,_-2px_-1px_0_white,_2px_-1px_0_white,_-2px_1px_0_white]"
        >
          CHALLENGES
        </h1>
        <Badge className="mt-2 shadow-2xl rounded-4xl px-4">
          <h2 className="font-futura font-medium text-xl lg:text-2xl drop-shadow-2xl">
            Berkreasi bersama MAXIMA!
          </h2>
        </Badge>
      </div>

      {/* Content Area */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start w-full max-w-6xl">
        {/* Card */}
        <Card className="font-futura z-20 drop-shadow-2xl w-full md:w-1/2 py-0 pb-2 bg-gradient-to-r from-white to-yellow-200 border-7 border-[#90171a] rounded-2xl overflow-hidden flex flex-col">
          <div className="flex flex-col h-full">
            <CardHeader className="p-4 sm:p-6 space-y-3">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2B2B2B] leading-tight">
                Berkesempatan untuk mendapatkan SKKM!
              </CardTitle>
              <CardDescription className="text-[#2B2B2B] text-sm sm:text-base lg:text-lg leading-relaxed">
                Belajar bersama MAXLEARN, mengabadikan momen dengan MAXSNAP,
                berkreasi bersama MAXTIVITY, hingga foto bersama teman-temanmu
                di Photobooth! Jangan lewatkan kesempatan ini, MAXIMERS!
              </CardDescription>
            </CardHeader>
            <CardFooter className="px-4 sm:px-6 pb-4 flex flex-col md:flex-row w-full">
              <Link to="/challenges" className="w-full">
                <Button variant="clay" className="w-full md:w-auto">
                  Baca Handbook <ArrowRight />
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>

        {/* Carousel (absolute on the right for md+) */}
        <div className="hidden md:block absolute md:right-24 lg:right-42 bottom-1/5 -translate-y-1/2">
          <CardSwap
            width={260}
            height={340}
            skewAmount={2.5}
            cardDistance={120}
            verticalDistance={-20}
            delay={5000}
            easing="elastic"
          >
            <Cardrousel>
              <img
                src={Maxlearn}
                className="rounded-2xl border-4 border-white"
              />
            </Cardrousel>
            <Cardrousel>
              <img
                src={Maxsnap}
                className="rounded-2xl border-4 border-white"
              />
            </Cardrousel>
            <Cardrousel>
              <img
                src={Maxtivity}
                className="rounded-2xl border-4 border-white"
              />
            </Cardrousel>
            <Cardrousel>
              <img
                src={Photobooth}
                className="rounded-2xl border-4 border-white"
              />
            </Cardrousel>
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default ChallengeMaxima;
