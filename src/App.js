import TodoList from './TodoList';
import Header from './components/Header/Header';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <TodoList />
    </DarkModeProvider>
  );
}

export default App;
