import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import backgroundImg from "@/assets/images/onboarding.webp";

// TYPE untuk data form
type DataMahasiswa = {
  nama: string;
  nim: string;
  email: string;
  angkatan: string;
  prodi: string;
  whatsapp: string;
  lineId: string;
};

// TYPE untuk response API
type ApiResponse = {
  message: string;
  data?: any;
  errors?: string[];
};

// TYPE untuk error state
type ErrorState = {
  message: string;
  status?: string;
  fields?: { [key: string]: string };
};

const Onboarding: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const isRedirecting = useRef(false); // Prevent double clicks

  const handleSSOLogin = async (role: string) => {
    // Prevent double execution
    if (isRedirecting.current || loading) return;
    localStorage.setItem("google-login-role", role);

    isRedirecting.current = true;
    setLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/google`
      );
      const url = res.data?.data?.authUrl;
      console.log(url);

      // Add small delay to ensure state is updated
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    } catch (error) {
      toast.error("Failed to generate Google auth URL");
      setLoading(false);
      isRedirecting.current = false;
    }
  };
  const [formData, setFormData] = useState<DataMahasiswa>({
    nama: "",
    nim: "",
    email: "",
    angkatan: "2025",
    prodi: "",
    whatsapp: "",
    lineId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange =
    (field: keyof DataMahasiswa) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error when user starts typing
      if (error) {
        setError(null);
      }
      if (success) {
        setSuccess(null);
      }
    };

  const validateForm = (): boolean => {
    const requiredFields: (keyof DataMahasiswa)[] = [
      "nama",
      "nim",
      "email",
      "angkatan",
      "prodi",
      "whatsapp",
      "lineId",
    ];
    for (const field of requiredFields) {
      const value = formData[field];
      if (typeof value === "string" && !value.trim()) {
        setError({
          message: `Field ${field} harus diisi!`,
          fields: { [field]: `${field} tidak boleh kosong` },
        });
        return false;
      }
    }

    // Validate NIM format (must be 00000 + 6 digits)
    const nimPattern = /^00000\d{6}$/;
    if (!nimPattern.test(formData.nim)) {
      setError({
        message: "Format NIM tidak valid!",
        fields: {
          nim: "NIM harus format 00000XXXXXX (11 karakter, dimulai dengan 00000)",
        },
      });
      return false;
    }

    // Validate email format and domain
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      setError({
        message: "Format email tidak valid!",
        fields: { email: "Email harus menggunakan domain @gmail.com" },
      });
      return false;
    }

    // Validate prodi
    const validProdi = [
      "Informatika",
      "Sistem Informasi",
      "Teknik Komputer",
      "Teknik Elektro",
      "Teknik Fisika",
      "Film & Animasi",
      "Arsitektur",
      "DKV",
      "Strategic Communication",
      "Jurnalistik",
      "Akuntansi",
      "Manajemen",
      "D3 Perhotelan",
    ];
    if (!validProdi.includes(formData.prodi)) {
      setError({
        message: "Prodi tidak valid!",
        fields: {
          prodi: `Prodi harus salah satu dari: ${validProdi.join(", ")}`,
        },
      });
      return false;
    }

    // Validate WhatsApp format
    const whatsappPattern = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (!whatsappPattern.test(formData.whatsapp)) {
      setError({
        message: "Format WhatsApp tidak valid!",
        fields: {
          whatsapp: "WhatsApp harus format Indonesia (contoh: 081234567890)",
        },
      });
      return false;
    }

    // Validate angkatan (must be 2025)
    if (formData.angkatan !== "2025") {
      setError({
        message: "Angkatan tidak valid!",
        fields: { angkatan: "Angkatan harus 2025" },
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setError(null);
    setSuccess(null);

    toast.promise(
      new Promise<void>(async (resolve, reject) => {
        setIsLoading(true);

        const requestData = {
          role: "mahasiswa",
          data: {
            nim: formData.nim,
            nama: formData.nama,
            email: formData.email,
            angkatan: parseInt(formData.angkatan),
            prodi: formData.prodi,
            whatsapp: formData.whatsapp,
            lineId: formData.lineId,
          },
        };

        try {
          const response = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_URL}/auth/onboarding`,
            requestData,
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.status === 200) {
            setSuccess(response.data.message);
            setTimeout(async () => {
              await handleSSOLogin("mahasiswa");
            }, 500);
            setIsLoading(false);
            return resolve();
          }
        } catch (err: any) {
          const { data, statusText } = err.response;
          const message = data.message;
          console.log(err.response);

          setError({ message, status: statusText });
          setIsLoading(false);
          return reject(new Error(message));
        }

        setIsLoading(false);
      }),
      {
        loading: "Mendaftarkan akun...",
        success: "Berhasil mendaftar!",
        error: (err) => err.message || "Gagal mendaftar.",
      }
    );
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      if (error.fields) {
        const fieldErrors =
          error.fields &&
          Object.entries(error.fields)
            .map(([field, message]) => `${message}`)
            .join("\n");
        toast.error(error.message, {
          description: fieldErrors,
        });
      }
      if (error.status) {
        toast.error(error.message, {
          description: error.status,
        });
      }
    }
  }, [error]);

  return (
    <section
      className="min-h-screen w-screen bg-black/40 flex flex-col gap-4 items-center justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
      }}
    >
      <Card className="font-futura mx-2 my-6">
        <CardHeader>
          <CardTitle>Data Mahasiswa</CardTitle>
          <CardDescription>
            Isi data kamu untuk memasuki website MAXIMA 2025!
          </CardDescription>
        </CardHeader>

        {/* form wrapper */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <label className="text-sm font-title">Nama Lengkap</label>
              <Input
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleInputChange("nama")}
                className={error?.fields?.nama ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-title">Email Google</label>
              <Input
                placeholder="example@gmail.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className={error?.fields?.email ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-title">Prodi</label>
              <select
                value={formData.prodi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, prodi: e.target.value }))
                }
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  error?.fields?.prodi ? "border-red-500" : ""
                }`}
              >
                <option value="">Pilih Program Studi</option>
                <option value="Informatika">Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknik Komputer">Teknik Komputer</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
                <option value="Teknik Fisika">Teknik Fisika</option>
                <option value="Film & Animasi">Film & Animasi</option>
                <option value="Arsitektur">Arsitektur</option>
                <option value="DKV">DKV</option>
                <option value="Strategic Communication">
                  Strategic Communication
                </option>
                <option value="Jurnalistik">Jurnalistik</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Manajemen">Manajemen</option>
                <option value="D3 Perhotelan">D3 Perhotelan</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-title">NIM</label>
                <Input
                  placeholder="00000123456"
                  value={formData.nim}
                  onChange={handleInputChange("nim")}
                  className={error?.fields?.nim ? "border-red-500" : ""}
                  maxLength={11}
                />
                {/* <p className="text-xs text-gray-500">
                  Format: 00000XXXXXX (11 digit)
                </p> */}
              </div>
              {/* <div className="flex-1 space-y-2">
                <label className="text-sm font-title">Angkatan</label>
                <Input
                  placeholder="2025"
                  type="number"
                  value={formData.angkatan}
                  onChange={handleInputChange("angkatan")}
                  className={error?.fields?.angkatan ? "border-red-500" : ""}
                />
              </div> */}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-title">No WhatsApp</label>
                <Input
                  placeholder="081234567890"
                  value={formData.whatsapp}
                  onChange={handleInputChange("whatsapp")}
                  className={error?.fields?.whatsapp ? "border-red-500" : ""}
                />
                {/* <p className="text-xs text-gray-500">Format: 08XXXXXXXXX</p> */}
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-title">ID Line</label>
                <Input
                  placeholder="johndoe_line"
                  value={formData.lineId}
                  onChange={handleInputChange("lineId")}
                  className={error?.fields?.lineId ? "border-red-500" : ""}
                />
              </div>
            </div>

            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-b from-[#B2203B] to-[#5B0712] hover:from-[#a01c34] hover:to-[#4a0510] text-white font-bold font-title disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  MENDAFTAR...
                </>
              ) : (
                "REGISTER"
              )}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Sudah punya akun?
              <span
                onClick={async () => await handleSSOLogin("mahasiswa")}
                className="text-red-700 cursor-pointer underline"
              >
                Login di sini
              </span>
            </p>
          </CardContent>
        </form>
      </Card>
    </section>
  );
};

export default Onboarding;
