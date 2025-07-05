import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Tournament({ tournament, matches }) {
  if (!tournament) {
    return <div>Турнир не найден</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/tournaments"><a>← Назад к списку турниров</a></Link>

      <h1>{tournament.name}</h1>
      <p><b>Место:</b> {tournament.location}</p>
      <p><b>Дата начала:</b> {new Date(tournament.start_date).toLocaleDateString()}</p>

      <h2>Матчи</h2>
      {matches.length === 0 && <p>Матчи пока не созданы.</p>}
      <ul>
        {matches.map(m => (
          <li key={m.id} style={{ marginBottom: '0.5rem' }}>
            <b>{m.player1?.name || 'Игрок 1'}</b> vs <b>{m.player2?.name || 'Игрок 2'}</b><br/>
            Счёт: {m.score || '–'}<br/>
            Дата: {m.match_date ? new Date(m.match_date).toLocaleString() : '–'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    // Получаем турнир
    const tournamentRes = await axios.get(`${API_URL}/items/tournaments/${params.id}`);

    // Получаем матчи, связанные с турниром, с расширением данных игроков
    const matchesRes = await axios.get(`${API_URL}/items/matches`, {
      params: {
        filter: { tournament: { _eq: params.id } },
        // Подгружаем данные игроков по связям (player1 и player2)
        fields: ['id', 'score', 'match_date', 'player1.name', 'player2.name'],
        sort: 'match_date',
      },
    });

    return {
      props: {
        tournament: tournamentRes.data.data || null,
        matches: matchesRes.data.data || [],
      },
    };
  } catch (error) {
    console.error('Ошибка загрузки турнира или матчей:', error);
    return {
      props: {
        tournament: null,
        matches: [],
      },
    };
  }
}
