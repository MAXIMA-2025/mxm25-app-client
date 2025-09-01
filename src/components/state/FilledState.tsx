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

import { Button } from "../ui/button";
import { CheckCheck, Trash2, Video } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";
import { parseISO } from "date-fns";
import useAuth, { type Auth, type UserMahasiswa } from "@/hooks/useAuth";
import { beTarask } from "date-fns/locale";

interface FilledStateProps {
  cardSlot?: number;
  stateName?: string;
  stateLocation?: string;
  dayId: number;
  absenAwal: string | null;
  absenAkhir: string | null;
  isAbsenOpen: boolean;
  isAbsenAkhirOpen: boolean;
  isStateBerlangsung: boolean;
  stateDate?: string;
  stateTime?: string;
  ukmLogo?: string;
  stateDescription?: string | null;
  stateGallery: { id: number; url: string }[] | undefined;
  stateRegistration?: number | null;
  mahasiswaStatus: string;
  rawStateDate?: string | null;
}

const FilledState: React.FC<FilledStateProps> = ({
  stateName,
  stateLocation,
  stateDate,
  dayId,
  stateTime,
  ukmLogo,
  stateDescription,
  absenAkhir,
  absenAwal,
  isAbsenOpen,
  isAbsenAkhirOpen,
  isStateBerlangsung,
  stateGallery,
  stateRegistration,
  mahasiswaStatus,
  rawStateDate,
}) => {
  console.log("raw date: ", rawStateDate);
  console.log("day id: ", dayId);

  const auth = useAuth() as Auth<UserMahasiswa>;
  const api = useApi();
  const queryClient = useQueryClient();

  // link berganti sesuai dayId (nnti disesuaiin lagi)
  let linkZoom: string;
  switch (dayId) {
    case 3:
      linkZoom =
        "https://us06web.zoom.us/j/89520021775?pwd=muX6kBmHOgRSS2aYLQe8DKiZ2oUmf7.1";
      break;
    case 4:
      linkZoom = `https://zoom.us`;
      break;
    case 5:
      linkZoom = `https://zoom.us`;
      break;
    case 6:
      linkZoom = `https://zoom.us`;
      break;
    default:
      linkZoom = "";
      break;
  }

  const mutation = useMutation({
    mutationFn: async (stateRegistration: number | null) => {
      const resp = await api.delete(`/state/drop/${stateRegistration}`);
      return resp.data.data;
    },
    onSuccess: () => {
      toast.success("Berhasil drop STATE!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
  });

  const { mutate: absen, isPending: absenPending } = useMutation({
    mutationFn: async () => {
      console.log("Mengabsen ...");

      // dia hanya absen kalo blm absen awal aja, kalo blm lgsg redirect ke link zoom
      // tujuannya biar absen akhir ga ke-trigger
      if (!hasAbsen && (!absenAwal || (!absenAkhir && isAbsenAkhirOpen)))
        await api.post(`/state/absen/${auth.user?.uuid}`);
    },
    onSuccess: () => {
      toast.success("Berhasil !", { id: "absenBerhasil" });
      queryClient.invalidateQueries({ queryKey: ["states"] });

      if (!absenAwal) window.location.href = linkZoom;
    },
  });
  // inside your component
  // parse date safely
  const eventDate = stateDate ? new Date(stateDate) : null;

  // current time
  const now = new Date();

  // status logic
  let displayStatus = mahasiswaStatus;
  if (mahasiswaStatus === "Tidak Datang" && eventDate && now < eventDate) {
    displayStatus = "Belum Datang";
  }

  const hasAbsen = !!(absenAwal && absenAkhir);

  console.log("Event date: ", eventDate);
  console.log("hasAbsne: ", hasAbsen);
  console.log("stateHasPassed: ", isStateBerlangsung);
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
            <span className="font-semibold">Waktu:</span> {stateTime} WIB
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tempat:</span> {stateLocation}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Kehadiran:</span>{" "}
            {(() => {
              const now = new Date();
              const eventDate = rawStateDate ? parseISO(rawStateDate) : "";
              let displayStatus = mahasiswaStatus;

              if (mahasiswaStatus === "Tidak Datang" && now < eventDate) {
                displayStatus = "Belum Datang";
              }

              return displayStatus;
            })()}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="clay" className="flex w-full">
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
            </AlertDialogTrigger>
            <AlertDialogContent
              className="max-w-lg w-full p-6 rounded-xl"
              style={{
                width: "90vw",
                maxWidth: "600px",
                maxHeight: "80vh",
                overflowY: "revert",
                overflowX: "hidden",
              }}
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
                  <div className="overflow-y-auto max-h-64">
                    {stateDescription && stateDescription?.trim().length > 0 ? (
                      <div
                        className="overflow-y-auto text-gray-700 text-sm "
                        dangerouslySetInnerHTML={{ __html: stateDescription }}
                      />
                    ) : (
                      <div className="flex text-gray-700 text-sm">
                        <p className="italic text-gray-400">
                          Tidak ada deskripsi.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Jadwal & Lokasi */}
                <div className="mb-6 flex flex-col items-start text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-bold">Jadwal & Lokasi</h5>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Tanggal: </span>
                      {stateDate}, <br />
                      <span className="font-semibold">Waktu: </span>
                      {stateTime} <br />
                      <span className="font-semibold">Lokasi: </span>
                      {stateLocation}
                    </div>
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
          {/* <AlertDialog>
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
                      mutation.mutate(stateRegistration!);
                    }}
                  >
                    HAPUS
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
        {stateLocation?.toLowerCase().includes("zoom") && (
          <div
            className={
              absenAwal && !absenAkhir
                ? "mt-2 grid grid-cols-2 gap-2"
                : "mt-2 grid grid-cols gap-2"
            }
          >
            <Button
              variant="outline"
              className="flex flex-row w-full sm:p-2"
              onClick={async () => {
                if (absenAwal) {
                  window.location.href = linkZoom;
                }
                absen();
              }}
              // disabled={
              //   !isStateBerlangsung || hasAbsen || absenPending || !linkZoom
              // }
            >
              {absenPending ? (
                "Bergabung ..."
              ) : (
                <>
                  <Video />
                  Join ZOOM!
                </>
              )}
            </Button>

            {absenAwal && !absenAkhir && (
              <Button
                variant="outline"
                className="flex w-full"
                onClick={() => {
                  absen();
                }}
                disabled={
                  !isStateBerlangsung || absenPending || !isAbsenAkhirOpen
                }
              >
                {absenPending ? (
                  "Mengabsen ..."
                ) : (
                  <>
                    <CheckCheck />
                    Absen Akhir
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilledState;
