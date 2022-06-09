import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import axion from "axios"
import TaskList from "./components/TasksList";
// import io from 'socket.io-client'

function App() {
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async() => {
    const tasks = await axion.get('http://localhost:3000/api/tasks')
    setTasks(tasks.data)
  }

  const createTask = async(newTask) => {
    console.log(newTask);

    setTasks([...tasks, newTask])
  }

  const deleteTask = async(task) =>{
    setTasks(tasks.filter(t => t._id !== task._id))
    await axion.delete(`http://localhost:3000/api/task/${task._id}`)
  }

  const log = () =>{
    console.log(tasks);
  }

  return (
    <div>
      <button onClick={log}>click</button>
      <Form create={createTask}/>
      <TaskList tasks={tasks} removes={deleteTask}/>
    </div>
  );
}
export default App;
