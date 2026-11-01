import type { TodoStatus } from "@/types/todo"

export const STATUS_LABELS: Record<TodoStatus, string> = {
  backlog: "Бэклог",
  active: "В работе",
  completed: "Выполнено",
}
