import React, { useState } from 'react';

const TaskDetailScreen = ({ route, history }) => {
  const { task, editTask } = route.params;
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveChanges = () => {
    const updatedTask = {
      id: task.id,
      title: editedTitle,
      description: editedDescription
    };

    editTask(updatedTask);
    history.push('/TodoList', { updatedTask });
  };

  return (
    <div>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <input
        type="text"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default TaskDetailScreen;
