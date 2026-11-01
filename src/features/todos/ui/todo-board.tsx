import { useTodoStore } from "@/store/todo-store"

import { visibleStatuses } from "../model"
import { TodoColumn } from "./todo-column"

export function TodoBoard() {
  const statusFilter = useTodoStore((state) => state.filter.status)

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
      {visibleStatuses(statusFilter).map((status) => (
        <TodoColumn key={status} status={status} />
      ))}
    </div>
  )
}
