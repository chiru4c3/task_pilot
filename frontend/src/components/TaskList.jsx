import { useState, useEffect } from 'react';
import { getAllTasks, deleteTask, updateTask } from '../services/taskService';
import './TaskList.css';

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    const response = await getAllTasks();
    if (response.success) setTasks(response.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete task?')) return;
    await deleteTask(id);
    fetchTasks();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateTask(id, { status: newStatus });
    setEditing(null);
    fetchTasks();
  };

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
              </div>
              <div className="task-actions">
                {editing === task._id ? (
                  <>
                    <select defaultValue={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button onClick={() => setEditing(null)} className="cancel">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(task._id)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)} className="delete">Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
