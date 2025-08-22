import React from 'react'
import Background from '@/assets/asset_maxlearn/BACKGROUND CHALLENGE STATION.png'
import LogoStation from '@/assets/images/main/logoRangkaian/LogoSTATION.webp'
import Maxlearn from '@/assets/asset_maxlearn/HANDBOOK MAXLEARN.png'
import Maxsnap from '@/assets/asset_maxlearn/HANDBOOK MAXSNAP.png'
import Photobooth from '@/assets/asset_maxlearn/Photobooth Challenge .png'
import Maxtivity from '@/assets/asset_maxlearn/HANDBOOK MAXTIVITY.png'
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
     <section
      className="p-4 min-h-screen min-w-screen flex flex-col items-center gap-10 justify-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
      }}
    >
      {/* Title */}
      <h1
        className="text-center text-5xl text-black font-semibold font-fraunces text-shadow-2xl drop-shadow-2xl"
      >
        MAXIMA CHALLENGES
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
    </section>
  )
}

export default Index