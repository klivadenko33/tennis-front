import { useEffect, useState } from 'react';
import { getPlayers } from '../lib/directus';

export default function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      const data = await getPlayers();
      setPlayers(data);
    }
    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Список игроков</h1>
<p>
  <Link href="/">
    <a>← На главную</a>
  </Link>
</p>
      {players.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {players.map(player => (
            <li key={player.id}>
              {player.name || 'Без имени'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
