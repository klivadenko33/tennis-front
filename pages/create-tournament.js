// pages/create-tournament.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = 'https://directus-4fzx.onrender.com';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('directus_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('directus_token');
    if (!token) {
      setError('Не авторизован');
      router.push('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/items/tournaments`, {
        name,
        location,
        start_date: startDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      router.push('/dashboard');
    } catch (err) {
      setError('Ошибка при создании турнира');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Создать новый турнир</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название турнира"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
        />
        <input
          type="text"
          placeholder="Место проведения"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '200px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Создать турнир</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
