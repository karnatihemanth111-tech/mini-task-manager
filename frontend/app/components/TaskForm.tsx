'use client'
import { useState } from 'react'

interface Props {
  onAdd: (title: string, deadline: string | null) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    onAdd(title.trim(), deadline || null)
    setTitle('')
    setDeadline('')
    setError('')
  }

  return (
    <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-4 mb-5">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
        Add New Task
      </p>

      {/* Title input */}
      <div className="flex gap-2 mb-3">
        <input
          value={title}
          onChange={e => { setTitle(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Task title..."
          className="flex-1 bg-[#0f0f13] border border-[#2a2a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-600 transition-colors"
        />
        <button
          onClick={handleSubmit}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-5 text-xl font-bold transition-colors"
        >
          +
        </button>
      </div>

      {/* Deadline picker */}
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm">📅 Deadline:</span>
        <input
          type="date"
          value={deadline}
          min={today}
          onChange={e => setDeadline(e.target.value)}
          className="bg-[#0f0f13] border border-[#2a2a3a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-600 transition-colors"
        />
        {deadline && (
          <button
            onClick={() => setDeadline('')}
            className="text-gray-500 hover:text-red-400 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-xs mt-2">⚠ {error}</p>
      )}
    </div>
  )
}