'use client'
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import {auth, signInWithGoogle } from '../../config/firebaseConfig';
import { Button } from '../../components/ui/button';
import { LogIn } from 'lucide-react';
import { NextPage } from 'next';
import styles from './login.module.css';

const LoginPage: NextPage = () => {

    if (auth.currentUser) {
        return null;
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

export default LoginPage;