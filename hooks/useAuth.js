import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth');
    if (!isAuth) {
      router.push('/login');
    }
  }, [router]);
}
