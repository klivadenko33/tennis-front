import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function AddPlayer() {
  useAuth();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Имя игрока обязательно');
      return;
    }

    try {
      await axios.post(`${DIRECTUS_URL}/items/players`, { name });
      setSuccess('Игрок успешно добавлен');
      setName('');
    } catch (err) {
      setError('Ошибка при добавлении игрока');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl mb-4">Добавить нового игрока</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Имя игрока"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Добавить
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}

      <Link href="/dashboard">
        <a className="block mt-6 text-blue-600 hover:underline">Вернуться в дашборд</a>
      </Link>
    </div>
  );
}
