import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

export default function Players() {
  const { data, error } = useSWR('/api/players', fetcher)

  if (error) return <div>Ошибка загрузки</div>
  if (!data) return <div>Загрузка...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Игроки</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(player => (
          <Link href={`/players/${player.id}`} key={player.id}>
            <a className="border rounded-lg p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-medium">{player.name}</h2>
              <p>Возраст: {player.age}</p>
              <p>Клуб: {player.club}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}