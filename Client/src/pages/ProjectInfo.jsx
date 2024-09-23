import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Grabs the project ID from the URL
import "../CSS/InfoStyle.css";

const ProjectInfo = () => {
  const { id } = useParams(); // This 'id' is the project ID from the URL
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch project details using the project ID
    axios.get(`http://localhost:4000/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.error("Error fetching project information", error));

    // Fetch milestones that belong to this project ID
    axios.get(`http://localhost:4000/milestones`)
      .then(response => {
        // Filter milestones by project ID
        const filteredMilestones = response.data.filter(milestone => milestone.projectId === id);
        setMilestones(filteredMilestones);
      })
      .catch(error => console.error("Error fetching milestones", error));

    // Fetch tasks that belong to this project ID
    axios.get(`http://localhost:4000/tasks`)
      .then(response => {
        // Filter tasks by project ID
        const filteredTasks = response.data.filter(task => task.projectId === id);
        setTasks(filteredTasks);
      })
      .catch(error => console.error("Error fetching tasks", error));
  }, [id]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  if (!project) return <div>Error fetching project information</div>;

  return (
    <div className="project-info-container">
      <div className="project-info-header">
        <h2 className="project-info-title">{project.name}</h2>
        <p className="project-info-description"><strong>Description:</strong> {project.description}</p>
        <div className="project-info-meta">
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Due Date:</strong> {project.dueDate ? formatDate(project.dueDate) : "N/A"}</p>
          <p><strong>Created At:</strong> {project.createdAt ? formatDate(project.createdAt) : "N/A"}</p>
          <p><strong>Updated At:</strong> {project.updatedAt ? formatDate(project.updatedAt) : "N/A"}</p>
        </div>
      </div>

      <div className="project-info-details">
        <div className="project-info-milestones">
          <h3>Milestones</h3>
          {milestones.length > 0 ? (
            <ul className="milestone-info-list">
              {milestones.map((milestone) => (
                <li key={milestone._id}>
                  <div className="milestone-info-item">
                    <strong>{milestone.title}</strong> - Due: {formatDate(milestone.dueDate)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No milestones found for this project.</p>
          )}
        </div>

        <div className="project-info-tasks">
          <h3>Tasks</h3>
          {tasks.length > 0 ? (
            <ul className="task-info-list">
              {tasks.map((task) => (
                <li key={task._id}>
                  <div className="task-info-item">
                    <strong>{task.title}</strong> - Due: {formatDate(task.dueDate)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
