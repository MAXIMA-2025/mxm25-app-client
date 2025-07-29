import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
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

const RegisterFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentEmail: '',
    prodi: '',
    angkatan: '',
    nim: '',
    noWa: '',
    idLine: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleLogin = () => {
    // login handler logic placeholder
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center px-4"
      style={{ fontFamily: 'Title Hero, sans-serif', color: '#000' }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="MAXIMA Logo"
        className="w-60 h-60 object-contain"
      />

      {/* Title */}
      <h1 style={titleStyle}>MAXIMA 2025</h1>
      <h2 style={subtitleStyle}>Daftar Akunmu</h2>

      <Card 
        sx={{
          width: '100%',
          maxWidth: '380px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          mb: 1
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" align="center" gutterBottom fontWeight="bold" color="black" style={{ fontFamily: 'Title Hero, sans-serif' }}>
            Data
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#000' }}>
            <div>
              <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>Student Email</Typography>
              <TextField
                placeholder="Student Email"
                value={formData.studentEmail}
                onChange={handleInputChange('studentEmail')}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#000'
                  }
                }}
              />
            </div>

            <div>
              <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>Prodi</Typography>
              <TextField
                placeholder="Prodi"
                value={formData.prodi}
                onChange={handleInputChange('prodi')}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#000'
                  }
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>Angkatan</Typography>
                <TextField
                  placeholder="Angkatan"
                  value={formData.angkatan}
                  onChange={handleInputChange('angkatan')}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#000'
                    }
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>NIM</Typography>
                <TextField
                  placeholder="NIM"
                  value={formData.nim}
                  onChange={handleInputChange('nim')}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#000'
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>NO WA</Typography>
              <TextField
                placeholder="NO WA"
                value={formData.noWa}
                onChange={handleInputChange('noWa')}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#000'
                  }
                }}
              />
            </div>

            <div>
              <Typography fontSize={12} color="#000" mb={0.5} style={{ fontFamily: 'Title Hero, sans-serif' }}>ID LINE</Typography>
              <TextField
                placeholder="ID LINE"
                value={formData.idLine}
                onChange={handleInputChange('idLine')}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#000'
                  }
                }}
              />
            </div>

            {/* Login Button */}
            <div className="flex flex-col items-center">
              <Button
                onClick={handleLogin}
                sx={{
                  mt: 2,
                  px: 16.5,
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
                REGISTER
              </Button>

              {/* Register Redirect */}
              <p className="text-sm text-gray-600 mt-2" style={{ textAlign: 'center' }}>
                Sudah punya akun?{' '}
                <span
                  onClick={() => navigate('/login/login-form')}
                  className="text-red-700 cursor-pointer underline"
                >
                  Login di sini
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterFormPage;
