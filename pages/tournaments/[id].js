import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Link from 'next/link'

export default function TournamentPage() {
  const { query } = useRouter()
  const id = query.id
  const { data: tour, error: tErr } = useSWR(id ? `/api/tournaments/${id}` : null, fetcher)
  const { data: matches } = useSWR(id ? `/api/tournaments/${id}/matches` : null, fetcher)
  if (tErr) return <div>Ошибка</div>
  if (!tour) return <div>Загрузка...</div>
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{tour.name}</h1>
      <p>Город: {tour.city}</p>
      <p>Дата: {new Date(tour.date).toLocaleDateString()}</p>

      <h2 className="text-2xl font-semibold mt-6">Матчи</h2>
      <ul className="space-y-2">
        {matches?.map(m => (
          <li key={m.id} className="p-3 border rounded hover:bg-gray-50">
            <Link href={`/players/${m.player1.id}`}>
              <a className="font-medium">{m.player1.name}</a>
            </Link>
            {' vs '}
            <Link href={`/players/${m.player2.id}`}>
              <a className="font-medium">{m.player2.name}</a>
            </Link>
            {' — '}{m.score} ({m.round})
          </li>
        ))}
      </ul>
    </div>
  )
}