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

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  return todos.filter(
    (todo) =>
      matchesStatus(todo.status, filter.status) &&
      matchesQuery(todo.title, filter.query)
  )
}

export function visibleStatuses(filter: StatusFilter): TodoStatus[] {
  return TODO_STATUSES.filter((status) => matchesStatus(status, filter))
}
