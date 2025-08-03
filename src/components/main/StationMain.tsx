import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/asset_home/HOME.webp";
import artis from "@/assets/asset_home/artis_station.webp";

const StationMain = () => {
  return (
    <section
      className="min-h-dvh w-full flex items-center justify-center px-2 py-6 sm:px-4 md:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className=" w-100 sm:w-120 md:w-full lg:w-full xl:w-full max-w-md sm:max-w-l sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl mx-auto bg-[#f2ca45] border-7 border-[#90171a] rounded-2xl overflow-hidden">
        <div className="flex flex-row lg:flex-row">
          {/* Left Content Section */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            <CardHeader className="p-0 space-y-2 sm:space-y-3">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2B2B2B] mb-1 sm:mb-2 leading-tight">
                  Station: Malam Puncak
                </CardTitle>
                <CardDescription className="text-[#2B2B2B] text-sm sm:text-base lg:text-lg leading-relaxed">
                  Tanggal & Waktu pelaksanaan Station:
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
                    Senin, 12 Agustus 2024
                  </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 text-[#2B2B2B]">
                  <div className="bg-white/20 p-1 sm:p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Clock size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">
                    09.00 WIB
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="group bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-1 sm:space-x-2 hover:from-red-700 hover:to-red-900 hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
                <span>Daftar sekarang</span>
                <ArrowRight
                  size={14}
                  className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </CardContent>
          </div>

          {/* Right Image Section */}
          <div className=" flex-1 relative min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[320px] xl:min-h-[350px] flex items-center justify-center">
            <div className="absolute inset-0"></div>

            {/* Artist Image Display */}
            <div className="absolute inset-2 sm:inset-4 flex items-center justify-center">
              <div className="relative max-w-xs sm:max-w-xs md:max-w-sm">
                {/* Image frame */}
                <div className="rounded-lg p-1 w-33 md:w-53 lg:w-63 xl:w-63 sm:p-2 transform rotate-3 sm:rotate-3 md:rotate-3 lg:rotate-3 xl:rotate-3  hover:rotate-0 transition-transform duration-500 shadow-2xl">
                  <div className="w-30 md:w-50 lg:w-60 xl:w-60 lg:h-70 xl:h-80 rounded-md p-4 overflow-hidden bg-gradient-to-br from-red-500 to-purple-600 p-0.5 flex justify-center items-center">
                    <img
                      src={artis}
                      alt="Artist performing"
                      className="w-20 h-45 sm:w-32 sm:h-55 md:w-32 md:h-40 md:h-58 lg:h-67 object-cover rounded"
                    />
                  </div>
                </div>

                {/* Microphone icon */}
                <div className="absolute -right-2 sm:-right-3 md:-right-6 -bottom-2 sm:-bottom-3 md:-bottom-4 bg-white/20 backdrop-blur-sm rounded-full p-1 sm:p-2 md:p-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl">
                    🎤
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base">
                🎶
              </div>
            </div>

            

            {/* Additional decorative elements for larger screens */}
            <div className="hidden lg:block absolute top-1/4 left-2 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
            <div className="hidden lg:block absolute bottom-1/4 left-4 w-2 h-2 bg-red-400/30 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </Card>
    </section>
  )
}

export default StationMain