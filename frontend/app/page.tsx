'use client'
import { useEffect, useState } from 'react'
import { Task } from '@/types/task'
import { getTasks, createTask, toggleTask, deleteTask } from '@/lib/api'
import TaskForm from './components/TaskForm'
import TaskCard from './components/TaskCard'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch all tasks on load
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch {
      setError('Failed to connect to server. Is backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (title: string, deadline: string | null) => {
    try {
      const res = await createTask(title, deadline)
      setTasks(prev => [res.data, ...prev])
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add task')
    }
  }

  const handleToggle = async (id: string) => {
    try {
      const res = await toggleTask(id)
      setTasks(prev => prev.map(t => t._id === id ? res.data : t))
    } catch {
      alert('Failed to update task')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t._id !== id))
    } catch {
      alert('Failed to delete task')
    }
  }

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  )

  const completed = tasks.filter(t => t.completed).length
  const total = tasks.length
  const overdue = tasks.filter(t => {
    if (!t.deadline || t.completed) return false
    const d = new Date(t.deadline); d.setHours(0, 0, 0, 0)
    const now = new Date(); now.setHours(0, 0, 0, 0)
    return d < now
  }).length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <main className="min-h-screen bg-[#0f0f13] py-10 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Task Manager</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Tasks</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: 'Total', value: total, color: 'text-violet-400' },
            { label: 'Completed', value: completed, color: 'text-green-400' },
            { label: 'Overdue', value: overdue, color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-3 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-4 mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">{completed} of {total} completed</span>
            <span className="text-sm text-violet-400 font-semibold">{percent}%</span>
          </div>
          <div className="bg-[#2a2a3a] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-700 to-violet-400 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <TaskForm onAdd={handleAdd} />

        {/* Filter tabs */}
        <div className="flex gap-1 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-1 mb-4">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-lg text-sm capitalize transition-all ${filter === f ? 'bg-violet-600 text-white font-semibold' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {f} ({f === 'all' ? total : f === 'active' ? total - completed : completed})
            </button>
          ))}
        </div>

        {/* Task list */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading tasks...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            {filter === 'completed' ? 'No completed tasks yet.' : filter === 'active' ? 'No active tasks!' : 'No tasks yet. Add one above!'}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}