import { useState } from 'react';
import { createTask } from '../services/taskService';
import './AddTask.css';

export default function AddTask({ onTaskAdded }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    const response = await createTask(form);

    if (response.success) {
      setForm({ title: '', description: '', status: 'Pending' });
      onTaskAdded();
    } else {
      setError(response.message || 'Error creating task');
    }
    setLoading(false);
  };

  return (
    <div className="add-task">
      <h2>Add Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          maxLength="100"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength="500"
          rows="4"
        />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}
