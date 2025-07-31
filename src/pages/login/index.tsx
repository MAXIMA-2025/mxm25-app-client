import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../../assets/images/logo.png";
import Google from "../../assets/images/google-icon-logo-svgrepo-com.svg";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@mui/material";

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

const LoginPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/login/YesMaba");
  };

  const handleNoClick = () => {
    navigate("/login/register-form");
  };

  return (
    <section
      className="min-h-screen w-screen bg-white flex flex-col gap-4 items-center justify-center px-4"
      style={{ fontFamily: "Title Hero, sans-serif" }}
    >
      {/* Logo */}
      <img src={logo} alt="MAXIMA Logo" className="size-40 object-contain" />
      <Card className="flex flex-col items-center">
        <CardTitle className="px-4 font-futura text-xl font-medium text-center">
            Apakah anda merupakan Mahasiswa Baru UMN 2025?
        </CardTitle>

        {/* Buttons */}
        <CardFooter className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button onClick={handleYesClick} variant="clay" className="w-full md:w-1/2">
            YES
          </Button>
          <Button onClick={handleNoClick} variant="outline" className="w-full md:w-1/2">
            NO, <img className="size-5" src={Google} /> Sign in with Google
          </Button>

        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
