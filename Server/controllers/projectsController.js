const express = require('express');
const projectsService = require('../services/projectsService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await projectsService.getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const projectData = await projectsService.getProjectById(req.params.id);
        if (!projectData) {
            return res.status(404).send('Project not found');
        }
        res.json(projectData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project by id', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProject = await projectsService.addProject(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error adding project', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await projectsService.updateProject(req.params.id, req.body);
        if (!updatedProject) {
            return res.status(404).send('Project not found');
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await projectsService.deleteProject(req.params.id);
        if (!deletedProject) {
            return res.status(404).send('Project not found');
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
});

module.exports = router;
