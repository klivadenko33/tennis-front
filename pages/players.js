import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    // Получаем игроков
    axios.get(`${API_URL}/items/players`)
      .then(res => setPlayers(res.data.data))
      .catch(err => console.error('Ошибка получения игроков:', err));

    // Проверяем, залогинен ли организатор
    const token = localStorage.getItem('directus_token');
    if (token) setIsOrganizer(true);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Список игроков</h1>

      <p>
        <Link href="/">
          <a>← На главную</a>
        </Link>
      </p>

      {isOrganizer && (
        <p>
          <Link href="/dashboard/add-player">
            <a>➕ Добавить игрока</a>
          </Link>
        </p>
      )}

      {players.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {players.map((p) => (
            <li key={p.id}>
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
