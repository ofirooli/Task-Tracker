import React, { useState } from 'react';  // Add useState

const CollapsibleProject = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);  // Hook to manage collapse state

  return (
    <div className="project-item">
      <h3 onClick={() => setIsOpen(!isOpen)}>{project.name}</h3>
      {isOpen && (
        <div>
          <p>Project Description: {project.description}</p>
          <ul>
            {project.tasks.map(task => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollapsibleProject;
