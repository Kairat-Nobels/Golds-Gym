const API_URL = 'https://948536e7c2b74cad.mokky.dev';

export const getWorkoutPlans = async (userId) => {
  const res = await fetch(`${API_URL}/workoutPlans?userId=${userId}`);
  return res.json();
};

export const addWorkoutPlan = async (exercise) => {
  const res = await fetch(`${API_URL}/workoutPlans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
  });

  return res.json();
};

export const deleteWorkoutPlan = async (id) => {
  const res = await fetch(`${API_URL}/workoutPlans/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};

export const updateWorkoutPlan = async (id, data) => {
  const res = await fetch(`${API_URL}/workoutPlans/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
