import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

export default function Tournaments() {
  const { data, error } = useSWR('/items/tournaments', fetcher)
  if (error) return <div>Ошибка</div>
  if (!data) return <div>Загрузка...</div>
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Турниры</h1>
      <div className="space-y-4">
        {data.data.map(t => (
          <Link href={`/tournaments/${t.id}`} key={t.id}>
            <a className="block border rounded-lg p-4 hover:bg-gray-50">
              <h2 className="text-2xl font-medium">{t.name}</h2>
              <p>Город: {t.city}</p>
              <p>Дата: {new Date(t.date).toLocaleDateString()}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}