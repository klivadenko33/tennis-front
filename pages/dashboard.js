// pages/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'ok') {
      router.push('/login');
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добро пожаловать в панель организатора!</h1>
      <p>Здесь появится управление турнирами, ввод результатов и т.д.</p>
    </div>
  );
}
