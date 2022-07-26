import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTask(state, action){},
    editTask(state, action){},
    removeTask(state, action){},
  },
})

export const {addTask, editTask, removeTask} = todoSlice.actions

export default todoSlice.reducer