import { create } from "zustand"
import { persist } from "zustand/middleware"

import { createTodo, isValidTitle, moveTodo } from "@/features/todos/model"
import type { Todo, TodoId, TodoStatus } from "@/types/todo"

interface TodoState {
  todos: Todo[]
}

interface TodoActions {
  addTodo: (title: string) => void
  moveTodo: (id: TodoId, status: TodoStatus) => void
  removeTodo: (id: TodoId) => void
}

export type TodoStore = TodoState & TodoActions

const STORAGE_KEY = "zaloghub-todos"

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (title) => {
        if (!isValidTitle(title)) return
        set((state) => ({ todos: [...state.todos, createTodo(title)] }))
      },

      moveTodo: (id, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? moveTodo(todo, status) : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)
