import React from "react";

interface FilledStateProps {
  cardSlot?: number;
  stateName?: string;
  stateLocation?: string;
  stateDate?: string;
  ukmLogo?: string;
}

const FilledState: React.FC<FilledStateProps> = ({ cardSlot, stateName, stateLocation, stateDate, ukmLogo }) => {
  return (
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-[#A01C1C] md:col-span-2 xl:col-span-1">
            <div className="text-center">
              {/* ACES Section */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{stateName}</h4>
                {/* ACES Logo */}
                <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src={ukmLogo} 
                    alt="ACES Logo" 
                    className="object-contain" 
                  />
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <p className="font-semibold">Slot {cardSlot}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Tanggal:</span> {stateDate}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Tempat:</span> {stateLocation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="cursor-pointer flex-1 bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
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
                  <span>Info</span>
                </button>
                <button className="cursor-pointer flex-1 bg-gray-200 border-2 border-[#A01C1C] text-red-800 hover:bg-gray-300 hover:text-red-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"
                    />
                  </svg>
                  Drop State
                </button>
              </div>
            </div>
          </div>
  );
};

export default FilledState;
