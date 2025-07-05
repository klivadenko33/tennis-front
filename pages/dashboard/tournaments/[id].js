// pages/dashboard/tournaments/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function TournamentPage() {
  const router = useRouter();
  const { id } = router.query;

  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem('directus_token');
    if (!token) return;

    // Загрузка игроков
    axios.get(`${API_URL}/items/players`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setPlayers(res.data.data))
    .catch(err => console.error('Ошибка загрузки игроков:', err));

    // Загрузка матчей с именами игроков
    axios.get(`${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player1.name,player2.name`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setMatches(res.data.data))
    .catch(err => console.error('Ошибка загрузки матчей:', err));

  }, [id]);

  const addMatch = async () => {
    if (!player1 || !player2 || !score || player1 === player2) {
      alert('Пожалуйста, выберите разных игроков и введите счёт');
      return;
    }

    const token = localStorage.getItem('directus_token');

    try {
      const payload = {
        tournament: parseInt(id),
        player1: parseInt(player1),
        player2: parseInt(player2),
        score,
      };

      await axios.post(`${API_URL}/items/matches`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Перезагрузка матчей после добавления
      const res = await axios.get(`${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player1.name,player2.name`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMatches(res.data.data);
      setPlayer1('');
      setPlayer2('');
      setScore('');
    } catch (err) {
      console.error("Ошибка добавления матча:", err.response?.data?.errors || err.message);
      alert('Ошибка добавления матча. Подробности в консоли.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Управление турниром #{id}</h1>

      <p><Link href="/dashboard"><a>← Назад в панель организатора</a></Link></p>

      <h2>Добавить матч</h2>
      <div>
        <select value={player1} onChange={(e) => setPlayer1(e.target.value)}>
          <option value="">Выберите Игрока 1</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select value={player2} onChange={(e) => setPlayer2(e.target.value)}>
          <option value="">Выберите Игрока 2</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Счёт (например: 6-3, 6-4)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button onClick={addMatch}>Добавить матч</button>
      </div>

      <h2>Список матчей</h2>
      {matches.length === 0 ? (
        <p>Матчи пока не добавлены</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              {match.player1?.name || 'Игрок 1'} vs {match.player2?.name || 'Игрок 2'} — Счёт: {match.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
