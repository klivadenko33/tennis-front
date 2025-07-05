// pages/tournaments/[id].js
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Tournament({ tournament }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Загрузка...</div>;
  }

  if (!tournament) {
    return <div>Турнир не найден</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{tournament.name}</h1>
      <p><b>Место:</b> {tournament.location}</p>
      <p><b>Дата начала:</b> {new Date(tournament.start_date).toLocaleDateString()}</p>
      {/* Здесь позже добавим турнирную сетку и матчи */}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`${API_URL}/items/tournaments/${params.id}`);
    return {
      props: {
        tournament: res.data.data || null,
      },
    };
  } catch (error) {
    console.error('Ошибка загрузки турнира:', error);
    return {
      props: {
        tournament: null,
      },
    };
  }
}
