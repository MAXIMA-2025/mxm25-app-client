import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import backgroundImage from "@/assets/images/main/STATION.webp";
import artis from "@/assets/images/main/Poster.webp";
import StationCollage from "@/assets/images/main/carousel/StationCollage.webp";
import LogoStation from "@/assets/images/main/logoRangkaian/LogoSTATION.webp";

interface StationMainProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const StationMain = ({ sectionRef }: StationMainProps) => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyTicketClick = () => {
    nav("/station");
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLihatClick = () =>{
    nav("/tickets");
  }
  return (
    <section
      ref={sectionRef}
      className="min-h-lvh w-full flex flex-col items-center gap-4 justify-center px-2 py-32 sm:px-4 md:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-fit relative">
            <button
              onClick={toggleModal}
              className="absolute z-100 top-2 right-2 p-0.5 bg-white/80 m-2 rounded-full text-gray-600 hover:bg-white hover:text-primary transition-colors hover:cursor-pointer"
            >
              <X size={24} />
            </button>
            <img src={artis} className="w-auto h-90 md:h-120 object-contain p-2 rounded-2xl" alt="Artis" />
          </div>
        </div>
      )}

      {/* Station Content */}
      <div className="flex flex-col lg:flex-row items-center justify-start w-3/4">
        <img className="size-30 lg:size-50 " src={LogoStation} />
        <div className="flex flex-col items-center lg:items-start gap-2 w-3/4 mt-4">
          <h1 className="font-fraunces text-center text-4xl lg:text-start lg:text-6xl font-medium text-shadow-lg">
            STATION
          </h1>
          <h2 className="font-futura font-medium text-xl lg:text-2xl text-center lg:text-start">
            Start To Inspire Your Passion
          </h2>
        </div>
      </div>
      <Card className="font-futura w-3/4 py-2 bg-[#f2ca45] border-7 border-[#90171a] rounded-2xl overflow-hidden">
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
                  organisasi, bazaar, hingga beragam performance dari
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
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-2">
                <Button variant="clay" onClick={handleBuyTicketClick}>
                  Beli Tiket
                  <ArrowRight
                    size={14}
                    className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
                <Button variant="outline" onClick={handleLihatClick}>
                  Lihat Tiket
                  <ArrowRight
                    size={14}
                    className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </div>
            </CardContent>
          </div>
          {/* Right Image Section */}
          <div className="relative flex p-6 md:pl-0 h-full justify-center items-center">
            <img
              onClick={toggleModal}
              className="cursor-pointer absolute h-40 sm:h-60 rounded-md border-3 md:rounded-xl rotate-2 hover:rotate-1 transition-transform border-white shadow-2xl"
              src={artis}
              alt="Guest Star"
            />
            <img className="aspect-auto md:h-78" src={StationCollage} />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default StationMain;
