import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Importing all components
import CollapsibleProject from '../components/Dashboard/CollapsibleProject';
import DailyTaskList from '../components/Dashboard/DailyTaskList';
import DarkModeToggle from '../components/Dashboard/DarkModeToggle';
import NotificationBell from '../components/Dashboard/NotificationBell';
import ProjectProgress from '../components/Dashboard/ProjectProgress';
import TaskPriorityChart from '../components/Dashboard/TaskPriorityChart';
import TaskCalendar from '../components/Dashboard/TaskCalendar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0); // For NotificationBell

  useEffect(() => {
    // Fetch tasks
    axios.get('http://localhost:4000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));

    // Fetch projects
    axios.get('http://localhost:4000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch milestones
    axios.get('http://localhost:4000/milestones')
      .then(response => setMilestones(response.data))
      .catch(error => console.error('Error fetching milestones:', error));

    // Simulate fetching unread notifications count
    setUnreadNotifications(0); // Placeholder for now
    {unreadNotifications > 0 && (
        <NotificationBell unreadCount={unreadNotifications} />
      )}

  }, []);

  // Function to calculate task completion percentage for each project
  const calculateProgressForProject = (projectId) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    const totalTasks = projectTasks.length;

    // Return the progress percentage
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  return (
    <div className="dashboard-container">
      {/* Notification Bell */}
      <div className="dashboard-header">
        <NotificationBell unreadCount={unreadNotifications} />
        <DarkModeToggle />
      </div>

      <div className="dashboard-grid">
        {/* Task Calendar */}
        <div className="grid-item full-width">
          <h2>Task Calendar</h2>
          <TaskCalendar tasks={tasks} projects={projects} milestones={milestones} />
        </div>

        {/* Daily Task List */}
        <div className="grid-item">
          <h2>Today's Tasks</h2>
          <DailyTaskList tasks={tasks} />
        </div>

        {/* Task Priority Breakdown */}
        <div className="grid-item">
          <h2>Task Priority Breakdown</h2>
          <TaskPriorityChart tasks={tasks} />
        </div>

        {/* Project Progress */}
        <div className="grid-item">
          <h2>Project Progress</h2>
          {projects.map(project => {
            const progress = calculateProgressForProject(project._id);
            return (
              <div key={project._id}>
                <h3>{project.name}</h3>
                <ProjectProgress completedTasks={progress} totalTasks={100} />
              </div>
            );
          })}
        </div>

        {/* Collapsible Projects */}
        <div className="grid-item full-width">
          <h2>Projects Overview</h2>
          {projects.map(project => (
            <Link key={project._id} to={`/projectInfo/${project._id}`}>
              <CollapsibleProject project={project} />
            </Link>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
