import React, { useEffect, useState } from "react";
import useApi, { ApiResponse } from "@/hooks/useApi";
import useAuth, { type Auth, type UserEksternal } from "@/hooks/useAuth"; // 🔥 Tambahkan ini
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/asset_station/station_bg_desktop.webp";
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
import poster from "@/assets/images/main/FEEDS.webp";
import logo from "/favicon.png";

const tickets = () => {
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
                <h2 className="text-3xl text-center sm:text-start">FORM TRANSAKSI TIKET</h2>
              </CardTitle>
              <CardDescription className="text-center sm:text-start">
                Isi beberapa data berikut untuk membeli tiket anda!
              </CardDescription>
            </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>

            </div>
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
            className="hidden md:h-50 rounded-l-none rounded-lg  shadow-2xl"
            style={{ display: "block" }} // removes extra spacing
          />
        </div>
        {/* <img className="h-90 border-4 border-l-0 rounded-l-none rounded-2xl border-primary shadow-2xl" src={poster} /> */}
      </div>
      <div className="flex flex-row items-stretch justify-center px-6 w-full">
        <Card className="font-futura border-4 w-full border-primary md:rounded-r-none md:border-r-0 md:w-xl bg-gradient-to-r from-white from-50% to-100% to-secondary">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-2 ">
            <img src={logo} className="h-10 aspect-auto" />
            <div className="flex flex-col">
              <CardTitle>
                <h2 className="text-3xl text-center sm:text-start">FORM TRANSAKSI TIKET</h2>
              </CardTitle>
              <CardDescription className="text-center sm:text-start">
                Isi beberapa data berikut untuk membeli tiket anda!
              </CardDescription>
            </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>

            </div>
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
            className="hidden md:h-50 rounded-l-none rounded-lg  shadow-2xl"
            style={{ display: "block" }} // removes extra spacing
          />
        </div>
        {/* <img className="h-90 border-4 border-l-0 rounded-l-none rounded-2xl border-primary shadow-2xl" src={poster} /> */}
      </div>
    </section>
  )
}

export default tickets