const API_URL = 'https://948536e7c2b74cad.mokky.dev';

// регистрация
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// логин
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// проверить пользователя
export const getMe = async (token) => {
  const res = await fetch(`${API_URL}/auth_me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
