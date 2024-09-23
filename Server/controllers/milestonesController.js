const express = require('express');
const milestonesService = require('../services/milestonesService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const milestones = await milestonesService.getAllMilestones();
        res.json(milestones);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milestones', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const milestoneData = await milestonesService.getMilestoneById(req.params.id);
        if (!milestoneData) {
            return res.status(404).send('Milestone not found');
        }
        res.json(milestoneData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milestone by id', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMilestone = await milestonesService.addMilestone(req.body);
        res.status(201).json(newMilestone);
    } catch (error) {
        res.status(500).json({ message: 'Error adding milestone', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMilestone = await milestonesService.updateMilestone(req.params.id, req.body);
        if (!updatedMilestone) {
            return res.status(404).send('Milestone not found');
        }
        res.json(updatedMilestone);
    } catch (error) {
        res.status(500).json({ message: 'Error updating milestone', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMilestone = await milestonesService.deleteMilestone(req.params.id);
        if (!deletedMilestone) {
            return res.status(404).send('Milestone not found');
        }
        res.json({ message: 'Milestone deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting milestone', error: error.message });
    }
});

module.exports = router;
