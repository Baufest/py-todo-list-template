import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type FilterValue = 'all' | 'pending' | 'completed'

interface FilterBarProps {
  value: FilterValue
  onChange: (v: FilterValue) => void
  counts: { all: number; pending: number; completed: number }
}

export function FilterBar({ value, onChange, counts }: FilterBarProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as FilterValue)}>
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          All
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.all}
          </span>
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex-1">
          Pending
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.pending}
          </span>
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex-1">
          Completed
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.completed}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
