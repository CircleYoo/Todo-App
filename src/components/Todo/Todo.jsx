import React from 'react';
import { BsX } from "react-icons/bs";
import styles from './Todo.module.css';

export default function Todo({todo, onToggle, onDelete}) {
  const { id, text, status } = todo;
  const handleChange = (e) => {
  const status = e.target.checked ? 'completed' : 'active';
    onToggle({ ...todo, status });
  }
  const handleDelete = () => {
    onDelete(todo)
    console.log('ddd')
  };

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${styles.text} ${status === 'completed' ? 'completed' : ''}`}
      >
        {text}
      </label>
      <button className={styles.button} onClick={handleDelete}><BsX /></button>
    </li>
  );
}

