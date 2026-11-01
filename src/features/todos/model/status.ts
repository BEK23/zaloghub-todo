import { TODO_STATUS, type TodoStatus } from "@/types/todo"

export const TODO_STATUSES: readonly TodoStatus[] = [
  TODO_STATUS.BACKLOG,
  TODO_STATUS.ACTIVE,
  TODO_STATUS.COMPLETED,
]

export function isTodoStatus(value: unknown): value is TodoStatus {
  return TODO_STATUSES.includes(value as TodoStatus)
}

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

export function canMove(from: TodoStatus, to: TodoStatus): boolean {
  const { prev, next } = STATUS_TRANSITIONS[from]
  return to === prev || to === next
}
