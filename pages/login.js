// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus-4fzx.onrender.com';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('org@gmail.com'); // для теста
  const [password, setPassword] = useState('1234');     // для теста
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.data.access_token;
      localStorage.setItem('directus_token', token);
      router.push('/dashboard');
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-6 text-center font-semibold">Вход для организатора</h2>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </label>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

        <p className="mt-4 text-xs text-gray-500">
          Тестовые данные: <br />
          Email: <b>org@gmail.com</b><br />
          Пароль: <b>1234</b>
        </p>
      </form>
    </div>
  );
}
