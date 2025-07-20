import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login/login-form');
  };

  const handleRegisterClick = () => {
    navigate('/login/register-form');
  };

  return (
    <div
      className="min-h-screen w-screen bg-white flex items-center justify-center"
      style={{ fontFamily: "Inter, sans-serif" }} // ← Global untuk seluruh page
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
        {/* Logo */}
        <img
          src="/src/assets/LOGO MAXIMA 1.png"
          alt="MAXIMA Logo"
          className="w-60 h-60 object-contain mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-black mb-10">
          MAXIMA 2025
        </h1>

        {/* Buttons Side-by-Side */}
        <div className="flex gap-4 w-full">
          <Button
            type="button"
            fullWidth
            onClick={handleLoginClick}
            sx={{
              mt: 0.3,
              py: 1.0,
              fontWeight: "bold",
              fontSize: "12px",
              background: "linear-gradient(to bottom, #B2203B, #5B0712)",
              color: "white",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif", 
              '&:hover': {
                background: "linear-gradient(to bottom, #a01c34, #4a0510)"
              }
            }}
          >
            LOGIN
          </Button>

          <Button
            type="button"
            fullWidth
            onClick={handleRegisterClick}
            sx={{
              mt: 0.3,
              py: 1.0,
              fontWeight: "bold",
              fontSize: "12px",
              background: "linear-gradient(to bottom, #B2203B, #5B0712)",
              color: "white",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              '&:hover': {
                background: "linear-gradient(to bottom, #a01c34, #4a0510)"
              }
            }}
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
