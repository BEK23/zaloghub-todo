import { TODO_STATUS, type Todo, type TodoStatus } from "@/types/todo"

export const TODO_STATUSES: readonly TodoStatus[] = [
  TODO_STATUS.BACKLOG,
  TODO_STATUS.ACTIVE,
  TODO_STATUS.COMPLETED,
]

interface StatusTransitions {
  prev: TodoStatus | null
  next: TodoStatus | null
}

const STATUS_TRANSITIONS: Record<TodoStatus, StatusTransitions> = {
  [TODO_STATUS.BACKLOG]: { prev: null, next: TODO_STATUS.ACTIVE },
  [TODO_STATUS.ACTIVE]: {
    prev: TODO_STATUS.BACKLOG,
    next: TODO_STATUS.COMPLETED,
  },
  [TODO_STATUS.COMPLETED]: { prev: TODO_STATUS.ACTIVE, next: null },
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
