import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todoReduser, { todoSlice } from './todoSlice'
import { socket } from '../modules/io'
import { TasksApi } from './fetchTasksApi'

export const store = configureStore({
  reducer: {
    todo: todoReduser,
    [TasksApi.reducerPath]: TasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TasksApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch()

// socket.onAny((event, data) => {
  
//     // @ts-ignore
//   store.dispatch(todoSlice.actions[event](data))

// })