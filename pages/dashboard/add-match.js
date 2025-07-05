import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function AddMatch() {
  useAuth();

  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score, setScore] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [tourRes, playersRes] = await Promise.all([
          axios.get(`${DIRECTUS_URL}/items/tournaments?limit=100`),
          axios.get(`${DIRECTUS_URL}/items/players?limit=100`),
        ]);
        setTournaments(tourRes.data.data);
        setPlayers(playersRes.data.data);
      } catch (err) {
        setError('Ошибка при загрузке турниров или игроков');
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedTournament) {
      setError('Выберите турнир');
      return;
    }
    if (!player1 || !player2) {
      setError('Выберите обоих игроков');
      return;
    }
    if (player1 === player2) {
      setError('Игроки должны быть разными');
      return;
    }
    if (!score.trim()) {
      setError('Введите счёт матча');
      return;
    }

    try {
      await axios.post(`${DIRECTUS_URL}/items/matches`, {
        tournament: selectedTournament,
        player_1: player1,
        player_2: player2,
        score: score.trim(),
      });
      setSuccess('Матч успешно добавлен');
      setSelectedTournament('');
      setPlayer1('');
      setPlayer2('');
      setScore('');
    } catch (err) {
      setError('Ошибка при добавлении матча');
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl mb-4">Добавить матч</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите турнир</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите игрока 1</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите игрока 2</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Счёт (например, 6-3, 4-6, 7-6)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Добавить матч
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}

      <Link href="/dashboard">
        <a className="block mt-6 text-blue-600 hover:underline">Вернуться в дашборд</a>
      </Link>
    </div>
  );
}
