import React from 'react'
import backgroundImg from "../../assets/images/main/WELCOME-01.webp";
import { Button } from '../ui/button';
import Logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router';
import { ArrowDown } from 'lucide-react';

const HeroMain = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    
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
            <div className="flex flex-col-reverse justify-center items-center md:flex-row">
        <div className="flex  text-shadow-lg flex-col gap-2 z-1 p-5 items-center text-center md:text-start md:items-start">
          <div className='flex flex-col gap-0'>
          <h1 className="font-fraunces text-blue-900 font-semibold text-md md:text-lg">
            MAXIMA <span className='text-primary'>- 2025 -</span>
          </h1>
          <h1 className="font-fraunces font-semibold text-3xl md:text-4xl">
            Beli tiket konser STATION <br/> sekarang juga!
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
          <Button className="w-[64%] md:w-[50%] mt-2" variant="clay" onClick={handleClick}>
            Cek STATION <ArrowDown/>
          </Button>
        </div>
        <img className="w-34 z-1 md:w-40" src={Logo} />
      </div>
    </section>
  )
}

export default HeroMain