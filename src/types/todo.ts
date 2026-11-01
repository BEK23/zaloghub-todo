export type TodoId = string

export const TODO_STATUS = {
  BACKLOG: "BACKLOG",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
} as const

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS]

export interface Todo {
  id: TodoId
  title: string
  status: TodoStatus
}
