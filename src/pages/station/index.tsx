//Transaction .tsx
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

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
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Form Pembayaran Tiket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="noTelp"
          placeholder="No. Telepon"
          value={form.noTelp}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default index;
