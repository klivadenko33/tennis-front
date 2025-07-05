import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function Dashboard() {
  useAuth();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await axios.get(`${DIRECTUS_URL}/items/tournaments`);
        setTournaments(response.data.data);
      } catch (error) {
        console.error('Ошибка при загрузке турниров:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTournaments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-3xl mb-6">Дашборд организатора</h1>
      <div className="mb-4 flex gap-4">
        <Link href="/">
          <a className="text-blue-600 hover:underline">На главную</a>
        </Link>
        <Link href="/dashboard/add-player">
          <a className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Добавить игрока
          </a>
        </Link>
        <Link href="/dashboard/add-tournament">
          <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Создать турнир
          </a>
        </Link>
      </div>

      <h2 className="text-2xl mb-4">Список турниров</h2>

      {loading ? (
        <p>Загрузка турниров...</p>
      ) : tournaments.length === 0 ? (
        <p>Турниров пока нет</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {tournaments.map((t) => (
            <li key={t.id}>
              <Link href={`/tournaments/${t.id}`}>
                <a className="text-blue-600 hover:underline">{t.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
