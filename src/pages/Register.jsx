import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ email, password });
      navigate('/login');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <Box p="40px" textAlign="center">
      <Typography variant="h4">Регистрация</Typography>

      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 3 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Пароль"
        type="password"
        fullWidth
        sx={{ mt: 3 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleRegister}
      >
        Зарегистрироваться
      </Button>
    </Box>
  );
};

export default Register;
