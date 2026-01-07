import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>When should the setState() object syntax be used?</p>
        </div>
      ),
      options: [
        "When state depends on previous state",
        "When updating state to a static value",
        "When updating props",
        "When rendering JSX",
      ],
      answer: "When updating state to a static value",
    },
    {
      question: (
        <div>
          <p>Why is the callback form of setState() recommended?</p>
        </div>
      ),
      options: [
        "It avoids JSX errors",
        "It gives access to previous state safely",
        "It updates props",
        "It prevents re-rendering",
      ],
      answer: "It gives access to previous state safely",
    },
    {
      question: (
        <div>
          <p>What is a controlled input in React?</p>
        </div>
      ),
      options: [
        "Input controlled by browser",
        "Input controlled by React state",
        "Input without value attribute",
        "Input controlled by props only",
      ],
      answer: "Input controlled by React state",
    },
    {
      question: (
        <div>
          <p>Which input handling method is recommended in React?</p>
        </div>
      ),
      options: [
        "Uncontrolled Input",
        "Controlled Input",
        "HTML Input",
        "Readonly Input",
      ],
      answer: "Controlled Input",
    },
    {
      question: (
        <div>
          <p>Why are functions passed as props to child components?</p>
        </div>
      ),
      options: [
        "To update JSX",
        "To allow child-to-parent communication",
        "To pass state automatically",
        "To avoid rendering",
      ],
      answer: "To allow child-to-parent communication",
    },
  
    {
      question: (
        <div>
          <p>Which form of setState() is used below?</p>
          <CodeBlock
            language="javascript"
            code={`this.setState({ quantity: 2 });`}
          />
        </div>
      ),
      options: [
        "Callback syntax",
        "Object syntax",
        "Constructor syntax",
        "Reducer syntax",
      ],
      answer: "Object syntax",
    },
    {
      question: (
        <div>
          <p>Why is prevState used in this code?</p>
          <CodeBlock
            language="javascript"
            code={`this.setState(prevState => ({
    count: prevState.count + 1
  }));`}
          />
        </div>
      ),
      options: [
        "To access props",
        "To access previous state",
        "To avoid JSX",
        "To stop rendering",
      ],
      answer: "To access previous state",
    },
    {
      question: (
        <div>
          <p>Which type of input is shown below?</p>
          <CodeBlock
            language="jsx"
            code={`<input type="text" />`}
          />
        </div>
      ),
      options: [
        "Controlled input",
        "Uncontrolled input",
        "Readonly input",
        "Invalid input",
      ],
      answer: "Uncontrolled input",
    },
    {
      question: (
        <div>
          <p>Why is this input considered controlled?</p>
          <CodeBlock
            language="jsx"
            code={`<input
    type="text"
    value={searchInput}
    onChange={this.onChangeSearchInput}
  />`}
          />
        </div>
      ),
      options: [
        "Value is handled by DOM",
        "Value is handled by React state",
        "Value is constant",
        "Value is undefined",
      ],
      answer: "Value is handled by React state",
    },
    {
      question: (
        <div>
          <p>What does this function do?</p>
          <CodeBlock
            language="javascript"
            code={`onChangeSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };`}
          />
        </div>
      ),
      options: [
        "Updates props",
        "Updates input value in state",
        "Deletes a user",
        "Filters list",
      ],
      answer: "Updates input value in state",
    },
    {
      question: (
        <div>
          <p>What is being passed to the UserProfile component?</p>
          <CodeBlock
            language="jsx"
            code={`<UserProfile
    userDetails={user}
    deleteUser={this.deleteUser}
  />`}
          />
        </div>
      ),
      options: [
        "Only data",
        "Only function",
        "Data and function",
        "State directly",
      ],
      answer: "Data and function",
    },
    {
      question: (
        <div>
          <p>What does this filter logic achieve?</p>
          <CodeBlock
            language="javascript"
            code={`user.name
    .toLowerCase()
    .includes(searchInput.toLowerCase())`}
          />
        </div>
      ),
      options: [
        "Deletes users",
        "Filters users based on search input",
        "Sorts users",
        "Updates state",
      ],
      answer: "Filters users based on search input",
    },
    {
      question: (
        <div>
          <p>What happens when the Delete button is clicked?</p>
          <CodeBlock
            language="jsx"
            code={`<button onClick={onDelete}>Delete</button>`}
          />
        </div>
      ),
      options: [
        "Component reloads",
        "User is removed from list",
        "State resets",
        "Error occurs",
      ],
      answer: "User is removed from list",
    },
    {
      question: (
        <div>
          <p>Why is <code>uniqueNo</code> passed to deleteUser?</p>
          <CodeBlock
            language="javascript"
            code={`deleteUser(uniqueNo);`}
          />
        </div>
      ),
      options: [
        "To update input",
        "To identify which user to delete",
        "To update props",
        "To stop rendering",
      ],
      answer: "To identify which user to delete",
    },
    {
      question: (
        <div>
          <p>Why is the key prop used here?</p>
          <CodeBlock
            language="jsx"
            code={`<UserProfile key={user.uniqueNo} />`}
          />
        </div>
      ),
      options: [
        "To style component",
        "To uniquely identify list items",
        "To update state",
        "To pass props",
      ],
      answer: "To uniquely identify list items",
    },
];
  

const Class_Component_State2_MCQ = ({
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

export default Class_Component_State2_MCQ;
