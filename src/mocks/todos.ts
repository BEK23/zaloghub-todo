import { TODO_STATUS, type Todo } from "@/types/todo"

export const INITIAL_TODOS: Todo[] = [
  {
    id: "mock-create",
    title: "Создайте задачу кнопкой «+»",
    status: TODO_STATUS.BACKLOG,
  },
  {
    id: "mock-drag",
    title: "Перетащите меня в «В работе»",
    status: TODO_STATUS.BACKLOG,
  },
  {
    id: "mock-rename",
    title: "Переименуйте задачу двойным кликом",
    status: TODO_STATUS.BACKLOG,
  },
  {
    id: "mock-reorder",
    title: "Поменяйте задачи местами внутри колонки",
    status: TODO_STATUS.ACTIVE,
  },
  {
    id: "mock-search",
    title: "Найдите задачу через поиск",
    status: TODO_STATUS.ACTIVE,
  },
  {
    id: "mock-delete",
    title: "Удалите выполненную задачу",
    status: TODO_STATUS.COMPLETED,
  },
]
