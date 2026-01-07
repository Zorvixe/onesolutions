import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is Conditional Rendering in React?</p>
        </div>
      ),
      options: [
        "Rendering components only once",
        "Rendering different UI based on a condition",
        "Styling components conditionally",
        "Passing props conditionally",
      ],
      answer: "Rendering different UI based on a condition",
    },
    {
      question: (
        <div>
          <p>Which of the following is NOT a method of conditional rendering?</p>
        </div>
      ),
      options: [
        "If...Else statement",
        "Ternary operator",
        "Logical && operator",
        "for loop",
      ],
      answer: "for loop",
    },
    {
      question: (
        <div>
          <p>When should ternary operators be preferred?</p>
        </div>
      ),
      options: [
        "For complex conditions",
        "For simple conditions inside JSX",
        "For looping elements",
        "For updating state",
      ],
      answer: "For simple conditions inside JSX",
    },
    {
      question: (
        <div>
          <p>What is the purpose of defaultProps?</p>
        </div>
      ),
      options: [
        "To update props",
        "To validate props",
        "To provide default values for props",
        "To remove props",
      ],
      answer: "To provide default values for props",
    },
    {
      question: (
        <div>
          <p>Which approach is NOT recommended for conditional rendering?</p>
        </div>
      ),
      options: [
        "Using If...Else",
        "Using && operator",
        "Using CSS display:none",
        "Using ternary operator",
      ],
      answer: "Using CSS display:none",
    },
    {
      question: (
        <div>
          <p>What will be rendered when <code>isLoggedIn</code> is true?</p>
          <CodeBlock
            language="jsx"
            code={`{isLoggedIn ? <button>Logout</button> : <button>Login</button>}`}
          />
        </div>
      ),
      options: ["Login button", "Logout button", "Both buttons", "Nothing"],
      answer: "Logout button",
    },
    {
      question: (
        <div>
          <p>Which conditional rendering method is used here?</p>
                        <CodeBlock
                            language="jsx"
                            code={`if (isLoggedIn) {
                    return <button>Logout</button>;
                } else {
                    return <button>Login</button>;
                }`}
                        />
        </div>
      ),
      options: [
        "Ternary operator",
        "Logical && operator",
        "If...Else statement",
        "Element variable",
      ],
      answer: "If...Else statement",
    },
    {
      question: (
        <div>
          <p>What is the role of <code>authButton</code> here?</p>
                    <CodeBlock
                        language="jsx"
                        code={`let authButton;
            
            if (isLoggedIn) {
                authButton = <button>Logout</button>;
            } else {
                authButton = <button>Login</button>;
            }`}
                    />
        </div>
      ),
      options: [
        "State variable",
        "Element variable",
        "Prop variable",
        "Event handler",
      ],
      answer: "Element variable",
    },
    {
      question: (
        <div>
          <p>Which operator is used for conditional rendering below?</p>
          <CodeBlock
            language="jsx"
            code={`{isLoggedIn && <button>Logout</button>}`}
          />
        </div>
      ),
      options: ["Ternary", "If...Else", "Logical &&", "Switch"],
      answer: "Logical &&",
    },
    {
      question: (
        <div>
          <p>What happens if <code>isLoggedIn</code> is false?</p>
          <CodeBlock
            language="jsx"
            code={`{isLoggedIn && <button>Logout</button>}`}
          />
        </div>
      ),
      options: [
        "Logout button is shown",
        "Login button is shown",
        "Nothing is rendered",
        "Error occurs",
      ],
      answer: "Nothing is rendered",
    },
    {
      question: (
        <div>
          <p>What value will be used for <code>name</code>?</p>
                    <CodeBlock
                        language="jsx"
                        code={`Welcome.defaultProps = {
                name: "Rahul",
                greeting: "Hello",
            };`}
                    />
        </div>
      ),
      options: ["Undefined", "Null", "Rahul", "Error"],
      answer: "Rahul",
    },
    {
      question: (
        <div>
          <p>Why does this component not throw an error?</p>
          <CodeBlock
            language="jsx"
            code={`<Welcome greeting="Hello" />`}
          />
        </div>
      ),
      options: [
        "Props are optional",
        "defaultProps provides missing values",
        "JSX ignores missing props",
        "State replaces props",
      ],
      answer: "defaultProps provides missing values",
    },
    {
      question: (
        <div>
          <p>Where are defaultProps defined?</p>
                    <CodeBlock
                        language="jsx"
                        code={`ComponentName.defaultProps = {
                propName: "value",
            };`}
                    />
        </div>
      ),
      options: [
        "Inside render()",
        "Inside state",
        "Outside the component",
        "Inside constructor",
      ],
      answer: "Outside the component",
    },
    {
      question: (
        <div>
          <p>Which conditional rendering method is best for inline JSX?</p>
          <CodeBlock
            language="jsx"
            code={`{condition ? <A /> : <B />}`}
          />
        </div>
      ),
      options: [
        "If...Else",
        "Element variable",
        "Ternary operator",
        "Logical &&",
      ],
      answer: "Ternary operator",
    },
    {
      question: (
        <div>
          <p>What is the output when both conditions are handled?</p>
                    <CodeBlock
                        language="jsx"
                        code={`{isLoggedIn && <button>Logout</button>}
            {!isLoggedIn && <button>Login</button>}`}
                    />
        </div>
      ),
      options: [
        "Both buttons always render",
        "Only one button renders based on condition",
        "No button renders",
        "Error occurs",
      ],
      answer: "Only one button renders based on condition",
    },
];
  
const Conditional_Render_MCQ = ({
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

export default Conditional_Render_MCQ;
