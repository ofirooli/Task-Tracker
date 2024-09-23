import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Tasks from "./pages/Tasks";
import AddTask from "./components/Tasks/AddTask";
import EditTask from "./components/Tasks/EditTask";
import Projects from "./pages/Projects"
import AddProject from "./components/Projects/AddProject";
import EditProject from "./components/Projects/EditProject";
import Milestones from "./pages/Milestones"
import AddMilestone from "./components/Milestones/AddMilestone";
import EditMilestone from "./components/Milestones/EditMilestone";
import Dashboard from "./pages/Dashboard";
import ProjectInfo from "./pages/ProjectInfo";

import "./App.css";

const App = () => {
  return (
    <>
      <header>
        <h1 onClick={() => (window.location.href = "/")}>Task Tracker</h1>{" "}
        <nav>
          <ul>
          <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/milestones">Milestones</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Welcome!</h1>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask/:id" element={<EditTask />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/editProject/:id" element={<EditProject />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/addMilestone" element={<AddMilestone />} />
          <Route path="/editMilestone/:id" element={<EditMilestone />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectInfo/:id" element={<ProjectInfo />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
