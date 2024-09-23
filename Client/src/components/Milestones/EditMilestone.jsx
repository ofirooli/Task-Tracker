import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMilestone = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    projectId: "",
  });
  const [projects, setProjects] = useState([]); // State to store fetched projects

  const MILESTONE_URL = `http://localhost:4000/milestones/${id}`;

  useEffect(() => {
    // Fetch the milestone details
    axios
      .get(MILESTONE_URL)
      .then((response) => {
        // Ensure the due date is in the format YYYY-MM-DD for the input field
        const milestoneData = response.data;
        milestoneData.dueDate = new Date(milestoneData.dueDate).toISOString().split("T")[0];
        setFormData(milestoneData);
      })
      .catch((error) => console.error("Failed to fetch milestone", error));

    // Fetch available projects
    axios
      .get("http://localhost:4000/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(MILESTONE_URL, formData);
      alert("Milestone updated successfully!");
      navigate("/milestones");
    } catch (error) {
      console.error("Failed to update milestone", error);
      alert("Failed to update milestone. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Edit Milestone</h1>
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
        <div className="form-buttons">
          <button type="submit" className="button save-task-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/milestones")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMilestone;
