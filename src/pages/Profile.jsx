import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { getWorkoutPlans } from '../api/workoutApi';
import { getActivities } from '../api/activityApi';

const Profile = () => {
  const [plans, setPlans] = useState([]);
  const [activities, setActivities] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const loadData = async () => {
      const plansData = await getWorkoutPlans(user.id);
      const activitiesData = await getActivities(user.id);

      setPlans(plansData);
      setActivities(activitiesData);
    };

    loadData();
  }, []);

  const completedPlans = plans.filter((item) => item.completed).length;
  const activePlans = plans.filter((item) => !item.completed).length;
  const totalSets = activities.reduce((sum, item) => sum + Number(item.sets || 0), 0);
  const totalReps = activities.reduce((sum, item) => sum + Number(item.reps || 0), 0);
  const totalMinutes = activities.reduce((sum, item) => sum + Number(item.duration || 0), 0);

  return (
    <Box p="30px">
      <Typography variant="h4" fontWeight="bold" mb="10px">
        Профиль пользователя
      </Typography>

      <Typography fontSize="20px" mb="30px" color="text.secondary">
        {user?.email}
      </Typography>

      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">В плане</Typography>
              <Typography variant="h4" fontWeight="bold">
                {plans.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Активные</Typography>
              <Typography variant="h4" fontWeight="bold">
                {activePlans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Выполненные</Typography>
              <Typography variant="h4" fontWeight="bold">
                {completedPlans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Минут активности</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalMinutes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb="15px">
                Статистика
              </Typography>

              <Typography>Всего тренировок: {activities.length}</Typography>
              <Typography>Всего подходов: {totalSets}</Typography>
              <Typography>Всего повторений: {totalReps}</Typography>
              <Typography>Общее время: {totalMinutes} мин.</Typography>

              <Link to="/activity" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Смотреть активность
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb="15px">
                План тренировок
              </Typography>

              <Typography>Добавлено упражнений: {plans.length}</Typography>
              <Typography>Ожидает выполнения: {activePlans}</Typography>
              <Typography>Выполнено: {completedPlans}</Typography>

              <Link to="/my-plan" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Открыть мой план
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
