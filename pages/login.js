import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const token = res.data.data.access_token;
      localStorage.setItem('directus_token', token);
      router.push('/dashboard');
    } catch (error) {
      alert('Ошибка авторизации: проверьте email и пароль');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Вход для организаторов</h1>
      <p><b>Тестовый логин:</b> org@gmail.com</p>
      <p><b>Пароль:</b> 1234</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Войти</button>
      </form>
      <p>
        <Link href="/">
          <a>← На главную</a>
        </Link>
      </p>
    </div>
  );
}
