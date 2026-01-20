import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Context_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
  <h1>React Context | Cheat Sheet</h1>

  <section>
    <h2>1. Prop Drilling</h2>
    <p>
      Props are passed from one Component to another Component that does not need
      the data but only helps in passing it through the tree. This is called
      <b> Prop Drilling</b>.
    </p>
    <img
          src="/assets/img/prop.png"
          alt="project"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  <section>
    <h2>2. React Context</h2>
    <p>
      Context is a mechanism that provides data to different Components and
      allows us to pass data without doing prop drilling.
    </p>

    <h3>2.1 Creating Context</h3>
    <p><b>Syntax:</b></p>
    <CodeBlock language="jsx" code={`React.createContext(INITIAL_VALUE)`} />
    <p>
      It returns an object with different properties to update and access values
      from the context.
    </p>

    <h3>2.2 Context Properties</h3>
    <p>The Context object provides two properties.</p>
    <ul>
      <li>Consumer</li>
      <li>Provider</li>
    </ul>

    <h3>2.3 How to Access the Value?</h3>
    <p>
      We can access the value in the Context using the Consumer Component
      provided by the Context Object.
    </p>
  </section>

  <section>
    <h2>3. Consumer Component</h2>
    <p><b>Syntax:</b></p>
    <CodeBlock
      language="jsx"
      code={`<ContextObject.Consumer>
  {/* callback function */}
</ContextObject.Consumer>`}
    />
    <ul>
      <li>We access the Consumer using dot notation from the context object.</li>
      <li>The Consumer takes a callback function as its child.</li>
    </ul>

    <h3>3.1 Understanding Syntax</h3>
    <p>
      The callback function receives the current context value as an argument and
      returns a component or JSX element.
    </p>
    <img
          src="/assets/img/consumer.png"
          alt="project"
          style={{ width: "100%", height: "300px" }}
        />
  </section>

  <section>
    <h2>4. Windows App Example</h2>

    <h3>4.1 Initial Code</h3>
    <p>Run the below command in your IDE to download the initial code.</p>
    <CodeBlock language="bash" code={`ccbp start RJSIVWKZP2`} />

    <h3>4.2 Final Code</h3>
    <p>Run the below command in your IDE to download the final code.</p>
    <CodeBlock language="bash" code={`ccbp start RJSIVM06DJ`} />
  </section>

  <section>
    <h2>5. Google Translator</h2>
    <p>
      In the Windows App example, we are using three different languages to
      display the text. You can translate one language to another language using
      Google Translator.
    </p>
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

export default React_Context_CS;
