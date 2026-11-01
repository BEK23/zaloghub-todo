import { useTodosByStatus } from "@/store/todo-selectors"
import type { TodoStatus } from "@/types/todo"

import { STATUS_LABELS } from "./status-labels"
import { TodoItem } from "./todo-item"

interface TodoColumnProps {
  status: TodoStatus
}

export function TodoColumn({ status }: TodoColumnProps) {
  const todos = useTodosByStatus(status)

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-muted/50 p-3">
      <h2 className="text-sm font-medium text-muted-foreground">
        {STATUS_LABELS[status]}
        <span className="ml-1 tabular-nums">{todos.length}</span>
      </h2>
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
