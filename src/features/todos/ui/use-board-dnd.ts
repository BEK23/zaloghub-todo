import { useMemo, useRef, useState } from "react"
import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"

import { useTodoStore } from "@/store/todo-store"
import type {
  Todo,
  TodoColumns,
  TodoId,
  TodoPlacement,
  TodoStatus,
} from "@/types/todo"
import type { TodoFilter } from "@/types/todo-filter"

import {
  boardColumns,
  isSamePlacement,
  isTodoStatus,
  placeTodo,
  placementOf,
} from "../model"

type DragOperation = DragOverEvent["operation"]

interface DragSession {
  id: TodoId
  origin: Todo[]
  originPlacement: TodoPlacement
  draft: Todo[]
  placement: TodoPlacement
}

interface BoardPreview {
  todos: Todo[]
  dropStatus: TodoStatus | null
}

export function useBoardDnd() {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)
  const commitPlacement = useTodoStore((state) => state.placeTodo)

  const session = useRef<DragSession | null>(null)
  const [preview, setPreview] = useState<BoardPreview | null>(null)

  const columns = useMemo(
    () => boardColumns(preview?.todos ?? todos, filter),
    [preview, todos, filter]
  )

  const updatePreview = (operation: DragOperation) => {
    const current = session.current
    if (!current || !applyOperation(current, operation, filter)) return
    setPreview({ todos: current.draft, dropStatus: dropStatusOf(current) })
  }

  const onDragStart = ({ operation }: DragStartEvent) => {
    const id = String(operation.source?.id)
    const todo = todos.find((item) => item.id === id)
    const originPlacement = todo && placementOf(columns[todo.status], id)
    if (!originPlacement) return

    session.current = {
      id,
      origin: todos,
      originPlacement,
      draft: todos,
      placement: originPlacement,
    }
  }

  const onDragOver = (event: DragOverEvent) => {
    event.preventDefault()
    updatePreview(event.operation)
  }

  const onDragMove = ({ operation }: DragMoveEvent) => {
    updatePreview(operation)
  }

  const onDragEnd = ({ operation, canceled }: DragEndEvent) => {
    const current = session.current
    session.current = null
    setPreview(null)
    if (canceled || !current) return

    applyOperation(current, operation, filter)
    if (current.draft === current.origin) return
    commitPlacement(current.id, current.placement)
  }

  return {
    columns,
    dropStatus: preview?.dropStatus ?? null,
    handlers: { onDragStart, onDragOver, onDragMove, onDragEnd },
  }
}

function applyOperation(
  session: DragSession,
  operation: DragOperation,
  filter: TodoFilter
): boolean {
  const placement = placementFor(
    operation,
    session.id,
    boardColumns(session.draft, filter)
  )
  if (!placement || isSamePlacement(placement, session.placement)) return false

  session.placement = placement
  session.draft = isSamePlacement(placement, session.originPlacement)
    ? session.origin
    : placeTodo(session.origin, session.id, placement)
  return true
}

function placementFor(
  { target, position }: DragOperation,
  id: TodoId,
  columns: TodoColumns
): TodoPlacement | null {
  if (!target || target.id === id) return null

  if (isTodoStatus(target.id)) {
    const status = target.id
    const isInColumn = columns[status].some((todo) => todo.id === id)
    return isInColumn ? null : { status, beforeId: null }
  }

  if (!isSortable(target) || !isTodoStatus(target.group)) return null
  const status = target.group
  const column = columns[status].filter((todo) => todo.id !== id)
  const index = column.findIndex((todo) => todo.id === target.id)
  if (index === -1) return null

  const center = target.shape?.center.y
  const isBelow = center !== undefined && position.current.y > center
  const beforeId = isBelow ? (column[index + 1]?.id ?? null) : column[index].id
  return { status, beforeId }
}

function dropStatusOf({ id, origin, draft }: DragSession): TodoStatus | null {
  const from = origin.find((todo) => todo.id === id)?.status
  const to = draft.find((todo) => todo.id === id)?.status
  return to && to !== from ? to : null
}
