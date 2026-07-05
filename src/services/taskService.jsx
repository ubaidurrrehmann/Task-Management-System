// src/services/taskService.js

// const API_BASE_URL = 'http://localhost:5000/api/tasks';
const API_BASE_URL = 'https://task-management-backend-five-alpha.vercel.app/api/tasks';

// 1. Get all tasks
export const getTasks = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

// 2. Create a task
export const createTask = async (taskData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

// 3. Update a task
export const updateTask = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

// 4. Delete a task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
};