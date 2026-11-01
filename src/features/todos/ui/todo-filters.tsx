import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTodoStore } from "@/store/todo-store"

import { STATUS_FILTERS } from "../model"
import { STATUS_FILTER_LABELS } from "./status-labels"

export function TodoFilters() {
  const filter = useTodoStore((state) => state.filter)
  const setFilterQuery = useTodoStore((state) => state.setFilterQuery)
  const setFilterStatus = useTodoStore((state) => state.setFilterStatus)

  return (
    <div className="flex gap-2">
      <Input
        type="search"
        value={filter.query}
        onChange={(event) => setFilterQuery(event.target.value)}
        placeholder="Поиск"
        aria-label="Поиск задач"
      />
      <Select
        items={STATUS_FILTER_LABELS}
        value={filter.status}
        onValueChange={(status) => {
          if (status) setFilterStatus(status)
        }}
      >
        <SelectTrigger aria-label="Статус" className="w-44 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {STATUS_FILTERS.map((status) => (
            <SelectItem key={status} value={status}>
              {STATUS_FILTER_LABELS[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
