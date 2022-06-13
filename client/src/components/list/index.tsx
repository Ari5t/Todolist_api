import { FC, useCallback, useEffect, useRef, useState } from 'react'

import axios from 'axios'

import io from "socket.io-client";

import MuiList from '@mui/material/List'

import { Form } from './form'
import { Item } from './item'

export interface ListProps { }

type Itasks = {
  text: string;
  _id: number;
}

export const List: FC<ListProps> = () => {
  const socket = io("http://localhost:3001/", { transports: ["websocket"] });
  const [todos, setTodos] = useState<Itasks[]>([])
  const addField = useRef<HTMLInputElement>(null)

  const handleLoad = useCallback(async () => {
    const tasks = await (await axios.get(`/api/tasks`)).data
    setTodos(tasks)
  }, [])

  const handleAdd = useCallback(async (newText: string) => {
    await axios.post(`/api/task`, {
      text: newText
    })

    handleLoad()
  }, [handleLoad])

  const handleEdit = useCallback(async(newText: string, id: number) => {
    await axios.put(`/api/task/${id}`, {
      text: newText
    })

    handleLoad()
    addField.current?.focus()
  }, [handleLoad])

  const handleRemove = useCallback(async(id: number) => {
    await axios.delete(`/api/task/${id}`)
    handleLoad()
  }, [handleLoad])

  useEffect(() =>{
    socket.on("client:reload", () =>{
      handleLoad()
      console.log("200");
    })
  }, [socket, handleLoad])


  useEffect(() => {
    handleLoad()
  }, [handleLoad])

  return (
    <MuiList>
      {/* @ts-ignore */}
      <Form onSave={handleAdd} ref={addField} />
      {todos.map((task) => (
        <Item
          key={`ToDo-${task.text}-${task._id}`}
          id={task._id}
          onRemove={handleRemove}
          onSave={handleEdit}
        >
          {task.text}
        </Item>
      ))}
    </MuiList>
  )
}