import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [completedTasks, setCompletedTasks] = useState([]); 

  const addTask = (task) => {
    setTasks([...tasks, task]); // Dodawanie nowego zadania do listy zadań
  };

  const markAsDone = (index) => {
    const newDoneTask = tasks.splice(index, 1); // Usunięcie zakończonego zadania z listy zadań
    setTasks([...tasks]); 
    setCompletedTasks([...completedTasks, ...newDoneTask]); 
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); 
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} /> 
      <TaskList tasks={tasks} onMarkAsDone={markAsDone} onDeleteTask={deleteTask} />
      <h2>Zakończone:</h2>
      <TaskList tasks={completedTasks} /> 
    </div>
  );
};

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [isHighPriority, setIsHighPriority] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onAddTask({ name: taskName, isHighPriority }); // Dodawanie nowego zadania
    setTaskName(''); // Resetowanie nazwy zadania
    setIsHighPriority(false); // Resetowanie priorytetu zadania
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Dodaj nowe zadanie" 
      />
      <label id="lab">
         Wysoki priorytet
        <input 
          type="checkbox" 
          checked={isHighPriority} 
          onChange={(e) => setIsHighPriority(e.target.checked)} 
        />
      </label>
      <button type="submit">Dodaj zadanie</button>
    </form>
  );
};

const TaskList = ({ tasks, onMarkAsDone, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ color: task.isHighPriority ? 'red' : 'white' }}>
          {task.name+ "   "}
          <span class="buttons">
          {onMarkAsDone && <button onClick={() => onMarkAsDone(index)}>Zakończone</button>}
          {onDeleteTask && <button id="delete" onClick={() => onDeleteTask(index)}>Usuń</button>}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default App;
