import React from 'react'
import Background from '@/assets/asset_maxlearn/BACKGROUND 1.png'
import HandbookPdf from '@/assets/asset_maxlearn/HANDBOOK RAW MAXLEARN.pdf'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 min-h-screen w-full"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
          MAXLEARN
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-black">handbook</p>
      </div>

      {/* PDF Viewer Container */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[2/1] rounded-lg sm:rounded-xl overflow-hidden bg-white bg-opacity-80 shadow-lg sm:shadow-2xl ring-1 ring-gray-300 backdrop-blur mb-6 sm:mb-8">
          <embed
            src={`${HandbookPdf}#zoom=100&toolbar=1&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate('/challenges/maxlearn/game')}
        className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-black font-medium py-3 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg"
      >
        Mulai Challenge
      </button>
    </div>
  )
}

export default Index