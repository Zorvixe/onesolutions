import React from 'react';
import { Link } from 'react-router-dom';
// import './PythonInterviewKit.css'; // optional styling

const PythonInterviewKit = () => {
  return (
    <div className="interview-kit-page">
      <h1>Python Interview Kit</h1>
      <p>Select a practice set to start:</p>

      <div className="kit-grid">
        <Link to="/practice/python-set-1" className="kit-card">
          <h3>Python Practice Set 1</h3>
          <p>Basic concepts, variables, loops</p>
        </Link>

        <Link to="/practice/python-set-2" className="kit-card">
          <h3>Python Practice Set 2</h3>
          <p>Functions, lists, dictionaries</p>
        </Link>

        <Link to="/practice/python-set-3" className="kit-card">
          <h3>Python Practice Set 3</h3>
          <p>OOP, file handling, exceptions</p>
        </Link>

        {/* Add more cards for SQL, HTML, CSS kits */}
        <Link to="/practice/sql-set-1" className="kit-card">
          <h3>SQL Practice Set 1</h3>
          <p>SELECT, WHERE, JOIN basics</p>
        </Link>

        {/* ... more ... */}
      </div>
    </div>
  );

}

export default PythonInterviewKit
