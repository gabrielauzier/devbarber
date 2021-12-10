import AsyncStorageLib from '@react-native-async-storage/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async token => {
    const request = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({token}),
    });
    const json = await request.json();
    return json;
  },

  signIn: async (email, password) => {
    console.log('email: ', email);
    console.log('password: ', password);
    const request = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });
    const json = await request.json();
    return json;
  },

  signUp: async (name, email, password) => {
    const request = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });
    const json = await request.json();
    return json;
  },

  logout: async () => {
    const token = AsyncStorageLib.getItem('token');

    const request = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({token}),
    });
    const json = await request.json();
    return json;
  },
};
