import { pointerIntersection } from "@dnd-kit/collision"
import { useDroppable } from "@dnd-kit/react"

import { cn } from "@/lib/utils"
import { useColumnTodos } from "@/store/todo-selectors"
import type { TodoStatus } from "@/types/todo"

import { canMove, isTodoStatus } from "../model"
import { STATUS_LABELS } from "./status-labels"
import { TodoItem } from "./todo-item"

interface TodoColumnProps {
  status: TodoStatus
  action?: React.ReactNode
}

export function TodoColumn({ status, action }: TodoColumnProps) {
  const todos = useColumnTodos(status)
  const { ref, isDropTarget } = useDroppable({
    id: status,
    collisionDetector: pointerIntersection,
    accept: (source) =>
      isTodoStatus(source.data.status) && canMove(source.data.status, status),
  })

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-muted/50 p-3 transition-shadow",
        isDropTarget && "ring-2 ring-ring/50"
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
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  )
}
