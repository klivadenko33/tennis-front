import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score, setScore] = useState('');

  // Загружаем игроков и матчи турнира
  useEffect(() => {
    const token = localStorage.getItem('directus_token');
    if (!token || !id) return;

    // Получаем игроков
    axios.get(`${API_URL}/items/players`)
      .then(res => setPlayers(res.data.data));

    // Получаем матчи + вложенные имена игроков
    axios.get(`${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player1.name,player2.name`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMatches(res.data.data));
  }, [id]);

  const addMatch = async () => {
    if (!player1 || !player2 || !score || player1 === player2) {
      alert('Пожалуйста, выберите разных игроков и введите счёт');
      return;
    }

    const token = localStorage.getItem('directus_token');

    try {
      // Добавляем матч
      await axios.post(`${API_URL}/items/matches`, {
        tournament: parseInt(id),
        player1: parseInt(player1),
        player2: parseInt(player2),
        score
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Очищаем форму
      setScore('');
      setPlayer1('');
      setPlayer2('');

      // Перезагружаем список матчей
      const res = await axios.get(`${API_URL}/items/matches?filter[tournament][_eq]=${id}&fields=*,player1.name,player2.name`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatches(res.data.data);
    } catch (err) {
      alert('Ошибка добавления матча');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Управление турниром #{id}</h1>

      <p><Link href="/dashboard"><a>← Назад в панель</a></Link></p>
      <p><Link href="/"><a>🏠 На главную</a></Link></p>

      <h2>Добавить матч</h2>
      <div>
        <select value={player1} onChange={e => setPlayer1(e.target.value)}>
          <option value="">Игрок 1</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <span style={{ margin: '0 1rem' }}>vs</span>

        <select value={player2} onChange={e => setPlayer2(e.target.value)}>
          <option value="">Игрок 2</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <br /><br />

        <input
          type="text"
          placeholder="Счёт (например, 6:3 6:2)"
          value={score}
          onChange={e => setScore(e.target.value)}
        />

        <br /><br />

        <button onClick={addMatch}>➕ Добавить матч</button>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Список матчей</h2>
      {matches.length === 0 ? (
        <p>Матчи пока не добавлены</p>
      ) : (
        <ul>
          {matches.map(m => (
            <li key={m.id}>
              {m.player1?.name || 'Игрок 1'} vs {m.player2?.name || 'Игрок 2'} — <b>{m.score}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
