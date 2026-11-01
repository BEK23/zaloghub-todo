import { TODO_STATUSES } from "../model"
import { TodoColumn } from "./todo-column"

export function TodoBoard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {TODO_STATUSES.map((status) => (
        <TodoColumn key={status} status={status} />
      ))}
    </div>
  )
}
