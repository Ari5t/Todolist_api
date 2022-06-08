import React from 'react';
import Tasks from './Tasks';

const TaskList = ({tasks}) => {

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
          <Tasks task={task} key={task._id}/>
        )}
      </ul>
    </div>
  );
};

export default TaskList;