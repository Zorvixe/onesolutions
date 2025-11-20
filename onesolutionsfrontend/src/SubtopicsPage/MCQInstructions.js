import React from "react";
import "./MCQInstruction.css";

const MCQInstructions = ({ onStart }) => {
  return (
    <div className="practice-container">
      <h2>Instructions:</h2>
      <ol>
        <li>
          <strong>Number of Questions:</strong> 15
        </li>
        <li>
          <strong>Types of Questions:</strong> MCQs
        </li>
        <li>
          <strong>Marking Scheme:</strong> All questions have equal weightage. Every correct response gets +1 mark. There is no negative marking.
        </li>
        <li>
          You must answer all the MCQs correctly in order to mark your practice as completed.
        </li>
        <li className="points-li">
          <span>Points will be awarded based on your score in coding questions:</span>
          <strong>1 Score = 1 Point</strong>
        </li>
      </ol>

      <div className="practice-actions">
        <button className="feedback-button">
          <i className="bi bi-chat-left-dots"></i> Give Feedback
        </button>
        <button className="start-button" onClick={onStart}>
          START PRACTICE
        </button>
      </div>
    </div>
  );
};

export default MCQInstructions;
