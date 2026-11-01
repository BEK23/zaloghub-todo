import { TODO_STATUS, type Todo, type TodoStatus } from "@/types/todo"

import { canMove } from "./status"

export const NEW_TODO_STATUS: TodoStatus = TODO_STATUS.BACKLOG

export function normalizeTitle(raw: string): string {
  return raw.trim()
}

export function isValidTitle(raw: string): boolean {
  return normalizeTitle(raw).length > 0
}

export function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title: normalizeTitle(title),
    status: NEW_TODO_STATUS,
  }
}

export function moveTodo(todo: Todo, status: TodoStatus): Todo {
  if (!canMove(todo.status, status)) return todo
  return { ...todo, status }
}
