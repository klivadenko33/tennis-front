import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('directus_token');

    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/tournaments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTournaments(response.data.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setTokenChecked(true);
      }
    };

    fetchTournaments();
  }, [router]);

  if (!tokenChecked) {
    return <div className="p-4">Завантаження...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Панель організатора</h1>

      <div className="mb-4">
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Назад на головну
        </a>
      </div>

      <div className="mb-6">
        <a
          href="/dashboard/add-tournament"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4"
        >
          + Новий турнір
        </a>

        <a
          href="/dashboard/add-player"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          + Новий гравець
        </a>
      </div>

      <h2 className="text-xl font-semibold mb-2">Список турнірів:</h2>
      {tournaments.length === 0 ? (
        <p>Поки немає турнірів.</p>
      ) : (
        <ul className="space-y-2">
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <a
                href={`/dashboard/tournament/${tournament.id}`}
                className="text-blue-500 hover:underline"
              >
                {tournament.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
