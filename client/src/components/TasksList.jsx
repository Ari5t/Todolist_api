import React from 'react';
import Tasks from './Tasks';

const TaskList = ({tasks, removes}) => {
  if (!tasks.length){
    return(
      <h1 style={{textAlign: 'center'}}>
        Посты не найдены!
      </h1>
    )
  }
  return (
    <div>
      <ul>
        {tasks.map((task) => 
          <Tasks task={task} remove={removes} key={task._id}/>
        )}
      </ul>
    </div>
  );
};

export default TaskList;