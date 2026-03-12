import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const HTML_Practice_Set_4 = ({
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
      <h2>HTML Practice Set - 4</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
      <h3>1. Can we create dynamic web pages using only HTML?</h3>
      <p><code>No</code>, we cannot create dynamic web pages using only HTML. We need to combine HTML, CSS, and JavaScript.</p>
      <h3>2. What are the types of tags in HTML?</h3>

  <p>There are two main types of tags in HTML: <b>Paired Tags</b> and <b>Unpaired Tags</b>.
</p>

<ul>
  <li><b>Paired Tags:</b> Paired tags have both an opening tag and a closing tag with content placed between them.</li>
  <li><b>Unpaired Tags:</b> Unpaired tags do not have a closing tag. They are also called empty or self-closing tags.</li>
</ul>

<CodeBlock
language="html"
code={`<!-- Paired Tag -->
<p>This is a paragraph</p>

<!-- Unpaired Tag -->
<br>
<img src="image.jpg" alt="Sample Image">`}
/>
    <h3>3. What are the HTML elements that are commonly used?</h3>
    <p>Some of the common HTML elements include, p for adding a paragraph img for adding images button for adding buttons ul for adding unordered lists a for adding links b for bolding a text</p>
    <h3>4. What is the HTML head element and why we use it?</h3>
    <p>The head element is a container element that is used to contain meta information about an HTML document that is not visible to the user. This includes page title, links to external stylesheets and scripts.</p>
    <h3>5. What is the HTML target attribute?</h3>
    <h3>What is the HTML target attribute?</h3>

<p>
The HTML <code>target</code> attribute is used with hyperlinks to specify where the linked page should open. 
It tells the browser whether the link should open in the same tab or in a new tab.
</p>

<ul>
  <li><b>_blank:</b> Opens the linked page in a new browser tab or window.</li>
  <li><b>_self:</b> Opens the linked page in the same tab (this is the default behavior).</li>
</ul>

<CodeBlock
language="html"
code={`<!-- Opens link in a new tab -->
<a href="https://example.com" target="_blank">Visit Website</a>

<!-- Opens link in the same tab -->
<a href="https://example.com" target="_self">Visit Website</a>`}
/> 
    <h3>6. Explain about the HTML block level elements</h3>
    <p>Block level elements always start in a new line and take up the full width available. So, it occupies the entire horizontal space of its parent element.<br/> Examples: h1 element, p element, div element, etc.</p>
    <h3>7. Explain about the HTML inline elements</h3>
    <p>Inline elements do not start on a new line and take up the content width.<br/> Examples: button element, img element, a element, etc.</p>
    <h3>8. Why Meta elements are used in HTML?</h3>
    <p>Meta elements are used in HTML to provide information about the web page to the browser and search engines. They can be used to specify the character set, page description, keywords, author, and other metadata. This information can help search engines index the page and display relevant information in search results.</p>
    <h3>9. What is the difference between HTML4 and HTML5?</h3>
    <p>HTML4 and HTML5 are versions of the HTML language used to create web pages. HTML5 is the newer version and introduces several improvements and new features compared to HTML4.
</p>

<ul>
  <li><b>Multimedia Support:</b> HTML5 introduced built-in multimedia elements like <code>video</code> and <code>audio</code>, which allow media to be played directly in the browser without external plugins.</li>

  <li><b>Semantic Elements:</b> HTML5 provides semantic elements such as <code>header</code>, <code>footer</code>, <code>section</code>, and <code>article</code> that help structure web pages more clearly.</li>

  <li><b>Graphics Support:</b> HTML5 supports graphics using <code>canvas</code> and SVG, which were not available in HTML4.</li>

  <li><b>Form Enhancements:</b> HTML5 introduced new input types and form controls that make form validation easier.</li>
</ul>

<CodeBlock
language="html"
code={`<!-- HTML5 Multimedia Example -->
<video controls width="300">
  <source src="movie.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>`}
/>
   <h3>10. What is a Meta Charset?</h3>
   <p>A Meta Charset is an HTML tag specifying the character encoding of a webpage. It helps browsers interpret and render the text accurately, promoting consistency across various browsers and devices. The common value is UTF-8.</p>
   <h3>11. What is the difference between radio button and select elements?</h3>
   <p>Radio buttons allow a single choice from a limited set of options, while select elements, often in the form of dropdown menus, are more space-efficient and are used for larger option sets or when multiple selections are allowed.</p>
   <h3>12. How to create a HTML table?</h3>

    <p>
    An HTML table is used to display data in rows and columns. To create a table, start with the <code>table</code> tag. 
    Inside the table, use <code>tr</code> to define table rows, <code>th</code> to define header cells, and <code>td</code> to define data cells. 
    The content of the table is placed between these tags.
    </p>

    <ul>
      <li><b>table:</b> Defines the table.</li>
      <li><b>tr:</b> Defines a row in the table.</li>
      <li><b>th:</b> Defines a header cell.</li>
      <li><b>td:</b> Defines a data cell.</li>
    </ul>

<CodeBlock
language="html"
code={`<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>Mary</td>
    <td>22</td>
    <td>London</td>
  </tr>
</table>`}
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

export default HTML_Practice_Set_4
