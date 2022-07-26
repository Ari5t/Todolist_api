import { FC, useCallback, useEffect } from 'react'
import axios from 'axios'

import MuiList from '@mui/material/List'

import { Form } from './form'
import { Item } from './item'

import { socket } from '../../modules/io'
import { useSocket } from '../../common/hooks/useSocket'
import { useSelector } from 'react-redux'
import { TODOS, todoSlice } from '../../store/todoSlice'
import { useAppDispatch } from '../../store'

export interface ListProps {}

export const List: FC<ListProps> = () => {
  const dispatch = useAppDispatch()
  const todos = useSelector(TODOS)

  const handleLoad = useCallback(async () => {
    const { data } = await axios.get(`/api/tasks`)

    // setTodos(data)
  }, [])

  const handleAdd = useCallback(async (newText: string) => {
    socket.emit('task:create', { text: newText })
  }, [])

  const handleEdit = useCallback(async (newText: string, id: string) => {
    socket.emit('task:update', { id: id, text: newText })
  }, [])

  const handleRemove = useCallback(async (id: string) => {
    socket.emit('task:delete', { id: id })
  }, [])

  useEffect(() => {
    handleLoad()
  }, [handleLoad])

  useSocket(
    'task:created',
    (data) => {
      dispatch(todoSlice.actions['add-Task']({ _id: data.id, text: data.text }))
    },
    [todos]
  )

  useSocket(
    'task:updated',
    (data) => {
      const todoIndex = todos.map((todo) => todo._id).indexOf(data.id)

      const newList = [...todos]
      newList[todoIndex] = { _id: data.id, text: data.text }

      // setTodos(newList)
    },
    [todos]
  )

  useSocket(
    'task:deleted',
    ({ id }) => {
      const todoIndex = todos.findIndex((todo) => todo._id === id)

      if (todoIndex === -1) {
        return
      }

      const newList = [...todos]
      newList.splice(todoIndex, 1)

      // setTodos(newList)
    },
    [todos]
  )

  return (
    <MuiList>
      <Form onSave={handleAdd} />
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
