import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Link from 'next/link'

export default function PlayerPage() {
  const { query } = useRouter()
  const id = query.id
  const { data: player, error: pErr } = useSWR(id ? `/api/players/${id}` : null, fetcher)
  const { data: matches } = useSWR(id ? `/api/players/${id}/matches` : null, fetcher)
  if (pErr) return <div>Ошибка</div>
  if (!player) return <div>Загрузка...</div>
  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      <div className="max-w-xs">
        {player.photo && <img src={player.photo} alt={player.name} className="rounded-lg mb-4" />}
        <h1 className="text-3xl font-bold">{player.name}</h1>
        <p>Возраст: {player.age}</p>
        <p>Клуб: {player.club}</p>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2">Последние матчи</h2>
        <ul className="space-y-2">
          {matches?.map(m => (
            <li key={m.id} className="p-3 border rounded hover:bg-gray-50">
              vs {m.opponent} — {m.score} ({new Date(m.date).toLocaleDateString()}) — 
              <Link href={`/tournaments/${m.tournament.id}`}>
                <a className="text-blue-600 ml-1">[{m.tournament.name}]</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}