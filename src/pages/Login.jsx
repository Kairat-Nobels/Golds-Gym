import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));

      // 🔥 ВАЖНО — обновляет Navbar сразу
      setUser(data.data);

      navigate('/');
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <Box p="40px" textAlign="center">
      <Typography variant="h4">Вход</Typography>

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
        onClick={handleLogin}
      >
        Войти
      </Button>
    </Box>
  );
};

export default Login;
