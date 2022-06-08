import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import axion from "axios"
import TaskList from "./components/TasksList";

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
  }, [])

  async function getTasks (){
    const tasks = await axion.get('http://localhost:3000/api/tasks')
    setTasks(tasks.data)
  }

  return (
    <div>
      <Form />
      <TaskList tasks={tasks}/>
    </div>
  );
}
export default App;
