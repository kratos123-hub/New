import React from 'react';
import './Projects.css';
import { useNavigate } from "react-router-dom";

const Projects = () => {
  // Initialize navigate function
  const navigate = useNavigate();

  return (
    <>
      <div className="container-project projects-section" id="projects">
        <h2>Our Current Projects</h2>
        <div className="projects">
          <div className="project-card" onClick={() => navigate("/HIH")}>
            <h3>HIH Project</h3>
            <p>Click to view details</p>
          </div>
          <div className="project-card" onClick={() => navigate("/Hanumanjee")}>
            <h3>Hanumanjee Project</h3>
            <p>Click to view details</p>
          </div>
          <div className="project-card" onClick={() => navigate("/JEX")}>
            <h3>Jyoti Exhibition Center</h3>
            <p>Click to view details</p>
          </div>
          <div className="project-card" onClick={() => navigate("/Jyotisar")}>
            <h3>Jyotisar Project</h3>
            <p>Click to view details</p>
          </div>
          <div className="project-card" onClick={() => navigate("/LucknowLibrary")}>
            <h3>Lucknow Library Project</h3>
            <p>Click to view details</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
