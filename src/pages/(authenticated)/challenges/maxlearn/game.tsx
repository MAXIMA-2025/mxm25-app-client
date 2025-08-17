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

  useEffect(() => {
    if (!auth.isLoading) {
      const mhs = auth as Auth<UserMahasiswa>;

      if (mhs.user?.isFinishedMaxlearn === "Menang") {
        setFinished(true);
      }

      if (!finished && checkCompletion()) {
        finishChallenge("Menang").then(() => {
          resetProgress();
          setFinished(true);
        });
      }
    }
  }, [unlocked, finishChallenge, auth, finished]);

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
      {showCheatModal && (
        <Dialog.Root open={showCheatModal} onOpenChange={setShowCheatModal}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg focus:outline-none">
              <Dialog.Title className="text-lg font-bold">
                ⚠️ Hayooo Kamu terdeteksi Curang! ⚠️
              </Dialog.Title>
              <Dialog.Description className="text-black italic mb-4">
                Karena terdeteksi curang, Kamu dianggap gagal di challenge
                MAXLEARN 😜
              </Dialog.Description>
              <div className="flex justify-end">
                <Dialog.Close asChild>
                  <Button
                    onClick={async () => await handleCheatingModalClose()}
                  >
                    Yahhhhhh ... :(
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      <div className="p-8">
        {!selectedCategory ? (
          <>
            <h1 className="text-2xl font-extrabold mb-4">Pilih Kategori</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-6 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="p-4 w-35 aspect-square bg-gray-200 rounded shadow hover:bg-gray-300"
                >
                  <span className="font-semibold">{cat.name}</span>
                </button>
              ))}
            </div>
            {finished && (
              <>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button>Selesai</Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg focus:outline-none">
                      <Dialog.Title className="text-lg font-bold mb-2">
                        Selamat, {(auth as Auth<UserMahasiswa>).user?.nama},
                        Anda telah menyelesaikan MAXLEARN!
                      </Dialog.Title>
                      <Dialog.Description className="text-black italic mb-4">
                        Silahkan screenshot halaman ini dan post di Instagram
                        Anda!
                      </Dialog.Description>

                      <div className="flex justify-end gap-2">
                        <Dialog.Close asChild>
                          <button className="px-4 py-2 rounded bg-gray-300">
                            Tutup
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </>
            )}
          </>
        ) : (
          <>
            <Button className="mb-2" onClick={() => setSelectedCategory(null)}>
              Kembali
            </Button>

            {/* <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 px-3 py-1 bg-gray-300 rounded"
            >
              ← Kembali
            </button> */}

            <h2 className="text-xl font-bold  mb-4">{currentCategory?.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-3">
              {currentCategory?.organizations.map((org) => {
                const stateLogo = logoMap[org.id];
                const isUnlocked = unlocked.has(org.id);

                return (
                  <Dialog.Root key={org.id}>
                    <Card className="border-gray-600 bg-white w-55 aspect-square p-4 rounded shadow text-center">
                      <img
                        src={stateLogo}
                        alt={org.name}
                        className={`w-full h-24 object-contain transition-all ${
                          isUnlocked || finished ? "" : "blur-xs"
                        }`}
                      />
                      {isUnlocked || finished ? (
                        <p className="mt-2 font-semibold">{org.name}</p>
                      ) : (
                        <p className="mt-2 font-semibold">? ? ?</p>
                      )}

                      <Dialog.Trigger asChild>
                        <Button>Lihat Info</Button>
                      </Dialog.Trigger>
                    </Card>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                      {!isUnlocked && !finished ? (
                        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg focus:outline-none">
                          <Dialog.Title className="text-lg font-bold">
                            Petunjuk
                          </Dialog.Title>
                          <Dialog.Description className="text-black italic mb-4">
                            "{org.clue}"
                          </Dialog.Description>

                          <input
                            type="password"
                            value={passwordInput}
                            placeholder="Password"
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full border rounded px-3 py-2 mb-4"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handlePasswordSubmit(
                                  currentCategory.id,
                                  org,
                                  (e.target as HTMLInputElement).value
                                );
                              }
                            }}
                          />

                          <div className="flex justify-end gap-2">
                            <Dialog.Close asChild>
                              <button className="px-4 py-2 rounded bg-gray-300">
                                Batal
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button
                                className="px-4 py-2 rounded bg-blue-600 text-white"
                                onClick={() =>
                                  handlePasswordSubmit(
                                    currentCategory.id,
                                    org,
                                    passwordInput
                                  )
                                }
                              >
                                Submit
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      ) : (
                        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg focus:outline-none">
                          <Dialog.Title className="text-lg font-bold mb-2">
                            {org.name}
                          </Dialog.Title>
                          <Dialog.Description className="text-black italic mb-4">
                            {org.desc}
                          </Dialog.Description>

                          <div className="flex justify-end gap-2">
                            <Dialog.Close asChild>
                              <button className="px-4 py-2 rounded bg-gray-300">
                                Tutup
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      )}
                    </Dialog.Portal>
                  </Dialog.Root>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GamePage;
