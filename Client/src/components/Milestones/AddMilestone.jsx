import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMilestone = () => {
  const [milestoneData, setMilestoneData] = useState({
    title: '',
    description: '',
    dueDate: '',
    projectId: ''
  });
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available projects when component mounts
    axios
      .get('http://localhost:4000/projects')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleChange = (e) => {
    setMilestoneData({
      ...milestoneData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/milestones', milestoneData);
      navigate('/milestones');
    } catch (err) {
      setError('Error adding milestone');
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Add Milestone</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="add-edit-form-container" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={milestoneData.title}
          onChange={handleChange}
          required
          className="input-field"
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={milestoneData.description}
          onChange={handleChange}
          required
          className="input-field"
        ></textarea>

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={milestoneData.dueDate}
          onChange={handleChange}
          required
          className="input-field"
        />

        <label>Project:</label>
        <select
          name="projectId"
          value={milestoneData.projectId}
          onChange={handleChange}
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

        <div className="form-buttons">
          <button type="submit" className="button save-task-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/milestones')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMilestone;
