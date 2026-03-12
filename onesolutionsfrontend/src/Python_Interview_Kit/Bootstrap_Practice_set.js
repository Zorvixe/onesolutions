
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const Bootstrap_Practice_set = ({
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
      <h2>Bootstrap Practice Set - 1</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
    <h3>1. What are the advantages of Bootstrap?</h3>

<p>
Bootstrap is a popular front-end framework used to build responsive and mobile-first websites. It provides many ready-to-use components that make web development faster and easier.
</p>

<ul>
  <li><b>Predefined Components:</b> Bootstrap provides ready-made CSS and JavaScript components, which save development time and reduce the need to write code from scratch.</li>

  <li><b>Responsive Design:</b> It uses a grid system that helps create layouts that work well on different screen sizes and devices.</li>

  <li><b>Browser Compatibility:</b> Bootstrap provides consistent output across all modern browsers and helps avoid browser compatibility issues.</li>

  <li><b>Customizable:</b> Bootstrap themes and templates can be customized based on project requirements.</li>

  <li><b>Easy to Use:</b> Bootstrap is simple to learn and implement, making it suitable even for beginners.</li>

  <li><b>Faster Development:</b> Since many UI components are already available, developers can build websites more quickly.</li>
</ul><h3>2. Who Developed The Bootstrap?</h3>
      <p>The Bootstrap is developed by Mark Otto and Jacob Thornton at Twitter.</p>
      <h3>3. Why Bootstrap is preferred for website development?</h3>
      <p>Bootstrap has better features as compared to other web development platforms. It provides predefined reusable code snippets that enable the web developer to create a new website quickly. No need to do code from scratch. Bootstrap provides JavaScript plugins that add more interaction to the website.</p>
      <h3>4. What does the Bootstrap package include?</h3>
      <p>Bootstrap is a package that provides developers with pre built tools and components to make it easier and faster to build responsive web applications. It includes a grid system to help create layouts for different screen sizes, pre built UI components like buttons and forms, CSS styles for quick and easy styling.</p>
      <h3>5. How to add an HTML button and style it using Bootstrap to the existing HTML document?</h3>
      <p>To add a Bootstrap button with class names to an HTML page, first add the Bootstrap CDN in the head element. Then, add the HTML button element to the body element and apply the desired Bootstrap class names to it.</p>
      <h3>6. What are the types of lists supported by Bootstrap?</h3>
      <p>Bootstrap supports all three types of lists, ordered (ol), unordered(ul) and description(dl) lists.</p>
      <h3>7. What is a Carousel?</h3>
      <p>The Carousel is like a slideshow that displays images and text. The slides change every few seconds. We can add different images to the Carousel by changing the image URL in the HTML src attribute.</p>
      <h3>8. What are the contextual classes for Bootstrap tables?</h3><p>
Contextual classes in Bootstrap tables are used to add colors to table rows or cells based on their meaning or context. 
      These classes help highlight important information and improve the readability of tables.
      </p>

<ul>
  <li><b>.table-primary:</b> Adds a light blue color to the table row or cell.</li>
  <li><b>.table-secondary:</b> Adds a light gray color to the table row or cell.</li>
  <li><b>.table-success:</b> Adds a light green color to the table row or cell.</li>
  <li><b>.table-danger:</b> Adds a light red color to the table row or cell.</li>
  <li><b>.table-warning:</b> Adds a light yellow color to the table row or cell.</li>
  <li><b>.table-info:</b> Adds a light teal color to the table row or cell.</li>
  <li><b>.table-light:</b> Adds a light gray color to the table row or cell.</li>
  <li><b>.table-dark:</b> Adds a dark gray color to the table row or cell.</li>
</ul>

<p>
These contextual classes can be applied to table rows (<code>tr</code>) or table cells (<code>td</code> or <code>th</code>) to visually represent different states or categories of data.
</p>

<CodeBlock
language="html"
code={`<table class="table">
  <tr class="table-primary">
    <td>Primary Row</td>
  </tr>
  <tr class="table-success">
    <td>Success Row</td>
  </tr>
  <tr class="table-danger">
    <td>Danger Row</td>
  </tr>
</table>`}
/>
    <h3>9. How do you use Bootstrap to make a page responsive?</h3>
    <p>We can make a page responsive by using the Bootstrap Grid System which helps us to create columns and rows to build a responsive layout of the page. With Bootstrap, you can create a responsive page by using the Grid System. This helps in making rows and columns for the layout, which adjusts to different screen sizes, giving a good user experience.</p>
    <h3>10. What is the Bootstrap grid system?</h3>

<p>
The Bootstrap Grid System is a layout system used to create responsive and mobile-first web pages. 
It is a collection of reusable classes that help developers arrange content in a structured way so that it adapts to different screen sizes.
</p>

<p>
The grid system is based on a <b>12-column layout</b> and is built using three main components: <code>container</code>, <code>row</code>, and <code>column</code>.
</p>

<ul>
  <li><b>Container:</b> The container is used to hold rows and columns and provides proper alignment and spacing for the layout.</li>
  <li><b>Row:</b> A row is used to wrap all the columns. It ensures that columns are aligned horizontally.</li>
  <li><b>Column:</b> Columns are placed inside rows and contain the actual content. We can specify how many columns the content should occupy.</li>
</ul>

<p>
Bootstrap uses a 12-column system, which means a row can contain up to 12 columns. 
Developers can specify how many columns an element should occupy using classes such as <code>col-1</code>, <code>col-6</code>, <code>col-12</code>, etc.
</p>

<CodeBlock
language="html"
code={`<div class="container">
  <div class="row">
    <div class="col-6">Column 1</div>
    <div class="col-6">Column 2</div>
  </div>
</div>`}
/>
    <h3>11. Can a 14 or 16 column grid system be made?</h3>
    <p>Bootstrap supports the customization of Bootstrap grid class names. The number of grid columns can be modified by Sass variables. Sass variables are similar to the JS variables where we used to store the information. grid columns is used to generate the widths (in percent) of each column grid gutter width sets the padding between the columns.</p>
    <h3>12. What are col and span in Bootstrap?</h3>
    <p>In Bootstrap, 'col' stands for column. Bootstrap Grid System allows up to 12 columns across the page and each column is represented as a span. . The Grid System allows for up to 12 columns on a page, and each column occupies a 'span' of the available width, creating responsive and adaptable layouts.</p>
    <h3>13. What is a Bootstrap Container?</h3>
    <p>In Bootstrap, a container is a way to wrap content on a webpage. It helps to control the width of the content and center it properly on different screen sizes. By using the container class along with rows and columns, we can create a grid like structure that adjusts to different screen sizes. The container is the most basic layout class name in Bootstrap and is required when using the Bootstrap Grid System. The purpose of a container is to hold rows and columns. Bootstrap comes with three different containers: .container: It is a responsive, fixed width container. Its max width changes at each breakpoint. .container fluid It is a full width container spanning the entire width of the viewport. (width: 100) .container breakpoint It is 100 wide until the specified breakpoint. For higher breakpoints, it takes the max width.</p>
    <h3>14. What is the purpose of Bootstrap class names d none and d block ?</h3>
    <p>Bootstrap's d none and d block classes control element visibility. Where d none class hides an HTML element and does not occupy any space ,On the other hand d block class displays an element as a block level element, occupying the full width of its container. , while d block class displays an HTML element on the page.</p>
    <h3>15. Explain what is Bootstrap and its importance?</h3>
    <p>Bootstrap is a free and popular tool that simplifies website and application development. It has pre written code snippets for HTML, CSS, and JavaScript, and provides ready made UI components and a responsive grid system. Using Bootstrap saves time and effort and ensures a visually appealing and responsive design that can be used on different devices.</p>
    <h3>16. Name some of the Bootstrap class names?</h3>
    <p>Some of the bootstrap class names are: btn btn primary row container text center text danger and so on.</p>
    <h3>17. What is difference between container and container-fluid?</h3>
    <p>In Bootstrap, "container" sets a fixed maximum width at each responsive breakpoint, whereas "container-fluid" sets the width to 100% across all viewport and device sizes, allowing for a fully fluid layout.</p>
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

export default Bootstrap_Practice_set
