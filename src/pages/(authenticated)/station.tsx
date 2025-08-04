import React, { useEffect, useState } from "react";
import useApi, { ApiResponse } from "@/hooks/useApi";
import useAuth, { type Auth, type UserEksternal } from "@/hooks/useAuth"; // 🔥 Tambahkan ini
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/asset_station/station_bg_desktop.webp";
import axios from "axios";
import { useNavigate } from "@/router";

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
  // const { user, isLoading } = useAuth();

  // Awalnya bisa diisi dengan nama default, nanti akan diupdate dengan data user. Jadi saat sudah diintegerasi dengan sistem login,
  //  set semua field di form ini menjadi kosong, kecuali jumlahTiket harus di 1.
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("10 seconds passed");
    // or some state update here
  }, 3000);

  return () => clearTimeout(timer); // optional cleanup
}, []);

  const auth = useAuth();
  const email = (auth as Auth<UserEksternal>).user?.email;
  const firstName = (auth as Auth<UserEksternal>).user?.firstName;
  const lastName = (auth as Auth<UserEksternal>).user?.lastName;
  console.log(email, firstName, lastName)

  useEffect(() => {
  if (email && firstName && lastName) {
    setForm((prev) => ({
      ...prev,
      nama: `${firstName} ${lastName}`,
      email: email,
    }));
  }
}, [email, firstName, lastName]);


  const [form, setForm] = useState({
    nama:  "",
    email: "",
    noTelp: "",
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

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = import.meta.env.VITE_NODE_ENV
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
            nav("/main");
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
    <section
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
            className="px-4"
            variant="clay"
            disabled={mutation.isPending} // 🔒 Cegah submit saat loading
          >
            {mutation.isPending ? "MEMPROSES..." : "BAYAR SEKARANG"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Index;
