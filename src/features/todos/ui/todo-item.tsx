import { useState } from "react"
import { useSortable } from "@dnd-kit/react/sortable"
import { PencilIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTodoStore } from "@/store/todo-store"
import { TODO_STATUS, type Todo } from "@/types/todo"

import { DeleteTodoDialog } from "./delete-todo-dialog"
import { TodoTitleInput } from "./todo-title-input"

interface TodoItemProps {
  todo: Todo
  index: number
}

export function TodoItem({ todo, index }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const renameTodo = useTodoStore((state) => state.renameTodo)
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
        "group/todo flex items-center gap-1 rounded-lg border bg-card px-3 py-2",
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
      )}
      <div className="flex gap-1 transition-opacity group-focus-within/todo:opacity-100 group-hover/todo:opacity-100 pointer-fine:opacity-0">
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Переименовать задачу"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon />
          </Button>
        )}
        <DeleteTodoDialog todo={todo} />
      </div>
    </li>
  )
}
