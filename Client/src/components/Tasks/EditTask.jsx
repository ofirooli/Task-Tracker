import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // List of projects
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    projectId: '' // Add projectId field
  });

  const TASKS_URL = `http://localhost:4000/tasks/${id}`;
  const PROJECTS_URL = `http://localhost:4000/projects`; // API endpoint for projects

  useEffect(() => {
    // Fetch the task data
    axios.get(TASKS_URL)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => console.error('Failed to fetch task', error));

    // Fetch the list of projects
    axios.get(PROJECTS_URL)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error('Failed to fetch projects', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(TASKS_URL, formData);
      alert('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error('Failed to update task', error);
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Edit Task</h1>
      <form className="add-edit-form-container" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Project:
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="button save-task-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/tasks')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
