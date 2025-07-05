import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus-4fzx.onrender.com";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await axios.get(`${DIRECTUS_URL}/items/players`);
        setPlayers(response.data.data || []);
      } catch (error) {
        console.error("Ошибка получения игроков:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Список игроков</h1>
      <nav className="mb-6 space-x-4">
        <Link href="/">
          <a className="text-blue-600 hover:underline">Главная</a>
        </Link>
        <Link href="/add-player">
          <a className="text-blue-600 hover:underline">Добавить игрока</a>
        </Link>
      </nav>

      {loading ? (
        <p>Загрузка...</p>
      ) : players.length === 0 ? (
        <p>Игроков пока нет.</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player.id}
              className="p-4 border rounded bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold">{player.name}</p>
              {player.club && <p className="text-gray-600">Клуб: {player.club}</p>}
              {/* Добавь другие поля по необходимости */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
