import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await axios.get(`${DIRECTUS_URL}/items/players?limit=100`);
        setPlayers(res.data.data);
      } catch (err) {
        setError('Ошибка при загрузке игроков');
      }
    }
    fetchPlayers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl mb-6">Список игроков</h1>

      {error && <p className="text-red-600">{error}</p>}

      {players.length === 0 ? (
        <p>Игроки не найдены</p>
      ) : (
        <ul className="space-y-2">
          {players.map((p) => (
            <li key={p.id} className="border p-3 rounded">
              {p.name}
            </li>
          ))}
        </ul>
      )}

      <Link href="/">
        <a className="block mt-6 text-blue-600 hover:underline">На главную</a>
      </Link>
    </div>
  );
}
