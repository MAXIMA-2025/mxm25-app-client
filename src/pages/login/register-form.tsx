import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import logo from "../../assets/LOGO MAXIMA 1.png";

// TYPE untuk data form
type DataMahasiswa = {
  studentEmail: string;
  prodi: string;
  angkatan: string;
  nim: string;
  noWa: string;
  idLine: string;
};

const RegisterFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<DataMahasiswa>({
    studentEmail: "",
    prodi: "",
    angkatan: "",
    nim: "",
    noWa: "",
    idLine: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange =
    (field: keyof DataMahasiswa) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(formData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center px-4 text-black font-title">
      <img src={logo} alt="MAXIMA Logo" className="w-60 h-60 object-contain" />

      <h1 className="text-5xl font-bold leading-none tracking-tight font-title">
        MAXIMA 2025
      </h1>
      <h2 className="text-3xl font-bold mb-8 font-title">Daftar Akunmu</h2>

      {isLoading ? (
        <Loader2 className="animate-spin text-black mt-4" />
      ) : (
        <Card className="w-full max-w-md rounded-2xl shadow-md bg-white mb-4">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-center font-title">
              Data Mahasiswa
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-title">Email Student</label>
              <Input
                placeholder="Email Student"
                value={formData.studentEmail}
                onChange={handleInputChange("studentEmail")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-title">Prodi</label>
              <Input
                placeholder="Prodi"
                value={formData.prodi}
                onChange={handleInputChange("prodi")}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-title">NIM</label>
                <Input
                  placeholder="NIM"
                  value={formData.nim}
                  onChange={handleInputChange("nim")}
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-title">Angkatan</label>
                <Input
                  placeholder="Angkatan"
                  value={formData.angkatan}
                  onChange={handleInputChange("angkatan")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-title">No WA</label>
              <Input
                placeholder="No WA"
                value={formData.noWa}
                onChange={handleInputChange("noWa")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-title">ID Line</label>
              <Input
                placeholder="ID Line"
                value={formData.idLine}
                onChange={handleInputChange("idLine")}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-b from-[#B2203B] to-[#5B0712] hover:from-[#a01c34] hover:to-[#4a0510] text-white font-bold font-title"
            >
              REGISTER
            </Button>

            <p className="text-sm text-gray-600 text-center">
              Sudah punya akun?{" "}
              <span
                onClick={() => navigate("/login/login-form")}
                className="text-red-700 cursor-pointer underline"
              >
                Login di sini
              </span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegisterFormPage;
