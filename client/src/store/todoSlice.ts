import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

export interface Todo {
  _id: string
  text: string
}

interface State {
  todos: Todo[]
}

export const NAME = 'todos' as const

const INITIAL_STATE: State = {
  todos: [],
}

export const todoSlice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    loadTasks: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    },
    'task:created': (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload]
    },
    'task:updated': (state, action: PayloadAction<Todo>) => {
      const todoIndex = state.todos.map((todo) => todo._id).indexOf(action.payload._id)

      state.todos[todoIndex] = { _id: action.payload._id, text: action.payload.text }
    },
    'task:deleted': (state, action: PayloadAction<{ _id: string }>) => {
      const todoIndex = state.todos.findIndex((todo) => todo._id === action.payload._id)

      if (todoIndex === -1) {
        return
      }

      state.todos.splice(todoIndex, 1)
    },
  },
})

export const { loadTasks } = todoSlice.actions

export const TODOS = (state: RootState): State['todos'] => state.todo.todos

export default todoSlice.reducer
