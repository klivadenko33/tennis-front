import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
      <p><Link href="/"><a>← На главную</a></Link></p>

      <h2>Ваши турниры</h2>
      {tournaments.length === 0 && <p>Пока турниров нет.</p>}
      <ul>
        {tournaments.map(t => (
          <li key={t.id} style={{ marginBottom: '1rem' }}>
            <b>{t.name}</b> ({t.location})<br />
            <Link href={`/dashboard/tournaments/${t.id}`}>
              <a>➕ Добавить матчи</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
