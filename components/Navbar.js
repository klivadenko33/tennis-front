
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex space-x-4">
      <Link href="/">Главная</Link>
      <Link href="/players">Игроки</Link>
      <Link href="/tournaments">Турниры</Link>
      <Link href="/login">Вход</Link>
    </nav>
  );
}
    