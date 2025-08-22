// src/pages/(authenticated)/challenges/maxlearn/game.tsx
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { categories } from "@/pages/(authenticated)/challenges/maxlearn/_data"; // file kategori & organisasi
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import useAuth, { type Auth, type UserMahasiswa } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import bgImage from "@/assets/asset_maxlearn/logo/bg.png";
import TutorialDialog from "@/components/maxlearn/TutorialDialog";

export type StateData = {
  id: number;
  nama: string;
  logo: string;
};

export type Organization = {
  id: number;
  name: string;
  clue: string;
  desc: string;
  password: string;
  enteredPassword?: string; // password yang diinput user
  james?: "maxibel" | "ximasud";
  fallbackLogo?: string;
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

// NEW: Helper function untuk cek apakah satu kategori sudah selesai
const isCategoryCompleted = (categoryId: number): boolean => {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return false;

  // Cek apakah ada minimal 1 organisasi yang berhasil dalam kategori ini
  for (const org of category.organizations) {
    const progress = localStorage.getItem(STORAGE_PREFIX + org.id);
    if (progress === STATUS_TRUE) {
      console.log(`kategori ${categoryId} complete`);
      return true; // Ada yang berhasil
    }
  }

  return false; // Belum ada yang berhasil
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

const getProgress = (orgId: number) => {
  return localStorage.getItem(STORAGE_PREFIX + orgId) === STATUS_TRUE;
};

const setProgress = (
  orgId: number,
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

// Helper to check if org is marked wrong in localStorage
const isWrong = (orgId: number): boolean => {
  return localStorage.getItem(STORAGE_PREFIX + orgId) === STATUS_FALSE;
};

const GamePage: React.FC = () => {
  // TAMBAHKAN STATE UNTUK AUTO MODAL
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set());

  const [showCheatModal, setShowCheatModal] = useState(false);
  const [finished, setFinished] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 👈 TAMBAHKAN STATE BARU UNTUK AUTO MODAL
  const [showWinModal, setShowWinModal] = useState(false);
  const hasShownWin = useRef(false);
  const hasShownLose = useRef(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const api = useApi();
  const auth = useAuth() as Auth<UserMahasiswa>;
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { data: stateData } = useQuery({
    queryKey: ["stateData"],
    queryFn: async () => {
      const resp = await api.get<ApiResponse<StateData[]>>("/state/");
      const updatedResp = resp.data.data.map((val) => ({
        id: val.id,
        nama: val.nama,
        logo: val.logo,
      }));

      return updatedResp;
    },
  });

  const { mutateAsync: finishChallenge } = useMutation({
    mutationFn: async (status: MaxlearnStatus) => {
      await api.put(`/mahasiswa/${(auth as Auth<UserMahasiswa>).user?.uuid}`, {
        isFinishedMaxlearn: status,
      });
      return status;
    },
    onSuccess: (status: MaxlearnStatus) => {
      toast.success(`Berhasil update status challenge menjadi ${status}`);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  // cek mahasiswa atau bukan, cek kalah atau engga
  useEffect(() => {
    if (!auth.isLoading && auth.user?.role !== "mahasiswa") {
      toast.error(`${auth.user?.role} tidak diizinkan mengakses halaman ini!`);
      nav("/main");
    }
  }, [auth.isLoading, nav, auth.user?.role]);

  // Cek apakah ada kategori yang semua organisasinya salah
  const checkAllWrongInCategory = (): boolean => {
    for (const cat of categories) {
      let allWrong = true;
      for (const org of cat.organizations) {
        const progress = localStorage.getItem(STORAGE_PREFIX + org.id);
        if (progress !== STATUS_FALSE) {
          allWrong = false;
          break;
        }
      }
      if (allWrong) {
        return true; // Ada kategori yang semua salah
      }
    }
    return false;
  };

  // MASALAH UTAMA: useEffect yang memicu infinite loop
  useEffect(() => {
    if (!auth.isLoading && !isProcessing) {
      const mhs = auth as Auth<UserMahasiswa>;

      switch (mhs.user?.isFinishedMaxlearn) {
        case "Belum": {
          console.log("aaa");
          setFinished(false);
          break;
        }
        case "Kalah": {
          if (!hasShownLose.current) {
            setFinished(true);
            setSelectedCategory(null); // 👈 AUTO REDIRECT KE KATEGORI
            setShowLoseModal(true);
            hasShownLose.current = true;
          }
          break;
        }
        case "Menang": {
          if (!hasShownWin.current) {
            setFinished(true);
            setSelectedCategory(null); // 👈 AUTO REDIRECT KE KATEGORI
            setShowWinModal(true);
            hasShownWin.current = true;
          }
          break;
        }
      }
      console.log("Status MAXLEARN:", mhs.user?.isFinishedMaxlearn);

      if (!finished && checkAllWrongInCategory()) {
        console.log("Challenge MAXLEARN dinyatakan kalah!");
        setIsProcessing(true);

        finishChallenge("Kalah")
          .then(() => {
            resetProgress();
            setFinished(true);
            setSelectedCategory(null); // 👈 AUTO REDIRECT KE KATEGORI
            // setShowLoseModal(true);
          })
          .finally(() => {
            setIsProcessing(false);
          });
        return;
      }

      if (!finished && checkCompletion()) {
        setIsProcessing(true);

        finishChallenge("Menang")
          .then(() => {
            resetProgress();
            setFinished(true);
            setSelectedCategory(null); // 👈 AUTO REDIRECT KE KATEGORI
            setShowWinModal(true);
          })
          .finally(() => {
            setIsProcessing(false);
          });
      }
    }
  }, [
    auth.user?.isFinishedMaxlearn,
    isProcessing,
    finishChallenge,
    auth.isLoading,
    finished,
    auth,
  ]);

  // Cek cheating saat awal
  useEffect(() => {
    if (checkCheating()) {
      setShowCheatModal(true);
    }
  }, []);

  // UPDATED: Ambil progress dari localStorage saat awal + update completed categories
  useEffect(() => {
    const opened = new Set<number>();
    const completed = new Set<number>();

    categories.forEach((cat) => {
      // Check organizations yang unlocked
      cat.organizations.forEach((org) => {
        if (getProgress(org.id)) {
          opened.add(org.id);
        }
      });

      // Check apakah kategori completed
      if (isCategoryCompleted(cat.id)) {
        completed.add(cat.id);
      }
    });

    setUnlocked(opened);
  }, []);

  const handleCheatingModalClose = async (): Promise<void> => {
    await finishChallenge("Kalah");
    resetProgress();
    // Reset state juga (supaya UI langsung update)
    // setUnlocked(new Set());
  };

  const handlePasswordSubmit = (
    catId: number,
    org: Organization,
    password: string
  ) => {
    if (password.toUpperCase() === org.password) {
      // ✅ Simpan status solved untuk org ini
      setProgress(org.id, STATUS_TRUE);
      toast.success("Password benar!");

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
      toast.error("Password salah!");
    }
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      {/* Cheat Detection Modal */}
      {showCheatModal && (
        <Dialog.Root open={showCheatModal} onOpenChange={setShowCheatModal}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-red-200/50">
                <Dialog.Title className="text-xl font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Curang Terdeteksi!
                </Dialog.Title>
                <Dialog.Description className="text-gray-700 mb-5 text-sm leading-relaxed">
                  Sistem mendeteksi aktivitas tidak wajar. Challenge MAXLEARN
                  dinyatakan gagal.
                </Dialog.Description>
                <div className="flex justify-end">
                  <Dialog.Close asChild>
                    <Button
                      onClick={async () => await handleCheatingModalClose()}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      Tutup
                    </Button>
                  </Dialog.Close>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      {/* Background Container */}
      <div
        className="fixed inset-0 overflow-auto"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Minimal overlay untuk readability */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 min-h-screen">
          {!selectedCategory ? (
            /* ===== CATEGORY SELECTION VIEW ===== */
            <>
              <div className="flex flex-col min-h-screen p-2 sm:p-6">
                {/* Header Section */}
                <div className="text-center py-6 mb-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-2xl animate-in slide-in-from-top duration-300">
                    Pilih Kategori
                  </h1>
                  <div className="w-16 h-1 bg-white/80 mx-auto rounded-full shadow-lg"></div>
                </div>

                <div className="grid grid-cols-1 gap-2 ">
                  {/* Back Button */}
                  <div className="mx-auto animate-in slide-in-from-left duration-300">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full sm:w-auto font-semibold"
                      onClick={() => nav("/challenges/maxlearn")}
                    >
                      <span className="flex items-center gap-2">
                        <span>←</span>
                        Kembali
                      </span>
                    </Button>
                  </div>

                  {!finished && (
                    <div className="mx-auto animate-in slide-in-from-left duration-300">
                      <TutorialDialog />
                    </div>
                  )}

                  <Dialog.Root
                    open={showWinModal}
                    onOpenChange={setShowWinModal}
                  >
                    {finished && auth.user?.isFinishedMaxlearn === "Menang" && (
                      <Dialog.Trigger asChild>
                        <div className="mx-auto">
                          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110">
                            <span className="flex items-center gap-3">
                              <span>🎉</span>
                              Klik disini
                              <span>✨</span>
                            </span>
                          </Button>
                        </div>
                      </Dialog.Trigger>
                    )}
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200 z-50">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-emerald-200/50">
                          <Dialog.Title className="text-2xl font-bold text-emerald-600 mb-4 flex items-center gap-3 justify-center">
                            <span className="text-3xl">🎉</span>
                            Selamat, {(auth as Auth<UserMahasiswa>).user?.nama}!
                            <span className="text-3xl">✨</span>
                          </Dialog.Title>
                          <Dialog.Description className="grid grid-cols-1 text-gray-700 mb-6 text-base leading-relaxed bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                            <div className="text-center mb-4">
                              <div className="text-6xl mb-2">🏆</div>
                              <p className="text-lg font-semibold text-emerald-700 mb-2">
                                MAXLEARN CHAMPION!
                              </p>
                            </div>
                            <span className="mb-2">
                              Anda telah menyelesaikan MAXLEARN dengan sempurna!
                              Silahkan screenshot dan bagikan pencapaian Anda!
                            </span>
                            <div className="bg-white/80 p-3 rounded-lg mt-3">
                              <span className="mb-1 font-bold block">
                                NIM: {(auth as Auth<UserMahasiswa>).user?.nim}
                              </span>
                              <span className="mb-1 font-bold block">
                                Nama: {(auth as Auth<UserMahasiswa>).user?.nama}
                              </span>
                              <span className="mb-1 font-bold block">
                                Prodi:{" "}
                                {(auth as Auth<UserMahasiswa>).user?.prodi}
                              </span>
                              <span className="text-sm text-emerald-600 italic mt-2 block">
                                Status: COMPLETED ✅
                              </span>
                            </div>
                          </Dialog.Description>
                          <div className="flex justify-center">
                            <Dialog.Close asChild>
                              <button className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                                Tutup
                              </button>
                            </Dialog.Close>
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  {/* LOSE MODAL - AUTO SHOW, NO RETRY */}
                  <Dialog.Root
                    open={showLoseModal}
                    onOpenChange={setShowLoseModal}
                  >
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200 z-50">
                        <div className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-red-500/50 text-white">
                          <Dialog.Title className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3 justify-center">
                            <span className="text-3xl animate-pulse">💀</span>
                            GAME OVER
                            <span className="text-3xl animate-pulse">💀</span>
                          </Dialog.Title>
                          <Dialog.Description className="text-center mb-6">
                            <div className="bg-black/40 p-6 rounded-xl border border-red-500/30 mb-4">
                              <div className="text-6xl mb-3">⚰️</div>
                              <p className="text-red-300 mb-4 text-lg font-semibold">
                                Challenge Failed!
                              </p>
                              <div className="text-gray-300 space-y-2">
                                <p>
                                  <strong>Player:</strong>{" "}
                                  {(auth as Auth<UserMahasiswa>).user?.nama}
                                </p>
                                <p>
                                  <strong>NIM:</strong>{" "}
                                  {(auth as Auth<UserMahasiswa>).user?.nim}
                                </p>
                                <p>
                                  <strong>Prodi:</strong>{" "}
                                  {(auth as Auth<UserMahasiswa>).user?.prodi}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  <span className="text-red-400 font-bold">
                                    ELIMINATED 💔
                                  </span>
                                </p>
                              </div>
                              <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/20">
                                <p className="text-red-200 text-sm font-medium">
                                  FINAL RESULT: UNSUCCESSFUL
                                </p>
                              </div>
                            </div>

                            <p className="text-red-300 text-xs mt-2 font-semibold">
                              ⚠️ Challenge telah berakhir dan tidak dapat
                              diulang
                            </p>
                          </Dialog.Description>
                          <div className="flex justify-center">
                            <Dialog.Close asChild>
                              <button className="px-8 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 hover:scale-105 border border-gray-500">
                                Accept Defeat
                              </button>
                            </Dialog.Close>
                            {/* 👈 TIDAK ADA TOMBOL RETRY/COBA LAGI */}
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>

                {/* Categories Grid */}
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Main 3x3 Grid - UPDATED */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 justify-items-center">
                      {categories.slice(0, 9).map((cat, index) => {
                        const isCompleted = isCategoryCompleted(cat.id);

                        return (
                          <div
                            key={cat.id}
                            className="w-full max-w-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-300 relative"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <button
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`group relative overflow-hidden w-full min-h-16 sm:min-h-18 lg:min-h-20 rounded-xl backdrop-blur-lg border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] cursor-pointer ${
                                isCompleted
                                  ? "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/50"
                                  : "bg-white/15 hover:bg-white/25 border-white/30"
                              }`}
                            >
                              {/* Success Badge - NEW */}
                              {isCompleted && (
                                <div className="absolute -top-2 -right-2 z-20">
                                  <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                                    ✓
                                  </div>
                                </div>
                              )}

                              {/* Gradient overlay */}
                              <div
                                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                                  isCompleted
                                    ? "bg-gradient-to-br from-emerald-300/40 to-green-300/40"
                                    : "bg-gradient-to-br from-blue-300/30 to-purple-300/30"
                                }`}
                              ></div>

                              {/* Content */}
                              <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-3">
                                <span
                                  className={`font-bold drop-shadow-lg text-sm sm:text-base text-center leading-tight whitespace-normal break-words ${
                                    isCompleted
                                      ? "text-emerald-100"
                                      : "text-white"
                                  }`}
                                >
                                  {cat.name}
                                  {isCompleted && (
                                    <span className="block text-xs mt-1 text-emerald-200 font-normal">
                                      Selesai
                                    </span>
                                  )}
                                </span>
                              </div>

                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-xl"></div>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Row - UPDATED */}
                    {categories.length > 9 && (
                      <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-3xl justify-items-center">
                          {categories.slice(9).map((cat, index) => {
                            const isCompleted = isCategoryCompleted(cat.id);

                            return (
                              <div
                                key={cat.id}
                                className="w-full max-w-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-300 relative"
                                style={{
                                  animationDelay: `${(index + 9) * 50}ms`,
                                }}
                              >
                                <button
                                  onClick={() => setSelectedCategory(cat.id)}
                                  className={`group relative overflow-hidden w-full h-16 sm:h-18 lg:h-20 rounded-xl backdrop-blur-lg border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] cursor-pointer ${
                                    isCompleted
                                      ? "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/50"
                                      : "bg-white/15 hover:bg-white/25 border-white/30"
                                  }`}
                                >
                                  {/* Success Badge - NEW */}
                                  {isCompleted && (
                                    <div className="absolute -top-2 -right-2 z-20">
                                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                                        ✓
                                      </div>
                                    </div>
                                  )}

                                  {/* Gradient overlay */}
                                  <div
                                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                                      isCompleted
                                        ? "bg-gradient-to-br from-emerald-300/40 to-green-300/40"
                                        : "bg-gradient-to-br from-green-300/30 to-teal-300/30"
                                    }`}
                                  ></div>

                                  {/* Content */}
                                  <div className="relative z-10 h-full flex items-center justify-center px-3">
                                    <span
                                      className={`font-bold drop-shadow-lg text-sm sm:text-base text-center leading-tight ${
                                        isCompleted
                                          ? "text-emerald-100"
                                          : "text-white"
                                      }`}
                                    >
                                      {cat.name}
                                      {isCompleted && (
                                        <span className="block text-xs mt-1 text-emerald-200 font-normal">
                                          ✨ Selesai
                                        </span>
                                      )}
                                    </span>
                                  </div>

                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-xl"></div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ===== ORGANIZATION VIEW ===== */
            <div className="flex flex-col min-h-screen p-4 sm:p-6">
              {/* Back Button */}
              <div className="mb-4 animate-in slide-in-from-left duration-200">
                <Button
                  variant="outline"
                  className="px-5 py-2.5 rounded-xl font-semibold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                  onClick={() => setSelectedCategory(null)}
                >
                  <span className="flex items-center gap-2">
                    <span>←</span>
                    Kembali ke Kategori
                  </span>
                </Button>
              </div>

              {/* Category Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white drop-shadow-2xl text-center animate-in slide-in-from-top duration-300">
                {currentCategory?.name}
              </h2>

              {/* Organizations Grid */}
              <div className="flex-1 pb-6">
                <div className="flex justify-center px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl w-full justify-items-center">
                    {currentCategory?.organizations.map((org, index) => {
                      const isUnlocked = unlocked.has(org.id);
                      const fetchedData = stateData?.find(
                        (val) => val.id === org.id
                      );
                      const isCompleted = isCategoryCompleted(
                        currentCategory.id
                      );

                      const logo =
                        org.fallbackLogo ||
                        `${import.meta.env.VITE_R2_URL}/${fetchedData?.logo}`;
                      const wrong = isWrong(org.id);
                      // const showInfo = isUnlocked || isCompleted;
                      const showInfo = finished || isCompleted;

                      const style: CSSProperties = showInfo
                        ? {}
                        : { filter: "blur(4px)", opacity: 0.4 };

                      return (
                        <div
                          key={org.id}
                          className="w-full max-w-xs animate-in fade-in-0 slide-in-from-bottom-4 duration-200"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <Dialog.Root>
                            <Card className="group relative overflow-hidden aspect-[4/5] bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]">
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                              <div className="relative z-10 h-full flex flex-col">
                                {/* Logo Section */}
                                <div className="flex-1 flex items-center justify-center mb-3">
                                  <div className="relative">
                                    <img
                                      src={logo}
                                      alt={org.name}
                                      className={`w-full h-16 sm:h-20 object-contain transition-all duration-200 ${
                                        showInfo ||
                                        (auth as Auth<UserMahasiswa>).user
                                          ?.isFinishedMaxlearn !== "Belum"
                                          ? "group-hover:scale-110"
                                          : "blur-xs opacity-40"
                                      }`}
                                      loading="lazy"
                                      // Jika salah, tetap blur
                                      style={style}
                                    />
                                    {/* Status Indicator */}
                                    <div
                                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-200 ${
                                        isUnlocked || finished
                                          ? "bg-green-400 shadow-lg shadow-green-400/50"
                                          : wrong
                                          ? "bg-red-400 shadow-lg shadow-red-400/50"
                                          : "bg-gray-400"
                                      }`}
                                    ></div>
                                  </div>
                                </div>

                                {/* Organization Name */}
                                <div className="text-center mb-3">
                                  {showInfo ? (
                                    <p className="font-bold text-white drop-shadow-lg text-xs sm:text-sm leading-tight group-hover:text-white transition-colors duration-200">
                                      {org.name}
                                    </p>
                                  ) : (
                                    <p className="font-bold text-white/70 text-xs sm:text-sm">
                                      ???
                                    </p>
                                  )}
                                </div>

                                {/* Action Button */}
                                {/* {!wrong && (
                                  <Dialog.Trigger asChild>
                                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 text-xs sm:text-sm py-2.5 px-4 rounded-xl font-medium shadow-lg transition-all duration-200 w-full group-hover:scale-105 backdrop-blur-sm">
                                      {isUnlocked || finished
                                        ? "Lihat Info"
                                        : "Tebak"}
                                    </Button>
                                  </Dialog.Trigger>
                                )} */}
                                {showInfo ? (
                                  <Dialog.Trigger asChild>
                                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 text-xs sm:text-sm py-2.5 px-4 rounded-xl font-medium shadow-lg transition-all duration-200 w-full group-hover:scale-105 backdrop-blur-sm">
                                      Lihat Info
                                    </Button>
                                  </Dialog.Trigger>
                                ) : (
                                  <Dialog.Trigger asChild>
                                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 text-xs sm:text-sm py-2.5 px-4 rounded-xl font-medium shadow-lg transition-all duration-200 w-full group-hover:scale-105 backdrop-blur-sm">
                                      {wrong ? "Lihat Info" : "Tebak"}
                                    </Button>
                                  </Dialog.Trigger>
                                )}
                              </div>

                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-2xl"></div>
                            </Card>

                            {/* Dialog */}
                            <Dialog.Portal>
                              <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200" />
                              {!showInfo ? (
                                <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200">
                                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-blue-200/50">
                                    <Dialog.Title className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                      <span className="text-2xl">🔍</span>
                                      Petunjuk
                                    </Dialog.Title>
                                    <Dialog.Description className="text-gray-700 mb-5 text-sm bg-blue-50 p-4 rounded-xl border border-blue-100 italic leading-relaxed">
                                      "{org.clue}"
                                    </Dialog.Description>

                                    <input
                                      type="password"
                                      value={passwordInput}
                                      placeholder="🔐 Masukkan password..."
                                      onChange={(e) =>
                                        setPasswordInput(e.target.value)
                                      }
                                      className="w-full border-2 border-blue-200 focus:border-blue-400 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400/20 text-sm transition-all duration-200 bg-white"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handlePasswordSubmit(
                                            currentCategory.id,
                                            org,
                                            (e.target as HTMLInputElement).value
                                          );
                                          setPasswordInput("");
                                        }
                                      }}
                                    />

                                    <div className="flex justify-end gap-3">
                                      <Dialog.Close asChild>
                                        <button className="px-5 py-2.5 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all duration-200 hover:scale-105">
                                          Batal
                                        </button>
                                      </Dialog.Close>
                                      <Dialog.Close asChild>
                                        <button
                                          className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 hover:scale-105"
                                          onClick={() => {
                                            handlePasswordSubmit(
                                              currentCategory.id,
                                              org,
                                              passwordInput
                                            );
                                            setPasswordInput("");
                                          }}
                                        >
                                          Submit
                                        </button>
                                      </Dialog.Close>
                                    </div>
                                  </div>
                                </Dialog.Content>
                              ) : (
                                <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200">
                                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-emerald-200/50">
                                    <Dialog.Title className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
                                      {org.name}
                                    </Dialog.Title>
                                    <Dialog.Description className="text-gray-700 mb-5 text-sm leading-relaxed bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                      {org.desc}
                                    </Dialog.Description>

                                    <div className="flex justify-end">
                                      <Dialog.Close asChild>
                                        <button className="px-5 py-2.5 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all duration-200 hover:scale-105">
                                          Tutup
                                        </button>
                                      </Dialog.Close>
                                    </div>
                                  </div>
                                </Dialog.Content>
                              )}
                            </Dialog.Portal>
                          </Dialog.Root>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePage;
