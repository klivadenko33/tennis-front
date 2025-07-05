
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Турнирный портал</h1>
      <ul className="space-y-2">
        <li><Link href="/players" className="text-blue-600 underline">Список игроков</Link></li>
        <li><Link href="/tournaments" className="text-blue-600 underline">Список турниров</Link></li>
        <li><Link href="/login" className="text-blue-600 underline">Вход для организатора</Link></li>
      </ul>
    </div>
  );
}
    