const API_URL = 'https://948536e7c2b74cad.mokky.dev';

export const getActivities = async (userId) => {
  const res = await fetch(`${API_URL}/activities?userId=${userId}`);
  return res.json();
};

export const addActivity = async (activity) => {
  const res = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });

  return res.json();
};

export const deleteActivity = async (id) => {
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};
