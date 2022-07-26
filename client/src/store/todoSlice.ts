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
    'add-Task': (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload]
    },
    editTask: (state, action) => {},
    removeTask: (state, action) => {},
  },
})

export const { editTask, removeTask } = todoSlice.actions

export const TODOS = (state: RootState): State['todos'] => state.todo.todos

export default todoSlice.reducer
