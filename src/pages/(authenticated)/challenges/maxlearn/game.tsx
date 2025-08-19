// src/pages/(authenticated)/challenges/maxlearn/game.tsx
import React, { useEffect, useState } from "react";
import { categories } from "@/pages/(authenticated)/challenges/maxlearn/_data"; // file kategori & organisasi
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import useAuth, { type Auth, type UserMahasiswa } from "@/hooks/useAuth";
import { useNavigate } from "@/router";

export type StateData = {
  id: number;
  logo: string;
};

export type Organization = {
  id: string;
  name: string;
  clue: string;
  desc: string;
  password: string;
  enteredPassword?: string; // password yang diinput user
  james?: "maxibel" | "ximasud";
};

export type Category = {
  id: number;
  name: string;
  organizations: Organization[];
};

export type MaxlearnStatus = "Belum" | "Menang" | "Kalah";

export const STORAGE_PREFIX = "lebron-";
export const STATUS_TRUE = "ximasud";
export const STATUS_FALSE = "maxibel";
export const ALLOWED = new Set([STATUS_TRUE, STATUS_FALSE]);

const logos = import.meta.glob("@/assets/asset_maxlearn/logo/*.png", {
  eager: true,
});

const logoMap: Record<string, string> = {};

for (const path in logos) {
  // Extract nama file tanpa ekstensi → misalnya "org1"
  const fileName = path.split("/").pop()?.split(".")[0] || "";
  // logos[path] is a module, ambil default export (url)
  logoMap[fileName] = (logos[path] as { default: string }).default;
}

// 👇 TAMBAHKAN INI (kamu lupa define backgrounds):
const backgrounds = import.meta.glob("@/assets/asset_maxlearn/logo/*.png", {
  eager: true,
});

const backgroundImage = (
  backgrounds["/src/assets/asset_maxlearn/logo/background.png"] as {
    default: string;
  }
)?.default;

console.log("backgroundImage:", backgroundImage);
const isValidProgress = (
  value: string | null
): value is typeof STATUS_TRUE | typeof STATUS_FALSE => {
  return value === STATUS_TRUE || value === STATUS_FALSE;
};

const checkCompletion = (): boolean => {
  for (const cat of categories) {
    let hasSolved = false;

    for (const org of cat.organizations) {
      const progress = localStorage.getItem(STORAGE_PREFIX + org.id);
      if (progress === STATUS_TRUE) {
        hasSolved = true;
        break; // cukup satu saja per kategori
      }
    }

    if (!hasSolved) {
      return false; // kategori ini belum ada yang berhasil ditebak
    }
  }

  return true; // semua kategori minimal punya 1 solved
};

const checkCheating = (): boolean => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value && !isValidProgress(value)) {
        return true;
      }
    }
  }
  return false;
};

const getProgress = (orgId: string) => {
  return localStorage.getItem(STORAGE_PREFIX + orgId) === STATUS_TRUE;
};

const setProgress = (
  orgId: string,
  status: typeof STATUS_TRUE | typeof STATUS_FALSE
) => {
  localStorage.setItem(STORAGE_PREFIX + orgId, status);
};

