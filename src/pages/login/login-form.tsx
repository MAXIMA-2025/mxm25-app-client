import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import logo from "../../assets/LOGO MAXIMA 1.png";

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
  fontSize: "32px",
  marginBottom: "2rem",
};

const LoginFormPage = () => {
  const navigate = useNavigate();

  const handleSSOLogin = () => {
    const redirectURL = `${import.meta.env.VITE_CLIENT_URL}/sso`;
    const ssoURL = `https://sso.umn.ac.id/cas/login?service=${encodeURIComponent(
      redirectURL
    )}`;
    window.location.href = ssoURL;
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        fontFamily: "Title Hero, sans-serif",
        backgroundColor: "#fefefe",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="MAXIMA Logo"
        className="w-48 h-48 object-contain mb-4"
      />

      {/* Title */}
      <h1 style={titleStyle}>MAXIMA 2025</h1>
      <h2 style={subtitleStyle}>Login Akunmu</h2>

      {/* SSO Button */}
      <Button
        onClick={handleSSOLogin}
        sx={{
          mt: 3,
          px: 10,
          py: 1.5,
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "Title Hero, sans-serif",
          letterSpacing: "-0.03em",
          background: "linear-gradient(to bottom, #B2203B, #5B0712)",
          color: "white",
          borderRadius: "8px",
          "&:hover": {
            background: "linear-gradient(to bottom, #a01c34, #4a0510)",
          },
        }}
      >
        Login dengan SSO UMN
      </Button>
    </div>
  );
};

export default LoginFormPage;
