import React, { useState } from 'react';

const AddTaskScreen = ({ length, addTask, history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    const newTask = { id: length + 1, title, description };
    addTask(newTask);

    // Assuming you are using React Router for navigation
    history.push('/TodoList');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskScreen;
