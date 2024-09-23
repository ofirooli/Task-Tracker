import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from '../components/Tasks/TaskItem'; // Import the correct path
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]); // New state for projects
  const [selectedProject, setSelectedProject] = useState(""); // New state for the selected project

  // Fetch tasks from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/tasks');
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchData();
  }, []);

  // Fetch projects from the server for filtering
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/projects');
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);

  // Filter tasks based on search term and selected project
  useEffect(() => {
    let filteredResults = tasks;

    // Filter by project
    if (selectedProject) {
      filteredResults = filteredResults.filter(task => task.projectId === selectedProject);
    }

    // Filter by search term
    filteredResults = filteredResults.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTasks(filteredResults);
  }, [searchTerm, tasks, selectedProject]);

  const activeTasks = filteredTasks.filter(task => task.status !== 'completed');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="tasks-container">
      <h1 className="page-title">Tasks</h1>
      <div className="task-controls">
        <Link to="/addTask">
          <button className="button add-tasks-btn">Add Task</button>
        </Link>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Add a project filter dropdown */}
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="project-filter-dropdown"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <h2>Active Tasks</h2>
      {activeTasks.length > 0 ? (
        activeTasks.map((task) => (
          <TaskItem key={task._id} task={task} handleDelete={() => console.log('Delete task')} />
        ))
      ) : (
        <p>No active tasks found</p>
      )}

      <h2>Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskItem key={task._id} task={task} handleDelete={() => console.log('Delete task')} />
        ))
      ) : (
        <p>No completed tasks found</p>
      )}
    </div>
  );
};

export default Tasks;
