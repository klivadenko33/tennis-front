// pages/create-tournament.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://directus-4fzx.onrender.com/items/tournaments', {
        name,
        location,
        start_date: startDate,
      });
      alert('Турнир создан!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Ошибка при создании турнира:', error);
      alert('Произошла ошибка');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Создание турнира</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название турнира"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Локация"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ✅ Сохранить турнир
        </button>
      </form>
    </div>
  );
}
