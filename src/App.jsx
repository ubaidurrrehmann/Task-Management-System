import { useState } from 'react'
import Header from './components/Header'
import TaskBoard from './components/TaskBoard'
import TaskModal from './components/TaskModal'
import NewsModal from './components/News Modal'
import { useTasks } from './hooks/useTasks'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask, updateStatus } = useTasks()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [newsOpen, setNewsOpen] = useState(false)


  const handleAddTask = () => {
    setEditingTask(null)
    setModalOpen(true)
  }
  const handleNewsModal = () => {
    setNewsOpen(true)
  }

  // const openNewsModal = () => {
  //   setNewsOpen(true)
  // }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleSaveTask = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData)
    } else {
      addTask(formData)
    }
  }

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingTask(null)
    setNewsOpen(false)
  }

  return (
    <div className="app">
      <Header openNewsModal={handleNewsModal} onAddTask={handleAddTask} taskCount={tasks.length} />
      <main className="main-content">
        <TaskBoard
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={updateStatus}
        />
      </main>
      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
      />
      {newsOpen && <NewsModal
        isOpen={newsOpen}
        onClose={handleCloseModal}
      />}
    </div>
  )
}

export default App
