
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const CSS_Practice_Set_3 = ({
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
      <h2>CSS Practice Set - 3</h2>
      <h2>Practice the popular interview questions in CSS using NxtMock.</h2>

    <section>
    <h3>1. What is a CSS Gradient?</h3>
    <p>CSS Gradient is a special type of background Image formed by the transition between two or more colors. There are mainly two types of gradients:Linear Gradient and Radial Gradient 1. Linear Gradient is the most basic type of gradient. 2. Radial Gradient radiates out from a central point.</p>
    <h3>2. What is the CSS box shadow property?</h3>
    <p>
The CSS <code>box-shadow</code> property is used to add one or more shadows to an HTML element. 
It helps create depth and visual effects around elements such as boxes, cards, or buttons.
</p>

<p>
A box shadow can be defined using different parameters that control its position, blur, size, and color.
</p>

<ul>
  <li><b>none:</b> Default value. No shadow is displayed.</li>
  <li><b>h-offset:</b> Specifies the horizontal distance of the shadow. Positive values place the shadow on the right, negative values on the left.</li>
  <li><b>v-offset:</b> Specifies the vertical distance of the shadow. Positive values place the shadow below the element, negative values place it above.</li>
  <li><b>blur-radius:</b> Defines how blurred the shadow should be. A larger value creates a softer shadow.</li>
  <li><b>spread-radius:</b> Specifies the size of the shadow. Positive values increase the size, negative values decrease it.</li>
  <li><b>color:</b> Specifies the color of the shadow.</li>
  <li><b>inset:</b> Creates an inner shadow inside the element instead of an outer shadow.</li>
</ul>

<p>
If only two values are given, they represent the horizontal and vertical offsets. Additional values define blur, spread, and color.
</p>

<CodeBlock
language="css"
code={`.box {
  width: 200px;
  height: 100px;
  background-color: white;
  box-shadow: 5px 5px 10px 2px gray;
}`}
 />
    <h3>3. How to set the border style as dotted?</h3>
    <p>To set the border style as dotted using CSS, you can use the border style property with the value dotted. The CSS border style property with the value dotted sets the border style of an HTML element as dotted.</p>
    <h3>4. What are the CSS Box properties?</h3>
   <p>
The CSS Box Model describes the layout and spacing of elements on a webpage. 
Every HTML element is considered as a rectangular box consisting of four main parts: content, padding, border, and margin.
</p>

<ul>
  <li><b>Content:</b> The main area where text, images, or other content appears inside the element.</li>

  <li><b>Padding:</b> The space between the content and the border. It creates inner spacing inside the element.</li>

  <li><b>Border:</b> A line that surrounds the padding and content. It defines the boundary of the element.</li>

  <li><b>Margin:</b> The outer space outside the border. It creates distance between the element and other elements.</li>
</ul>

<p>
These four parts together determine the total size and spacing of an element on a webpage.
</p>

<CodeBlock
language="css"
code={`.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 15px;
}`}
 />
    <h3>5. What are the CSS Box properties?</h3>
    <p>The CSS box properties define the layout and sizing of HTML elements. The box model consists of five primary properties: Width Height Padding Border Margin height width border style border width border color margin padding</p>
    <h3>6. How to hide the container div element on mobiles and show it on iPad and desktop?</h3>
    <p>Using Media Queries or Bootstrap, we can hide the container div element in mobile and show it on iPad and desktop.</p>
    <h3>7. How to align the two HTML container (div) elements in a single row?</h3>
    <p>There are two common ways to align two HTML container elements in a single row. We can either make them inline elements by applying the CSS display property with the value inline, (or) we can make them flex items by wrapping them in a parent element and applying the CSS display property with the value flex.</p>
    <h3>8. What is CSS Flexbox?</h3>
    <p>Flexbox is a layout method that helps in arranging the HTML elements in rows (horizontally) or columns (vertically).</p>
    <h3>9. How to align the HTML elements inside the container element in a row using the CSS flexbox properties?</h3>
    <p>To align HTML elements in a row, we can make the container element a Flexbox container. Specifying the flex direction as row to the HTML container element.</p>
    <h3>10. What is the CSS display property in Flexbox?</h3>
    <p>The CSS display property in Flexbox is used to define the layout of child elements. By setting the display property to flex for a parent element, it becomes a Flexbox Container, and its direct child elements become flex items, Css display property can be used in Flexbox to set the layout of child elements. To achieve this , you can set the value flex for display property, and the parent element becomes a Flexbox Container and its direct child elements become flex items.</p>
    <h3>11. What are the CSS Flexbox properties?</h3>
    <p>CSS Flexbox properties are used to create flexible and responsive layouts. display flex direction justify content align items flex wrap flex flow align content align self flex grow flex basis flex shrink order, etc.</p>
    <h3>12. What is CSS flex property?</h3>
    <p>The flex property specifies how a flex item will resize within its flexbox container. It combines three individual properties: flex grow, flex shrink, and flex basis.</p>
    <h3>13. What is the CSS display property?</h3>
    <p>The CSS display property is responsible for determining the layout behavior of HTML elements on a webpage we can use it to convert an HTML element into an inline or block level element and control the layout of its child elements. The values of the CSS display property are: block inline flex inline flex grid none, etc.</p>
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

export default CSS_Practice_Set_3
