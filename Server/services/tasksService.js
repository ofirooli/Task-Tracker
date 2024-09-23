const taskRepo = require('../repositories/tasksRepo');

const getAllTasks = async () => {
    try {
        const tasks = await taskRepo.getAllTasks();
        console.log('Fetched all tasks');
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw new Error('Error fetching tasks');
    }
};

const getTaskById = async (id) => {
    try {
        const task = await taskRepo.getTasksById(id);
        console.log(`Fetched task with ID: ${id}`);
        return task;
    } catch (error) {
        console.error(`Error fetching task by ID ${id}:`, error.message);
        throw new Error('Error fetching task by ID');
    }
};

const addTask = async (taskData) => {
    try {
        const newTask = await taskRepo.addTask(taskData);
        console.log('Added new task');
        return newTask;
    } catch (error) {
        console.error('Error adding task:', error.message);
        throw new Error('Error adding task');
    }
};

const updateTask = async (id, taskData) => {
    try {
        const updatedTask = await taskRepo.updateTask(id, taskData);
        console.log(`Updated task with ID: ${id}`);
        return updatedTask;
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error.message);
        throw new Error('Error updating task');
    }
};

const deleteTask = async (id) => {
    try {
        const deletedTask = await taskRepo.deleteTask(id);
        console.log(`Deleted task with ID: ${id}`);
        return deletedTask;
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error.message);
        throw new Error('Error deleting task');
    }
};

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
