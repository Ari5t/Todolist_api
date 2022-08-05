import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Todo } from './todoSlice'
import { socket } from '../modules/io'

export const TasksApi = createApi({
  reducerPath: 'TasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Todo[], void>({
      query: () => `/tasks`,
      onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
        await cacheDataLoaded

        const listenerCreate = (data: Todo) => {
          updateCachedData((draft) => {
            draft.push(data)
          })
        }

        const listenerUpdate = (data: Todo) => {
          updateCachedData((draft) => {
            const todoIndex = draft.map((todo) => todo._id).indexOf(data._id)
          
            draft[todoIndex] = data
          })
        }
        
        const listenerDelete = (data: Todo) => {
          updateCachedData((draft) => {
            const todoIndex = draft.findIndex((todo) => todo._id === data._id)

            if (todoIndex === -1) {
              return
            }
      
            draft.splice(todoIndex, 1)
          })
        }

        socket.on('task:created', listenerCreate)

        socket.on('task:updated', listenerUpdate)

        socket.on('task:deleted', listenerDelete)

        await cacheEntryRemoved

        socket.off('task:created', listenerCreate)

        socket.off('task:updated', listenerUpdate)

        socket.off('task:deleted', listenerDelete)
        
      },
    }),
  }),
})

export const { useGetTasksQuery } = TasksApi
