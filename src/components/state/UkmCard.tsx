import React from "react";

interface UkmCardProps {
  stateId: number;
  stateName: string;
  stateDate: string;
  stateLocation: string;
  stateQuota: number;
  currentFilledCapacity: number;
  ukmLogo: string | null;
  stateDescription?: string | null;
  onPilihState?: (stateId: number) => void;
  onInfoState?: (stateId: number) => void;
}

const UkmCard: React.FC<UkmCardProps> = ({
  stateId,
  stateName,
  stateDate,
  stateLocation,
  stateQuota,
  currentFilledCapacity,
  ukmLogo,
  stateDescription,
  onPilihState,
  onInfoState,
}) => {
  // Calculate remaining capacity
  const remainingCapacity = stateQuota - currentFilledCapacity;
  const isFullCapacity = remainingCapacity <= 0;
  
  // Calculate capacity percentage for visual indicator
  const capacityPercentage = (currentFilledCapacity / stateQuota) * 100;
  
  // Get capacity status color
  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return "text-red-600";
    if (capacityPercentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const handlePilihState = () => {
    if (onPilihState && !isFullCapacity) {
      onPilihState(stateId);
    }
  };

  const handleInfoState = () => {
    if (onInfoState) {
      onInfoState(stateId);
    }
  };

  return (
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-[#A01C1C] md:col-span-2 xl:col-span-1">
      <div className="text-center">
        {/* State Header */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {stateName}
          </h4>
          
          {/* State Logo */}
          <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            {ukmLogo ? (
              <img 
                src={ukmLogo} 
                alt={`${stateName} Logo`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to default image if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-logo.png";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg 
                  className="w-16 h-16" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* State Information */}
        <div className="space-y-3 mb-6">
          {/* Capacity with visual indicator */}
          <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Kapasitas:</span>
              <span className={`font-bold ${getCapacityColor()}`}>
                {currentFilledCapacity} / {stateQuota}
              </span>
            </div>
            {/* Capacity Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  capacityPercentage >= 90 ? 'bg-red-500' : 
                  capacityPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
            {isFullCapacity && (
              <p className="text-xs text-red-600 mt-1 font-medium">Kapasitas Penuh</p>
            )}
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tanggal:</span> {stateDate}
          </p>
          
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tempat:</span> {stateLocation}
          </p>

          {/* Description if available */}
          {stateDescription && (
            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <span className="font-semibold">Deskripsi:</span> {stateDescription}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-sm flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handlePilihState}
            disabled={isFullCapacity}
            className={`cursor-pointer flex-1 font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
              isFullCapacity
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-red-800 hover:bg-red-900 text-white hover:shadow-lg'
            }`}
          >
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
            <span>{isFullCapacity ? 'Penuh' : 'Pilih State'}</span>
          </button>
          
          <button 
            onClick={handleInfoState}
            className="cursor-pointer flex-1 bg-gray-200 border-2 border-[#A01C1C] text-red-800 hover:bg-gray-300 hover:text-red-800 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 hover:shadow-lg"
          >
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
        </div>

        {/* Status Badge */}
        {isFullCapacity && (
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Tidak Tersedia
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UkmCard;