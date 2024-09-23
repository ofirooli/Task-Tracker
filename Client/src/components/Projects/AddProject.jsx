import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "not-started", // Default status
    languages: [], // Initialize with empty array for multiple languages
    dueDate: "" // Add dueDate to the form state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Add or remove language from the languages array
    const updatedLanguages = checked
      ? [...formData.languages, value] // Add if checked
      : formData.languages.filter((lang) => lang !== value); // Remove if unchecked

    setFormData({
      ...formData,
      languages: updatedLanguages, // Update the languages array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/projects", formData);
      alert("Project added successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add Project</h1>
      <form className="add-edit-form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>Languages:</label>
        <div>
          {['JavaScript', 'Python', 'C#', 'CSS', 'HTML', 'Other', 'Angular', 'Node.js', 'React', 'MongoDB', 'MySQL'].map((lang) => (
            <label key={lang}>
              <input
                type="checkbox"
                name="languages"
                value={lang}
                checked={formData.languages.includes(lang)} // Pre-check the selected languages
                onChange={handleCheckboxChange} // Handle checkbox change
              />
              {lang}
            </label>
          ))}
        </div>
        <div className="form-buttons">
          <button type="submit" className="button save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
