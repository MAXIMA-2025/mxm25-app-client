import React from "react";
import stateLogoImage from "@/assets/images/state.webp";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import Select from "@/pages/(authenticated)/state/select";

interface EmptyStateProps {
  cardSlot?: number;
  stateDateSelected?: string[];
}

const EmptyState: React.FC<EmptyStateProps> = ({
  cardSlot,
  stateDateSelected,
}) => {
  const nav = useNavigate();

  return (
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-[#A01C1C] relative overflow-hidden flex flex-col justify-center items-center">
      {/* Empty State Pattern */}
      <div className="absolute inset-0 bg-gray-50 opacity-50"></div>

      <div className="text-center relative z-10 flex flex-col justify-center items-center w-full h-full">
        {/* Empty Logo Placeholder */}
        <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center grayscale">
          <img
            src={stateLogoImage}
            alt="STATE Logo"
            className="object-contain"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-2">
          Slot Kosong
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Pilih STATE untuk slot {cardSlot}
        </p>

        <button
          className="cursor-pointer w-full bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => nav("select", { state: stateDateSelected })}
        >
          + Pilih STATE
        </button>

        <Routes>
          <Route
            path="select"
            element={<Select stateTerpilih={stateDateSelected} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default EmptyState;
