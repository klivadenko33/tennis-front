import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function TournamentDashboard() {
  const router = useRouter();
  const { id } = router.query;

  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState('');
  const [player_1, setPlayer_1] = useState('');
  const [player_2, setPlayer_2] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const playersRes = await axios.get(`${API_URL}/items/players`);
        setPlayers(playersRes.data.data);

        const matchesRes = await axios.get(
          `${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player_1.name,player_2.name`
        );
        setMatches(matchesRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const addMatch = async () => {
    try {
      await axios.post(`${API_URL}/items/matches`, {
        tournament: parseInt(id),
        player_1: parseInt(player_1),
        player_2: parseInt(player_2),
        score,
      });

      setPlayer_1('');
      setPlayer_2('');
      setScore('');
      setError(null);

      // Обновим список матчей
      const matchesRes = await axios.get(
        `${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player_1.name,player_2.name`
      );
      setMatches(matchesRes.data.data);
    } catch (err) {
      console.error(err);
      setError('Ошибка при добавлении матча');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Панель турнира #{id}</h1>

      <a href="/" className="text-blue-500 underline mb-4 block">
        ← Вернуться на главную
      </a>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Добавить матч</h2>

        <div className="flex flex-col gap-2 mb-2">
          <select value={player_1} onChange={(e) => setPlayer_1(e.target.value)} className="p-2 border">
            <option value="">Выбери игрока 1</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select value={player_2} onChange={(e) => setPlayer_2(e.target.value)} className="p-2 border">
            <option value="">Выбери игрока 2</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Счёт (например 6-3, 6-4)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="p-2 border"
          />

          <button onClick={addMatch} className="bg-blue-600 text-white px-4 py-2 rounded">
            Добавить матч
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Матчи</h2>
        {matches.length === 0 ? (
          <p>Матчей пока нет</p>
        ) : (
          <ul className="space-y-2">
            {matches.map((match) => (
              <li key={match.id} className="border p-2 rounded">
                {match.player_1?.name || 'Игрок 1'} vs {match.player_2?.name || 'Игрок 2'} — <strong>{match.score}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
