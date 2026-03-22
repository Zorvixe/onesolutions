
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const CSS_Practice_Set_5 = ({
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
      <h2>CSS Practice Set - 5</h2>
      <h2>Practice the popular interview questions in CSS using ZorMock.</h2>

    <section>
    <h3>1. What are the advantages and disadvantages of CSS?</h3>
    <p>
CSS (Cascading Style Sheets) is used to style and design web pages. It provides many benefits but also has some limitations.
</p>

<p><b>Advantages of CSS:</b></p>

<ul>
  <li><b>Consistent Design:</b> CSS helps maintain a consistent design across multiple pages of a website.</li>

  <li><b>Responsive Design:</b> It allows developers to create layouts that adapt to different screen sizes and devices.</li>

  <li><b>Visual Effects:</b> CSS provides animations, transitions, shadows, and other visual effects without using JavaScript.</li>

  <li><b>Improved Performance:</b> External CSS files can reduce HTML size and improve performance through browser caching.</li>

  <li><b>Cross-Browser Support:</b> CSS works across most modern browsers, helping maintain a consistent user experience.</li>
</ul>

<p><b>Disadvantages of CSS:</b></p>

<ul>
  <li><b>Browser Compatibility Issues:</b> Some browsers may render CSS differently, which requires extra testing and adjustments.</li>

  <li><b>Complexity:</b> CSS can become complex and difficult to manage, especially for large projects.</li>

  <li><b>Limited Programming Features:</b> CSS does not have full programming features like functions and advanced logic (though preprocessors can help).</li>

  <li><b>Large Stylesheets:</b> If CSS files are not properly organized, they can become cluttered and difficult to maintain.</li>

  <li><b>Performance Issues:</b> Improper handling of large CSS files may slow down page loading if not optimized.</li>
</ul>
    <h3>2. Explain CSS display property with the values inline and block?</h3>
    <p>The CSS display property defines how an HTML element is displayed on a web page. The value 'Inline' puts the element in the same line as other content, and the value 'block' puts the element on a new line, taking up the whole width.</p>
    <h3>3. Explain CSS Flexbox properties?</h3>
    <p><p>
Flexbox (Flexible Box Layout) is a CSS layout model used to arrange and align elements inside a container. 
It helps create flexible and responsive layouts.
</p>

<ul>
  <li><b>flex-direction:</b> Determines the direction in which flex items are placed inside the flex container. 
  The items can be arranged in a row, column, or in reverse order.</li>

  <li><b>justify-content:</b> Aligns flex items horizontally within the container. 
  It controls how the space between and around items is distributed.</li>

  <li><b>align-items:</b> Aligns flex items vertically within the container.</li>
</ul>

<CodeBlock
language="css"
code={`.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}`}
 /></p>
     <h3>4. What are the uses of CSS Flexbox?</h3>
     <p>
CSS Flexbox (Flexible Box Layout) is a layout model that helps arrange and align elements efficiently inside a container. 
It is especially useful for creating responsive layouts that adapt to different screen sizes and devices.
</p>

<ul>
  <li><b>Flexible Layout:</b> Flexbox allows elements to automatically adjust their size based on the available space.</li>

  <li><b>Easy Alignment:</b> It makes it simple to center elements both horizontally and vertically without using complex CSS techniques.</li>

  <li><b>Responsive Design:</b> Flexbox helps create layouts that adapt to different screen sizes and device orientations.</li>

  <li><b>Change Order of Elements:</b> Flexbox allows developers to change the order of elements without modifying the HTML structure using properties like <code>order</code> or <code>flex-flow</code>.</li>
</ul>

   <h3>5. What is a media type in a media query?</h3>
   <p>Media types describe the general category of devices. Possible types of media are: screen For all Screened devices print For Printers. tv For Televisions. all Matches all types of devices and more</p>
   <h3>6. What is cascading in CSS?</h3>
   <p>Cascading in CSS is the process of determining which styles apply when multiple rules target the same element, based on specificity, origin, and order of rules, where later rules override earlier ones if they have the same specificity and origin.</p>
   <h3>7. What is the CSS position and what are different values of the CSS position property?</h3>

<p>
The CSS <code>position</code> property defines how an element is placed on a webpage. 
It specifies the positioning method used for an element.
</p>

<p>
The CSS <code>position</code> property has five different values:
</p>

<ul>
  <li><b>Static:</b> Default value. Elements are positioned according to the normal page flow.</li>
  <li><b>Relative:</b> The element is positioned relative to its normal position.</li>
  <li><b>Absolute:</b> The element is positioned relative to its nearest positioned ancestor.</li>
  <li><b>Fixed:</b> The element is positioned relative to the browser window and stays fixed when scrolling.</li>
  <li><b>Sticky:</b> The element toggles between relative and fixed based on the scroll position.</li>
</ul>

<CodeBlock
language="css"
code={`.box {
  position: absolute;
  top: 20px;
  left: 30px;
}`}
 />
    <h3>8. What is the Difference Between Flexbox and Grid?</h3>
    <p>Flexbox is designed for one-dimensional layouts, either a row or a column, while CSS Grid is designed for two-dimensional layouts, both rows and columns. Flexbox is ideal for components, Grid is suitable for larger layout designs.</p>
    <h3>9. What is breakpoints in CSS and explain its uses?</h3>
    <p>Breakpoints in CSS, defined via media queries, indicate screen sizes at which the webpage layout adapts, optimizing user experience. They're essential for designing responsive layouts that transition smoothly across various devices - desktops, tablets, or mobile phones.</p>
    <h3>10. What is CSS min-height Property?</h3>
    <p>The CSS min-height property is used to set a minimum height for an element. Even if the content is smaller, the element maintains this specified minimum height.</p>
    <h3>11. What is :last-child Selector in CSS?</h3>
    <p>The :last-child selector in CSS is used to select the last child element of its parent. This selector allows us to apply unique styles to this element.</p>
    <h3>12. What is the difference between sticky and fixed?</h3>
    <p>In CSS, a 'fixed' positioned element stays in the same place relative to the viewport, regardless of scrolling. 'Sticky' positioning behaves like 'relative', until a specified scroll position is reached, where it turns 'fixed'.</p>
    <h3>13. What is CSS order property?</h3>
    <p>The CSS `order` property specifies the order of Flex Items in the Flex Container. By default, its value is zero. It accepts positive and negative integer values to adjust the visual order of elements without changing their positions in the code.</p>
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

export default CSS_Practice_Set_5
