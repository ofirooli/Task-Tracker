import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "not-started",
    languages: [], // Multiple languages
    dueDate: "",
  });

  const PROJECT_URL = `http://localhost:4000/projects/${id}`;

  useEffect(() => {
    axios
      .get(PROJECT_URL)
      .then((response) => {
        setProject({
          ...response.data,
          dueDate: response.data.dueDate ? response.data.dueDate.split("T")[0] : "",
          languages: response.data.languages || [], // Initialize languages array
        });
      })
      .catch((error) => console.error("Failed to fetch project", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Add or remove language from the languages array
    const updatedLanguages = checked
      ? [...project.languages, value] // Add if checked
      : project.languages.filter((lang) => lang !== value); // Remove if unchecked

    setProject({
      ...project,
      languages: updatedLanguages, // Update the languages array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(PROJECT_URL, project);
      alert("Project updated successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Failed to update project", error);
      alert("Failed to update project. Please try again.");
    }
  };

  return (
    <div>
      <h1>Edit Project</h1>
      <form className="add-edit-form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={project.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={project.status}
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
            value={project.dueDate || ""}
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
                checked={project.languages.includes(lang)} // Pre-check the selected languages
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
            className="button cancel-btn"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
