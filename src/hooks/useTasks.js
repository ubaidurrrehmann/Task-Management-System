import { useState, useEffect } from 'react'
import { STATUSES } from '../constants'
// 1. Import your API service layer
import * as taskService from '../services/taskService'

const STORAGE_KEY = 'task-management-tasks'

// Fallback items if database or network is totally down
const defaultTasks = [
  {
    id: '1',
    title: 'Set up project repository',
    description: 'Initialize the repo and configure CI/CD pipeline.',
    status: STATUSES.COMPLETED,
    priority: 'high',
    createdAt: new Date().toISOString(),
  }
]

function loadLocalTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return defaultTasks
}

export function useTasks() {
  // Initialize state with whatever is in local storage for an instant UI load
  const [tasks, setTasks] = useState(loadLocalTasks)

  // 2. Fetch fresh database tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const backendTasks = await taskService.getTasks()
        
        // Map MongoDB's "_id" to "id" so UI components don't break
        const normalizedTasks = backendTasks.map(task => ({
          ...task,
          id: task._id || task.id
        }))

        setTasks(normalizedTasks)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedTasks))
      } catch (err) {
        console.error("Could not sync with backend database, using offline storage:", err.message)
      }
    }

    fetchTasks()
  }, [])

  // 3. Add Task to database + local cache
  const addTask = async (taskData) => {
    try {
      const savedTask = await taskService.createTask(taskData)
      
      const normalizedNewTask = {
        ...savedTask,
        id: savedTask._id
      }

      setTasks((prev) => {
        const updated = [...prev, normalizedNewTask]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error("Failed to add task to backend:", err.message)
    }
  }

  // 4. Update Task in database + local cache
  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates)
      
      const normalizedUpdatedTask = {
        ...updatedTask,
        id: updatedTask._id
      }

      setTasks((prev) => {
        const updated = prev.map((task) => (task.id === id ? normalizedUpdatedTask : task))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error("Failed to update task on backend:", err.message)
    }
  }

  // 5. Delete Task from database + local cache
  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error("Failed to delete task from backend:", err.message)
    }
  }

  // 6. Proxy helper for updating task columns/status values
  const updateStatus = (id, status) => {
    updateTask(id, { status })
  }

  return { tasks, addTask, updateTask, deleteTask, updateStatus }
}