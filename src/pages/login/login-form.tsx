import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
  fontSize: '32px',
  marginBottom: '2rem',
};

const LoginFormPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ fontFamily: 'Title Hero, sans-serif', backgroundColor: '#fefefe' }}
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

      {/* Input Fields */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <TextField
          label="Email / NIM"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: {
              fontFamily: 'Title Hero, sans-serif',
            },
          }}
          InputLabelProps={{
            style: {
              fontFamily: 'Title Hero, sans-serif',
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              fontFamily: 'Title Hero, sans-serif',
            },
          }}
          InputLabelProps={{
            style: {
              fontFamily: 'Title Hero, sans-serif',
            },
          }}
        />
      </div>

      {/* Login Button */}
      <Button
        onClick={handleLogin}
        sx={{
          mt: 3,
          px: 25.5,
          py: 1,
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
        LOGIN
      </Button>

      {/* Register Redirect */}
      <p
        className="text-sm text-gray-600 mt-4 text-center"
        style={{ fontFamily: 'Title Hero, sans-serif' }}
      >
        Belum punya akun?{' '}
        <span
          onClick={() => navigate('/login/register-form')}
          className="text-red-700 cursor-pointer underline"
        >
          Daftar di sini
        </span>
      </p>
    </div>
  );
};

export default LoginFormPage;
