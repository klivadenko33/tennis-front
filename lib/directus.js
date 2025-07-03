import axios from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus-4fzx.onrender.com';

export async function getPlayers() {
  try {
    const response = await axios.get(`${DIRECTUS_URL}/items/players`);
    return response.data.data; // Массив игроков
  } catch (error) {
    console.error('Ошибка получения игроков:', error);
    return [];
  }
}
