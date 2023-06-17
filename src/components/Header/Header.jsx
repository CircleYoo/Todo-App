import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from './Header.module.css';

export default function Header({ filter, category, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <header className={styles.header}>
      <button onClick={() => toggleDarkMode()}>
        {darkMode ? (<BsSunFill />) : (<BsFillMoonFill />)}
      </button>
      <ul className={styles.filter}>
        {category.map((value, index) => {
          return <li key={index}>
            <button
              className={`${styles.filter} ${filter === value}`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        })}
      </ul>
    </header>
  );
}
