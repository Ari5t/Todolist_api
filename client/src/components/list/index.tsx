import { FC, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import MuiList from "@mui/material/List";

import { Form } from "./form";
import { Item } from "./item";
import { socket } from "../../modules/io";

export interface ListProps {}

export interface Itasks {
  text: string;
  _id: number;
}

export const List: FC<ListProps> = () => {
  const [todos, setTodos] = useState<Itasks[]>([]);
  const addField = useRef<HTMLInputElement>(null);

  const handleLoad = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3001/api/tasks`)

    setTodos(data);
  }, []);

  const handleAdd = useCallback(async (newText: string) => {
    await axios.post(`/api/task`, {
      text: newText,
    });
  }, []);

  const handleEdit = useCallback(
    async (newText: string, id: number) => {
      await axios.put(`/api/task/${id}`, {
        text: newText,
      });

      handleLoad();
      addField.current?.focus();
    },
    [handleLoad]
  );

  const handleRemove = useCallback(
    async (id: number, index: number) => {
      const newTodos = [...todos]
      newTodos.splice(index, 1)
      setTodos(newTodos)

      await axios.delete(`http://localhost:3001/api/task/${id}`)
    },
    [todos, setTodos]
  );

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <MuiList>
      {/* @ts-ignore */}
      <Form onSave={handleAdd} ref={addField} />
      {todos.map((task, index) => (
        <Item
          key={`ToDo-${task.text}-${task._id}`}
          id={task._id}
          index={index}
          onRemove={handleRemove}
          onSave={handleEdit}
        >
          {task.text}
        </Item>
      ))}
    </MuiList>
  );
};
