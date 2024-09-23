const express = require('express');
const usersService = require('../services/usersService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await usersService.getUserById(req.params.id);
        if (!userData) {
            return res.status(404).send('User not found');
        }
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by id', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await usersService.addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await usersService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await usersService.deleteUser(req.params.id);
        if (!deleteUser) {
            return res.status(404).send('User not found');
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
