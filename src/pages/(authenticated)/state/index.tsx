import React, { useEffect, useState } from "react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import "./state.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import sad from "@/assets/asset_station/sad.gif";

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
    gallery: {
      id: number;
      url: string;
    }[];
  };
  mahasiswaUUID: string;
}

const State: React.FC = () => {
  const api = useApi();
  const auth = useAuth();
  const [conflict, setConflict] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (conflict) {
      setOpen(true);
    }
  }, [conflict]);
  const {
    data: stateRenders,
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
    select: (data) => {
      return Array.from({ length: 3 }, (_, index) => {
        const state = data.data[index];

        return {
          cardSlot: index + 1,
          stateDescription: state?.state.description,
          stateRegistrationId: state?.id,
          mahasiswaStatus: state?.status || "",
          stateName: state?.state.nama || "",
          stateLocation: state?.state.location || "",
          stateDate: state
            ? format(parseISO(state.state.day.date), "EEEE dd MMMM yyyy", {
                locale: localeId,
              })
            : "",
          ukmLogo: state?.state.logo !== null ? state?.state.logo : stateLogo,
          stateGallery: state?.state.gallery,
        };
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // ✅ Detect date conflicts when stateRenders changes
  useEffect(() => {
    if (stateRenders) {
      const dates = stateRenders
        .map((s) => s.stateDate)
        .filter((date) => date !== ""); // ignore empty slots

      const hasDuplicate = dates.some(
        (date, index) => dates.indexOf(date) !== index
      );

      setConflict(hasDuplicate);
    }
  }, [stateRenders]);

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

  // const stateRenders = Array.from({ length: 3 }, (_, index) => {
  //   const state = States?.data[index];
  //   console.log("state: ", state);

  //   return {
  //     cardSlot: index + 1,
  //     stateName: state?.state.nama || "",
  //     stateLocation: state?.state.location || "",
  //     stateDate: state
  //       ? format(parseISO(state.state.day.date), "EEEE dd MMMM yyyy", {
  //           locale: localeId,
  //         })
  //       : "",
  //     ukmLogo: state?.state.logo !== null ? state?.state.logo : stateLogo,
  //     stateGallery: state?.state.gallery,
  //   };
  // });

  return (
    <div
      className="bg-image min-h-screen w-full relative overflow-x-hidden bg-black/50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "darken",
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
        <header className="text-center mb-6">
          <h1 className="font-fraunces text-6xl md:text-8xl font-semibold text-white mb-4 tracking-tight">
            STATE
          </h1>
          <p className="font-futura text-lg md:text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
            Daftar STATE yang telah kamu pilih
          </p>
        </header>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader className="flex items-center">
              <img src={sad} alt="sedih" className="size-50" />
              <AlertDialogTitle>Terdapat STATE yang menabrak!</AlertDialogTitle>
              <AlertDialogDescription>
                Drop salah satu STATE sehingga jadwal Anda tidak berhalangan!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => console.log("Confirmed!")}>
                Lanjut
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Cards Section */}
        <div className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
          {stateRenders?.map((state) =>
            state.stateName ? (
              <>
                <FilledCard
                  key={state.cardSlot}
                  {...state}
                  stateDescription={state.stateDescription}
                  stateGallery={state.stateGallery}
                  stateRegistration={state.stateRegistrationId}
                  mahasiswaStatus={state.mahasiswaStatus}
                />
              </>
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
