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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import poster from "@/assets/images/main/Poster.webp";
import StationLogo from "@/assets/images/main/logoRangkaian/LogoSTATION.webp";
import alfagift from "@/assets/images/main/alfagift.webp";

const Index: React.FC = () => {
  const handleSudahDownload = () => {};
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
          <form className="flex flex-col gap-4 w-full">
            <Label htmlFor="alfagiftId" className="font-futura">
              ALFAGIFT ID
            </Label>
            <Input type="text" id="alfagiftId" placeholder="cth: 123456789" />
            <Button
              variant="clay"
              onClick={handleSudahDownload}
              className="w-full"
            >
              Klaim Tiket!
            </Button>
          </form>
        </CardContent>
        {/* Buttons */}
        <CardFooter className="w-full justify-center">
          <p className="text-sm font-futura text-gray-600 text-center">
            Belum punya akun ALFAGIFT? 
            <span
              onClick={()=>window.open("https://play.google.com/store/apps/details?id=com.alfamart.alfagift", "_blank")}
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
