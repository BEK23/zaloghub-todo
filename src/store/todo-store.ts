import { create } from "zustand"
import { persist } from "zustand/middleware"

import {
  DEFAULT_FILTER,
  createTodo,
  isValidTitle,
  placeTodo,
  renameTodo,
} from "@/features/todos/model"
import type { Todo, TodoId, TodoPlacement } from "@/types/todo"
import type { StatusFilter, TodoFilter } from "@/types/todo-filter"

interface TodoState {
  todos: Todo[]
  filter: TodoFilter
}

interface TodoActions {
  addTodo: (title: string) => void
  placeTodo: (id: TodoId, placement: TodoPlacement) => void
  renameTodo: (id: TodoId, title: string) => void
  removeTodo: (id: TodoId) => void
  setFilterQuery: (query: string) => void
  setFilterStatus: (status: StatusFilter) => void
}

export type TodoStore = TodoState & TodoActions

const STORAGE_KEY = "zaloghub-todos"

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: DEFAULT_FILTER,

      addTodo: (title) => {
        if (!isValidTitle(title)) return
        set((state) => ({ todos: [...state.todos, createTodo(title)] }))
      },

      placeTodo: (id, placement) =>
        set((state) => ({ todos: placeTodo(state.todos, id, placement) })),

      renameTodo: (id, title) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? renameTodo(todo, title) : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      setFilterQuery: (query) =>
        set((state) => ({ filter: { ...state.filter, query } })),

      setFilterStatus: (status) =>
        set((state) => ({ filter: { ...state.filter, status } })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)
