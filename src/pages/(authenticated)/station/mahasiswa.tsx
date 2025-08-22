import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/images/main/STATION.webp";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StationLogo from "@/assets/images/main/logoRangkaian/LogoSTATION.webp";
import alfagift from "@/assets/images/main/alfagift.webp";
import { useMutation } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";

const allowedPrefixes = [
  "999999",
  "999001",
  "999002",
  "999004",
  "999003",
  "99902000",
];

const checkPrefix = (allowed: string[]) => (val: string) =>
  allowed.some((prefix) => val.startsWith(prefix));

const alfagiftSchema = z
  .string()
  .length(16, { message: "ID harus 16 digit." })
  .refine(checkPrefix(allowedPrefixes), {
    message: "ID invalid.",
  });

const Index: React.FC = () => {
  const auth = useAuth();
  useEffect(()=>{
    auth.user?.role==="eksternal" && nav("/station")
  })
  const [alfagiftId, setAlfagiftId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const api = useApi();
  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlfagiftId(e.target.value);
    setErrorMessage(null);
  };
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await api.post("/ticket/internal/create", {
          alfagiftId,
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    },
    onSuccess: () => {
      toast.success("Berhasil klaim tiket!");
      setTimeout(() => {
        nav("/tickets");
      }, 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = alfagiftSchema.safeParse(alfagiftId);

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    mutation.mutate();
  };


  return (
    <section
      className="p-4 min-h-screen min-w-screen flex flex-col items-center gap-4 justify-center"
      style={{
        backgroundImage: `url(${Bg_desktop})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center justify-center drop-shadow-2xl">
        <img src={StationLogo} className="size-25" alt="logo station" />
        <h1 className="font-fraunces text-center text-3xl font-semibold text-shadow-2xs">
          KLAIM TICKET STATION
        </h1>
      </div>

      <Card className="flex flex-col items-center gap-4">
        <CardTitle className="flex flex-row-reverse gap-2 items-center justify-center px-4 font-futura text-xl font-semibold text-center">
          Masukkan ALFAGIFT ID Anda!
          <img src={alfagift} className="size-10" />
        </CardTitle>
        <CardContent className="w-full">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
            noValidate
          >
            <Label htmlFor="alfagiftId" className="font-futura">
              ALFAGIFT ID
            </Label>
            <Input
              type="text"
              id="alfagiftId"
              placeholder="cth: 1234567890123456"
              value={alfagiftId}
              onChange={handleChange}
              inputMode="numeric"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm font-futura">{errorMessage}</p>
            )}
            <Button type="submit" variant="clay" className="w-full">
              Klaim Tiket!
            </Button>
          </form>
        </CardContent>

        <CardFooter className="w-full justify-center">
          <p className="text-sm font-futura text-gray-600 text-center">
            Belum punya akun ALFAGIFT?{" "}
            <span
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.alfamart.alfagift",
                  "_blank"
                )
              }
              className="text-red-700 font-futura cursor-pointer underline"
            >
              Download di sini
            </span>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Index;
