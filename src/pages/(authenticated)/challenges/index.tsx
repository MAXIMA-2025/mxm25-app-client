import React from 'react'
import Background from '@/assets/asset_maxlearn/BACKGROUND CHALLENGE STATION.png'
import LogoStation from '@/assets/asset_maxlearn/Logo Station 1.png'
import Maxlearn from '@/assets/asset_maxlearn/MAXLEARN.png'
import Maxsnap from '@/assets/asset_maxlearn/MAXSNAP.png'
import Photobooth from '@/assets/asset_maxlearn/PHOTOBOOTH.png'
import Maxtivity from '@/assets/asset_maxlearn/MAXTIVITY.png'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  
  const stations = [
    {
      id: 1,
      image: Maxlearn,
      title: "MAXLEARN",
      subtitle: "+1 SKKM Minat dan Bakat",
      route: "maxlearn",
    },
    {
      id: 2,
      image: Maxsnap,
      title: "MAXSNAP",
      subtitle: "+2 SKKM Minat dan Bakat",
      route: "maxsnap",
    },
    {
      id: 3,
      image: Photobooth,
      title: "PHOTOBOOTH", 
      subtitle: "+1 SKKM Minat dan Bakat",
      route: "photobooth",
    },
    {
      id: 4,
      image: Maxtivity,
      title: "MAXTIVITY",
      subtitle: "+1 SKKM Minat dan Bakat",
      route: "maxtivity",
    }
  ]

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Logo */}
      <img
        src={LogoStation}
        alt="Station Challenge Logo"
        className="w-[10%] sm:w-[10%] md:w-[10%] lg:w-[6%]"
      />
      
      {/* Title */}
      <h1
        className="text-center text-black font-bold mb-8 sm:mb-10 md:mb-12"
        style={{
          fontFamily: "'Title Hero', sans-serif",
          fontWeight: "700",
          fontStyle: "normal", 
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          lineHeight: "120%",
          letterSpacing: "-0.03em",
        }}
      >
        STATION CHALLENGES
      </h1>

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full max-w-7xl">
        {stations.map((station) => (
          <div
            key={station.id}
            className="relative bg-white w-full rounded-2xl p-4 sm:p-5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 border-10 border-gray-700 mb-4 aspect-[4/5] flex flex-col"
            onClick={() => navigate(`/challenges/${station.route}`)}
          >
            {/* Card Image */}
            <div className="rounded-xl overflow-hidden mb-3 flex-1 flex items-center justify-center">
              <img
                src={station.image}
                alt={station.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Card Content */}
            <div className="text-center flex-shrink-0">
              <h3 
                className="text-black font-bold text-sm sm:text-base md:text-lg mb-1"
                style={{
                  fontFamily: "'Title Hero', sans-serif",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                {station.title}
              </h3>
              {station.subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {station.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index