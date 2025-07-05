// lib/api.js
import axios from 'axios';

const BASE_URL = 'https://directus-4fzx.onrender.com';

export async function getTournaments() {
  try {
    const res = await axios.get(`${BASE_URL}/items/tournaments`);
    return res.data.data;
  } catch (err) {
    console.error('Ошибка при получении турниров:', err);
    return [];
  }
}
