import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '../../assets/LOGO MAXIMA 1.png';

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

const LoginPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/login/YesMaba');
  };

  const handleNoClick = () => {
    navigate('/login/register-form');
  };

  return (
    <div
      className="min-h-screen w-screen bg-white flex flex-col items-center justify-center px-4"
      style={{ fontFamily: 'Title Hero, sans-serif' }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="MAXIMA Logo"
        className="w-60 h-60 object-contain"
      />

      {/* Title */}
      <h1 style={titleStyle}>MAXIMA 2025</h1>
      <h2 style={subtitleStyle}>
        Are you maba 2025?
      </h2>

      {/* Buttons */}
      <div className="flex flex-row gap-4 w-full max-w-md justify-center">
        <Button
          onClick={handleYesClick}
          variant="clay"
        >
          YES
        </Button>
        <Button
          onClick={handleNoClick}
          variant="secondary"
        >
          NO, Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
