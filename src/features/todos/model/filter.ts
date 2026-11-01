import type { Todo, TodoStatus } from "@/types/todo"
import {
  STATUS_FILTER,
  type StatusFilter,
  type TodoFilter,
} from "@/types/todo-filter"

import { TODO_STATUSES } from "./status"

export const STATUS_FILTERS: readonly StatusFilter[] = [
  STATUS_FILTER.ALL,
  ...TODO_STATUSES,
]

export const DEFAULT_FILTER: TodoFilter = {
  query: "",
  status: STATUS_FILTER.ALL,
}

export function normalizeQuery(raw: string): string {
  return raw.trim().toLowerCase()
}

export function matchesQuery(title: string, query: string): boolean {
  const normalized = normalizeQuery(query)
  return normalized === "" || title.toLowerCase().includes(normalized)
}

export function matchesStatus(
  status: TodoStatus,
  filter: StatusFilter
): boolean {
  return filter === STATUS_FILTER.ALL || status === filter
}

export function matchesFilter(todo: Todo, filter: TodoFilter): boolean {
  return (
    matchesStatus(todo.status, filter.status) &&
    matchesQuery(todo.title, filter.query)
  )
}

export function columnTodos(
  todos: Todo[],
  column: TodoStatus,
  filter: TodoFilter
): Todo[] {
  return todos.filter(
    (todo) => todo.status === column && matchesFilter(todo, filter)
  )
}
