import React from "react";
import FooterBg1 from "@/assets/images/footer/FOOTER MAXIMA1-01.png";
import FooterBg2 from "@/assets/images/footer/footer maxima-02.png";
import FooterBg3 from "@/assets/images/footer/FOOTER MAXIMA1-03.png";
import FooterBg4 from "@/assets/images/footer/FOOTER MAXIMA1-04.png";
import LogoSponsor from "@/assets/images/footer/LOGO SPONSOR.png";
import Medpar from "@/assets/images/footer/MEDPAR-01.png";
import MaximaLogo from "@/assets/images/logo.png";
import InstagramIcon from "@/assets/images/footer/Instagram.png";
import LineIcon from "@/assets/images/footer/Line.png";
import YoutubeIcon from "@/assets/images/footer/Youtube.png";
import TiktokIcon from "@/assets/images/footer/Tiktok.png";

const FooterSection: React.FC = () => {
  return (
    <footer
      className="relative w-full min-h-[700px] bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${FooterBg2}), url(${FooterBg1})`,
        backgroundPosition: "top center, bottom center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% 100%, 100% 100%",
      }}
    >
      {/* Hiasan Kiri */}
      <img
        src={FooterBg3}
        alt=""
        className="
          absolute left-[0%] bottom-0 object-fill pointer-events-none
          w-[120%] h-[100%]
          sm:w-[120%] sm:h-[100%]
          md:w-[110%] md:h-[100%]
          lg:w-[110%] lg:h-[100%]
          xl:w-[100%] xl:h-[100%]
          2xl:w-[100%] 2xl:h-[100%]
        "
      />

      {/* Hiasan Kanan */}
      <img
        src={FooterBg4}
        alt=""
        className="
          absolute right-[0%] bottom-0 object-fill pointer-events-none
          w-[120%] h-[100%]
          sm:w-[120%] sm:h-[100%]
          md:w-[110%] md:h-[100%]
          lg:w-[110%] lg:h-[100%]
          xl:w-[100%] xl:h-[100%]
          2xl:w-[100%] 2xl:h-[100%]
        "
      />

      {/* Sponsor & Medpar Wrapper */}
      <div
        className="
          absolute top-[4%] left-0 w-full
          flex flex-col items-center gap-2
          xs:gap-3 sm:gap-4 md:gap-5
          lg:flex-row lg:justify-center lg:gap-[12%] lg:px-[4%]
          xl:gap-[15%] xl:px-[5%]
          2xl:gap-[17%] 2xl:px-[6%]
        "
      >
        {/* Logo Sponsor */}
        <div className="w-[40%] xs:w-[45%] sm:w-[35%] md:w-[25%] lg:w-[45%] xl:w-[40%] 2xl:w-[40%] flex flex-col items-center order-1 lg:order-1">
          <span className="font-lexend font-bold text-[3vw] xs:text-[2.8vw] sm:text-[2.5vw] md:text-[2.2vw] lg:text-[1.8vw] xl:text-[1.6vw] 2xl:text-[1.4vw] text-[#8B4513] mb-1 text-center whitespace-nowrap">
            Sponsored By
          </span>
          <img
            src={LogoSponsor}
            alt="Sponsor"
            className="w-full h-auto object-fill"
          />
        </div>

        {/* Medpar */}
        <div className="w-[40%] xs:w-[45%] sm:w-[35%] md:w-[25%] lg:w-[45%] xl:w-[40%] 2xl:w-[40%] flex flex-col items-center order-2 lg:order-2">
          <span className="font-lexend font-bold text-[3vw] xs:text-[2.8vw] sm:text-[2.5vw] md:text-[2.2vw] lg:text-[1.8vw] xl:text-[1.6vw] 2xl:text-[1.4vw] text-[#8B4513] mb-1 text-center whitespace-nowrap">
            Media Partners
          </span>
          <img
            src={Medpar}
            alt="Medpar"
            className="w-full h-auto object-fill"
          />
        </div>
      </div>

      {/* Location Section */}
      <div
        className="absolute bottom-[14%] left-[10%] w-[30%]
                   sm:bottom-[14%] sm:left-[10%] sm:w-[32%]
                   md:bottom-[14%] md:left-[10%] md:w-[28%]
                   lg:bottom-[13%] lg:left-[10%] lg:w-[25%]
                   xl:bottom-[13%] xl:left-[10%] xl:w-[23%]
                   2xl:bottom-[13%] 2xl:left-[12%] 2xl:w-[20%]
                   flex flex-col items-start"
      >
        <span className="font-lexend font-bold text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.8vw] xl:text-[1.5vw] 2xl:text-[1.2vw] text-[#6B184E] mb-1">
          Location
        </span>
        <span className="font-lexend font-normal text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1vw] text-black leading-snug">
          Universitas Multimedia Nusantara
          <br />
          Jl. Scientia Boulevard, Gading Serpong,
          <br />
          Tangerang, Banten 15811
        </span>
      </div>

      {/* Logo MAXIMA */}
      <div
        className="absolute bottom-[14%] left-[50%] transform -translate-x-1/2
                   sm:bottom-[15%]
                   md:bottom-[16%]
                   lg:bottom-[18%]
                   xl:bottom-[18%]
                   2xl:bottom-[15%]"
      >
        <img
          src={MaximaLogo}
          alt=""
          className="w-[15vw] sm:w-[12vw] md:w-[10vw] lg:w-[8vw] xl:w-[7vw] 2xl:w-[6vw] h-auto object-contain"
        />
      </div>

      <div
        className="absolute bottom-[8%] left-[50%] transform -translate-x-1/2 w-max
                   sm:bottom-[8%]
                   md:bottom-[9%]
                   lg:bottom-[11%]
                   xl:bottom-[11%]
                   2xl:bottom-[7%]"
      >
        <span className="font-lexend font-bold text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.8vw] xl:text-[1.5vw] 2xl:text-[1.2vw] leading-none tracking-normal text-black text-center">
          Made by Nexus MAXIMA 2025
        </span>
      </div>

      {/* MEDSOS */}
      <div
        className="absolute bottom-[14%] right-[2%]
                   sm:bottom-[15%] sm:right-[2%]
                   md:bottom-[15%] md:right-[8%]
                   lg:bottom-[12%] lg:right-[8%]
                   xl:bottom-[12%] xl:right-[10%]
                   2xl:bottom-[7%] 2xl:right-[14%]
                   flex flex-col gap-4"
      >
        {/* LINE */}
        <div className="flex items-center gap-2">
          <img
            src={LineIcon}
            alt=""
            className="w-[10%] h-[5%]
                       xs:w-[10%] xs:h-[5.5%]
                       sm:w-[10%] sm:h-[6%]
                       md:w-[10%] md:h-[7%]
                       lg:w-[13%] lg:h-[8%]
                       xl:w-[13%] xl:h-[9%]
                       2xl:w-[13%] 2xl:h-[10%]
                       object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md">
            @maxima_umn
          </span>
        </div>

        {/* INSTAGRAM */}
        <div className="flex items-center gap-2">
          <img
            src={InstagramIcon}
            alt=""
            className="w-[10%] h-[5%]
                       xs:w-[10%] xs:h-[5.5%]
                       sm:w-[10%] sm:h-[6%]
                       md:w-[10%] md:h-[7%]
                       lg:w-[13%] lg:h-[8%]
                       xl:w-[13%] xl:h-[9%]
                       2xl:w-[13%] 2xl:h-[10%]
                       object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md">
            @maxima_umn
          </span>
        </div>

        {/* TIKTOK */}
        <div className="flex items-center gap-2">
          <img
            src={TiktokIcon}
            alt=""
            className="w-[10%] h-[5%]
                       xs:w-[10%] xs:h-[5.5%]
                       sm:w-[10%] sm:h-[6%]
                       md:w-[10%] md:h-[7%]
                       lg:w-[13%] lg:h-[8%]
                       xl:w-[13%] xl:h-[9%]
                       2xl:w-[13%] 2xl:h-[10%]
                       object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md">
            @maxima_umn
          </span>
        </div>

        {/* YOUTUBE */}
        <div className="flex items-center gap-2">
          <img
            src={YoutubeIcon}
            alt=""
            className="w-[10%] h-[5%]
                       xs:w-[10%] xs:h-[5.5%]
                       sm:w-[10%] sm:h-[6%]
                       md:w-[10%] md:h-[7%]
                       lg:w-[13%] lg:h-[8%]
                       xl:w-[13%] xl:h-[9%]
                       2xl:w-[13%] 2xl:h-[10%]
                       object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md">
            @maxima_umn
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;