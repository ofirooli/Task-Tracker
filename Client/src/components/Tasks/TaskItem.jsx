import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Ensure axios is imported for API requests

const TaskItem = ({ task, handleDelete }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${task.title}?`
    );
    if (confirmDelete) {
      handleDelete(task._id);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options); // This formats the date as DD.MM.YYYY
  };

  useEffect(() => {
    // Fetch the projects from the API and find the project that matches task.projectId
    axios.get('http://localhost:4000/projects')
      .then((response) => {
        const projects = response.data;
        // Find the project whose _id matches the task's projectId
        const matchingProject = projects.find((project) => project._id === task.projectId);
        if (matchingProject) {
          setProjectName(matchingProject.name);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, [task.projectId]);

  // Toggle visibility of task details
  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="card">
      <h4 className={`task-title ${task.status === 'completed' ? 'completed-task' : ''}`} onClick={toggleInfo}>
        {task.title}
      </h4>
      <div className={`task-info ${isInfoVisible ? "show" : ""}`}>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Project:</strong> {projectName || "No project assigned"}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Due Date:</strong> {formatDate(task.dueDate)}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(task.createdAt)}
        </p>
        <p>
          <strong>Updated At:</strong> {formatDate(task.updatedAt)}
        </p>
        <div className="edit-and-delete-buttons">
          <Link to={`/editTask/${task._id}`}>
            <button className="button edit-btn">Edit</button>
          </Link>
          <button className="button delete-btn" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
