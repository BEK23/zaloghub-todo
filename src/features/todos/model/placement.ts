import type { Todo, TodoId, TodoPlacement } from "@/types/todo"

import { moveTodo } from "./todo"

export function placeTodo(
  todos: Todo[],
  id: TodoId,
  placement: TodoPlacement
): Todo[] {
  const todo = todos.find((item) => item.id === id)
  if (!todo || placement.beforeId === id) return todos

  const moved = moveTodo(todo, placement.status)
  if (moved.status !== placement.status) return todos

  const rest = todos.filter((item) => item.id !== id)
  const index =
    placement.beforeId === null
      ? rest.length
      : rest.findIndex((item) => item.id === placement.beforeId)
  if (index === -1) return todos

  return [...rest.slice(0, index), moved, ...rest.slice(index)]
}

export function placementOf(column: Todo[], id: TodoId): TodoPlacement | null {
  const index = column.findIndex((todo) => todo.id === id)
  if (index === -1) return null
  return {
    status: column[index].status,
    beforeId: column[index + 1]?.id ?? null,
  }
}

export function isSamePlacement(
  a: TodoPlacement | null,
  b: TodoPlacement | null
): boolean {
  return a?.status === b?.status && a?.beforeId === b?.beforeId
}
