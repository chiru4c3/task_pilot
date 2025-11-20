const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Mock database
let tasks = [];
let idCounter = 1;

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/api/tasks', (req, res) => {
  res.json({ 
    success: true, 
    data: tasks,
    message: 'Tasks retrieved successfully'
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;
  
  if (!title || !title.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title is required' 
    });
  }

  const task = {
    _id: idCounter++,
    title,
    description: description || '',
    status: status || 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  tasks.push(task);
  res.status(201).json({ 
    success: true, 
    data: task,
    message: 'Task created successfully'
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t._id == req.params.id);
  
  if (!task) {
    return res.status(404).json({ 
      success: false, 
      message: 'Task not found' 
    });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description !== undefined ? req.body.description : task.description;
  task.status = req.body.status || task.status;
  task.updatedAt = new Date();

  res.json({ 
    success: true, 
    data: task,
    message: 'Task updated successfully'
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t._id == req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Task not found' 
    });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ 
    success: true, 
    message: 'Task deleted successfully',
    data: deleted[0]
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Manager API (MOCK MODE)',
    version: '1.0.0',
    mode: 'development'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ MOCK Server running on port ${PORT}`);
  console.log('⚠️  Using in-memory storage (data will reset on restart)');
});
