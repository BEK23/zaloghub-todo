import { TODO_STATUS, type TodoStatus } from "@/types/todo"

export const STATUS_LABELS: Record<TodoStatus, string> = {
  [TODO_STATUS.BACKLOG]: "Бэклог",
  [TODO_STATUS.ACTIVE]: "В работе",
  [TODO_STATUS.COMPLETED]: "Выполнено",
}
