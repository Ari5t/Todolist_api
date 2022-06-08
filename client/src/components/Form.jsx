import React, {useState} from "react";

const Form = () => {
    const [task, setTask] = useState('')

    const addNewTask = (e) => {
        e.preventDefault()
        console.log(task);
        setTask('')
    }


  return (
    <div>
      <form action="/">
        <input 
        value={task}
        onChange={e => setTask(e.target.value)}
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
