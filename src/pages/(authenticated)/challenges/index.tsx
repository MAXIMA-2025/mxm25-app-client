import React from 'react'
import Background from '@/assets/asset_maxlearn/BACKGROUND 1.png'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Title */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black tracking-wide leading-tight">
          CHALLENGE MAXIMA
        </h1>
      </div>

      {/* Button Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-3 sm:space-y-4 md:space-y-5">
        
        {/* Challenge 1 Button */}
        <button
          onClick={() => navigate('/challenges/maxlearn')}
          className="w-full bg-green-200 hover:bg-green-300 active:bg-green-400 text-black py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Challenge 1 (Maxlearn(?))
        </button>

        {/* Challenge 2 Button */}
        <button
          onClick={() => alert('Fitur belum tersedia')}
          className="w-full bg-red-200 hover:bg-red-300 active:bg-red-400 text-black py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl opacity-75 cursor-not-allowed"
          disabled
        >
          Challenge 2 (Photo Booth)
        </button>

        {/* Challenge Lainnya Button */}
        <button
          onClick={() => alert('Fitur belum tersedia')}
          className="w-full bg-red-200 hover:bg-red-300 active:bg-red-400 text-black py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl opacity-75 cursor-not-allowed"
          disabled
        >
          Challenge Lainnya
        </button>

      </div>

      {/* Optional: Footer text for very small screens */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-black opacity-70">
          Pilih challenge yang ingin kamu ikuti
        </p>
      </div>
    </div>
  )
}

export default Index