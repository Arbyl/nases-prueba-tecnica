import React, { ReactNode } from 'react';
import styles from './uiStyles/button.module.css';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'default' | 'icon';
  classname?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, type, size='default', classname }) => {
  return (
    <button
     onClick={onClick}
      type={type}
      className={styles.button + ' ' + styles[size] + ' ' + classname}
     >
      {children}
    </button>
  );
};
