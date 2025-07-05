import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добро пожаловать на теннисный портал</h1>

      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/tournaments">
          <a style={{ marginRight: '1rem' }}>🏆 Турниры</a>
        </Link>
        <Link href="/players">
          <a style={{ marginRight: '1rem' }}>🎾 Игроки</a>
        </Link>
        <Link href="/login">
          <a>🔑 Вход для организатора</a>
        </Link>
      </nav>

      <p>Используйте этот логин для теста:</p>
      <p><b>Email:</b> org@gmail.com</p>
      <p><b>Пароль:</b> 1234</p>
    </div>
  );
}
