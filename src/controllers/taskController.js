const Task = require('../models/taskModel');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.updateTask(id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Task.deleteTask(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};