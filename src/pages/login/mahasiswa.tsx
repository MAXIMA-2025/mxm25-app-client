import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from "react";
import { Button } from '@/components/ui/button';
import logo from '../../assets/images/logo.png';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import backgroundImg from "../../assets/images/hero/BACKGROUND.webp";


const titleStyle: React.CSSProperties = {
  fontFamily: 'Title Hero, sans-serif',
  fontWeight: 'bold',
  fontStyle: 'normal',
  fontSize: '48px',
  lineHeight: '1',
  letterSpacing: '-0.03em',
  textAlign: 'center',
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  ...titleStyle,
  fontSize: '48px',
  marginBottom: '1rem',
};

const Mahasiswa = () => {
  const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const isRedirecting = useRef(false); // Prevent double clicks
  
  const handleSSOLogin = () => {
    // Prevent double execution
    if (isRedirecting.current || loading) return;

    isRedirecting.current = true;
    setLoading(true);

    try {
      const redirectURL = `${import.meta.env.VITE_CLIENT_URL}/login/sso`;
      const ssoURL = `https://sso.umn.ac.id/cas/login?service=${encodeURIComponent(
        redirectURL
      )}`;

      // Add small delay to ensure state is updated
      setTimeout(() => {
        window.location.href = ssoURL;
      }, 100);
    } catch (error) {
      console.error("Error redirecting to SSO:", error);
      setLoading(false);
      isRedirecting.current = false;
    }
  };

  const handleYesClick = () => {
    navigate('/login/onboarding');
  };


  return (
        <section
      className="min-h-screen w-screen bg-white flex flex-col gap-4 items-center justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo */}
      <img src={logo} alt="MAXIMA Logo" className="size-40 object-contain" />
      <Card className="w-5/6 md:w-4/6">
        <CardHeader>
        <CardTitle className="font-futura text-xl font-semibold">
          Selamat Datang di MAXIMA 2025!
        </CardTitle>
        <CardDescription className='font-futura'>Segera daftarkan dirimu menggunakan akun student!</CardDescription>
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
            onClick={handleSSOLogin}
            variant="outline"
            className="w-full md:w-1/2"
          >
            LOGIN
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Mahasiswa;
