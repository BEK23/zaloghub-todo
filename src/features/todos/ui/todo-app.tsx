import { AddTodoForm } from "./add-todo-form"
import { TodoBoard } from "./todo-board"
import { TodoFilters } from "./todo-filters"

export function TodoApp() {
  return (
    <section className="flex w-full max-w-3xl flex-col gap-4">
      <AddTodoForm />
      <TodoFilters />
      <TodoBoard />
    </section>
  )
}
