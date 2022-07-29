import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todoReduser, { todoSlice } from './todoSlice'
import { socket } from '../modules/io'

export const store = configureStore({
  reducer: {
    todo: todoReduser,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch()

socket.onAny((event, data) => {
  
    // @ts-ignore
  store.dispatch(todoSlice.actions[event](data))

  return () => {
    socket.off(event, data)
  }

});