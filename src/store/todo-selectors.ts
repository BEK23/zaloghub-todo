import { useShallow } from "zustand/react/shallow"

import { filterTodos } from "@/features/todos/model"
import type { TodoStatus } from "@/types/todo"

import { useTodoStore } from "./todo-store"

export function useColumnTodos(status: TodoStatus) {
  return useTodoStore(
    useShallow((state) =>
      filterTodos(state.todos, { query: state.filter.query, status })
    )
  )
}
