// pages/dashboard/index.js

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Dashboard() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('directus_token');
    if (!token) return;

    axios.get(`${API_URL}/items/tournaments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setTournaments(res.data.data))
    .catch(err => console.error('Ошибка загрузки турниров:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Панель организатора</h1>
      <p><Link href="/"><a>🏠 Вернуться на главную</a></Link></p>
      <p><Link href="/dashboard/create"><a>➕ Создать новый турнир</a></Link></p>

      <h2>Список турниров</h2>
      {tournaments.length === 0 ? (
        <p>Турниров пока нет</p>
      ) : (
        <ul>
          {tournaments.map(t => (
            <li key={t.id}>
              <Link href={`/dashboard/tournaments/${t.id}`}>
                <a>🎾 {t.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
