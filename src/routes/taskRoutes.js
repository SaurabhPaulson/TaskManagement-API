const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const aiAgentController = require('../controllers/aiAgentController');
const { auth, requireRole } = require('../middleware/auth');

// Route to create a new task (Admin, Manager)
router.post('/tasks', auth, requireRole(['admin', 'manager']), taskController.createTask);

// Route to get all tasks (All roles)
router.get('/tasks', auth, taskController.getTasks);

// Route to update a task by ID (Admin, Manager)
router.put('/tasks/:id', auth, requireRole(['admin', 'manager']), taskController.updateTask);

// Route to delete a task by ID (Admin, Manager)
router.delete('/tasks/:id', auth, requireRole(['admin', 'manager']), taskController.deleteTask);

// AI Agent endpoints (All roles)
router.post('/ai/assignment', auth, aiAgentController.assignmentSuggestion);
router.post('/ai/priority', auth, aiAgentController.prioritySuggestion);
router.get('/ai/summary/:userId', auth, aiAgentController.summaryReport);

module.exports = router;