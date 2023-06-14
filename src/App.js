import TodoList from './TodoList';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <TodoList />
    </DarkModeProvider>
  );
}

export default App;
