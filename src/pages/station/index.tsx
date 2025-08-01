import React, { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth"; // 🔥 Tambahkan ini
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/asset_station/station_bg_desktop.webp";
import axios from "axios";

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

const index: React.FC = () => {
  const api = useApi();
  // const { user, isLoading } = useAuth();

  // Awalnya bisa diisi dengan nama default, nanti akan diupdate dengan data user. Jadi saat sudah diintegerasi dengan sistem login,
  //  set semua field di form ini menjadi kosong, kecuali jumlahTiket harus di 1.
  const [form, setForm] = useState({
    nama: "John Doe",
    email: "john@example.com",
    noTelp: "08123456789",
    jumlahTiket: 1,
  });

  // useEffect(() => {
  //   if (user) {
  //     setForm((prev) => ({
  //       ...prev,
  //       nama: user.nama ?? "",
  //       email: user.email ?? "",
  //     }));
  //   }
  // }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "jumlahTiket" ? parseInt(value) : value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      // if (!form.nama || !form.email || !form.noTelp || !form.jumlahTiket) {
      //   throw new Error("Data tidak lengkap");
      // }

      const payload = {
        jumlahTiket: form.jumlahTiket,
        customerDetails: {
          nama: form.nama,
          email: form.email,
          noTelp: form.noTelp,
        },
      };

      const resp = await api.post<MidtransResponse>(
        "ticket/eksternal/token",
        payload
      );
      return resp.data;
    },
    onSuccess: (data) => {
      window.snap.pay(data.token, {
        onSuccess: async () => {
          try {
            const ticketId = data.ticketId;
            await api.get(`/ticket/eksternal/paid/${ticketId}`);
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
          console.error(error);
        },
        onClose: () => {
          alert("Kamu menutup pembayaran tanpa menyelesaikannya.");
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

    // if (!user || isLoading) {
    //   alert("Gagal memuat data pengguna. Silakan login ulang.");
    //   return;
    // }

    mutation.mutate();
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
    <div
      className="min-h-screen min-w-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Bg_desktop})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-80 lg:w-120 md:w-120 mx-auto mt-10 p-6 border bg-white rounded shadow text-center">
        <h2 className="text-3xl font-bold mb-6">FORM TRANSAKSI TIKET</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid">
            {/* Nama user bisa diubah, tapi awalnya diisi dari data login */}
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              readOnly
              required
              className="p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email wajib ambil dari akun user, dan tidak bisa diubah */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            readOnly
            // 🔒 Tidak bisa diubah
            required
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />

          {/* No HP bebas diubah */}
          <input
            type="tel"
            name="noTelp"
            placeholder="No. Telepon"
            value={form.noTelp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Jumlah tiket bisa diubah */}
          <input
            type="number"
            name="jumlahTiket"
            placeholder="Jumlah Tiket"
            min={1}
            value={form.jumlahTiket}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <Button
            type="submit"
            className="text-white font-bold py-4 px-6 rounded-full 
              bg-gradient-to-b from-[#A71E43] via-[#5A081E] to-[#A71E43]
              shadow-md transition duration-300"
            disabled={mutation.isPending} // 🔒 Cegah submit saat loading
          >
            {mutation.isPending ? "MEMPROSES..." : "BAYAR SEKARANG"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
