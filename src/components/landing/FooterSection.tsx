import React from 'react';
import FooterMaxima from '@/assets/images/footer/footer maxima-01.png';
import Medpar from '@/assets/images/footer/MEDPAR-01.png';

const FooterSection: React.FC = () => {
  return (
    <footer
      className="fixed inset-0 w-full h-screen overflow-hidden bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${FooterMaxima})`,
        backgroundSize: '100% 100%',
      }}
      aria-hidden="true"
    >
      {/* Responsive positioning and sizing */}
      <div className="absolute top-15 right-10 sm:top-15 sm:right-6 md:top-15 md:right-8 lg:top-15 lg:right-16 xl:top-15 xl:right-20">
        <img
          src={Medpar}
          alt="Medpar"
          className="w-[250px] h-[200px]
                     xs:w-[300px] xs:h-[150px]
                     sm:w-[350px] sm:h-[200px] 
                     md:w-[400px] md:h-[200px] 
                     lg:w-[450px] lg:h-[200px] 
                     xl:w-[500px] xl:h-[200px]
                     2xl:w-[600px] 
                     object-fill"
        />
      </div>
    </footer>
  );
};

export default FooterSection;