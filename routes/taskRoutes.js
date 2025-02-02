const express = require('express');
const { addTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const taskRoute = express.Router();

taskRoute.post('/addTasks', addTask);
taskRoute.get('/:userId', getTask);
taskRoute.put('/:id', updateTask);
taskRoute.delete('/:id', deleteTask);

module.exports = taskRoute;