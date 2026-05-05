import React, { useState, useEffect } from 'react'

const App = () => {

    const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

    useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

    const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

   return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>

      <hr />

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
