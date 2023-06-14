import React, { useState } from 'react';
import Header from './components/Header/Header';
import { DarkModeProvider } from './context/DarkModeContext';
import { BsPlus, BsX } from "react-icons/bs";

export default function TodoList() {
    const category = ['all', 'active', 'completed'];
    const [filter, setFilter] = useState(category[0]); // all
    const [text, setText] = useState("")
    const [todos, setTodos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const addTodos = todos.concat({
            idx: todos.length,
            text,
            checked: false
        })

        if (text === "") {
            return
        }

        setTodos(addTodos)
        setText(""); // 2.5 입력창 초기화
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleDelete = (idx) => {
        setTodos(todos.filter(item => item.idx !== idx))
    };

    const toggleCheck = (idx) => {
        setTodos(todos.map(item =>
            item.idx === idx ? { ...item, checked: !item.checked } : item
        ))
        // console.log(idx)
    };

    const filteredTodos = todos.filter(item => {
        if (filter === 'completed') {
            return item.checked;
        } else if (filter === 'active') {
            return !item.checked;
        } else {
            return true;
        }
    });

    return (
        <DarkModeProvider>
            <div className='todo'>
                <div className='inner'>
                    <Header
                        filter={filter}
                        category={category}
                        onFilterChange = {setFilter}
                    />
                    <ul className='todoList'>
                        {filteredTodos.map((item) =>
                            <li key={item.idx}>
                                <input
                                    type="checkbox"
                                    onClick={() => toggleCheck(item.idx)}
                                />
                                <span
                                    className={
                                    `todoItem${item.checked ? '-completed' : ''}`
                                }>
                                    {item.text}
                                </span>
                                <button onClick={() => handleDelete(item.idx)}><BsX /></button>
                            </li>
                        )}
                    </ul>
                    <form
                        className='todoInput'
                        onSubmit={handleSubmit}
                        >
                        <input
                            type='text'
                            name='todoItem'
                            placeholder='Add Todo'
                            value={text}
                            onChange={handleChange}
                        />
                        <button type='submit'><BsPlus /></button>
                    </form>
                </div>
            </div>
        </DarkModeProvider>
    );
}

