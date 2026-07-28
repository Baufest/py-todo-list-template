import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { Todo } from '@/api/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUpdateTodo, useDeleteTodo } from '@/hooks/useTodos'
import { TodoForm } from './TodoForm'

interface TodoCardProps {
  todo: Todo
}

export function TodoCard({ todo }: TodoCardProps) {
  const [editing, setEditing] = useState(false)
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  function handleToggle() {
    updateTodo.mutate({ id: todo.id, data: { completed: !todo.completed } })
  }

  function handleDelete() {
    deleteTodo.mutate(todo.id)
  }

  return (
    <>
      <Card className={todo.completed ? 'opacity-60' : ''}>
        <CardContent className="py-4 px-5 flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            disabled={updateTodo.isPending}
            className="mt-0.5 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium break-words ${
                todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p className="text-xs text-muted-foreground mt-0.5 break-words">{todo.description}</p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Badge variant={todo.completed ? 'secondary' : 'outline'} className="text-xs hidden sm:inline-flex">
              {todo.completed ? 'Done' : 'Pending'}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setEditing(true)}
              aria-label="Edit task"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleDelete}
              disabled={deleteTodo.isPending}
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <TodoForm
        open={editing}
        onOpenChange={setEditing}
        initialValues={{ title: todo.title, description: todo.description ?? '' }}
        todoId={todo.id}
      />
    </>
  )
}
