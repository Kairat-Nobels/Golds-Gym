// const API_URL = 'https://948536e7c2b74cad.mokky.dev';

// // регистрация
// export const registerUser = async (data) => {
//   const res = await fetch(`${API_URL}/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// };

// // логин
// export const loginUser = async (data) => {
//   const res = await fetch(`${API_URL}/auth`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// };

// // проверить пользователя
// export const getMe = async (token) => {
//   const res = await fetch(`${API_URL}/auth_me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// };

const USERS_API = 'https://6a29d295f59cb8f65f1da4fd.mockapi.io/users';

// регистрация
export const registerUser = async (data) => {
  const checkRes = await fetch(`${USERS_API}?email=${data.email}`);
  const existingUsers = await checkRes.json();

  if (existingUsers.length > 0) {
    throw new Error('Пользователь с таким email уже существует');
  }

  const res = await fetch(USERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
    }),
  });

  return res.json();
};

// логин
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${USERS_API}?email=${email}`);
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

// проверить пользователя
export const getMe = async (token) => {
  const res = await fetch(`${USERS_API}/${token}`);
  return res.json();
};
