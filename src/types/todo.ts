export type TodoId = string

export type TodoStatus = "backlog" | "active" | "completed"

export interface Todo {
  id: TodoId
  title: string
  status: TodoStatus
}
