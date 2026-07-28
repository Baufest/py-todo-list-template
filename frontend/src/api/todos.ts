import axios from 'axios'
import type { Todo, TodoCreate, TodoUpdate } from './types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
})

export const todosApi = {
  list: (completed?: boolean) =>
    api
      .get<Todo[]>('/todos/', { params: completed !== undefined ? { completed } : {} })
      .then((r) => r.data),

  get: (id: number) => api.get<Todo>(`/todos/${id}`).then((r) => r.data),

  create: (data: TodoCreate) => api.post<Todo>('/todos/', data).then((r) => r.data),

  update: (id: number, data: TodoUpdate) =>
    api.put<Todo>(`/todos/${id}`, data).then((r) => r.data),

  delete: (id: number) => api.delete(`/todos/${id}`),
}
