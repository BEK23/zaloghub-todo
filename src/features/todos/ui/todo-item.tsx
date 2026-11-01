import { useState } from "react"
import { useSortable } from "@dnd-kit/react/sortable"
import { PencilIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTodoStore } from "@/store/todo-store"
import { TODO_STATUS, type Todo } from "@/types/todo"

import { TodoTitleInput } from "./todo-title-input"

interface TodoItemProps {
  todo: Todo
  index: number
}

export function TodoItem({ todo, index }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const renameTodo = useTodoStore((state) => state.renameTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const { ref, isDragging } = useSortable({
    id: todo.id,
    index,
    group: todo.status,
    disabled: isEditing,
  })

  const handleRename = (title: string) => {
    renameTodo(todo.id, title)
    setIsEditing(false)
  }

  return (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-1 rounded-lg border bg-card px-3 py-2",
        !isEditing && "cursor-grab",
        isDragging && "cursor-grabbing shadow-lg"
      )}
    >
      {isEditing ? (
        <TodoTitleInput
          defaultValue={todo.title}
          onSubmit={handleRename}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span
            onDoubleClick={() => setIsEditing(true)}
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
            aria-label="Переименовать задачу"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon />
          </Button>
        </>
      )}
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
