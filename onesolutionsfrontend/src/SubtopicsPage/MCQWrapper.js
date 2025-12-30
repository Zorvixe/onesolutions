import React, { useState } from "react";
import MCQInstructions from "./MCQInstructions";
import { subtopicComponents } from "../SubtopicsPage/Imports_Of_All_Files.js";

const MCQWrapper = ({ subtopic, subtopicId, goalName, courseName }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  // 1️⃣ Show instructions first
  if (showInstructions) {
    return <MCQInstructions onStart={() => setShowInstructions(false)} />;
  }

  // 2️⃣ Get MCQ component
  const MCQComponent = subtopicComponents[subtopic];

  // 3️⃣ Safety check
  if (!MCQComponent) {
    return (
      <div className="mcq-container">
        <p>No MCQ component found for "{subtopic}"</p>
      </div>
    );
  }

  // 4️⃣ Render MCQs
  return (
    <div className="mcq-container">
      <MCQComponent
        subtopicId={subtopicId}
        goalName={goalName}
        courseName={courseName}
      />
    </div>
  );
};

export default MCQWrapper;
