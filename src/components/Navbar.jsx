import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        gap: { sm: '123px', xs: '40px' },
        mt: { sm: '32px', xs: '20px' },
      }}
      px="20px"
    >
      <Link to="/">
        <img src={Logo} alt="logo" style={{ width: '48px', height: '48px' }} />
      </Link>

      <Stack direction="row" gap="40px" fontFamily="Alegreya" fontSize="20px" alignItems="center">
        <Link to="/" style={{ textDecoration: 'none', color: '#3A1212' }}>
          Главная
        </Link>

        <Link to="/#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>
          Упражнения
        </Link>

        {!user && (
          <>
            <Link to="/login">
              <Button variant="outlined">Войти</Button>
            </Link>

            <Link to="/register">
              <Button variant="contained">Регистрация</Button>
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile">
              <Button variant="outlined">👤 {user.email}</Button>
            </Link>

            <Link to="/my-plan">
              <Button variant="outlined">Мой план</Button>
            </Link>

            <Link to="/activity">
              <Button variant="outlined">Активность</Button>
            </Link>

            <Button color="error" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
