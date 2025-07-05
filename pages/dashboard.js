// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'ok') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, []);

  const handleCreateTournament = () => {
    router.push('/create-tournament');
  };

  if (!authorized) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добро пожаловать в панель организатора!</h1>
      <p>Вы можете создавать турниры и управлять ими.</p>

      <button
        onClick={handleCreateTournament}
        style={{
          padding: '1rem 2rem',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginTop: '1rem',
          cursor: 'pointer'
        }}
      >
        ➕ Создать турнир
      </button>
    </div>
  );
}
