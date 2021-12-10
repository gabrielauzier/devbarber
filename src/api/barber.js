import AsyncStorageLib from '@react-native-async-storage/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  getBarbers: async (lat = null, lng = null, city = null) => {
    const token = await AsyncStorageLib.getItem('token');

    const request = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${city}`,
    );
    const answer = await request.json();
    return answer;
  },

  getBarberById: async id => {
    const token = await AsyncStorageLib.getItem('token');

    const request = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
    const answer = await request.json();
    return answer;
  },

  setFavorite: async barberId => {
    const request = await fetch(`${BASE_API}/user/favorite`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({barber: barberId}),
    });
    const json = await request.json();
    return json;
  },

  setAppointment: async (
    barberId,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
  ) => {
    const token = await AsyncStorageLib.getItem('token');

    const request = await fetch(`${BASE_API}/user/appointment`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
        id: barberId,
        service,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour,
      }),
    });
    const json = await request.json();
    return json;
  },
};
