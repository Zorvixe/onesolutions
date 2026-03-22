
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const CSS_Practice_Set_4 = ({
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
      <h2>CSS Practice Set - 4</h2>
      <h2>Practice the popular interview questions in CSS using ZorMock.</h2>

    <section>
    <h3>1. What is CSS display property with the value inline block?</h3>
    <p>The CSS display property with the value inline block is used to display the HTML element as an inline block container. The inline block container doesn't start on a new line but height and width can be applied to it.</p>
    <h3>2. What are the differences between display: none and visibility: hidden in CSS?</h3>
    <p>
Both <code>display: none</code> and <code>visibility: hidden</code> are used to hide HTML elements, but they behave differently in the page layout.
</p>

<ul>
  <li><b>display: none:</b> This property completely removes the element from the page layout. The element will not be visible and it will not take up any space on the page.</li>

  <li><b>visibility: hidden:</b> This property makes the element invisible, but the element still occupies space in the layout as if it were visible.</li>
</ul>

<p>
In simple terms, <code>display: none</code> hides the element and removes its space from the layout, while <code>visibility: hidden</code> hides the element but keeps its space reserved on the page.
</p>

<CodeBlock
language="css"
code={`.box1 {
  display: none;
}

.box2 {
  visibility: hidden;
}`}
 />
    <h3>3. How can we layout the page for large screens and small screens?</h3>
    <p>We can build different layouts for large screens and small screens using Bootstrap Grid System, Media Queries, Flexbox, etc. or Use CSS media queries to apply different styles for large and small screens. Set breakpoints based on screen size. Design mobile first, then add styles for larger screens.</p>
    <h3>4. When do we use the CSS percentages?</h3>
    <p>To define the size of a child element relative to its parent element, we use CSS percentages. or In CSS, percentages are used to set relative sizes and positions for elements, making them responsive to different screen sizes. They're commonly used for widths, heights, paddings, margins, font sizes, and positioning, helping create fluid layouts that adapt to various devices.</p>
    <h3>5. What is the CSS border radius property?</h3>
    <p>The CSS border radius property specifies the roundness of the four corners of an HTML element.</p>
    <h3>6. How to create a circular HTML button element using CSS?</h3>
    <p>To create a circular HTML button, set the same height and width for the button and use the CSS property border radius with a value of 50%.</p>
    <h3>7. What is the sequence of CSS margin properties?</h3>
    <p>The sequence of CSS margin properties is margin top, margin right, margin bottom, margin left.</p>
    <h3>8. What is the CSS box sizing property?</h3>
    <p>The CSS box sizing property sets how the total width and height of an element is calculated. The values of the CSS box sizing property are: content box: (Default) The width and height properties include only content, but they do not include the padding, border, or margin. border box: The width and height properties include the content, padding, and border, but they do not include the margin.</p>
    <h3>9. What is the order of specificity of CSS Selectors?</h3>
    <p>The CSS Selectors in the lowest to highest order by specificity are Universal Selector type or tag name Selector class Selector id Selector</p>
    <h3>10. What are the advantages of CSS?</h3>
    <p>
CSS (Cascading Style Sheets) is used to style and design web pages. It provides several advantages that make web development easier and more efficient.
</p>

<ul>
  <li><b>Consistent Design:</b> CSS helps maintain a consistent look and design across multiple pages of a website.</li>

  <li><b>Responsive Layouts:</b> It allows developers to create designs that adapt to different screen sizes and devices.</li>

  <li><b>Visual Effects:</b> CSS provides various styling features such as transitions, shadows, and animations without needing JavaScript.</li>

  <li><b>Improved Performance:</b> Using external CSS files can reduce HTML file size and improve performance through browser caching.</li>

  <li><b>Cross-Browser Compatibility:</b> CSS works across all major browsers, helping ensure a consistent user experience.</li>
</ul>
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

export default CSS_Practice_Set_4
