import { useState, useEffect } from 'react'
import { STATUSES } from '../constants'

const STORAGE_KEY = 'task-management-tasks'

const defaultTasks = [
  {
    id: '1',
    title: 'Set up project repository',
    description: 'Initialize the repo and configure CI/CD pipeline.',
    status: STATUSES.COMPLETED,
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Design user interface mockups',
    description: 'Create wireframes for the dashboard and task board views.',
    status: STATUSES.IN_PROGRESS,
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with request/response examples.',
    status: STATUSES.TODO,
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
]

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return defaultTasks
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const updateStatus = (id, status) => {
    updateTask(id, { status })
  }

  return { tasks, addTask, updateTask, deleteTask, updateStatus }
}
