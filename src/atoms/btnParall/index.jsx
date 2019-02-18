import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BtnParall.module.css';

const BtnParall = ({ link, click, children }) => {
  return (
    <Link className={styles.button} to={link} onClick={click}>
      <span className={styles.skew_fix}>{children}</span>
    </Link>
  );
};
export default BtnParall;
