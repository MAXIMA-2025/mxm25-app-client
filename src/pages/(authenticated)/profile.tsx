import useAuth, { type Auth, type UserMahasiswa } from "@/hooks/useAuth";
import BackgroundProfile from "@/assets/asset_profile/BACKGROUND PROFILE.png";
import Line from "@/assets/asset_profile/Line.png";
import QRCode from "react-qr-code";
import { PhoneIcon } from "lucide-react";

const Profile = () => {
  const auth = useAuth() as Auth<UserMahasiswa>;
  const user = auth.user;

  return (
    <div
      className="w-screen bg-black/60 h-screen bg-center flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${BackgroundProfile})`,
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
    >
      {/* Konten utama */}
      <div className="relative z-10 w-full max-w-sm mx-auto text-center text-white px-6 flex flex-col items-center">
        {!user ? (
          <p className="text-white/70 text-lg">Loading...</p>
        ) : (
          <>
            {/* Judul */}
            <h1 className="text-3xl font-semibold mb-3 font-fraunces">
              Profile
            </h1>

            <div className="backdrop-blur-lg p-8 border-3 border-slate-300 rounded-2xl bg-gradient-to-b from-transparent to-90% to-primary/30">
              {/* Nama + NIM */}
              <p className="text-lg font-medium mb-1 font-futura">
                {user.nama ?? "—"} | {user.nim ?? "—"}
              </p>

              {/* Email */}
              <p className="text-base text-white/80 mb-5 font-futura">
                {user.email ?? "—"}
              </p>

              {/* PRODI */}
              <p className="text-base text-white/80 mb-5 font-futura">
                {user.prodi ?? "—"}
              </p>

              {/* QR dari UUID */}
              <h2 className="text-xl font-bold mb-3 font-futura">QR Absensi</h2>
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
              {/* <div className="flex justify-center items-center gap-4 mt-2 text-base">
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
                      href={`https://wa.me/${user.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.whatsapp}
                    </a>
                  </div>
                )}
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
