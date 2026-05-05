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
}