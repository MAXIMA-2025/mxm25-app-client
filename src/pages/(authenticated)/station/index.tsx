import React, { useEffect, useState } from "react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth"; // 🔥 Tambahkan ini
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/images/main/STATION.webp";
import { useNavigate } from "@/router";
import { z } from "zod";
import { toast } from "sonner";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import poster from "@/assets/images/main/Poster.webp";
import logo from "/favicon.png";
import Turnstile from "react-turnstile";

// Simple Indo phone validation (starts with 08 or +628, 9–15 digits)
const phoneRegex = /^(?:\+62|62|08)[0-9]{8,13}$/;

const formSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.email("Email tidak valid"),
  noTelp: z.string().regex(phoneRegex, "Nomor telepon tidak valid"),
});

// Notes:
// 1. System login sudah terintegrasi dengan station, jadi tidak perlu lagi mengisi nama dan email.
// 2. Form ini akan mengambil data nama dan email dari akun yang sedang login.
// 3. No HP dan jumlah tiket bisa diubah sesuai kebutuhan.
// 4. *PENTING*: untuk melakukan pengetesan pembayaran, pastikan sudah terintegerasi dengan sistem login yang benar sehingga data nama dan email bisa diambil dari akun yang sedang login.
//Jika belum terintegerasi, maka form tidak bisa memproses transaksi karena data nama dan email tidak lengkap.

declare global {
  interface Window {
    snap: any;
  }
}

type MidtransResponse = {
  token: string;
  redirect_url: string;
  ticketId: string;
};

const Index: React.FC = () => {
  const api = useApi();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  // const { user, isLoading } = useAuth();

  // Awalnya bisa diisi dengan nama default, nanti akan diupdate dengan data user. Jadi saat sudah diintegerasi dengan sistem login,
  //  set semua field di form ini menjadi kosong, kecuali jumlahTiket harus di 1.

  const auth = useAuth();
  useEffect(() => {
    const user = auth.user;

    if (user && "firstName" in user && "lastName" in user) {
      const fullName = user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName;
      setForm((prev) => ({
        ...prev,
        nama: fullName,
        email: user.email,
      }));
    }
  }, [auth.user]);

  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    noTelp: "",
  });

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl =
      import.meta.env.VITE_NODE_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = import.meta.env.PROD
      ? import.meta.env.VITE_MIDTRANS_CLIENT_KEY
      : import.meta.env.VITE_MIDTRANS_SANDBOX_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      // if (!form.nama || !form.email || !form.noTelp || !form.jumlahTiket) {
      //   throw new Error("Data tidak lengkap");
      // }

      const payload = {
        customerDetails: {
          nama: form.nama,
          email: form.email,
          noTelp: form.noTelp,
          turnstileToken: token,
        },
      };

      const resp = await api.post<ApiResponse<MidtransResponse>>(
        "ticket/eksternal/token",
        payload
      );
      return resp.data.data;
    },
    onSuccess: (data) => {
      window.snap.pay(data.token, {
        onSuccess: async () => {
          try {
            const ticketId = data.ticketId;
            await api.get(`/ticket/eksternal/paid/${ticketId}`);
            alert("Pembayaran berhasil");
            toast.success("Tiket anda berhasil dibayar!");
            queryClient.invalidateQueries({ queryKey: ["myTickets"] });
            nav("/tickets");
          } catch (err) {
            console.error("Gagal memanggil callback paid:", err);
            alert("Pembayaran berhasil tapi gagal update status tiket.");
          }
        },
        onPending: (result: any) => {
          alert("Transaksi belum selesai. Status pending.");
          console.log(result);
        },
        onError: (error: any) => {
          alert("Terjadi kesalahan saat pembayaran.");
          toast.error(error);
          console.error(error);
        },
        onClose: () => {
          toast.error("Pembayaran dibatalkan");
          alert("Anda menutup pembayaran tanpa menyelesaikannya.");
        },
      });
    },
    onError: (err) => {
      console.error("Gagal membuat token:", err);
      alert("Gagal membuat pembayaran. Coba lagi.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please complete the Turnstile verification first.");
      return;
    }

    const parsed = formSchema.safeParse(form);

    if (!parsed.success) {
      const msg = parsed.error.issues
        .map((err) => `• ${err.message}`)
        .join("\n");
      toast.error("Formulir tidak valid", {
        description: msg,
        duration: 5000,
      });
      return;
    }

    mutation.mutate(token);
  };

  // if (isLoading) {
  //   return <div className="text-center mt-10">Memuat data pengguna...</div>;
  // }

  // Non-aktifin komen di bawah jika ingin menampilkan pesan error saat user tidak ada yang login (non aktifkan saat sudah terhubung dengan login system)
  // if (!user) {
  //   return (
  //     <div className="text-center mt-10 text-red-600">
  //       Gagal memuat data pengguna. Silakan login ulang.
  //     </div>
  //   );
  // }

  return (
    <section
      className="min-h-screen min-w-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Bg_desktop})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row items-stretch justify-center px-6 w-full">
        <Card className="font-futura border-4 w-full border-primary md:rounded-r-none md:border-r-0 md:w-xl bg-gradient-to-r from-white from-50% to-100% to-secondary">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-2 ">
              <img src={logo} className="h-10 aspect-auto" />
              <div className="flex flex-col">
                <CardTitle>
                  <h2 className="text-3xl text-center sm:text-start">
                    FORM TRANSAKSI TIKET
                  </h2>
                </CardTitle>
                <CardDescription className="text-center sm:text-start">
                  Isi beberapa data berikut untuk membeli tiket anda!
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col">
                {/* Nama user bisa diubah, tapi awalnya diisi dari data login */}
                <Input
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  value={form.nama}
                  onChange={handleChange}
                  readOnly
                  required
                  className="p-2 border rounded bg-gray-100 cursor-not-allowed"
                  hidden
                />
              </div>

              {/* Email wajib ambil dari akun user, dan tidak bisa diubah */}
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                readOnly
                // 🔒 Tidak bisa diubah
                required
                hidden
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              />

              {/* No HP bebas diubah */}
              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="noTelp">Nomor Telepon</Label>
                <Input
                  type="tel"
                  name="noTelp"
                  placeholder="No. Telepon"
                  value={form.noTelp}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mx-auto py-5">
                <Turnstile
                  sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onVerify={(token) => setToken(token)}
                  refreshExpired="auto"
                />
              </div>
              {/* Jumlah tiket bisa diubah */}
              <div className="flex flex-col w-full gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  variant="clay"
                  disabled={mutation.isPending} // 🔒 Cegah submit saat loading
                >
                  {mutation.isPending ? "MEMPROSES..." : "BAYAR SEKARANG"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div
          className="hidden md:block border-4 border-solid border-primary border-l-0 rounded-l-none rounded-2xl"
          style={{
            borderLeft: "4px dashed var(--primary)", // tailwind's default 'primary' color (adjust as needed)
          }}
        >
          <img
            src={poster}
            className="hidden md:h-86 rounded-l-none rounded-lg  shadow-2xl"
            style={{ display: "block" }} // removes extra spacing
          />
        </div>
        {/* <img className="h-90 border-4 border-l-0 rounded-l-none rounded-2xl border-primary shadow-2xl" src={poster} /> */}
      </div>
    </section>
  );
};

export default Index;
