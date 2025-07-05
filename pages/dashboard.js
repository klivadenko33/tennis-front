// pages/dashboard.js

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Панель организатора</h1>
      <p>
        <Link href="/">
          <a>← На главную</a>
        </Link>
      </p>

      {/* Сюда дальше добавим список турниров */}
    </div>
  );
}


import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('directus_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Панель организатора</h1>
      <p>Здесь можно будет создавать и управлять турнирами</p>
      <p><a href="/create-tournament">Создать новый турнир</a></p>
    </div>
  );
}
