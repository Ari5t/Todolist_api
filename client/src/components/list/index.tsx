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
    const { data } = await axios.get(`http://localhost:3001/api/tasks`);

    setTodos(data);
  }, []);

  const handleAdd = useCallback(async (newText: string) => {
    socket.emit("task:create", { text: newText });
  }, []);

  const handleEdit = useCallback(async (newText: string, id: number) => {
    socket.emit("task:update", { id: id, text: newText });
    // addField.current?.focus();
  }, []);

  const handleRemove = useCallback(async (id: number) => {
    socket.emit("task:delete", { id: id });
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  useEffect(() => {
    socket.on("task:created", (data) => {
      setTodos([...todos, { _id: data.id, text: data.text }]);
    });

    socket.on("task:updated", (data) => {
      const todoIndex = todos.map((todo) => todo._id).indexOf(data.id);

      const newList = [...todos];
      newList[todoIndex] = { _id: data.id, text: data.text };

      setTodos(newList);
    });

    socket.on("task:deleted", (id) => {
      const todoIndex = todos.map((todo) => todo._id).indexOf(id);

      const newList = [...todos];
      newList.splice(todoIndex, 1);

      setTodos(newList);
    });
  }, [socket, todos, setTodos]);

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
  );
};
