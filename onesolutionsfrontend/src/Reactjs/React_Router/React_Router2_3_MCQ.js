import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Where are API calls generally made in a class component?</p>
      </div>
    ),
    options: [
      "constructor()",
      "render()",
      "componentDidMount()",
      "componentWillUnmount()",
    ],
    answer: "componentDidMount()",
  },
  {
    question: (
      <div>
        <p>Why are API calls made inside componentDidMount()?</p>
      </div>
    ),
    options: [
      "To block rendering",
      "To avoid re-rendering",
      "To prevent blocking UI rendering",
      "To update props",
    ],
    answer: "To prevent blocking UI rendering",
  },
  {
    question: (
      <div>
        <p>Which naming convention is commonly used in backend APIs?</p>
      </div>
    ),
    options: ["camelCase", "PascalCase", "snake_case", "kebab-case"],
    answer: "snake_case",
  },
  {
    question: (
      <div>
        <p>Which Route prop provides access to URL parameters?</p>
      </div>
    ),
    options: ["history", "location", "match", "params"],
    answer: "match",
  },
  {
    question: (
      <div>
        <p>Which routing feature allows dynamic URLs?</p>
      </div>
    ),
    options: [
      "Static routes",
      "Query strings",
      "Route parameters",
      "BrowserRouter",
    ],
    answer: "Route parameters",
  },

  {
    question: (
      <div>
        <p>What does the fetch() function return?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://apis.Onesolution.in/blogs")`}
        />
      </div>
    ),
    options: [
      "HTML content",
      "A response object (Promise)",
      "Only JSON data",
      "An array",
    ],
    answer: "A response object (Promise)",
  },
  {
    question: (
      <div>
        <p>What is the purpose of response.json()?</p>
        <CodeBlock language="javascript" code={`response.json()`} />
      </div>
    ),
    options: [
      "Send data to server",
      "Convert response to JavaScript object",
      "Reload page",
      "Handle errors",
    ],
    answer: "Convert response to JavaScript object",
  },
  {
    question: (
      <div>
        <p>Which Route prop is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const { match } = this.props;
  const { id } = match.params;`}
        />
      </div>
    ),
    options: ["history", "location", "match", "route"],
    answer: "match",
  },
  {
    question: (
      <div>
        <p>What does this route represent?</p>
        <CodeBlock
          language="jsx"
          code={`<Route exact path="/blogs/:id" component={BlogItemDetails} />`}
        />
      </div>
    ),
    options: ["Static route", "Home route", "Dynamic route", "Redirect route"],
    answer: "Dynamic route",
  },
  {
    question: (
      <div>
        <p>Why is Loader shown here?</p>
        <CodeBlock
          language="jsx"
          code={`if (isLoading) {
    return <Loader type="TailSpin" />;
  }`}
        />
      </div>
    ),
    options: [
      "To block UI",
      "To show loading state",
      "To fetch data",
      "To navigate routes",
    ],
    answer: "To show loading state",
  },
  {
    question: (
      <div>
        <p>What triggers getBlogsData()?</p>
        <CodeBlock
          language="jsx"
          code={`componentDidMount() {
    this.getBlogsData();
  }`}
        />
      </div>
    ),
    options: [
      "Component update",
      "Component unmount",
      "Component mount",
      "Route change",
    ],
    answer: "Component mount",
  },
  {
    question: (
      <div>
        <p>What does this map() render?</p>
        <CodeBlock
          language="jsx"
          code={`blogsData.map(eachBlog => (
    <BlogItem key={eachBlog.id} blogData={eachBlog} />
  ))`}
        />
      </div>
    ),
    options: ["Routes", "Blog list items", "Headers", "Loaders"],
    answer: "Blog list items",
  },
  {
    question: (
      <div>
        <p>What does this Link do?</p>
        <CodeBlock language="jsx" code={`<Link to={\`/blogs/\${id}\`}>`} />
      </div>
    ),
    options: [
      "Reloads the page",
      "Navigates to blog details page",
      "Calls API",
      "Updates state",
    ],
    answer: "Navigates to blog details page",
  },
  {
    question: (
      <div>
        <p>Where is the blog ID extracted from?</p>
        <CodeBlock
          language="javascript"
          code={`const { id } = match.params;`}
        />
      </div>
    ),
    options: ["State", "Props", "URL parameters", "Query string"],
    answer: "URL parameters",
  },
  {
    question: (
      <div>
        <p>What is the purpose of NotFound component?</p>
        <CodeBlock language="jsx" code={`<Route component={NotFound} />`} />
      </div>
    ),
    options: [
      "Render home page",
      "Handle undefined routes",
      "Redirect user",
      "Stop routing",
    ],
    answer: "Handle undefined routes",
  },
];

const React_Router2_3_MCQ = ({
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

export default React_Router2_3_MCQ;
