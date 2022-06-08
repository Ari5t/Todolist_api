import React, {useState} from "react";
import axion from "axios"

const Form = ({create }) => {
    const [task, newTask] = useState('')

    const addNewTask = async(e) => {
        e.preventDefault()
        const addNewTask = await axion.post('http://localhost:3000/api/task', {text: task})
        create(addNewTask.data)
        newTask('')
    }


  return (
    <div>
      <form action="/">
        <input 
        value={task}
        onChange={e => newTask(e.target.value)}
        type="text" 
        name="text"
        placeholder="Задание"
        />
        <button onClick={addNewTask}>Отправить</button>
      </form>
    </div>
  );
};
export default Form;
