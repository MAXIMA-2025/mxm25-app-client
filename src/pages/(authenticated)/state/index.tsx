import React from 'react';
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/router";
import type { AxiosError } from "axios";
import useAuth, { type UserMahasiswa } from "@/hooks/useAuth";
import "./state.css";

// Asset imports
import backgroundImage from '@/assets/images/background_state.webp';
import acesLogoImage from '@/assets/images/logoUkm/aces.webp';

//State Card Slot configuration
import EmptyCard from '@/components/state/EmptyState';
import FilledCard from '@/components/state/FilledState';

//Dummy State
const dummyStates = [
  {
    cardSlot: 1,
    stateName: "ACES",
    stateLocation: "Barak Militer",
    stateDate: "17 Agustus 1945",
    ukmLogo: acesLogoImage,
  },
  {
    cardSlot: 2,
    stateName: "",
    stateLocation: "",
    stateDate: "",
    ukmLogo: "",
  },
  {
    cardSlot: 3,
    stateName: "",
    stateLocation: "",
    stateDate: "",
    ukmLogo: "",
  },
];

//Get Registered State
type RegisteredState = {
  id: number;
  absenAwal: string;
  absenAkhir: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  stateId: number;
  mahasiswaUUID: string;
};

const State: React.FC = () => {
  const api = useApi();
  const auth = useAuth();
  const {
    data:States,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      if (!auth.user) throw new Error('User not authenticated');
      const response = await api.get<ApiResponse<RegisteredState[]>>('/state/registration',{
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    },
    retry: (failureCount, error: AxiosError) => {
          // Don't retry on 404, 400, or 204 - these are not network errors
          if (
            error?.response?.status === 404 ||
            error?.response?.status === 400 ||
            error?.response?.status === 204
          ) {
            return false;
          }
          // Only retry on actual network errors, max 1 retry
          return failureCount < 1;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90171a] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat state Kamu...</p>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-red-500">
        Gagal memuat state. {(error as Error).message}
      </p>
    );

  //Debug
  console.log("States:", States); 

  return (
    <div 
      className="bg-image min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Inline Styles */}
      <style jsx>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-element:nth-child(3) {
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .entrance {
          animation: fade-in-up 1s ease forwards;
        }
      `}</style>

      {/* Background Pattern Overlay */}
      <div className="pattern-overlay absolute inset-0 z-0"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-yellow-400 opacity-20 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-blue-400 opacity-30 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-purple-400 opacity-15 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-8 h-8 bg-green-400 opacity-25 rounded-full blur-sm"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
            STATE
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
            Lorem Dolor Ipsum Amet Sit, Haha hihi wow!
          </p>
        </header>

        {/* Cards Section */}
        <div className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">

          {dummyStates.map((state) =>
            state.stateName ? (
              <FilledCard key={state.cardSlot} {...state} />
            ) : (
              <EmptyCard key={state.cardSlot} cardSlot={state.cardSlot} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default State;