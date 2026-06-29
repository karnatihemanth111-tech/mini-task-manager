'use client'
import { Task } from '@/types/task'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function getDeadlineStatus(deadline: string | null, completed: boolean) {
  if (!deadline) return null
  if (completed) return { label: 'Done', color: 'text-green-400', border: 'border-green-900' }

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const d = new Date(deadline); d.setHours(0, 0, 0, 0)
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000)

  if (diff < 0) return { label: `Overdue ${Math.abs(diff)}d`, color: 'text-red-400', border: 'border-red-900' }
  if (diff === 0) return { label: 'Due Today', color: 'text-yellow-400', border: 'border-yellow-900' }
  if (diff <= 2) return { label: `${diff}d left`, color: 'text-orange-400', border: 'border-orange-900' }
  return { label: `${diff}d left`, color: 'text-blue-400', border: 'border-blue-900' }
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const status = getDeadlineStatus(task.deadline, task.completed)

  return (
    <div className={`bg-[#1a1a24] border rounded-xl p-4 transition-all ${status && !task.completed && status.label.includes('Overdue') ? 'border-red-900' : 'border-[#2a2a3a]'}`}>
      <div className="flex items-center gap-3">

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task._id)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.completed ? 'bg-violet-600 border-violet-600' : 'border-[#3f3f5a]'}`}
        >
          {task.completed && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Title */}
        <p className={`flex-1 text-sm font-medium truncate transition-all ${task.completed ? 'line-through text-gray-600' : 'text-gray-100'}`}>
          {task.title}
        </p>

        {/* Badge */}
        {status && (
          <span className={`text-xs px-2 py-1 rounded-full border shrink-0 font-semibold ${status.color} ${status.border} bg-transparent`}>
            {status.label}
          </span>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-600 hover:text-red-400 transition-colors text-base shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Deadline row */}
      {task.deadline && (
        <div className="mt-2 pt-2 border-t border-[#2a2a3a] flex items-center gap-2">
          <span className="text-xs">📅</span>
          <span className={`text-xs ${status?.color ?? 'text-gray-500'}`}>
            Due: {new Date(task.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      )}
    </div>
  )
}