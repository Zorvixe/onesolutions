import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>In which cases is React Context useful?</p>
      </div>
    ),
    options: [
      "When passing data to sibling only",
      "When data is needed between different routes",
      "When using only local state",
      "When using only props",
    ],
    answer: "When data is needed between different routes",
  },
  {
    question: (
      <div>
        <p>Why is Context used instead of props in large applications?</p>
      </div>
    ),
    options: [
      "To avoid prop drilling",
      "To reduce JSX",
      "To remove state",
      "To avoid components",
    ],
    answer: "To avoid prop drilling",
  },
  {
    question: (
      <div>
        <p>Where can Consumer be used in a class component?</p>
      </div>
    ),
    options: [
      "Only in constructor",
      "Only in lifecycle methods",
      "In any method that returns JSX",
      "Only in componentDidMount",
    ],
    answer: "In any method that returns JSX",
  },
  {
    question: (
      <div>
        <p>Which component is used to read context value?</p>
        <CodeBlock
          language="jsx"
          code={`<CartContext.Consumer>{value => ...}</CartContext.Consumer>`}
        />
      </div>
    ),
    options: ["Provider", "Consumer", "Router", "Fragment"],
    answer: "Consumer",
  },
  {
    question: (
      <div>
        <p>Which method in the example returns JSX?</p>
        <CodeBlock
          language="jsx"
          code={`render() {
    return (
      <CartContext.Consumer>
        {value => (...)}
      </CartContext.Consumer>
    )
  }`}
        />
      </div>
    ),
    options: ["onIncrement", "onDecrement", "render", "setState"],
    answer: "render",
  },
  {
    question: (
      <div>
        <p>What state variable is used in ProductItemDetails?</p>
        <CodeBlock language="jsx" code={`state = {quantity: 1}`} />
      </div>
    ),
    options: ["count", "price", "quantity", "total"],
    answer: "quantity",
  },
  {
    question: (
      <div>
        <p>Which function decreases quantity?</p>
        <CodeBlock
          language="jsx"
          code={`onDecrement = () => {
    this.setState(prev =>
      prev.quantity > 1 ? {quantity: prev.quantity - 1} : prev,
    )
  }`}
        />
      </div>
    ),
    options: ["onAdd", "onDecrease", "onDecrement", "onMinus"],
    answer: "onDecrement",
  },
  {
    question: (
      <div>
        <p>Which function increases quantity?</p>
        <CodeBlock
          language="jsx"
          code={`onIncrement = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }`}
        />
      </div>
    ),
    options: ["onPlus", "onAdd", "onIncrement", "onUpdate"],
    answer: "onIncrement",
  },
  {
    question: (
      <div>
        <p>Which method is called when clicking ADD TO CART?</p>
        <CodeBlock
          language="jsx"
          code={`onClick={() => value.addCartItem({quantity})}`}
        />
      </div>
    ),
    options: ["removeItem", "addItem", "addCartItem", "updateCart"],
    answer: "addCartItem",
  },
  {
    question: (
      <div>
        <p>Where does the addCartItem function come from?</p>
      </div>
    ),
    options: ["Component state", "Props", "Context value", "Local variable"],
    answer: "Context value",
  },
  {
    question: (
      <div>
        <p>Which icon is used to increase quantity?</p>
        <CodeBlock language="jsx" code={`<BsPlusSquare />`} />
      </div>
    ),
    options: ["BsDashSquare", "BsPlusSquare", "FaPlus", "MdAdd"],
    answer: "BsPlusSquare",
  },
  {
    question: (
      <div>
        <p>Which icon is used to decrease quantity?</p>
        <CodeBlock language="jsx" code={`<BsDashSquare />`} />
      </div>
    ),
    options: ["BsMinus", "FaMinus", "BsDashSquare", "MdRemove"],
    answer: "BsDashSquare",
  },
  {
    question: (
      <div>
        <p>Which component wraps ProductItemDetails to provide context?</p>
      </div>
    ),
    options: ["Router", "Provider", "Consumer", "Header"],
    answer: "Provider",
  },
  {
    question: (
      <div>
        <p>
          What happens when quantity is less than 1 and decrement is clicked?
        </p>
      </div>
    ),
    options: [
      "It becomes 0",
      "It becomes -1",
      "It remains unchanged",
      "It throws error",
    ],
    answer: "It remains unchanged",
  },
  {
    question: (
      <div>
        <p>Which command is used to download final project code?</p>
        <CodeBlock language="bash" code={`onesolutions start RJSIVIJ1YR`} />
      </div>
    ),
    options: [
      "npm start",
      "onesolutions start RJSIVIJ1YR",
      "git clone",
      "yarn start",
    ],
    answer: "onesolutions start RJSIVIJ1YR",
  },
];

const React_Cpart3_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Introduction to React JS - MCQs"
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

export default React_Cpart3_MCQ;
