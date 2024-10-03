import React from 'react';
import './jex.css';
import JEXTimer from './JEXT';

const JEX = () => {
  return (
    <div>
      <div className="container">
        <div className="info-row">
          <div className="text">
            <h1>Jhansi </h1>
            <h1>Exhibition Center</h1>
          </div>
          <JEXTimer />  
        </div>

        <div className="section1">
          <div className="project-details-left">
            <h2>JEX Project Details</h2>
            <div className="details-box png3">
              <p><strong>Project Contract value:</strong> 31.21 Cr</p>
              <p><strong>Project Start Date As Per Plan:</strong> 27-July-24</p>
              <p><strong>Original End Date As per Plan:</strong> 22-Dec-24</p>
              <p><strong>Project Duration:</strong> 149 Days (As per updated plan)</p>
              <p><strong>Project Progress Expected (As per plan):</strong> 44%</p>
              <p><strong>Project Progress Actual (As Per Plan):</strong> 26%</p>
              <p><strong>No of Days Delays:</strong> 32 days</p>
              <p><strong>Days Elapse:</strong> 59 days</p>
              <p><strong>Remaining Days:</strong> 89 Days</p>
            </div>
          </div>

          <div className="image-left">
            <h2>Financial Status Graph</h2>
            <img
              src="public/Assets/Lete Hue Hanuman Ji/expense.jpeg"
              alt="Progress Graph"
              className="graph-image-uniform img1"
              width="350px"
            />
          </div>

          <div className="image-right">
            <h2>Manpower (September month)</h2>
            <img
              src="public/Assets/Lete Hue Hanuman Ji/Manpower.jpeg"
              alt="Pile Progress Till 22 September"
              className="graph-image-uniform img2"
              width="350px"
            />
          </div>
        {/* </div>

        <div className="section2"> */}
          <div className="image-right">
            <h2>Machine Usage Over Time</h2>
            <img
              src="public/Assets/Lete Hue Hanuman Ji/MUOT.jpeg"
              alt="Pile Progress Till 22 September"
              className="graph-image-uniform img2"
              width="350px"
            />
          </div>
          <div className="image-left">
            <h3>Material Consumption Graph</h3>
            <img
              src="public/Assets/Lete Hue Hanuman Ji/rcb.jpeg"
              alt="Cost Breakdown Graph"
              className="graph-image-uniform img4"
              width="350px"
            />
          </div>
          <div className="image-left">
            <h3>Hinderance Graph</h3>
            <img
              src="public/Assets/Lete Hue Hanuman Ji/ehpru.jpeg"
              alt="Cost Breakdown Graph"
              className="graph-image-uniform img4"
              width="350px"
            />
          </div>
        </div>
      </div>

      <div className="container2">
        <h1>Reports Section</h1>
        <div className="pdf">
          <a href="public/Assets/SLH Report.pdf" target="_blank">Preview PDF</a>
          <a href="public/Assets/SLH Report.pdf" download>Download PDF</a>
        </div>
      </div>
    </div>
  );
};

export default JEX;
