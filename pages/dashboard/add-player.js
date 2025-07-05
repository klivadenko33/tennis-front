import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus-4fzx.onrender.com";

export default function AddPlayer() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Простая проверка — есть ли токен в localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!name.trim()) {
      setErrorMsg("Введите имя игрока");
      return;
    }
    setLoading(true);
    try {
      // Добавляем игрока через API Directus с авторизацией
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${DIRECTUS_URL}/items/players`,
        { name: name.trim(), club: club.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg("Игрок успешно добавлен!");
      setName("");
      setClub("");
    } catch (error) {
      console.error("Ошибка добавления игрока:", error);
      setErrorMsg("Ошибка при добавлении игрока");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthorized) return null; // Пока не авторизованы — не показываем форму

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Добавить нового игрока</h1>
      <nav className="mb-6 space-x-4">
        <Link href="/">
          <a className="text-blue-600 hover:underline">Главная</a>
        </Link>
        <Link href="/players">
          <a className="text-blue-600 hover:underline">Список игроков</a>
        </Link>
      </nav>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Имя игрока *
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="club">
            Клуб (необязательно)
          </label>
          <input
            id="club"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={club}
            onChange={(e) => setClub(e.target.value)}
          />
        </div>

        {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}
        {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Сохраняем..." : "Добавить игрока"}
        </button>
      </form>
    </div>
  );
}
