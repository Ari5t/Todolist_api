import { FC, useCallback, useRef, useState } from 'react'

import MuiList from '@mui/material/List'

import { Form } from './form'
import { Item } from './item'

export interface ListProps { }

export const List: FC<ListProps> = () => {
  const [todos, setTodos] = useState<string[]>([])
  const addField = useRef<HTMLInputElement>(null)

  const handleAdd = useCallback((text: string) => {
    setTodos(todos => [...todos, text])
  }, [])

  const handleEdit = useCallback((text: string, index: number) => {
    setTodos(todos => {
      const newTodos = [...todos]
      newTodos[index] = text
      return newTodos
    })
    addField.current?.focus()
  }, [])

  const handleRemove = useCallback((index: number) => {
    setTodos(todos => {
      const newTodos = [...todos]
      newTodos.splice(index, 1)
      return newTodos
    })
  }, [])

  return (
    <MuiList>
      {/* @ts-ignore */}
      <Form onSave={handleAdd} ref={addField} />
      {todos.map((todo, index) => (
        <Item
          key={`ToDo-${todo}-${index}`}
          index={index}
          onRemove={handleRemove}
          onSave={handleEdit}
        >
          {todo}
        </Item>
      ))}
    </MuiList>
  )
}