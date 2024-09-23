import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectItem from "../components/Projects/ProjectItem";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleDelete = (projectId) => {
    axios
      .delete(`http://localhost:4000/projects/${projectId}`)
      .then(() => setProjects(projects.filter((project) => project._id !== projectId)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Projects</h1>
      <div className="page-controls">
        <Link to="/addProject">
          <button className="button add-project-btn">Add Project</button>
        </Link>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by project name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="projects-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectItem
              key={project._id}
              project={project}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;