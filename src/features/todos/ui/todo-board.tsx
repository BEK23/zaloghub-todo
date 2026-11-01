import { NEW_TODO_STATUS, TODO_STATUSES } from "../model"
import { AddTodoDialog } from "./add-todo-dialog"
import { TodoColumn } from "./todo-column"

export function TodoBoard() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
      {TODO_STATUSES.map((status) => (
        <TodoColumn
          key={status}
          status={status}
          action={status === NEW_TODO_STATUS ? <AddTodoDialog /> : undefined}
        />
      ))}
    </div>
  )
}
