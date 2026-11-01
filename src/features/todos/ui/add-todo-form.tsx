import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTodoStore } from "@/store/todo-store"

import { isValidTitle } from "../model"

export function AddTodoForm() {
  const [title, setTitle] = useState("")
  const addTodo = useTodoStore((state) => state.addTodo)

  const canSubmit = isValidTitle(title)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    addTodo(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Новая задача"
        aria-label="Новая задача"
        autoFocus
      />
      <Button type="submit" disabled={!canSubmit}>
        Добавить
      </Button>
    </form>
  )
}
