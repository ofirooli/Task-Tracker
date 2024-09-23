const Project = require('../models/projectModel');

const getAllProjects = async (filters) => {
  try {
    return await Project.find(filters);
  } catch (error) {
    throw new Error('Error fetching projects from the database');
  }
};

const getProjectById = async (id) => {
  try {
    return await Project.findById(id);
  } catch (error) {
    throw new Error('Error fetching project by ID from the database');
  }
};

const addProject = async (projectData) => {
  const newProject = new Project(projectData);
  try {
    return await newProject.save();
  } catch (error) {
    throw new Error('Error saving project to the database');
  }
};

const updateProject = async (id, projectData) => {
  try {
    return await Project.findByIdAndUpdate(id, projectData, { new: true });
  } catch (error) {
    throw new Error('Error updating project in the database');
  }
};

const deleteProject = async (id) => {
  try {
    return await Project.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting project from the database');
  }
};

module.exports = { getAllProjects, getProjectById, addProject, updateProject, deleteProject };
