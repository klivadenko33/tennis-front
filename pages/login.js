import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { access_token } = response.data;

      localStorage.setItem('directus_token', access_token);
      setError('');
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Невірна пошта або пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Вхід для організатора</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="org@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Пароль</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Увійти
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Тестовий вхід: org@gmail.com / 1234
        </p>
      </div>
    </div>
  );
}
