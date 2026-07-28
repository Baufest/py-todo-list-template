import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { todosApi } from '@/api/todos'
import type { TodoCreate, TodoUpdate } from '@/api/types'

export const TODOS_KEY = 'todos'

export function useTodos(completed?: boolean) {
  return useQuery({
    queryKey: [TODOS_KEY, completed],
    queryFn: () => todosApi.list(completed),
  })
}

export function useCreateTodo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TodoCreate) => todosApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [TODOS_KEY] }),
  })
}

export function useUpdateTodo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) => todosApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [TODOS_KEY] }),
  })
}

export function useDeleteTodo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => todosApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [TODOS_KEY] }),
  })
}
