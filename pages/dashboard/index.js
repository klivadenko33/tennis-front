import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function Dashboard() {
  useAuth();

  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const res = await axios.get(`${DIRECTUS_URL}/items/tournaments?limit=20`);
        setTournaments(res.data.data);
      } catch (err) {
        setError('Ошибка при загрузке турниров');
      }
    }
    fetchTournaments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl mb-6">Дашборд организатора</h1>

      <div className="flex gap-4 mb-8">
        <Link href="/dashboard/add-tournament">
          <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Создать турнир
          </a>
        </Link>
        <Link href="/dashboard/add-player">
          <a className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Добавить игрока
          </a>
        </Link>
        <Link href="/dashboard/add-match">
          <a className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Добавить матч
          </a>
        </Link>
      </div>

      <h2 className="text-2xl mb-4">Текущие турниры</h2>
      {error && <p className="text-red-600">{error}</p>}
      {tournaments.length === 0 ? (
        <p>Турниров пока нет</p>
      ) : (
        <ul className="space-y-3">
          {tournaments.map((t) => (
            <li key={t.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <Link href={`/tournaments/${t.id}`}>
                  <a className="text-blue-600 hover:underline">{t.name}</a>
                </Link>
                <p className="text-sm text-gray-600">
                  {t.date_start} — {t.date_end}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
