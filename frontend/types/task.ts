export interface Task {
  _id: string
  title: string
  completed: boolean
  deadline: string | null
  createdAt: string
  updatedAt: string
}