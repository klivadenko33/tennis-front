import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена авторизации в localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать на сайт теннисного клуба</h1>

      <nav className="flex flex-col gap-4 text-lg">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <a className="text-blue-600 hover:underline">Перейти в Дашборд</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="text-blue-600 hover:underline">Вход для организатора</a>
          </Link>
        )}

        <Link href="/tournaments">
          <a className="text-blue-600 hover:underline">Турниры</a>
        </Link>
        <Link href="/players">
          <a className="text-blue-600 hover:underline">Игроки</a>
        </Link>
      </nav>
    </div>
  );
}
