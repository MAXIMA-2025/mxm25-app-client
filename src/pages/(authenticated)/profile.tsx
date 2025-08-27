import useAuth, { type Auth, type UserMahasiswa } from "@/hooks/useAuth";
import BackgroundProfile from "@/assets/asset_profile/BACKGROUND PROFILE.png";
import Line from "@/assets/asset_profile/Line.png";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import QRCode from "react-qr-code";
import { Calendar, NotebookPen, PhoneIcon } from "lucide-react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import stateLogo from "@/assets/images/state.webp";

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

const Profile = () => {
  const auth = useAuth() as Auth<UserMahasiswa>;
  const user = auth.user;
  const api = useApi();
  const { data: stateRenders } = useQuery({
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
          rawStateDate: state?.state.day.date || "", // ✅ Add this line
          ukmLogo: state?.state.logo !== null ? state?.state.logo : stateLogo,
          stateGallery: state?.state.gallery,
        };
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div
      className="w-dvw min-h-dvh py-10 bg-black/60 bg-center flex justify-center items-center relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${BackgroundProfile})`,
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
    >
      {/* Konten utama */}
      <div className="relative z-10 w-full text-center text-white px-6 flex flex-col items-center">
        {!user ? (
          <p className="text-white/70 text-lg">Loading...</p>
        ) : (
          <>
            {/* Judul */}
            <h1 className="text-3xl font-semibold mb-3 font-fraunces">
              Profile
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="backdrop-blur-lg p-8 border-3 border-slate-300 rounded-2xl bg-gradient-to-b from-transparent to-90% to-primary/30">
                {/* Nama + NIM */}
                <p className="text-lg font-medium mb-1 font-futura">
                  {user.nama ?? "—"} | {user.nim ?? "—"}
                </p>

                {/* Email */}
{/*                 <p className="text-base text-white/80 mb-5 font-futura">
                  {user.email ?? "—"}
                </p> */}

                {/* QR dari UUID */}
                <h2 className="text-xl font-bold mb-3 font-futura">SCAN ME</h2>
                {user.uuid && (
                  <div className="bg-white p-4 rounded-lg inline-block mb-6 shadow-lg">
                    <QRCode
                      value={user.uuid}
                      size={196} // ukuran QR lebih proporsional
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="M"
                    />
                  </div>
                )}

                {/* Line + WhatsApp sejajar */}
                {/*
                <div className="flex justify-center items-center gap-4 mt-2 text-base">
                  {user.lineId && (
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src={Line}
                        alt="Line"
                        className="w-6 h-6 object-contain"
                      />
                      <span className="font-medium">{user.lineId}</span>
                    </div>
                  )}

                
                  {user.lineId && user.whatsapp && (
                    <span className="text-white/70 text-lg font-futura">|</span>
                  )}

                  {user.whatsapp && (
                    <div className="flex justify-center items-center gap-2">
                      <PhoneIcon className="size-5" />
                      <a
                        className="underline font-futura"
                        href={`https://wa.me/${user.whatsapp.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.whatsapp}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              */}
              <div className="w-full flex flex-col gap-4">
                {stateRenders?.map(
                  (state) =>
                    state.stateName && (
                      <>
                        <div className="flex md:flex-row items-center border-2 border-primary bg-amber-50 rounded-2xl p-4 flex-col">
                          <img src={state.ukmLogo} className="size-16" />
                          <div className="flex flex-col items-center md:items-start md:text-start">
                            <h1 className="text-black font-medium text-lg font-futura">
                              {state.stateName}
                            </h1>
                            <p className="text-slate-800 flex flex-row gap-2 items-center">
                              <Calendar className="size-5 text-black" /> {state.stateDate}
                            </p>
                            <p className="text-slate-800 flex flex-row gap-2 items-center">
                              <NotebookPen className="size-5 text-black" />
                              {(() => {
                                const now = new Date();
                                const eventDate = parseISO(state.rawStateDate);
                                let displayStatus = state.mahasiswaStatus;

                                if (
                                  state.mahasiswaStatus === "Tidak Datang" &&
                                  now < eventDate
                                ) {
                                  displayStatus = "Belum Datang";
                                }

                                return displayStatus;
                              })()}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
