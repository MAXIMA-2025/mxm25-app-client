import React from "react";

interface UkmCardProps {
  stateId: number;
  stateName: string;
  stateDate: string;
  stateLocation: string;
  stateCapacity: number;
  currentFilledCapacity: number;
  ukmLogo: string;
}

const UkmCard: React.FC<UkmCardProps> = ({
  stateId,
  stateName,
  stateDate,
  stateLocation,
  stateCapacity,
  currentFilledCapacity,
  ukmLogo,
}) => {
  return (
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-[#A01C1C] md:col-span-2 xl:col-span-1">
      <div className="text-center">
        {/* ACES Section */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-2">{stateName}</h4>
          {/* ACES Logo */}
          <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <img src={ukmLogo} alt="ACES Logo" className="object-contain" />
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <p className="text-sm">
            <span className="font-semibold">Kapasitas:</span>{" "}
            {currentFilledCapacity} / {stateCapacity}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tanggal:</span> {stateDate}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tempat:</span> {stateLocation}
          </p>
        </div>

        <div className="text-sm flex flex-col sm:flex-row gap-3">
          <button className="cursor-pointer flex-1 bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Pilih State</span>
          </button>
          <button className="cursor-pointer flex-1 bg-gray-200 border-2 border-[#A01C1C] text-red-800 hover:bg-gray-300 hover:text-red-800 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="12"
                x2="12"
                y2="16"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default UkmCard;
