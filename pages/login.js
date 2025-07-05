// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (code === 'tennis2025') {
      localStorage.setItem('admin_token', 'ok');
      router.push('/dashboard');
    } else {
      alert('Неверный код!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: 'auto' }}>
      <h1>Вход для организаторов</h1>
      <input
        type="text"
        placeholder="Введите секретный код"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
        Войти
      </button>
    </div>
  );
}
