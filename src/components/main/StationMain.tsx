import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/asset_station/station_bg_desktop.webp";
import artis from "@/assets/images/main/FEEDS.webp";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import Front1 from "@/assets/images/main/carousel/FRONT1.webp"
import Front2 from "@/assets/images/main/carousel/FRONT2.webp"
import Front3 from "@/assets/images/main/carousel/DSC_0091 (1).jpg"
import Front4 from "@/assets/images/main/carousel/DSC_0331 (1).jpg"

interface StationMainProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const StationMain = ({ sectionRef }: StationMainProps) => {
  const nav = useNavigate();
  const handleBuyTicketClick = () => {
    nav("/station");
  };
  return (
    <section
      ref={sectionRef}
      className="min-h-dvh w-full flex flex-col items-center gap-4 justify-center px-2 py-6 sm:px-4 md:px-8 bg-cover bg-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="flex flex-col gap-2 w-3/4">
        <h1 className="font-fraunces text-6xl font-medium text-shadow-lg">
          STATION
        </h1>
        <h2 className="font-futura font-medium text-2xl">
          Start To Inspire Your Passion
        </h2>
      </div>
      <Card className="font-futura w-4/5 sm:w-3/4 lg:w-4/5 py-2 bg-[#f2ca45] border-7 border-[#90171a] rounded-2xl overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row">
          {/* Left Content Section */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            <CardHeader className="p-0 space-y-2 sm:space-y-3">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2B2B2B] mb-1 sm:mb-2 leading-tight">
                  STARRING: JAZ
                </CardTitle>
                <CardDescription className="text-[#2B2B2B] text-sm sm:text-base lg:text-lg leading-relaxed">
                  Ikuti STATION MAXIMA 2025 untuk menyaksikan pameran
                  organisasi, bazaar, foodtruck, hingga beragam performance dari
                  UKM dan guest star kita!
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0 mt-2 sm:mt-3 lg:mt-4">
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-[#2B2B2B]">
                  <div className="bg-white/20 p-1 sm:p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Calendar size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">
                    Sabtu, 23 Agustus 2025
                  </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 text-[#2B2B2B]">
                  <div className="bg-white/20 p-1 sm:p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Clock size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">
                    14.00 WIB
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex gap-2 lg:gap-2">
                <Button
                  variant="clay"
                  onClick={handleBuyTicketClick}
                  className=""
                >
                  Beli sekarang
                  <ArrowRight
                    size={14}
                    className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
                {/* <button className="group bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-1 sm:space-x-2 hover:from-red-700 hover:to-red-900 hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
                </button> */}
                <Button variant="outline">
                  <span>Lihat tiket</span>
                </Button>
                {/* <button disabled className="opacity-50 group bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-1 sm:space-x-2 hover:from-red-700 hover:to-red-900 hover:shadow-xl transition-all duration-300 transform shadow-lg w-full sm:w-auto">
              </button> */}
              </div>
            </CardContent>
          </div>
          <div className="relative right-11 xs:right-8 sm:right-10 md:right-15 lg:right-35 xl:right-0 sm:ml-20 sm:mb-5 mb-20 w-[45%] h-30 md:w-[45%] md:h-32 md:mb-50 lg:w-[50%] lg:h-64 lg:my-0 lg:mb-0 py-2">
                <img src={Front2} className="h-[90px] sm:h-[240px] aspect-square absolute mt-8 ml-12 sm:ml-10 -rotate-2 border-6 rounded-xl border-white shadow-2xl transition-transform hover:-rotate-1"/>
                <img src={Front1} className="h-[70px] w-[100px] sm:h-[160px] sm:w-[300px] absolute mt-22 ml-12 sm:ml-10 sm:mt-35 sm:ml-2 -rotate-4 border-6 rounded-xl border-white shadow-2xl transition-transform hover:rotate-1"/>
                <img src={Front3} className="h-[110px] sm:h-[260px] absolute mt-10 sm:mt-6 ml-60 sm:ml-70 rotate-5 border-6 rounded-xl border-white shadow-2xl transition-transform hover:rotate-2"/>
                <img src={artis} className=" h-[180px] sm:h-[300px]  absolute mt-2 ml-30 border-6 rounded-xl border-white shadow-2xl  transition-transform hover:rotate-2"/>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default StationMain;
