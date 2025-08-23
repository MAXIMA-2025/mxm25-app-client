import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { LucideCircleQuestionMark, X } from "lucide-react";

export default function TutorialDialog() {
  return (
    <Dialog.Root>
      {/* Tombol buka modal */}
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="icon" className="font-semibold p-3">
          <LucideCircleQuestionMark />
        </Button>
      </Dialog.Trigger>

      {/* Overlay */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200" />

        {/* Konten */}
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 fade-in-0 duration-200 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-emerald-200/50">
            <Dialog.Title className="text-2xl font-bold">
              Cara Bermain Maxlearn
            </Dialog.Title>
            <Dialog.Description className="grid grid-cols-1 text-gray-700 mb-6 text-base leading-relaxed bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p>1️⃣ Pilih kategori organisasi.</p>
              <p>
                2️⃣ Carilah dan kunjungi booth organisasi dari kategori yang
                dipilih dan masukkan password dari minimal 1 organisasi di
                kategori tersebut.
              </p>
              <p>
                3️⃣ Jika berhasil, kategori dianggap <strong>terpecahkan</strong>{" "}
                dan semua organisasi di kategori itu akan terbuka. Setelah itu,
                lanjut pilih kategori berikutnya.
              </p>
              <p>
                4️⃣ Jika salah, organisasi akan terkunci. Jika organisasi dalam
                suatu kategori terkunci semua →{" "}
                <span className="text-red-500">Game Over 💀</span>.
              </p>
              <p>
                5️⃣ Selesaikan semua kategori untuk menyelesaikan Maxlearn! 🏆
              </p>
            </Dialog.Description>
            {/* Tombol Aksi */}
            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <Button variant="default">Mengerti 👍</Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