const resetProgress = () => {
  const keysToRemove: string[] = [];

  // Cari semua key yang pakai prefix
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  // Hapus satu-satu
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

const GamePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [showCheatModal, setShowCheatModal] = useState(false);
  const [finished, setFinished] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const api = useApi();
  const auth = useAuth();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: finishChallenge } = useMutation({
    mutationFn: async (status: MaxlearnStatus) => {
      await api.put(/mahasiswa/${(auth as Auth<UserMahasiswa>).user?.uuid}, {
        isFinishedMaxlearn: status,
      });
      return status;
    },
    onSuccess: (status: MaxlearnStatus) => {
      toast.success(Berhasil update status challenge menjadi ${status});
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  // cek mahasiswa atau bukan, cek kalah atau engga
  // useEffect(() => {
  //   if (!auth.isLoading && auth.user?.role !== "mahasiswa") {
  //     toast.error(${auth.user?.role} tidak diizinkan mengakses halaman ini!);
  //     nav("/main");
  //   }
  // }, [auth.isLoading, nav, auth.user?.role]);

  // useEffect(() => {
  //   if (!auth.isLoading) {
  //     const mhs = auth as Auth<UserMahasiswa>;

  //     if (mhs.user?.isFinishedMaxlearn === "Menang") {
  //       setFinished(true);
  //     }

  //     if (!finished && checkCompletion()) {
  //       finishChallenge("Menang").then(() => {
  //         resetProgress();
  //         setFinished(true);
  //       });
  //     }
  //   }
  // }, [unlocked, finishChallenge, auth, finished]);

  // Cek cheating saat awal
  useEffect(() => {
    if (checkCheating()) {
      setShowCheatModal(true);
    }
  }, []);

  // Ambil progress dari localStorage saat awal
  useEffect(() => {
    const opened = new Set<string>();
    categories.forEach((cat) => {
      cat.organizations.forEach((org) => {
        if (getProgress(org.id)) {
          opened.add(org.id);
        }
      });
    });
    setUnlocked(opened);
  }, []);

  const handleCheatingModalClose = async (): Promise<void> => {
    await finishChallenge("Kalah");
    resetProgress();
    // Reset state juga (supaya UI langsung update)
    setUnlocked(new Set());
  };

  const handlePasswordSubmit = (
    catId: number,
    org: Organization,
    password: string
  ) => {
    if (password === org.password) {
      // ✅ Simpan status solved untuk org ini
      setProgress(org.id, STATUS_TRUE);

      // ✅ Cari kategori sesuai id (bukan index array)
      const category = categories.find((c) => c.id === catId);
      if (!category) return;

      // Ambil semua organisasi dalam kategori itu
      const categoryOrgIds = category.organizations.map((o) => o.id);

      // ✅ Unlock semua organisasi dalam kategori
      setUnlocked((prev) => {
        const newUnlocked = new Set([...prev, ...categoryOrgIds]);
        return newUnlocked;
      });
    } else {
      // Kalau salah, simpan status false
      setProgress(org.id, STATUS_FALSE);
    }
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      <div className="fixed inset-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: url(${backgroundImage}),
            filter: "blur(8px)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-indigo-900/30" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-start p-6">
          {/* Logo Meliora - Kiri Atas */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-yellow-300 font-bold text-xl">Meliora</span>
          </div>

          {/* Copyright Text - Kanan Atas */}
          <div className="text-white/70 text-sm font-medium">
            © Beskara, Caksana, Lavanya, dan Nayanika OMB UMN 2024
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Carousel Section */}
          <div className="flex items-center justify-center min-h-[70vh]">
            {/* Left Navigation Arrow */}
            <button
              className="group p-4 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 mr-8"
              onClick={() => {
                // Logic untuk navigasi kiri akan ditambahkan nanti
              }}
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-white/90 transform group-hover:-translate-x-1 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Carousel Cards Container */}
            <div className="relative flex items-center justify-center">
              {/* Card 1 - Left */}
              <div className="relative transform -rotate-12 -translate-x-16 translate-y-8 scale-75 z-10">
                <div className="w-80 h-96 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  {/* Placeholder Image */}
                  <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-400 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-500 font-medium">
                        Logo Placeholder
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="w-full h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Center (Main) */}
              <div className="relative z-20 transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="w-96 h-[28rem] bg-gradient-to-br from-white/98 to-white/90 backdrop-blur-xl rounded-3xl shadow-3xl hover:shadow-4xl border border-white/30 hover:border-white/50 overflow-hidden transition-all duration-500">
                  {/* Placeholder Image */}
                  <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-blue-700 font-bold text-lg">
                        Main Logo
                      </span>
                    </div>

                    {/* Unlock Status Indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg opacity-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Organization Name
                    </h3>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                      Buka Kunci
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Right */}
              <div className="relative transform rotate-12 translate-x-16 translate-y-8 scale-75 z-10">
                <div className="w-80 h-96 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  {/* Placeholder Image */}
                  <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-400 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-500 font-medium">
                        Logo Placeholder
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="w-full h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <button
              className="group p-4 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 ml-8"
              onClick={() => {
                // Logic untuk navigasi kanan akan ditambahkan nanti
              }}
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-white/90 transform group-hover:translate-x-1 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Completion Section - Hanya tampil jika finished */}
          {finished && (
            <div className="text-center mt-16">
              <div className="inline-block animate-pulse">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="group relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-emerald-500/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-3">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Selesai
                      </span>
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-3xl focus:outline-none border border-green-200">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <Dialog.Title className="text-2xl font-black text-gray-800 mb-3">
                          🎉 Selamat, {auth?.user?.nama}!
                        </Dialog.Title>
                        <Dialog.Description className="text-gray-600 text-lg mb-8 leading-relaxed">
                          Anda telah menyelesaikan{" "}
                          <span className="font-bold text-green-600">
                            MAXLEARN
                          </span>
                          !<br />
                          Silahkan screenshot halaman ini dan post di Instagram
                          Anda!
                        </Dialog.Description>

                        <Dialog.Close asChild>
                          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                            Tutup
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Cheat Modal - Tetap sama */}
      {showCheatModal && (
        <Dialog.Root open={showCheatModal} onOpenChange={setShowCheatModal}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-3xl focus:outline-none border border-red-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <Dialog.Title className="text-2xl font-black text-red-600 mb-3">
                  ⚠ Hayooo Kamu terdeteksi Curang! ⚠
                </Dialog.Title>
                <Dialog.Description className="text-gray-700 text-lg mb-8 leading-relaxed bg-red-50 p-6 rounded-2xl border border-red-200">
                  Karena terdeteksi curang, Kamu dianggap gagal di challenge
                  <span className="font-bold text-red-600"> MAXLEARN</span> 😜
                </Dialog.Description>

                <Dialog.Close asChild>
                  <button
                    className="group px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    onClick={async () => await handleCheatingModalClose()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/50 to-pink-500/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative">Yahhhhhh ... 😢</span>
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
};
export default GamePage;