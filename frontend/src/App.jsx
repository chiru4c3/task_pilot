import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>📋 Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <main>
        <AddTask onTaskAdded={() => setRefresh(!refresh)} />
        <TaskList refresh={refresh} />
      </main>
    </div>
  );
}

export default App;

