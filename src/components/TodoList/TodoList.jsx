import React, { useEffect, useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';

// Todo항목을 추가하고, 상태를 관리하며, 필터링하여 보여주는 기능
export default function TodoList({ filter }) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(storeTodos);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addTodos = todos.concat({
      idx: todos.length,
      id: uuidv4(),
      text,
      check: false,
      status: 'active'
    })

    if (text === "") { return };

    setTodos(addTodos)
    setText(""); // 입력창 초기화
  };

  // 입력값을 감지하고 'text'상태를 업데이트
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // 특정 todo 항목을 제거하기 위해 'todos' 상태를 필터링하여 업데이트
  const handleDelete = (deleted) => {
    setTodos(todos.filter(item => item.idx !== deleted.idx))
  };

  // Todo 항목의 체크를 토글여부를 확인하기 위해 'todos'상태를 매핑하여 업데이트
  const handleToggle = (toggled) => {
    setTodos(todos.map(item => item.id === toggled.id ? toggled : item))
    /* toggle된 투두 객체를 받아서
     * todos의 새로운 배열을 만든다.
     * 기존의 투두 id가 toggle한 id와 동일하다면 ? toggle 아니면 item
     */
  };

  // todos가 업데이트되면 localStorage에 데이터 저장한다. 
  useEffect(() => {
    // 데이터 저장 : JSON 형태의 문자열로 변환한다.
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 필터링된 Todo 항목을 반환하기 위해 'todos' 배열을 필터링
  const getFilteredItems = (todos, filter) => {
    if (filter === 'all') {
      return todos;
    }
    return todos.filter(todoItem => todoItem.status === filter)
  };
  const filteredTodos = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.ul}>
        {filteredTodos.map((item) => (
          <TodoItem
            key={item.id}
            todoItem={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          className={styles.input}
          type='text'
          name='todoItem'
          placeholder='add new task'
          value={text}
          onChange={handleChange}
        />
        <button
          type='submit'
          className={styles.button}
        >
          Add
        </button>
      </form>
    </section>
  );
}

function storeTodos() {
  // 데이터 출력 : todos라는 key를 불러온다.
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}