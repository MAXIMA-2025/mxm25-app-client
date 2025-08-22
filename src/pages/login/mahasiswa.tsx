import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import logo from "../../assets/images/logo.png";
import Google from "../../assets/images/google-icon-logo-svgrepo-com.svg";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import backgroundImg from "@/assets/images/onboarding.webp";
import backdropLogo from "@/assets/images/LogoBackdrop.webp";
import { toast } from "sonner";
import axios from "axios";

const titleStyle: React.CSSProperties = {
  fontFamily: "Title Hero, sans-serif",
  fontWeight: "bold",
  fontStyle: "normal",
  fontSize: "48px",
  lineHeight: "1",
  letterSpacing: "-0.03em",
  textAlign: "center",
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  ...titleStyle,
  fontSize: "48px",
  marginBottom: "1rem",
};

const Mahasiswa = () => {
  const navigate = useNavigate();

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

  const handleYesClick = () => {
    navigate("/login/onboarding");
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
      <Card className="w-5/6 md:w-4/6">
        <CardHeader>
          <CardTitle className="font-futura text-xl font-semibold">
            Selamat Datang di MAXIMA 2025!
          </CardTitle>
          <CardDescription className="font-futura">
            Segera daftarkan dirimu !
          </CardDescription>
        </CardHeader>

        {/* Buttons */}
        <CardFooter className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button
            onClick={handleYesClick}
            variant="clay"
            className="w-full md:w-1/2"
          >
            REGISTER
          </Button>
          <Button
            onClick={async () => await handleSSOLogin("mahasiswa")}
            variant="outline"
            className="w-full md:w-1/2"
          >
            <img src={Google} className="size-5"/> LOGIN
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Mahasiswa;
