import { useSortable } from "@dnd-kit/react/sortable"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTodoStore } from "@/store/todo-store"
import { TODO_STATUS, type Todo } from "@/types/todo"

interface TodoItemProps {
  todo: Todo
  index: number
}

export function TodoItem({ todo, index }: TodoItemProps) {
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const { ref, isDragging } = useSortable({
    id: todo.id,
    index,
    group: todo.status,
  })

  return (
    <li
      ref={ref}
      className={cn(
        "flex cursor-grab items-center gap-1 rounded-lg border bg-card px-3 py-2",
        isDragging && "cursor-grabbing shadow-lg"
      )}
    >
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
        aria-label="Удалить задачу"
        onClick={() => removeTodo(todo.id)}
      >
        <XIcon />
      </Button>
    </li>
  )
}
