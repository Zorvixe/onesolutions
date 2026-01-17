import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is a Third-Party Package?</p>
        </div>
      ),
      options: [
        "Code written by browser",
        "Reusable code developed to perform a specific functionality",
        "Only React inbuilt library",
        "Backend API",
      ],
      answer: "Reusable code developed to perform a specific functionality",
    },
    {
      question: (
        <div>
          <p>Which tool is used to install third-party packages?</p>
        </div>
      ),
      options: ["Git", "Node", "npm", "Webpack"],
      answer: "npm",
    },
    {
      question: (
        <div>
          <p>Which is NOT an advantage of third-party packages?</p>
        </div>
      ),
      options: [
        "Easy integration",
        "More code required",
        "Saves time",
        "Better error handling",
      ],
      answer: "More code required",
    },
    {
      question: (
        <div>
          <p>Which factor should be considered while selecting a package?</p>
        </div>
      ),
      options: [
        "Color theme",
        "User satisfaction",
        "File size only",
        "Browser version",
      ],
      answer: "User satisfaction",
    },
    {
      question: (
        <div>
          <p>Which package is used to play videos in React?</p>
        </div>
      ),
      options: ["react-video", "react-media", "react-player", "react-stream"],
      answer: "react-player",
    },
    {
      question: (
        <div>
          <p>Which command installs react-player?</p>
          <CodeBlock language="bash" code={`npm install react-player`} />
        </div>
      ),
      options: [
        "npm add react-player",
        "npm install react-player",
        "npm get react-player",
        "npm create react-player",
      ],
      answer: "npm install react-player",
    },
    {
      question: (
        <div>
          <p>Which prop shows video controls?</p>
          <CodeBlock language="jsx" code={`<ReactPlayer url={videoURL} controls />`} />
        </div>
      ),
      options: ["playing", "light", "controls", "width"],
      answer: "controls",
    },
    {
      question: (
        <div>
          <p>Which prop is used to play/pause video?</p>
          <CodeBlock language="jsx" code={`<ReactPlayer url={videoURL} playing={true} />`} />
        </div>
      ),
      options: ["controls", "playing", "light", "className"],
      answer: "playing",
    },
    {
      question: (
        <div>
          <p>What is the default value of the playing prop?</p>
          <CodeBlock language="jsx" code={`playing={false}`} />
        </div>
      ),
      options: ["true", "false", "null", "undefined"],
      answer: "false",
    },
    {
      question: (
        <div>
          <p>Which prop displays video thumbnail before play?</p>
          <CodeBlock language="jsx" code={`<ReactPlayer url={videoURL} light />`} />
        </div>
      ),
      options: ["controls", "playing", "light", "height"],
      answer: "light",
    },
    {
      question: (
        <div>
          <p>Which state variable controls play/pause?</p>
          <CodeBlock
            language="jsx"
            code={`state = { isPlaying: false }`}
          />
        </div>
      ),
      options: ["isLoading", "isPlaying", "showVideo", "playState"],
      answer: "isPlaying",
    },
    {
      question: (
        <div>
          <p>What does this function do?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState(prevState => ({isPlaying: !prevState.isPlaying}))`}
          />
        </div>
      ),
      options: [
        "Stops the video",
        "Plays the video",
        "Toggles play and pause",
        "Reloads the page",
      ],
      answer: "Toggles play and pause",
    },
    {
      question: (
        <div>
          <p>Which prop sets the width of the player?</p>
          <CodeBlock language="jsx" code={`<ReactPlayer width="500px" />`} />
        </div>
      ),
      options: ["height", "controls", "width", "light"],
      answer: "width",
    },
    {
      question: (
        <div>
          <p>Which prop is used for custom CSS class?</p>
          <CodeBlock language="jsx" code={`<ReactPlayer className="player" />`} />
        </div>
      ),
      options: ["id", "style", "className", "theme"],
      answer: "className",
    },
    {
      question: (
        <div>
          <p>Which component is imported from react-player?</p>
          <CodeBlock language="jsx" code={`import ReactPlayer from 'react-player'`} />
        </div>
      ),
      options: ["Video", "MediaPlayer", "ReactPlayer", "Player"],
      answer: "ReactPlayer",
    },
  ];
  
  

const Third_Party_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Components and Props - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Third_Party_MCQ;
