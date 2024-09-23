import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MilestoneItem = ({ milestone, handleDelete }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options); // Formats as DD/MM/YYYY
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${milestone.title}?`);
    if (confirmDelete) {
      handleDelete(milestone._id);
    }
  };

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="card milestone-item">
      <h4 className="milestone-title" onClick={toggleInfo}>{milestone.title}</h4>
      {isInfoVisible && (
        <div className="milestone-info">
          <p><strong>Description:</strong> {milestone.description}</p>
          <p><strong>Status:</strong> {milestone.completed ? 'Completed' : 'Pending'}</p>
      <p><strong>Due Date:</strong> {milestone.dueDate ? formatDate(milestone.dueDate) : "N/A"}</p>
      <p><strong>Created At:</strong> {milestone.createdAt ? formatDate(milestone.createdAt) : "N/A"}</p>
      <p><strong>Updated At:</strong> {milestone.updatedAt ? formatDate(milestone.updatedAt) : "N/A"}</p>
          <div className="edit-and-delete-buttons">
            <Link to={`/editMilestone/${milestone._id}`}>
              <button className="button edit-btn">Edit</button>
            </Link>
            <button className="button delete-btn" onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneItem;
