import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from '../../assets/images/logo.png';

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

const YesMabaPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/login/register-form');
  };

  const handleNoClick = () => {
    navigate('/login/login-form');
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
        WELCOME, MABA!
      </h2>

      {/* Buttons */}
      <div className="flex flex-row gap-4 w-full max-w-md justify-center">
        <Button
          onClick={handleYesClick}
          sx={{
            flex: 1,
            py: 0.5,
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Title Hero, sans-serif',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to bottom, #B2203B, #5B0712)',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              background: 'linear-gradient(to bottom, #a01c34, #4a0510)',
            },
          }}
        >
          REGISTER
        </Button>
        <Button
          onClick={handleNoClick}
          sx={{
            flex: 1,
            py: 0.5,
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Title Hero, sans-serif',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to bottom, #B2203B, #5B0712)',
            color: 'white',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            '&:hover': {
              background: 'linear-gradient(to bottom, #a01c34, #4a0510)',
            },
          }}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default YesMabaPage;
