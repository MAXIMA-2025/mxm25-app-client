import React from 'react';
import PohonDaun from '@/assets/images/footer/PohonDaun.png';
import Logo from '@/assets/images/logo.png';
import Line from '@/assets/images/footer/Line.png';
import Instagram from '@/assets/images/footer/Instagram.png';
import Tiktok from '@/assets/images/footer/Tiktok.png';
import Youtube from '@/assets/images/footer/Youtube.png';

const FooterSection: React.FC = () => {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #ffffffff 0%, #E4FF36 150%, transparent 180%)',
      }}
    >
      {/* PohonDaun centered and shifted upward */}
      <img
        src={PohonDaun}
        alt="Pohon Daun"
        className="relative object-contain max-w-full max-h-full top-0"
      />

      {/* Logo besar di tengah */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-10 sm:w-24 md:w-32 lg:w-40 h-auto mb-4 sm:mb-6 md:mb-8"
        />

        {/* Logo kecil */}
        <div className="flex space-x-2 sm:space-x-4 md:space-x-8 items-center">
          <img src={Line} alt="Line" className="w-4 sm:w-6 md:w-8 h-auto" />
          <img src={Instagram} alt="Instagram" className="w-4 sm:w-6 md:w-8 h-auto" />
          <img src={Tiktok} alt="Tiktok" className="w-4 sm:w-6 md:w-8 h-auto" />
          <img src={Youtube} alt="Youtube" className="w-4 sm:w-6 md:w-8 h-auto" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
