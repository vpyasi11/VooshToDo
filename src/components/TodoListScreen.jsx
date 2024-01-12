import React, { useState, useEffect } from 'react';

const TodoListScreen = ({ history }) => {
  const [tasks, setTasks] = useState([{ id: 1, title: "test", description: "test" }]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      loadTasks();
    } else {
      history.push('/Login');
    }
  }, []);

  const loadTasks = () => {
    try {
      const tasksData = localStorage.getItem('tasks');
      if (tasksData) {
        const parsedTasks = JSON.parse(tasksData);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = () => {
    try {
      const tasksData = JSON.stringify(tasks);
      localStorage.setItem('tasks', tasksData);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleMarkComplete = (task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
  };

  const handleDeleteTask = (taskToRemove) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToRemove));
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div>
        <h2>To-Do List:</h2>
        {tasks.map((task) => (
          <div key={task.id}>
            <p style={task.completed ? { textDecoration: 'line-through' } : { fontWeight: "bold" }}>
              {task.title}
            </p>
            <p style={task.completed ? { color: "gray" } : { color: "gray" }}>
              {task.description}
            </p>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <button onClick={() => history.push('/TaskDetail', { editTask, task })}>Edit</button>
              <button onClick={() => handleMarkComplete(task)}>Mark as Complete</button>
              <button onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          </div>
        ))}
        {completedTasks.length !== 0 ? <p style={{ fontWeight: "bold" }}>Completed Tasks</p> : null}
        {completedTasks.map((task) => (
          <div key={task.id}>
            <p style={{ textDecoration: 'line-through' }}>
              {task.title}
            </p>
          </div>
        ))}
        <button onClick={() => history.push('/AddTask', { addTask, length: tasks.length })}>Add New Task</button>
      </div>
      <button onClick={() => history.push('/Profile')}>Profile</button>
    </div>
  );
};

export default TodoListScreen;
