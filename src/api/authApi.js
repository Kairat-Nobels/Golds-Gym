const USERS_API = 'https://6a29d295f59cb8f65f1da4fd.mockapi.io/users';

export const registerUser = async (data) => {
  const checkRes = await fetch(USERS_API);
  const users = await checkRes.json();

  const existingUser = users.find((user) => user.email === data.email);

  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }

  const res = await fetch(USERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name || '',
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
    }),
  });

  return res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(USERS_API);
  const users = await res.json();

  const user = users.find(
    (item) => item.email === email && item.password === password,
  );

  if (!user) {
    throw new Error('Неверный email или пароль');
  }

  return {
    token: user.id,
    data: user,
  };
};

export const getMe = async (token) => {
  const res = await fetch(`${USERS_API}/${token}`);
  return res.json();
};
