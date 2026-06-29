import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getTasks = () => API.get('/tasks')
export const createTask = (title: string, deadline: string | null) =>
  API.post('/tasks', { title, deadline })
export const toggleTask = (id: string) => API.patch(`/tasks/${id}/toggle`)
export const updateDeadline = (id: string, deadline: string) =>
  API.patch(`/tasks/${id}/deadline`, { deadline })
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`)
// API functions connect frontend to Express backend
