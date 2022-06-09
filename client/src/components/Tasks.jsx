import React from 'react';

const Tasks = (props) => {
  const task = props.task
  return (
    <li id={task._id}><div>
      <span>{task.text}</span>
      <button>Edit</button>
      <button onClick={() => props.remove(task)}>Delete</button>
    </div></li>
    
  );
};

export default Tasks;