import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"

import { useTodoStore } from "@/store/todo-store"

import { NEW_TODO_STATUS, TODO_STATUSES, isTodoStatus } from "../model"
import { AddTodoDialog } from "./add-todo-dialog"
import { TodoColumn } from "./todo-column"

export function TodoBoard() {
  const moveTodo = useTodoStore((state) => state.moveTodo)

  const handleDragEnd = ({ operation, canceled }: DragEndEvent) => {
    const { source, target } = operation
    if (canceled || !source || !target || !isTodoStatus(target.id)) return
    moveTodo(String(source.id), target.id)
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
        {TODO_STATUSES.map((status) => (
          <TodoColumn
            key={status}
            status={status}
            action={status === NEW_TODO_STATUS ? <AddTodoDialog /> : undefined}
          />
        ))}
      </div>
    </DragDropProvider>
  )
}
