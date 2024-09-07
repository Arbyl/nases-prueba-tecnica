import React from 'react';
import styles from './uiStyles/avatar.module.css';

interface AvatarProps {
  nombre: string;
}

const Avatar: React.FC<AvatarProps> = ({ nombre }) => {
  const iniciales = nombre
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('');

  const imagenSrc = `https://ui-avatars.com/api/?name=${iniciales}`;

  return <img src={imagenSrc} alt="Avatar" className={styles.avatar} />;
};

export default Avatar;