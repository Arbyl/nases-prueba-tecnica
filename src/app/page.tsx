'use client'
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correctamente importado de next/navigation
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, signInWithGoogle } from '../config/firebaseConfig';
import styles from './page.module.css';
import { Button } from '../components/ui/button';
import { LogIn } from 'lucide-react';

const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth.currentUser,firebaseUser]);

  useEffect(() => {
    if (firebaseUser) {
      router.push('/home');
      return;
    }

    console.log("firebase asdsad", firebaseUser);
  }, [auth.currentUser,firebaseUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Debes iniciar sesion para ver el contenido</h1>
        <Button classname={styles.googleBtn} onClick={signInWithGoogle}>Iniciar sesión con Google
            <LogIn />
        </Button>
    </div>
);
};

export default IndexPage;
