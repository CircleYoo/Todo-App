import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from './Header.module.css';
import moment from 'moment';

export default function Header({ filter, category, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const date = new Date();
  const formattedDate = moment(date).format('MMMM Do YYYY');
  const formattedDay = moment().format('dddd');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.date}>
          <p>{formattedDate}</p>
          <h1>{formattedDay}</h1>
        </div>
        <button className={styles.mode} onClick={() => toggleDarkMode()}>
          {darkMode ? (<BsFillMoonFill />) : (<BsSunFill />)}
        </button>
      </nav>
      <ul className={styles.filters}>
        {category.map((value, index) => {
          return <li key={index}>
            <button
              className={`${filter === value && styles.selected}`}
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
