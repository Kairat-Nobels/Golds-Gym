import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { getActivities, deleteActivity } from '../api/activityApi';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const loadActivities = async () => {
    const data = await getActivities(user.id);
    setActivities(data);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleDelete = async (id) => {
    await deleteActivity(id);
    loadActivities();
  };

  const totalTrainings = activities.length;
  const totalSets = activities.reduce((sum, item) => sum + Number(item.sets || 0), 0);
  const totalReps = activities.reduce((sum, item) => sum + Number(item.reps || 0), 0);
  const totalMinutes = activities.reduce((sum, item) => sum + Number(item.duration || 0), 0);

  return (
    <Box p="30px">
      <Typography variant="h4" fontWeight="bold" mb="30px">
        Активность
      </Typography>

      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Тренировок</Typography>
              <Typography variant="h4" fontWeight="bold">{totalTrainings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Подходов</Typography>
              <Typography variant="h4" fontWeight="bold">{totalSets}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Повторений</Typography>
              <Typography variant="h4" fontWeight="bold">{totalReps}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Минут</Typography>
              <Typography variant="h4" fontWeight="bold">{totalMinutes}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" mb="20px">
        История выполненных тренировок
      </Typography>

      {!activities.length && (
        <Typography fontSize="18px">
          Пока нет выполненных тренировок.
        </Typography>
      )}

      <Grid container spacing={3}>
        {activities.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              {item.gifUrl && (
                <img
                  src={item.gifUrl}
                  alt={item.name}
                  style={{ width: '100%', height: '220px', objectFit: 'contain' }}
                />
              )}

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.name}
                </Typography>

                <Typography mt="10px">
                  Дата: {item.date}
                </Typography>

                <Typography>
                  Подходы: {item.sets}
                </Typography>

                <Typography>
                  Повторения: {item.reps}
                </Typography>

                <Typography>
                  Длительность: {item.duration} мин.
                </Typography>

                <Button
                  color="error"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleDelete(item.id)}
                >
                  Удалить
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Activity;
