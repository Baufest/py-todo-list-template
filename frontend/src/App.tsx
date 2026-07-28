import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTodos } from '@/hooks/useTodos'
import { Header } from '@/components/Header'
import { FilterBar, type FilterValue } from '@/components/FilterBar'
import { TodoList } from '@/components/TodoList'
import { TodoForm } from '@/components/TodoForm'
import { Button } from '@/components/ui/button'

function App() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [addOpen, setAddOpen] = useState(false)

  const completedParam = filter === 'all' ? undefined : filter === 'completed'
  const { data: todos = [], isLoading } = useTodos(completedParam)

  const allTodos = useTodos(undefined).data ?? []
  const counts = {
    all: allTodos.length,
    pending: allTodos.filter((t) => !t.completed).length,
    completed: allTodos.filter((t) => t.completed).length,
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {counts.pending} pending · {counts.completed} completed
            </p>
          </div>
          <Button onClick={() => setAddOpen(true)} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </div>

        <FilterBar value={filter} onChange={setFilter} counts={counts} />

        <TodoList todos={todos} isLoading={isLoading} filter={filter} />
      </main>

      <TodoForm open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}

export default App
