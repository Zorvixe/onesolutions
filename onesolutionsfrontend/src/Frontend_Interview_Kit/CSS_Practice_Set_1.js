
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const CSS_Practice_Set_1 = ({
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
      <h2>CSS Practice Set - 1</h2>
      <h2>Practice the popular interview questions in CSS using ZorMock.</h2>

    <section>
    <h3>1. What is CSS Specificity?</h3>
    <p>CSS Specificity is a set of rules used by browsers to determine <code>which CSS styles</code> should be applied to an HTML element when there are conflicting style rules. Specificity helps browsers decide the priority of CSS selectors, with higher specificity selectors overriding lower specificity ones. CSS is used to style an HTML document. It modifies color, fonts, layout, etc to make the web page more visually appealing CSS helps us change colors, fonts, layout, etc. of a website to make it look more attractive and organized.</p>
    <h3>2. What is a responsive web design?</h3>
    <p>Responsive web design is an approach to making web pages <code>suitable for all the devices</code>. A responsive website will automatically adjust for different screen sizes and viewports.</p>
    <h3>3. Can we add multiple class names to the HTML class attribute?</h3>
    <p><code>Yes</code>, we can add multiple class names separated by space to the HTML class attribute.</p>
    <h3>4. What is a Universal selector in CSS?</h3>
    <p>The universal selector in CSS selects <code>all</code> HTML elements in a document, and allows you to apply styles globally. It is denoted by an asterisk or a Star symbol. The universal selector selects all the HTML elements in an HTML document. It is denoted using the Star symbol in CSS.</p>
    <h3>5. What are CSS text properties?</h3>
    <p>The CSS text properties are used to <code>style the text</code> within HTML elements on a webpage, Some of the CSS text properties are: color font family text align text decoration letter spacing text shadow text transform direction</p>
    <h3>6. How can we center the text horizontally using CSS?</h3>
    <p>One of the most common ways to center text horizontally using CSS is using the text align property with the value center. To center text horizontally using CSS, apply the text align property with the value center to the desired element. This will align the text within the element's container.</p>
    <h3>7. What are the CSS Background properties?</h3>
    <p>
CSS background properties are used to <code>control the appearance</code> of the background of HTML elements. 
They allow developers to set colors, images, positions, and other visual effects for element backgrounds.
</p>

<ul>
  <li><b>background-color:</b> Sets the background color of an element.</li>
  <li><b>background-image:</b> Sets an image as the background of an element.</li>
  <li><b>background-position:</b> Specifies the starting position of the background image.</li>
  <li><b>background-size:</b> Defines the size of the background image.</li>
  <li><b>background-repeat:</b> Controls whether the background image repeats or not.</li>
  <li><b>background-origin:</b> Specifies the positioning area of the background image.</li>
  <li><b>background-clip:</b> Defines how far the background extends within an element.</li>
  <li><b>background-attachment:</b> Specifies whether the background image scrolls with the page or stays fixed.</li>
</ul>

<CodeBlock
language="css"
code={`body {
  background-color: lightblue;
  background-image: url("bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}`}
 />
      <h3>8. What is CSS?</h3>
      <p>CSS stands for Cascading Style Sheets. CSS helps us change colors, fonts, layout, etc. of a website to make it look more attractive and organized.</p>
      <h3>9. How to add CSS to HTML?</h3>
      
<p>
CSS can be added to HTML documents in three different ways. Each method is used to apply styles to web pages depending on the requirement.
</p>

<ul>
  <li><b>Inline CSS:</b> Inline CSS is applied directly to an HTML element using the <code>style</code> attribute.</li>
  <li><b>Internal CSS:</b> Internal CSS is defined inside the <code>style</code> tag within the <code>head</code> section of the HTML document.</li>
  <li><b>External CSS:</b> External CSS is written in a separate CSS file and linked to the HTML document using the <code>link</code> tag.</li>
</ul>

<p>
Among these methods, external CSS is the most recommended approach because it improves maintainability and keeps the HTML structure separate from styling.
</p>

<CodeBlock
language="html"
code={`<!-- Inline CSS -->
<p style="color: red;">Hello World</p>

<!-- Internal CSS -->
<head>
  <style>
    p { color: blue; }
  </style>
</head>

<!-- External CSS -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>`}
/>
      <h3>10. Why do we need CSS?</h3>
      <p>CSS is used to style an HTML document. CSS helps us change <code>colors</code>, <code>fonts</code>, <code>layout</code>, etc. of a website to make it look more attractive and organized. It modifies color, fonts, layout, etc to make the web page more visually appealing.</p>
      <h3>11. What are the units of measurement in CSS?</h3>
      <p>
CSS units are used to define the size, spacing, and dimensions of elements on a webpage. 
They help control properties such as width, height, margin, padding, and font size.
</p>

<p>
There are two main types of CSS units: <code>absolute units</code> and <code>relative units</code>.
</p>

<ul>
  <li><b>Absolute Units:</b> Absolute units have fixed values and do not change based on other elements or screen size. An example is <code>px</code> (pixels), which represents small dots on the screen.</li>

  <li><b>Relative Units:</b> Relative units change depending on other factors such as the parent element size or the browser window. Examples include <code>%</code> (percentage), <code>em</code> (based on font size), and viewport units like <code>vw</code> and <code>vh</code> (based on screen size).</li>
</ul>

<CodeBlock
language="css"
code={`p {
  font-size: 16px;   /* absolute unit */
  width: 50%;       /* relative unit */
  margin: 2em;      /* relative to font size */
}`}
 />
      <h3>12. How to link the CSS file to the HTML file?</h3>
      <p>The HTML link element is used to link the CSS file to the HTML file. It should be placed in the HTML head element. (or) To link a CSS file to an HTML file, add a link element inside the HTML head element . Set rel attribute to stylesheet and href attribute to the CSS file's location.</p>
      <h3>13. What is the Internal Style Sheet and External Style Sheet in CSS?</h3>
      <p>An internal style sheet is a block of CSS code placed directly within the HTML file, using the style element. It is used to style a single HTML page. External style sheets is a separate CSS file, linked to one or more HTML files, using the link element. They are preferred to style multiple pages, making it easy to maintain consistent styles across a website.</p>
      <h3>14. What are the CSS Styles?</h3>
      <p>CSS styles are a set of rules that determine the <code>visual appearance</code> of an HTML document and they can be defined in a separate file with a .css extension or embedded directly in the HTML code using the style tag. CSS styles define the presentation of an HTML document and can be in a separate file or embedded in the HTML.</p>
      <h3>15. How would you vertically center align an element using flexbox?</h3>
      <p>
To vertically center align an element using Flexbox, set the container's <code>display</code> property to <code>flex</code>. 
Then use the <code>align-items: center</code> property to align the child elements vertically in the center of the container.
</p>

<ul>
  <li><b>display: flex:</b> Converts the container into a flex container.</li>
  <li><b>align-items: center:</b> Aligns the flex items vertically at the center of the container.</li>
</ul>

<CodeBlock
language="css"
code={`.container {
  display: flex;
  align-items: center; /* vertical centering */
  height: 200px;
}`}
 />

<CodeBlock
language="html"
code={`<div class="container">
  <p>Centered Content</p>
</div>`}
/>    
       <h3>16. How can you create masonary layout using CSS Grid?</h3>
       <p>Masonry layout can be created using <code>CSS Grid </code> by defining a grid container and placing items in it. You can use grid-template-columns and grid-auto-rows to define the grid structure. Then, use grid-column and grid-row to place the items. Remember, CSS Grid allows for complex layouts with more control.</p>
       <h3>17. How can you reorder elements using Flexbox?</h3>
       <p>You can reorder elements using Flexbox by using the <code>'order'</code> property. This property allows you to change the order of individual flex items, regardless of their source code order. The default value is 0, and you can use positive or negative integers to change the order.</p>
       <h3>18. How can you create a responsive grid layout using CSS grid?</h3>
       <p>You can create a responsive grid layout in CSS by using the <code>grid-template-columns</code> and <code>grid-template-rows</code> properties. You can specify the number of columns and rows and their sizes. For responsiveness, you can use media queries to adjust the grid layout based on the screen size.</p>
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

export default CSS_Practice_Set_1
