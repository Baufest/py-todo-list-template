import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodos'

interface TodoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  todoId?: number
  initialValues?: { title: string; description: string }
}

export function TodoForm({ open, onOpenChange, todoId, initialValues }: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')

  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()

  const isPending = createTodo.isPending || updateTodo.isPending

  function handleOpenChange(value: boolean) {
    if (!value) {
      setTitle(initialValues?.title ?? '')
      setDescription(initialValues?.description ?? '')
    }
    onOpenChange(value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    if (todoId !== undefined) {
      updateTodo.mutate(
        { id: todoId, data: { title: title.trim(), description: description.trim() || undefined } },
        { onSuccess: () => onOpenChange(false) }
      )
    } else {
      createTodo.mutate(
        { title: title.trim(), description: description.trim() || undefined },
        {
          onSuccess: () => {
            setTitle('')
            setDescription('')
            onOpenChange(false)
          },
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{todoId !== undefined ? 'Edit task' : 'New task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="todo-title">Title</Label>
            <Input
              id="todo-title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="todo-description">Description</Label>
            <Textarea
              id="todo-description"
              placeholder="Optional details…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {todoId !== undefined ? 'Save changes' : 'Add task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
