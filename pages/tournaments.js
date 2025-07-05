// pages/tournaments.js
import { useEffect, useState } from 'react';
import { getTournaments } from '../lib/api';
import Link from 'next/link';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTournaments();
      setTournaments(data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Список турниров</h1>
      {tournaments.length === 0 ? (
        <p>Загрузка или турниров пока нет...</p>
      ) : (
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament.id} style={{ marginBottom: '1rem' }}>
              <Link href={`/tournaments/${tournament.id}`}>
                <strong>{tournament.name}</strong>
              </Link><br />
              📍 {tournament.location} <br />
              📅 {new Date(tournament.start_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
