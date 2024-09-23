import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MilestoneItem from '../components/Milestones/milestoneItem';

const MilestonePage = () => {
  const [milestones, setMilestones] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetching milestones from the server
    axios.get('http://localhost:4000/milestones')
      .then(response => {
        setMilestones(response.data);
      })
      .catch(error => console.error('Error fetching milestones:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/milestones/${id}`)
      .then(() => {
        setMilestones(milestones.filter(milestone => milestone._id !== id));
      })
      .catch(error => console.error('Error deleting milestone:', error));
  };

  const filteredMilestones = milestones.filter(milestone =>
    milestone.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="milestone-page">
      <h1 className="page-title">Milestones</h1>
      <div className="milestone-actions">
        <Link to="/addMilestone">
          <button className="button add-milestone-btn">Add Milestone</button>
        </Link>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>
      {filteredMilestones.length ? (
        filteredMilestones.map(milestone => (
          <MilestoneItem key={milestone._id} milestone={milestone} handleDelete={handleDelete} />
        ))
      ) : (
        <p>No milestones found</p>
      )}
    </div>
  );
};

export default MilestonePage;
