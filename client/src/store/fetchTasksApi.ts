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

        socket.on('task:created', listenerCreate)

        await cacheEntryRemoved

        socket.off('task:created', listenerCreate)
      },
    }),
  }),
})

export const { useGetTasksQuery } = TasksApi
