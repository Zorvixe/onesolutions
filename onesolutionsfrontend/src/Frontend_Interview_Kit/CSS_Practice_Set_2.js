
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const CSS_Practice_Set_2 = ({
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
      <h2>CSS Practice Set - 2</h2>
      <h2>Practice the popular interview questions in CSS using ZorMock.</h2>

    <section>
    <h3>1. Explain Inline styles?</h3>
    <p>Inline styles are a way to apply CSS styles directly to an individual HTML element using the style attribute. This approach allows developers to apply specific styles that override external and internal styles, giving them more control over the appearance of individual elements. Inline styles are CSS property values that are directly applied to an HTML element using the HTML style attribute.</p>
    <h3>2. What are CSS Selectors and what are the different types of it?</h3>
    <p>
CSS selectors are used to select HTML elements that we want to apply styles to. 
They help target specific elements on a webpage so that CSS rules can be applied to them.
</p>

<p>
There are several types of CSS selectors:
</p>

<ul>
  <li><b>Simple Selectors:</b> Select elements based on name, id, class, or attribute.</li>
  <li><b>Class Selector:</b> Selects elements with a specific class using <code>.</code>.</li>
  <li><b>ID Selector:</b> Selects an element with a specific id using <code>#</code>.</li>
  <li><b>Type (Tag) Selector:</b> Selects elements based on their HTML tag name.</li>
  <li><b>Attribute Selector:</b> Selects elements based on attributes.</li>
  <li><b>Universal Selector:</b> Selects all elements on the page using <code>*</code>.</li>
  <li><b>Pseudo-class Selector:</b> Selects elements based on a special state like hover or focus.</li>
  <li><b>Compound Selectors:</b> Combine multiple selectors to target elements more specifically.</li>
  <li><b>Complex Selectors:</b> Select elements based on relationships between them.</li>
</ul>

<CodeBlock
language="css"
code={`/* Type Selector */
p {
  color: blue;
}

/* Class Selector */
.box {
  background-color: lightgray;
}

/* ID Selector */
#title {
  font-size: 24px;
}

/* Pseudo-class Selector */
a:hover {
  color: red;
}`}
 />
     <h3>3. Which has more specificity among Inline Styles and Class Selectors?</h3>
     <p>Inline styles have higher specificity compared to class selectors. When an HTML element has both inline styles and class styles applied, the inline styles will take higher priority due to their higher specificity. Inline Styles</p>
     <h3>4. What is the need for CSS Selectors?</h3>
     <p>CSS Selectors are used to select the HTML elements we want to style. CSS selectors are used to apply styles to specific HTML elements on a web page.There are a wide variety of CSS selectors like id, class, type, etc.</p>
     <h3>5. What CSS property values will be applied to an HTML element if it has both HTML id and class selectors?</h3>
     <p>If an HTML element has both id and class selectors, all CSS properties from both id and class selectors will be applied. If there are any CSS properties in common between the id and class selectors, the id selector's values will take precedence due to its higher specificity. All the CSS properties in both the id and class selectors will be applied to the HTML element. If there are any CSS properties in common between the id and class selectors, then CSS property values in the id selector will be applied to the HTML element because of higher specificity.</p>
     <h3>6. How do you change the style of an HTML element with and without a CSS Class Selector?</h3>
     <p>Without CSS Class Selector Using inline styles and other CSS selectors like type or tag name, id selectors etc. With CSS Class Selector In HTML, specifying the HTML class attribute and its value as the class name to the HTML element. In CSS, the . character, followed by the class name has to be specified as a class attribute value to the HTML element.</p>
     <h3>7. How to style a particular HTML element?</h3>
     <p>We can style a particular HTML element with CSS in many ways.<br/>
     <ul>
      <li>1. Inline styles: we can use inline styles to style a particular HTML element by adding a style attribute to the element and defining the CSS property values within it.</li>
      <li> 2. CSS Selectors: CSS selectors apply styles to specific HTML elements and can be used in internal or external CSS.</li>
      </ul></p>
      <h3>8. What is the default font family?</h3>
      <p>The default font family used in web browsers can vary depending on the browser and operating system being used. However, most modern browsers have a default font family of sans serif The default font family used in web browsers can vary depending on the browser and the operating system. However, the most commonly used default font family is called sans serif.</p>
      <h3>9. What is the correct syntax for font family?</h3>
      <p>The CSS font family property specifies the font of an HTML element.</p>
      <h3>10. How do we underline the text in an HTML paragraph element?</h3>
      <p>you can use the CSS text decoration property with the value underline, to underline the text in an HTML paragraph elements.</p>
      <h3>11. How to apply background color and color for the HTML main heading element?</h3>
      <p>To apply a background color and color (text color) to the HTML main heading element you can use CSS.</p>
      <h3>12. How do you prevent a background image from repeating in empty space?</h3>
      <p>To prevent a background image from repeating, you can use the CSS property background repeat with the value 'no repeat We can use the CSS property background repeat with the value no repeat to stop repeating the background image.</p>
      <h3>13. Explain CSS background attachment property?</h3>
      <p>
The CSS <code>background-attachment</code> property specifies how a background image behaves when the webpage is scrolled.
</p>

<ul>
  <li><b>scroll:</b> The background image scrolls along with the content of the element. This is the default value.</li>
  <li><b>fixed:</b> The background image stays fixed in the viewport and does not move when the page is scrolled.</li>
</ul>

<CodeBlock
language="css"
code={`body {
  background-image: url("bg.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}`}
 />
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

export default CSS_Practice_Set_2
