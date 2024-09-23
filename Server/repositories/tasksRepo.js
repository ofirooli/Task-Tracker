const Task = require('../models/taskModel');

const getAllTasks = async (filters) => {
    try {
        return await Task.find(filters);
    } catch (error) {
        throw new Error('Error fetching tasks from database');
    }
};

const getTasksById = async (id) => {
    try {
        return await Task.findById(id);
    } catch (error) {
        throw new Error('Error fetching task by id from database');
    }
};

const addTask = async (taskData) => {
    const newTask = new Task(taskData);
    try {
        return await newTask.save();
    } catch (error) {
        throw new Error('Error saving task to database');
    }
};

const updateTask = async (id, taskData) => {
    try {
        return await Task.findByIdAndUpdate(id, taskData, { new: true });
    } catch (error) {
        throw new Error('Error updating task in database');
    }
};

const deleteTask = async (id) => {
    try {
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting task from database');
    }
};

module.exports = { getAllTasks, getTasksById, addTask, updateTask, deleteTask };
