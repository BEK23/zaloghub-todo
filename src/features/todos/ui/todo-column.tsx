import { CollisionPriority } from "@dnd-kit/abstract"
import { pointerIntersection } from "@dnd-kit/collision"
import { useDroppable } from "@dnd-kit/react"

import { cn } from "@/lib/utils"
import type { Todo, TodoStatus } from "@/types/todo"

import { STATUS_LABELS } from "./status-labels"
import { TodoItem } from "./todo-item"

interface TodoColumnProps {
  status: TodoStatus
  todos: Todo[]
  highlighted: boolean
  action?: React.ReactNode
}

export function TodoColumn({
  status,
  todos,
  highlighted,
  action,
}: TodoColumnProps) {
  const { ref } = useDroppable({
    id: status,
    collisionDetector: pointerIntersection,
    collisionPriority: CollisionPriority.Low,
  })

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-muted/50 p-3 transition-shadow",
        highlighted && "ring-2 ring-ring/50"
      )}
    >
      <header className="flex h-6 items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          {STATUS_LABELS[status]}
          <span className="ml-1 tabular-nums">{todos.length}</span>
        </h2>
        {action}
      </header>
      {todos.length === 0 ? (
        <p className="py-2 text-center text-xs text-muted-foreground">Пусто</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index} />
          ))}
        </ul>
      )}
    </section>
  )
}
