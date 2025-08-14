import React from 'react';
import FooterMaxima from '@/assets/images/footer/footer maxima-01.png';
import LogoSponsor from '@/assets/images/footer/LOGO SPONSOR.png';
import Medpar from '@/assets/images/footer/MEDPAR-01.png';
import MaximaLogo from '@/assets/images/logo.png';
import InstagramIcon from '@/assets/images/footer/Instagram.png';
import LineIcon from '@/assets/images/footer/Line.png';
import YoutubeIcon from '@/assets/images/footer/Youtube.png';
import TiktokIcon from '@/assets/images/footer/Tiktok.png';

const FooterSection: React.FC = () => {
  return (
    <footer
      className="relative w-full h-screen overflow-hidden bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${FooterMaxima})`,
        backgroundSize: '100% 100%',
      }}
    >
      <div
        className="absolute top-[10%] left-[4%] w-[42%]
                   sm:left-[5%] sm:w-[40%]
                   md:left-[6%] md:w-[38%]
                   lg:left-[7%] lg:w-[36%]
                   xl:left-[8%] xl:w-[34%]
                   2xl:left-[9%] 2xl:w-[32%]"
      >
        <img
          src={LogoSponsor}
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div
        className="absolute top-[10%] right-[4%] w-[42%]
                   sm:right-[5%] sm:w-[40%]
                   md:right-[6%] md:w-[38%]
                   lg:right-[7%] lg:w-[36%]
                   xl:right-[8%] xl:w-[34%]
                   2xl:right-[9%] 2xl:w-[32%]"
      >
        <img
          src={Medpar}
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Location Section */}
      <div
        className="absolute bottom-[13%] left-[10%] w-[30%]
                   sm:bottom-[13%] sm:left-[10%] sm:w-[32%]
                   md:bottom-[13%] md:left-[10%] md:w-[28%]
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
        <span
          className="font-lexend font-bold text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.8vw] xl:text-[1.5vw] 2xl:text-[1.2vw] leading-none tracking-normal text-black text-center"
        >
          Made by Nexus MAXIMA 2025
        </span>
      </div>

        {/* MEDSOS */}
      <div
        className="absolute bottom-[15%] right-[7%]
                   sm:bottom-[15%] sm:right-[7%]
                   md:bottom-[15%] md:right-[9%]
                   lg:bottom-[12%] lg:right-[14%]
                   xl:bottom-[12%] xl:right-[14%]
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
          <span
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md"
          >
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
          <span
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md"
          >
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
          <span
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md"
          >
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
          <span
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-lexend font-normal not-italic leading-none tracking-normal text-black drop-shadow-md"
          >
            @maxima_umn
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;