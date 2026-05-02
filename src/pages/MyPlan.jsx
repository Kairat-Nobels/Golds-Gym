import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import {
  deleteWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
} from '../api/workoutApi';

import { addActivity } from '../api/activityApi';

const MyPlan = () => {
  const [plans, setPlans] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const loadPlans = async () => {
    const data = await getWorkoutPlans(user.id);
    setPlans(data);
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleChange = async (id, field, value) => {
    await updateWorkoutPlan(id, { [field]: value });
    loadPlans();
  };

  const handleComplete = async (item) => {
    await updateWorkoutPlan(item.id, { completed: true });

    await addActivity({
      userId: user.id,
      exerciseId: item.exerciseId,
      name: item.name,
      gifUrl: item.gifUrl,
      target: item.target,
      equipment: item.equipment,
      sets: item.sets,
      reps: item.reps,
      duration: 20,
      date: new Date().toLocaleDateString('ru-RU'),
      completed: true,
    });

    loadPlans();
  };

  const handleDelete = async (id) => {
    await deleteWorkoutPlan(id);
    loadPlans();
  };

  return (
    <Box p="30px">
      <Typography variant="h4" fontWeight="bold" mb="30px">
        Мой план тренировок
      </Typography>

      {!plans.length && (
        <Typography fontSize="20px">
          Пока нет добавленных упражнений.
        </Typography>
      )}

      <Grid container spacing={3}>
        {plans.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <img
                src={item.gifUrl}
                alt={item.name}
                style={{ width: '100%', height: '260px', objectFit: 'contain' }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.name}
                </Typography>

                <Typography mt="10px">
                  Мышца: {item.target}
                </Typography>

                <Typography>
                  Оборудование: {item.equipment}
                </Typography>

                <TextField
                  label="Подходы"
                  type="number"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={item.sets}
                  onChange={(e) => handleChange(item.id, 'sets', e.target.value)}
                />

                <TextField
                  label="Повторения"
                  type="number"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={item.reps}
                  onChange={(e) => handleChange(item.id, 'reps', e.target.value)}
                />

                <TextField
                  label="День недели"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={item.day}
                  onChange={(e) => handleChange(item.id, 'day', e.target.value)}
                />

                <Button
                  variant={item.completed ? 'contained' : 'outlined'}
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={item.completed}
                  onClick={() => handleComplete(item)}
                >
                  {item.completed ? 'Выполнено' : 'Отметить выполненным'}
                </Button>

                <Button
                  color="error"
                  fullWidth
                  sx={{ mt: 1 }}
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

export default MyPlan;
