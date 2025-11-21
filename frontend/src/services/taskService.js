const API_URL = 'https://task-pilot-s5vw.onrender.com/api/tasks';

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Request error:', error);
    return { success: false, error: error.message };
  }
};

export const getAllTasks = () =>
  request(API_URL);

export const createTask = (task) =>
  request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

export const updateTask = (id, task) =>
  request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

export const deleteTask = (id) =>
  request(`${API_URL}/${id}`, { method: 'DELETE' });
