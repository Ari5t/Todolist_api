import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Todo } from './todoSlice'

export const TasksApi = createApi({
  reducerPath: 'TasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Todo[], string>({
      query: () => `/tasks`,
    }),
  }),
})

export const { useGetTasksQuery } = TasksApi