import { useRef, useState } from "react"

import { Input } from "@/components/ui/input"

import { isValidTitle } from "../model"

interface TodoTitleInputProps {
  defaultValue: string
  onSubmit: (title: string) => void
  onCancel: () => void
}

export function TodoTitleInput({
  defaultValue,
  onSubmit,
  onCancel,
}: TodoTitleInputProps) {
  const [value, setValue] = useState(defaultValue)
  const canceled = useRef(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") canceled.current = true
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur()
    }
  }

  const handleBlur = () => {
    if (canceled.current || !isValidTitle(value)) onCancel()
    else onSubmit(value)
  }

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={(event) => event.currentTarget.select()}
      aria-label="Название задачи"
      className="h-6"
      autoFocus
    />
  )
}
