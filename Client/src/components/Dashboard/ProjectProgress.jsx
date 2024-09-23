import React from 'react';

const ProjectProgress = ({ completedTasks, totalTasks, projectName }) => {
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="project-progress-container">
      <div className="project-title">{projectName}</div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="percentage">{Math.round(percentage)}%</div>
    </div>
  );
};

export default ProjectProgress;
