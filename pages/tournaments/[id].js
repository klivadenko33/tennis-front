import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const tourRes = await axios.get(`${DIRECTUS_URL}/items/tournaments/${id}`);
        setTournament(tourRes.data.data);

        // Получаем матчи по турниру, включая имена игроков (через расширение)
        const matchesRes = await axios.get(
          `${DIRECTUS_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player_1.name,player_2.name`
        );
        setMatches(matchesRes.data.data);
      } catch (err) {
        setError('Ошибка при загрузке данных турнира');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Загрузка...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!tournament) return <p className="p-4">Турнир не найден</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl mb-4">{tournament.name}</h1>
      <p className="mb-6">
        Даты: {tournament.date_start} — {tournament.date_end}
      </p>

      <h2 className="text-2xl mb-4">Матчи</h2>
      {matches.length === 0 ? (
        <p>Матчи пока не добавлены</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.id} className="border p-3 rounded">
              <p>
                <b>{m.player_1?.name || 'Игрок 1'}</b> — <b>{m.player_2?.name || 'Игрок 2'}</b>
              </p>
              <p>Счёт: {m.score || '—'}</p>
            </li>
          ))}
        </ul>
      )}

      <Link href="/dashboard">
        <a className="inline-block mt-6 text-blue-600 hover:underline">Вернуться в дашборд</a>
      </Link>
    </div>
  );
}
