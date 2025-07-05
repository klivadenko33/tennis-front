import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Tournaments({ tournaments }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Список турниров</h1>
      <p>
        <Link href="/">
          <a>← На главную</a>
        </Link>
      </p>
      {tournaments.length === 0 && <p>Турниров пока нет.</p>}
      <ul>
        {tournaments.map(t => (
          <li key={t.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/tournaments/${t.id}`}>
              <a style={{ fontWeight: 'bold', fontSize: '18px' }}>{t.name}</a>
            </Link>
            <div>Место: {t.location}</div>
            <div>Дата начала: {new Date(t.start_date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${API_URL}/items/tournaments`);
    return {
      props: {
        tournaments: res.data.data || [],
      },
    };
  } catch (error) {
    console.error('Ошибка загрузки турниров:', error);
    return {
      props: {
        tournaments: [],
      },
    };
  }
}
