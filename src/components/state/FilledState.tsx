import React from "react";
import Yakin from "@/assets/images/yakin.gif";

//Import Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";

interface FilledStateProps {
  cardSlot?: number;
  stateName?: string;
  stateLocation?: string;
  stateDate?: string;
  ukmLogo?: string;
  stateDescription?: string | null;
  stateGallery: { id: number; url: string }[] | undefined;
  stateRegistration?: number | null;
}

const FilledState: React.FC<FilledStateProps> = ({
  cardSlot,
  stateName,
  stateLocation,
  stateDate,
  ukmLogo,
  stateDescription,
  stateGallery,
  stateRegistration,
}) => {
  console.log(stateGallery);
  console.log(stateName + " " + ukmLogo);

  const api = useApi();

  const mutation = useMutation({
    mutationFn: async (stateRegistration: number | null) => {
      const resp = await api.delete(`/state/drop/${stateRegistration}`);
      return resp.data.data;
    },
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({queryKey: ["states"]})
      toast.success("Berhasil drop STATE!");
    }
  });
  return (
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-[#A01C1C] md:col-span-2 xl:col-span-1">
      <div className="text-center">
        {/* ACES Section */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-2">{stateName}</h4>
          {/* ACES Logo */}
          <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <img
              src={
                ukmLogo?.startsWith("/src/")
                  ? ukmLogo
                  : `${import.meta.env.VITE_R2_URL}/${ukmLogo}`
              }
              alt={`${stateName} Logo`}
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tanggal:</span> {stateDate}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tempat:</span> {stateLocation}
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="clay" className="flex w-5/6">
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
              </Button>
              {/* <button className="cursor-pointer flex-1 bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">

              </button> */}
            </AlertDialogTrigger>
            <AlertDialogContent
              className="max-w-lg w-full p-6 rounded-xl"
              style={{ width: "90vw", maxWidth: "600px" }}
            >
              <AlertDialogHeader>
                {/* Section 1: Tentang State */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 mb-2 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_R2_URL}/${ukmLogo}`}
                      alt={`${stateName} Logo`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <AlertDialogTitle className="text-xl text-primary font-bold text-center">
                    {stateName}
                  </AlertDialogTitle>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertDialogTitle className="text-lg font-bold">
                      Tentang {stateName}
                    </AlertDialogTitle>
                  </div>
                  <div
                    className="flex text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: stateDescription!,
                    }}
                  >
                    {stateDescription ? (
                      <p>{stateDescription}</p>
                    ) : (
                      <p className="italic text-gray-400">
                        Tidak ada deskripsi.
                      </p>
                    )}
                  </div>
                </div>

                {/* Section 2: Jadwal & Lokasi */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-bold">Jadwal & Lokasi</h5>
                  </div>
                  <div className="flex sm:flex-col gap-1 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold"></span> {stateDate},{" "}
                      {stateLocation}
                    </div>
                  </div>
                </div>

                {/* Section 3: Galeri State */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <h5 className="text-lg font-bold">Galeri State</h5>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pl-9 pr-9">
                    {/* Contoh gambar, ganti dengan data dinamis jika ada */}
                    {/* <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            src={stateGallery[0]?.url}
                            alt={`Gallery image ${0}`}
                            className="object-cover w-full h-48 rounded-lg"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src={stateGallery[1]?.url}
                            alt={`Gallery image ${1}`}
                            className="object-cover w-full h-48 rounded-lg"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src={stateGallery[2]?.url}
                            alt={`Gallery image ${2}`}
                            className="object-cover w-full h-48 rounded-lg"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel> */}
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="absolute top-2 right-2">
                  X
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-1/6">
                <Trash2 className="size-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Yakin anda ingin drop state ini?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <img
                    src={Yakin}
                    alt="Are you sure emoji GIF"
                    loading="lazy"
                    className="w-32 h-32 object-contain mx-auto mb-4"
                  />
                  Jika kuota nantinya penuh, Anda tidak bisa mendaftar STATE ini
                  lagi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="clay"
                    onClick={() => {
                      mutation.mutate(stateRegistration);
                    }}
                  >
                    HAPUS
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default FilledState;
