import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <h1 className="text-4xl font-bold mb-8">Турнирный рейтинг</h1>
      <div className="space-y-4">
        <Link href="/players">
          <a className="block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">Игроки</a>
        </Link>
        <Link href="/tournaments">
          <a className="block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">Турниры</a>
        </Link>
        <Link href="/adminka">
          <a className="block bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition">Админка</a>
        </Link>
      </div>
    </div>
  )
}