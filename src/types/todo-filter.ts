import { TODO_STATUS } from "./todo"

export const STATUS_FILTER = {
  ALL: "ALL",
  ...TODO_STATUS,
} as const

export type StatusFilter = (typeof STATUS_FILTER)[keyof typeof STATUS_FILTER]

export interface TodoFilter {
  query: string
  status: StatusFilter
}
