import type { Todo, TodoStatus } from "@/types/todo"

export const TODO_STATUSES: readonly TodoStatus[] = [
  "backlog",
  "active",
  "completed",
]

interface StatusTransitions {
  prev: TodoStatus | null
  next: TodoStatus | null
}

const STATUS_TRANSITIONS: Record<TodoStatus, StatusTransitions> = {
  backlog: { prev: null, next: "active" },
  active: { prev: "backlog", next: "completed" },
  completed: { prev: "active", next: null },
}

export function nextStatus(status: TodoStatus): TodoStatus | null {
  return STATUS_TRANSITIONS[status].next
}

export function prevStatus(status: TodoStatus): TodoStatus | null {
  return STATUS_TRANSITIONS[status].prev
}

export function todosByStatus(todos: Todo[], status: TodoStatus): Todo[] {
  return todos.filter((todo) => todo.status === status)
}
