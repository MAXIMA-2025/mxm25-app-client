import React from "react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import "./state.css";

// Asset imports
import backgroundImage from "@/assets/images/background_state.webp";
import stateLogo from "@/assets/images/state.webp";

//State Card Slot configuration
import EmptyCard from "@/components/state/EmptyState";
import FilledCard from "@/components/state/FilledState";

//Dummy State

//Get Registered State
interface RegisteredState {
  id: number;
  absenAwal: string;
  absenAkhir: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  stateId: number;
  state: {
    id: number;
    nama: string;
    logo: string | null;
    description: string | null;
    quota: number;
    location: string;
    createdAt: string;
    updatedAt: string;
    dayId: number;
    day: {
      id: number;
      date: string;
    };
  };
  mahasiswaUUID: string;
}

const State: React.FC = () => {
  const api = useApi();
  const auth = useAuth();
  const queryClient = useQueryClient();
  const {
    data: States,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      if (!auth.user) throw new Error("User not authenticated");
      const response = await api.get<ApiResponse<RegisteredState[]>>(
        "/state/peserta/state/registration"
      );
      return response.data;
    },

    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const dropMutation = useMutation({
    mutationFn: async (stateId: number) => {
      await api.delete(`/state/peserta/state/registration/${stateId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["states"]);
    },
  });

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

  const stateRenders = Array.from({ length: 3 }, (_, index) => {
    const state = States?.data[index];
    return {
      cardSlot: index + 1,
      stateName: state?.state.nama || "",
      stateLocation: state?.state.location || "",
      stateDate: state
        ? format(parseISO(state.state.day.date), "EEEE dd MMMM yyyy", {
            locale: localeId,
          })
        : "",
      stateDescription: state?.state.description || null,
      ukmLogo: state?.state.logo || stateLogo,
    };
  });

  return (
    <div
      className="bg-image min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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
            Daftar STATE yang telah kamu pilih
          </p>
        </header>

        {/* Cards Section */}
        <div className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
          {stateRenders.map((state) =>
            state.stateName ? (
              <FilledCard key={state.cardSlot} {...state} />
            ) : (
              <EmptyCard
                key={state.cardSlot}
                cardSlot={state.cardSlot}
                stateDateSelected={stateRenders.map((s) => s.stateDate)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default State;
