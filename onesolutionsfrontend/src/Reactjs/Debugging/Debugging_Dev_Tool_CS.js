import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Debugging_Dev_Tool_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
    <h1>Debugging using Developer Tools | Cheat Sheet</h1>
  
    <section>
      <h2>1. Debugging</h2>
      <p>
        Debugging is the process of finding and fixing bugs in the code.
      </p>
  
      <p>We can debug using:</p>
      <ul>
        <li>Browser Developer Tools</li>
        <li>React Developer Tools</li>
      </ul>
    </section>
  
    <section>
      <h2>2. Browser Developer Tools</h2>
      <p>
        Browser Developer Tools are the tools provided by browsers to debug
        applications loaded in the web browser.
      </p>
  
      <p>
        Using Browser Developer Tools, we can:
      </p>
  
      <ul>
        <li>View the source code (HTML, CSS, and JavaScript)</li>
        <li>
    <a
      href="https://developer.chrome.com/docs/devtools/css/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View and change CSS styles
    </a>
  </li>

  <li>
    <a
      href="https://developer.chrome.com/docs/devtools/console/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View logged messages in the Console
    </a>
  </li>

  <li>
    <a
      href="https://developer.chrome.com/docs/devtools/console/javascript/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Run JavaScript directly in the Console
    </a>
  </li>

  <li>
    <a
      href="https://developer.chrome.com/docs/devtools/device-mode/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Check the responsiveness of an application
    </a>
  </li>

  <li>
    <a
      href="https://developer.chrome.com/docs/devtools/network/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Inspect network requests
    </a>
  </li>
      </ul>
    </section>
  
    <section>
      <h2>3. React Developer Tools</h2>
      <p>
        React Developer Tools is a browser extension used to inspect and debug
        React applications.
      </p>
            <a
        href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
        target="_blank"
        rel="noopener noreferrer"
      >
        👉 Install React Developer Tools for Chrome
      </a>
  
      <p>
        Using React Developer Tools, we can:
      </p>
  
      <ul>
        <li>Inspect React component hierarchy</li>
        <li>View props and state of components</li>
        <li>Track component re-renders</li>
        <li>Debug performance issues</li>
      </ul>
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          React Developer Tools can be installed as a browser extension for
          Google Chrome.
        </p>
      </div>
    </section>
      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Debugging_Dev_Tool_CS;
