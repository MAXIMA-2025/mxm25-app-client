import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import backgroundImg from "@/assets/images/onboarding.webp";
import backdropLogo from "@/assets/images/LogoBackdrop.webp";
import logo from "@/assets/images/logo.png"
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import useAuthContext from "@/hooks/useAuthContext";

const LoginPage = () => {
  const {isLoggedOut}= useAuthContext();
  const navigate = useNavigate();
  
useEffect(() => {
  if (typeof isLoggedOut === "boolean") {
    if (!isLoggedOut) {
      navigate("/main");
    }
  }
}, [isLoggedOut, navigate]);


  const handleYesClick = () => {
    navigate("/login/mahasiswa");
  };

  const handleGoogleClick = async (role: string) => {
    localStorage.setItem("google-login-role", role);
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

  return (
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

        {/* Buttons */}
        <CardFooter className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button
            onClick={handleYesClick}
            variant="clay"
            className="w-full md:w-3/4"
          >
            Mahasiswa Baru UMN 2025
          </Button>
          <Button
            onClick={async () => await handleGoogleClick("eksternal")}
            variant="outline"
            className="w-full md:w-1/4"
          >
            Login <p className="underline">Eksternal</p>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
