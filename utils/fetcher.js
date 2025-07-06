export default function fetcher(url) {
  const fullUrl = process.env.NEXT_PUBLIC_API_URL + '/api' + url;
  return fetch(fullUrl).then(res => {
    if (!res.ok) throw new Error('Ошибка API: ' + res.status);
    return res.json();
  });
}