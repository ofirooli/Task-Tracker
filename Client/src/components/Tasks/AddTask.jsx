import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // Store the list of projects
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending", // Default status
    priority: "low", // Default priority
    dueDate: "", // Only needed fields are included
    projectId: "", // Add projectId to the form data
  });

  // Fetch the projects when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:4000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/tasks", formData);
      alert("Task added successfully");
      navigate("/tasks"); // Redirect to tasks list after successful addition
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again");
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Add Task</h1>
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
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
