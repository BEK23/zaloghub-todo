import { DragDropProvider } from "@dnd-kit/react"

import { NEW_TODO_STATUS, TODO_STATUSES } from "../model"
import { AddTodoDialog } from "./add-todo-dialog"
import { TodoColumn } from "./todo-column"
import { useBoardDnd } from "./use-board-dnd"

export function TodoBoard() {
  const { columns, dropStatus, handlers } = useBoardDnd()

  return (
    <DragDropProvider {...handlers}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
        {TODO_STATUSES.map((status) => (
          <TodoColumn
            key={status}
            status={status}
            todos={columns[status]}
            highlighted={status === dropStatus}
            action={status === NEW_TODO_STATUS ? <AddTodoDialog /> : undefined}
          />
        ))}
      </div>
    </DragDropProvider>
  )
}
