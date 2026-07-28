import { CheckSquare } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
        <CheckSquare className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Todo List</span>
      </div>
    </header>
  )
}
