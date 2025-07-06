export default function fetcher(url) {
  return fetch(process.env.NEXT_PUBLIC_API_URL + url)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка API: ' + res.status)
      return res.json()
    })
}