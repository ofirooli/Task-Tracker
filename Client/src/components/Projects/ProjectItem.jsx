import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, handleDelete }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${project.name}?`);
    if (confirmDelete) {
      handleDelete(project._id);
    }
  };

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="card">
      <h4 className="project-title" onClick={toggleInfo}>{project.name}</h4>
      {isInfoVisible && (
        <div className="project-info">
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Languages:</strong> {project.languages.length > 0 ? project.languages.join(", ") : "No languages selected"}</p>
          <p><strong>Due Date:</strong> {project.dueDate ? formatDate(project.dueDate) : "No due date"}</p>
          <p><strong>Created At:</strong> {formatDate(project.createdAt)}</p>
          <p><strong>Updated At:</strong> {formatDate(project.updatedAt)}</p>

          <div className="edit-and-delete-buttons">
            <Link to={`/editProject/${project._id}`}>
              <button className="button edit-btn">Edit</button>
            </Link>
            <button className="button delete-btn" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem
