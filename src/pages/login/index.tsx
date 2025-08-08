<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../../assets/images/logo.png";
import Google from "../../assets/images/google-icon-logo-svgrepo-com.svg";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import backgroundImg from "@/assets/images/onboarding.webp";
import backdropLogo from "@/assets/images/LogoBackdrop.webp";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/login/mahasiswa");
  };

  const handleGoogleClick = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/google`
      );
      const url = res.data?.data?.authUrl;
      console.log(url);
      window.location.href = url; // Redirect to Google OAuth
    } catch (error) {
      toast.error("Failed to generate Google auth URL");
    }
  };
=======
import React from 'react'
>>>>>>> ec1be48dffed1e00531ab77d7b5da182716915ee

const index = () => {
  return (
<<<<<<< HEAD
    <section
      className="min-h-screen w-screen bg-black/40 flex flex-col gap-4 items-center justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken", // <-- key line
      }}
    >
      {/* Logo */}
      <div
        className="p-4 drop-shadow-2xl"
        style={{
          backgroundImage: `url(${backdropLogo})`,
          backgroundSize: "cover",
        }}
      >
        <img
          src={logo}
          alt="MAXIMA Logo"
          className="size-30 object-contain drop-shadow-2xl"
        />
      </div>
      <Card className="flex flex-col items-center">
        <CardTitle className="px-4 font-futura text-xl font-semibold text-center">
          Apakah anda merupakan Mahasiswa Baru UMN 2025?
        </CardTitle>
=======
    <div>index</div>
  )
}
>>>>>>> ec1be48dffed1e00531ab77d7b5da182716915ee

export default index