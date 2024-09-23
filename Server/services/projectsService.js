const projectRepo = require('../repositories/projectsRepo');

const getAllProjects = async () => {
  try {
    const projects = await projectRepo.getAllProjects();
    console.log('Fetched all projects');
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw new Error('Error fetching projects');
  }
};

const getProjectById = async (id) => {
  try {
    const project = await projectRepo.getProjectById(id);
    console.log(`Fetched project with ID: ${id}`);
    return project;
  } catch (error) {
    console.error(`Error fetching project by ID ${id}:`, error.message);
    throw new Error('Error fetching project by ID');
  }
};

const addProject = async (projectData) => {
  try {
    const newProject = await projectRepo.addProject(projectData);
    console.log('Added new project');
    return newProject;
  } catch (error) {
    console.error('Error adding project:', error.message);
    throw new Error('Error adding project');
  }
};

const updateProject = async (id, projectData) => {
  try {
    const updatedProject = await projectRepo.updateProject(id, projectData);
    console.log(`Updated project with ID: ${id}`);
    return updatedProject;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error.message);
    throw new Error('Error updating project');
  }
};

const deleteProject = async (id) => {
  try {
    const deletedProject = await projectRepo.deleteProject(id);
    console.log(`Deleted project with ID: ${id}`);
    return deletedProject;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error.message);
    throw new Error('Error deleting project');
  }
};

module.exports = { getAllProjects, getProjectById, addProject, updateProject, deleteProject };
