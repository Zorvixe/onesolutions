import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is a third-party package in React?</p>
        </div>
      ),
      options: [
        "Code written inside App.js",
        "Reusable code installed from npm",
        "Built-in React feature",
        "CSS library only",
      ],
      answer: "Reusable code installed from npm",
    },
    {
      question: (
        <div>
          <p>What is the main purpose of the UUID package?</p>
        </div>
      ),
      options: [
        "To generate random colors",
        "To generate unique IDs",
        "To manage state",
        "To handle events",
      ],
      answer: "To generate unique IDs",
    },
    {
      question: (
        <div>
          <p>Why should React state be immutable?</p>
        </div>
      ),
      options: [
        "To improve styling",
        "To trigger proper re-rendering",
        "To avoid JSX errors",
        "To update props",
      ],
      answer: "To trigger proper re-rendering",
    },
    {
      question: (
        <div>
          <p>Which operator is commonly used to maintain immutability?</p>
        </div>
      ),
      options: ["+", "=", "... (spread operator)", "&&"],
      answer: "... (spread operator)",
    },
    {
      question: (
        <div>
          <p>Which React method is used to update state correctly?</p>
        </div>
      ),
      options: [
        "this.state = {}",
        "this.updateState()",
        "this.setState()",
        "this.changeState()",
      ],
      answer: "this.setState()",
    },
  
    {
      question: (
        <div>
          <p>Which command installs the UUID package?</p>
          <CodeBlock language="bash" code={`npm install uuid`} />
        </div>
      ),
      options: [
        "npm add uuid",
        "npm install uuid",
        "npm uuid install",
        "npm get uuid",
      ],
      answer: "npm install uuid",
    },
    {
      question: (
        <div>
          <p>What does this import statement do?</p>
          <CodeBlock
            language="jsx"
            code={`import { v4 as uuidv4 } from "uuid";`}
          />
        </div>
      ),
      options: [
        "Imports CSS",
        "Imports React",
        "Imports UUID generator",
        "Imports state",
      ],
      answer: "Imports UUID generator",
    },
    {
      question: (
        <div>
          <p>What is wrong with this code?</p>
          <CodeBlock
            language="javascript"
            code={`this.state.contactsList.push(newContact);`}
          />
        </div>
      ),
      options: [
        "Syntax error",
        "Directly mutates state",
        "Uses spread operator",
        "Correct code",
      ],
      answer: "Directly mutates state",
    },
    {
      question: (
        <div>
          <p>Why is this approach correct?</p>
          <CodeBlock
            language="javascript"
            code={`this.setState(prevState => ({
    contactsList: [...prevState.contactsList, newContact],
  }));`}
          />
        </div>
      ),
      options: [
        "It mutates the state",
        "It creates a new array",
        "It deletes contacts",
        "It updates props",
      ],
      answer: "It creates a new array",
    },
    {
      question: (
        <div>
          <p>What does this spread syntax achieve?</p>
          <CodeBlock
            language="javascript"
            code={`{ ...eachContact, isFavorite: !eachContact.isFavorite }`}
          />
        </div>
      ),
      options: [
        "Deletes contact",
        "Updates object immutably",
        "Changes array length",
        "Updates state directly",
      ],
      answer: "Updates object immutably",
    },
    {
      question: (
        <div>
          <p>What does toggleIsFavorite function do?</p>
          <CodeBlock
            language="javascript"
            code={`toggleIsFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (id === eachContact.id) {
          return { ...eachContact, isFavorite: !eachContact.isFavorite };
        }
        return eachContact;
      }),
    }));
  };`}
          />
        </div>
      ),
      options: [
        "Deletes contact",
        "Toggles favorite status",
        "Adds contact",
        "Sorts contacts",
      ],
      answer: "Toggles favorite status",
    },
    {
      question: (
        <div>
          <p>Why is map() used here?</p>
          <CodeBlock
            language="javascript"
            code={`prevState.contactsList.map(eachContact => { ... })`}
          />
        </div>
      ),
      options: [
        "To mutate array",
        "To return a new updated array",
        "To remove contacts",
        "To update props",
      ],
      answer: "To return a new updated array",
    },
    {
      question: (
        <div>
          <p>What happens when the form is submitted?</p>
          <CodeBlock
            language="javascript"
            code={`onAddContact = event => {
    event.preventDefault();
  }`}
          />
        </div>
      ),
      options: [
        "Page reloads",
        "Default submit behavior is prevented",
        "Form resets automatically",
        "Error occurs",
      ],
      answer: "Default submit behavior is prevented",
    },
    {
      question: (
        <div>
          <p>Why is uuidv4() used when creating a new contact?</p>
          <CodeBlock
            language="javascript"
            code={`id: uuidv4(),`}
          />
        </div>
      ),
      options: [
        "To generate random text",
        "To generate unique ID",
        "To update state",
        "To validate input",
      ],
      answer: "To generate unique ID",
    },
    {
      question: (
        <div>
          <p>What does this code do?</p>
          <CodeBlock
            language="jsx"
            code={`<ContactItem
    key={eachContact.id}
    contactDetails={eachContact}
    toggleIsFavorite={this.toggleIsFavorite}
  />`}
          />
        </div>
      ),
      options: [
        "Updates state",
        "Passes data and function to child",
        "Deletes contact",
        "Filters list",
      ],
      answer: "Passes data and function to child",
    },
 ];
  
const Ondemand2_Session_MCQ = ({
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

export default Ondemand2_Session_MCQ;
