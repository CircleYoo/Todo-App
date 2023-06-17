import React, { useState } from 'react';
import './TodoForm.css'
import Header from './components/Header/Header';
import { DarkModeProvider } from './context/DarkModeContext';
import { BsPlus, BsX } from "react-icons/bs";

export default function TodoForm() {
  // 1.3 useState로 text 상태 관리하기
  const [text, setText] = useState("")

  /* 2.1 입력받은 값을 담을 todos 상태 관리하기
  * 초기값을 빈 배열로 만든 이유 
  * : todos가 객체배열이기 때문
  */
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 2. onSubmit 이벤트 만들기
  const handleSubmit = (e) => {
    // 2.2 새로고침 방지
    e.preventDefault();

    /* 2.3 onSubmit 이벤트가 실행될 때, 입력한 값을 todos에 추가
     * 변수 addTodos를 만들고, 새로운 값이 onSubmit될 때마다 todos.concat으로 합친다.
     * 이 때, 각 원소는 text, checked가 포함된 객체로 받는다.
     */
    const addTodos = todos.concat({
      // concat() 메서드 : 원본 변경X / 새로운 배열 반환
      idx: todos.length,
      text,
      checked: false
    })

    // 2.5 input값 공백 넣는걸 방지하기 위해 if문 추가
    if (text === "") {
      return
    }

    // 2.4 변수를 setTodos에 담기
    setTodos(addTodos)
    // setTodos(todos => ({
    //     ...todos, addTodos
    // }))
    setText(""); // 2.5 입력창 초기화
  };

  // 1. input창에 입력 이벤트 작성
  const handleChange = (e) => {
    // 1.4 텍스트를 입력하면 setText에 값 담기
    setText(e.target.value);
  };

  // 4. list 삭제하기
  const handleDelete = (idx) => {
    setTodos(todos.filter(item => item.idx !== idx))
  };

  // 5. 체크
  const toggleCheck = (idx) => {
    // 5.1 idx를 인자로 받아 클릭한 체크박스가 있는 item을 찾는다.
    setTodos(todos.map(item =>
      item.idx === idx ? { ...item, checked: !item.checked } : item
      // 5.2 아이템 check를 반대로 변경
    ))
    console.log(idx)
  }

  // 6. 필터링
  const filteredTodos = todos.filter(item => {
    if (filter === 'completed') {
      return item.checked;
    } else if (filter === 'active') {
      return !item.checked;
    } else {
      return true;
    }
  });

  // 7. 로컬스토리지 저장


  return (
    <DarkModeProvider>
      <div className='todo'>
        <div className='inner'>
          <Header setFilter={setFilter} />
          <ul className='todoList'>
            {/* 3. 들어가야할 리스트 화면에 추가하기 */}
            {/* map() 메서드를 이용해 값을 하나씩 li로 출력하기 */}
            {filteredTodos.map((item) =>
              <li key={item.idx}>
                {/* map() 메서드는 배열의 각 item마다 독립적인 key를 설정해야 한다. */}
                <input
                  type="checkbox"
                  onClick={() => toggleCheck(item.idx)}
                />
                <span
                  className={
                    `todoItem${item.checked ? '-completed' : ''}`
                    // 5.3 클래스네임에 삼항식을 이용해 기본형 / 기본형-completed로 작성
                  }>
                  {item.text}
                </span>
                <button onClick={() => handleDelete(item.idx)}><BsX /></button>
                {/* 4.1 인자로 item.idx 주기 
                                * : 어떤 아이템을 삭제해야 할 지 handleDelete 함수에 전달해야 하므로 
                                */}
              </li>
            )}
          </ul>
          <form
            className='todoInput'
            // todos 배열에 새 데이터(객체)를 추가하는 함수 추가
            onSubmit={handleSubmit}
          >
            <input
              // 입력창에 입력한 값을 추적해서 setInput으로 input에 저장
              type='text'
              name='todoItem'
              placeholder='Add Todo'
              value={text}
              // 1.1 ↑ 이렇게만 적어주면 input 값이 입력되지 않는다.
              onChange={handleChange}
            // 1.2 onChange를 써서 input 값이 변경 가능하도록 만들어준다.
            />
            <button type='submit'><BsPlus /></button>
          </form>
        </div>
      </div>
    </DarkModeProvider>
  );
}

