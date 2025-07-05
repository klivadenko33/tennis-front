import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function AddTournament() {
  useAuth();

  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Название турнира обязательно');
      return;
    }
    if (!dateStart) {
      setError('Дата начала обязательна');
      return;
    }
    if (!dateEnd) {
      setError('Дата окончания обязательна');
      return;
    }
    if (dateStart > dateEnd) {
      setError('Дата начала не может быть позже даты окончания');
      return;
    }

    try {
      await axios.post(`${DIRECTUS_URL}/items/tournaments`, {
        name,
        date_start: dateStart,
        date_end: dateEnd,
      });
      setSuccess('Турнир успешно создан');
      setName('');
      setDateStart('');
      setDateEnd('');
    } catch (err) {
      setError('Ошибка при создании турнира');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl mb-4">Создать новый турнир</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Название турнира"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <label className="flex flex-col">
          Дата начала:
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="flex flex-col">
          Дата окончания:
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Создать
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
