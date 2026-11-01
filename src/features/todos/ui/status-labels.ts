import { TODO_STATUS, type TodoStatus } from "@/types/todo"
import { STATUS_FILTER, type StatusFilter } from "@/types/todo-filter"

export const STATUS_LABELS: Record<TodoStatus, string> = {
  [TODO_STATUS.BACKLOG]: "Бэклог",
  [TODO_STATUS.ACTIVE]: "В работе",
  [TODO_STATUS.COMPLETED]: "Выполнено",
}

export const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  [STATUS_FILTER.ALL]: "Все",
  ...STATUS_LABELS,
}
