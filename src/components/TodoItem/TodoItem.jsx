import React from 'react';
import { BsX } from "react-icons/bs";
import styles from './TodoItem.module.css';

export default function Todo({todoItem, onToggle, onDelete}) {
  const { id, text, status } = todoItem;
  const handleChange = (e) => {
  const status = e.target.checked ? 'completed' : 'active';
    onToggle({ ...todoItem, status });
  }
  const handleDelete = () => {
    onDelete(todoItem)
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

