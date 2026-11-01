import { useShallow } from "zustand/react/shallow"

import { columnTodos } from "@/features/todos/model"
import type { TodoStatus } from "@/types/todo"

import { useTodoStore } from "./todo-store"

export function useColumnTodos(status: TodoStatus) {
  return useTodoStore(
    useShallow((state) => columnTodos(state.todos, status, state.filter))
  )
}
