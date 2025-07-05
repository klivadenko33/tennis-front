
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Дашборд организатора</h1>
      
      <nav className="mb-6">
        <Link href="/dashboard/add-player">
          <a className="text-blue-600 hover:underline mr-4">Добавить игрока</a>
        </Link>
        <Link href="/dashboard/add-tournament">
          <a className="text-blue-600 hover:underline mr-4">Добавить турнир</a>
        </Link>
        <Link href="/dashboard/add-match">
          <a className="text-blue-600 hover:underline">Добавить матч</a>
        </Link>
      </nav>

      {/* Тут можно вывести список турниров, игроков и т.д. */}
      <p>Выберите действие слева или из меню выше.</p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies['auth-token'];

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Можно при желании передать данные в props, например, список турниров и т.п.
  return {
    props: {}, 
  };
}
