import { ClipboardList } from 'lucide-react'
import type { Todo } from '@/api/types'
import { TodoCard } from './TodoCard'

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  filter: string
}

export function TodoList({ todos, isLoading, filter }: TodoListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-lg border bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    const emptyMessages: Record<string, string> = {
      all: 'No tasks yet. Add your first task!',
      pending: 'No pending tasks.',
      completed: 'No completed tasks yet.',
    }
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <ClipboardList className="h-10 w-10 opacity-40" />
        <p className="text-sm">{emptyMessages[filter] ?? 'No tasks.'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
