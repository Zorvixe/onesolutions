import React from "react";
import "./MCQInstruction.css";

const MCQInstructions = ({ 
  onStart, 
  totalQuestions = 15,
  hasNegativeMarking = true,
  passingScore = 80,
  timePerQuestion = 20
}) => {
  return (
    <div className="instructions-page">
      <div className="practice-container">
        <h2>Instructions:</h2>
        <ol>
          <li>
            <strong>Number of Questions:</strong> {totalQuestions}
          </li>
          <li>
            <strong>Types of Questions:</strong> Multiple Choice Questions (MCQs)
          </li>
          <li>
            <strong>Time per Question:</strong> {timePerQuestion} seconds
          </li>
          <li>
            <strong>Marking Scheme:</strong> 
            <ul className="marking-scheme">
              <li>✓ Correct answer: +{parseFloat((100/totalQuestions).toFixed(2))} points</li>
              <li>✓ Time bonus: +3.33 points (if answered within {timePerQuestion-10} seconds)</li>
              {hasNegativeMarking && (
                <li>✗ Wrong answer: -1 point (penalty)</li>
              )}
              <li>⏭️ Skipped question: 0 points</li>
            </ul>
          </li>
          <li>
            <strong>Passing Criteria:</strong> You need to score at least {passingScore}% to mark this practice as completed.
          </li>
          <li className="points-li">
            <span>
              Points will be awarded based on your performance:
            </span>
            <strong>1% Score = 1 Point</strong>
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
    </div>
  );
};

export default MCQInstructions;