import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is the nature of setState() in React?</p>
        </div>
      ),
      options: ["Synchronous", "Asynchronous", "Blocking", "Static"],
      answer: "Asynchronous",
    },
    {
      question: (
        <div>
          <p>Why do we use a callback function with setState()?</p>
        </div>
      ),
      options: [
        "To update props",
        "To run code after state update",
        "To stop re-rendering",
        "To fetch API",
      ],
      answer: "To run code after state update",
    },
    {
      question: (
        <div>
          <p>Which package provides icon components in React?</p>
        </div>
      ),
      options: ["react-ui", "react-fonts", "react-icons", "react-bootstrap"],
      answer: "react-icons",
    },
    {
      question: (
        <div>
          <p>Which icon library prefix is used for Bootstrap icons?</p>
        </div>
      ),
      options: ["Fa", "Md", "Bs", "Ai"],
      answer: "Bs",
    },
    {
      question: (
        <div>
          <p>What is the purpose of sorting in product listing?</p>
        </div>
      ),
      options: [
        "To filter products",
        "To arrange products in order",
        "To delete products",
        "To paginate products",
      ],
      answer: "To arrange products in order",
    },
    {
      question: (
        <div>
          <p>Which syntax correctly uses setState with a callback?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState({count: 1}, () => {
    console.log("State Updated");
  });`}
          />
        </div>
      ),
      options: [
        "setState(count, callback)",
        "setState(callback, count)",
        "setState({count}, callback)",
        "setState(callback)",
      ],
      answer: "setState({count}, callback)",
    },
    {
      question: (
        <div>
          <p>Which icon component is imported from react-icons/bs?</p>
          <CodeBlock
            language="jsx"
            code={`import { BsFilterRight } from "react-icons/bs";`}
          />
        </div>
      ),
      options: ["FaFacebookF", "MdDelete", "BsFilterRight", "AiFillHome"],
      answer: "BsFilterRight",
    },
    {
      question: (
        <div>
          <p>Which prop holds the currently selected sort option?</p>
          <CodeBlock
            language="jsx"
            code={`const { activeOptionId } = this.state;`}
          />
        </div>
      ),
      options: ["productsList", "sortbyOptions", "activeOptionId", "productId"],
      answer: "activeOptionId",
    },
    {
      question: (
        <div>
          <p>Which function updates the selected sort option?</p>
          <CodeBlock
            language="jsx"
            code={`updateActiveOptionId(event.target.value)`} 
          />
        </div>
      ),
      options: [
        "setProducts",
        "updateActiveOptionId",
        "onClickSort",
        "handleFilter",
      ],
      answer: "updateActiveOptionId",
    },
    {
      question: (
        <div>
          <p>Which HTML element is used for selecting sort options?</p>
          <CodeBlock
            language="jsx"
            code={`<select onChange={onChangeSortby}></select>`}
          />
        </div>
      ),
      options: ["input", "button", "select", "option"],
      answer: "select",
    },
    {
      question: (
        <div>
          <p>Which icon represents sorting?</p>
          <CodeBlock
            language="jsx"
            code={`<BsFilterRight className="sort-icon" />`}
          />
        </div>
      ),
      options: ["Delete", "Edit", "Filter", "Cart"],
      answer: "Filter",
    },
    {
      question: (
        <div>
          <p>Which method maps and renders products?</p>
          <CodeBlock
            language="jsx"
            code={`productsList.map(product => <ProductCard key={product.id} />)`}
          />
        </div>
      ),
      options: ["filter()", "reduce()", "map()", "forEach()"],
      answer: "map()",
    },
    {
      question: (
        <div>
          <p>Why is key prop required in ProductCard?</p>
          <CodeBlock
            language="jsx"
            code={`<ProductCard key={product.id} />`}
          />
        </div>
      ),
      options: [
        "For styling",
        "For API calls",
        "For list rendering optimization",
        "For routing",
      ],
      answer: "For list rendering optimization",
    },
    {
      question: (
        <div>
          <p>What does withRouter provide to Header component?</p>
          <CodeBlock
            language="jsx"
            code={`export default withRouter(Header);`}
          />
        </div>
      ),
      options: ["State", "Props", "history object", "Redux store"],
      answer: "history object",
    },
    {
      question: (
        <div>
          <p>Which component protects routes from unauthenticated access?</p>
          <CodeBlock
            language="jsx"
            code={`<ProtectedRoute path="/products" component={Products} />`}
          />
        </div>
      ),
      options: ["Route", "Redirect", "ProtectedRoute", "Switch"],
      answer: "ProtectedRoute",
    },
];
  
const SortingProducts_MCQ = ({
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

export default SortingProducts_MCQ;
