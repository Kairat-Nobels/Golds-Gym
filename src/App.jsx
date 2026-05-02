import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPlan from './pages/MyPlan';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )}
        />

        <Route
          path="/my-plan"
          element={(
            <PrivateRoute>
              <MyPlan />
            </PrivateRoute>
          )}
        />

        <Route
          path="/activity"
          element={(
            <PrivateRoute>
              <Activity />
            </PrivateRoute>
          )}
        />
      </Routes>

      <Footer />
    </Box>
  );
};

export default App;
