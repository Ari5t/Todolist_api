import { FC, useCallback } from 'react'

import MuiList from '@mui/material/List'

import { Form } from './form'
import { Item } from './item'

import { socket } from '../../modules/io'
// import { useSocket } from '../../common/hooks/useSocket'
import { useSelector } from 'react-redux'
import { TODOS } from '../../store/todoSlice'
import { useGetTasksQuery } from '../../store/fetchTasksApi'


export interface ListProps {}

export const List: FC<ListProps> = () => {
  const todos = useSelector(TODOS)

  const { data, error, isLoading } = useGetTasksQuery("")

  const handleAdd = useCallback(async (newText: string) => {
    socket.emit('task:create', { text: newText })
  }, [])

  const handleEdit = useCallback(async (newText: string, id: string) => {
    socket.emit('task:update', { _id: id, text: newText })
  }, [])

  const handleRemove = useCallback(async (id: string) => {
    socket.emit('task:delete', { _id: id })
  }, [])

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
