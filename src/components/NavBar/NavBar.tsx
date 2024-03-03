import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar:React.FC<{}> = () => {
  return (
    <nav className={styles.navBar}>
        <ul className={styles.navList} >
            <li className={styles.navItem} >
                <Link className={styles.navLink} to="/">Home</Link>
            </li>
            <li className={styles.navItem} >
                <Link className={styles.navLink} to="/history">History</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar