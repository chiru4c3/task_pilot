const Task = require('../models/Task');
const mockDb = require('../db/mockDb');
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = isDbConnected()
      ? await Task.find().sort({ createdAt: -1 })
      : await mockDb.findAll();

    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = isDbConnected()
      ? await Task.findById(req.params.id)
      : await mockDb.findById(req.params.id);

    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ success: false, message: 'Title required' });
    }

    const taskData = {
      title: title.trim(),
      description: description?.trim() || '',
      status: status || 'Pending'
    };

    const task = isDbConnected()
      ? await Task.create(taskData)
      : await mockDb.create(taskData);

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = isDbConnected()
      ? await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      : await mockDb.updateById(req.params.id, req.body);

    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = isDbConnected()
      ? await Task.findByIdAndDelete(req.params.id)
      : await mockDb.deleteById(req.params.id);

    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
