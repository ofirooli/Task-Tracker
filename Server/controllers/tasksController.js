const express = require('express');
const tasksService = require('../services/tasksService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await tasksService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const taskData = await tasksService.getTaskById(req.params.id);
        if (!taskData) {
            return res.status(404).send('Task not found');
        }
        res.json(taskData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task by id', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTask = await tasksService.addTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await tasksService.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await tasksService.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = router;
