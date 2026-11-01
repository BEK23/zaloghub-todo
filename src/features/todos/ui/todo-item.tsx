import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTodoStore } from "@/store/todo-store"
import { TODO_STATUS, type Todo } from "@/types/todo"

import { nextStatus, prevStatus } from "../model"
import { STATUS_LABELS } from "./status-labels"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const moveTodo = useTodoStore((state) => state.moveTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  const prev = prevStatus(todo.status)
  const next = nextStatus(todo.status)

  return (
    <li className="flex items-center gap-1 rounded-lg border bg-card px-3 py-2">
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          todo.status === TODO_STATUS.COMPLETED &&
            "text-muted-foreground line-through"
        )}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="icon-xs"
        disabled={prev === null}
        aria-label={prev ? `В «${STATUS_LABELS[prev]}»` : undefined}
        onClick={() => prev && moveTodo(todo.id, prev)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        disabled={next === null}
        aria-label={next ? `В «${STATUS_LABELS[next]}»` : undefined}
        onClick={() => next && moveTodo(todo.id, next)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Удалить задачу"
        onClick={() => removeTodo(todo.id)}
      >
        <XIcon />
      </Button>
    </li>
  )
}
