'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <div>Loading...</div>;
};

export default IndexPage;
