//Transaction .tsx
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/bg_station/station_bg_desktop.png";
import Bg_mobile from "@/assets/bg_station/station_bg_mobile.png";

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

  // state form
  const [form, setForm] = useState({
    namaDepan: "",
    namaBelakang: "",
    email: "",
    noTelp: "",
    jumlahTiket: 1,
  });

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
      const payload = {
        jumlahTiket: form.jumlahTiket,
        customerDetails: {
          namaDepan: form.namaDepan,
          namaBelakang: form.namaBelakang,
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
        onSuccess: () => {
          window.location.href = `ticket/eksternal/paid/${data.ticketId}`;
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
    mutation.mutate();
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${Bg_desktop})`, backgroundSize: 'cover' }}>
      <div className="w-80 lg:w-120 md:w-120 mx-auto mt-10 p-6 border bg-white rounded shadow text-center">
        <h2 className="text-3xl font-bold mb-6">FORM TRANSAKSI TIKET</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nama pemilik tiket bisa diubah nantinya, tidak selalu diambil dari nama pemilik akun email eksternal user */}
            <input
              type="text"
              name="namaDepan"
              placeholder="Nama Depan"
              value={form.namaDepan}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="namaBelakang"
              placeholder="Nama Belakang"
              value={form.namaBelakang}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
          </div>
          {/* Untuk Email wajib ambil dari akun email eksternal user, dan tidak bisa diubah-ubah */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {/* Nomor telepon masih bisa diubah-ubah */}
          <input
            type="tel"
            name="noTelp"
            placeholder="No. Telepon"
            value={form.noTelp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {/* Jumlah tiket masih bisa diubah-ubah atau dibeli lebih dari 1 */}
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "MEMPROSES..." : "BAYAR SEKARANG"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
