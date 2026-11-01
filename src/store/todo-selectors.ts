import { useShallow } from "zustand/react/shallow"

import { todosByStatus } from "@/features/todos/model"
import type { TodoStatus } from "@/types/todo"

import { useTodoStore } from "./todo-store"

export function useTodosByStatus(status: TodoStatus) {
  return useTodoStore(useShallow((state) => todosByStatus(state.todos, status)))
}
