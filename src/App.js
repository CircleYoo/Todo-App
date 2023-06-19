import { useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import { DarkModeProvider } from './context/DarkModeContext';

const category = ['all', 'active', 'completed'];
function App() {
  const [filter, setFilter] = useState(category[0]); // all

  return (
    <DarkModeProvider>
      <Header
        category={category}
        filter={filter}
        onFilterChange={setFilter}
      />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;