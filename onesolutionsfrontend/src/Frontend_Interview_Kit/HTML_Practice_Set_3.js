import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const HTML_Practice_Set_3 = ({
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
      <h2>HTML Practice Set - 3</h2>
      <h2>Practice the popular interview questions in HTML using ZorMock.</h2>

    <section>
      <h3>1. What is the value assigned to the HTML href attribute?</h3>
      <p>The href attribute indicates the URL of an external resource or a hyperlink's destination within a webpage. The href attribute in HTML holds the URL for a link or external resource. It is mainly used in anchor (a) and link (link) elements for navigating to different webpages or loading resources like stylesheets or icons. The href attribute specifies the location (URL) of the external resource or the URL of a hyperlink in the webpage.</p>
      <h3>2. What are the uses of HTML?</h3>
       <p>
        HTML (HyperText Markup Language) is a markup language used to create the structure and content of web pages. 
        It is the foundation of the web and is used to build websites, web applications, and even parts of mobile applications.
        </p>

        <p>
        HTML provides the basic structure of a webpage by organizing content using elements such as headings, paragraphs, lists, tables, and multimedia elements like images, audio, and video.
        </p>

        <ul>
          <li><b>Structuring Web Pages:</b> HTML is used to structure content using elements like headings, paragraphs, lists, and tables.</li>
          <li><b>Navigation:</b> It allows developers to create links between web pages so users can easily navigate across websites.</li>
          <li><b>Forms:</b> HTML is used to create forms such as contact forms, search bars, and registration forms that allow users to submit data to a server.</li>
          <li><b>Accessibility:</b> HTML supports accessibility features so that users with disabilities can access web content, following standards like WCAG.</li>
          <li><b>SEO and Responsiveness:</b> Proper use of HTML helps search engines understand the webpage content and supports mobile-friendly design.</li>
        </ul>

        <p>
        In simple terms, HTML is used to create and present web content in a structured and organized way, making it easier for browsers and users to understand the webpage.
        </p>
        <h3>3. What are the HTML attributes?</h3>
        <p>Attributes in HTML are used to provide <code>additional information</code> about elements and are always written in the start tag of an element. They usually consist of a name/value pair, like class or src.</p>
        <h3>4. Can multiple HTML elements have the same id?</h3>
        <p><code>No</code>,The id attribute is a <code>unique identifier</code> for an HTML element, According to the HTML specification, it must be unique within the document. If multiple elements have the same id, and it can cause ambiguity and make it difficult for browsers to correctly identify the intended element.</p>
        <h3>5. Can we use the HTML p element inside an HTML span element?</h3>
        <p><code>No</code>, we cannot use p element inside span element because p is a block level element and span is inline element. In HTML, block level elements can contain other block level elements or inline elements, but inline elements can only contain other inline elements or text.</p>
        <h3>6. Can we write an HTML div element in another HTML div element?</h3>
        <p><code>Yes</code>, we can write a div element in another div element. Because in HTML div is a block level element, and We can always place a block level element inside another block level element.</p>
        <h3>7. What is the difference between HTML and JavaScript?</h3>
        <p> HTML and JavaScript are both important technologies used in web development, but they serve different purposes.
          </p>

          <ul>
            <li><b>HTML:</b> HTML (HyperText Markup Language) is a markup language used to structure and display content on web pages. It is used to create elements like headings, paragraphs, images, links, and forms.</li>

            <li><b>JavaScript:</b> JavaScript is a scripting language used to add interactivity and dynamic behavior to web pages, such as form validation, animations, and user interactions.</li>
          </ul>

          <p>
          In simple terms, HTML focuses on the structure and presentation of a webpage, while JavaScript focuses on the behavior and functionality of the webpage.
          </p>

          <p>
          JavaScript code can also be embedded inside HTML using the <code>&lt;script&gt;</code> tag to make web pages more interactive and dynamic.
          </p>

          <CodeBlock
          language="html"
          code={`<h1>Welcome</h1>
  <button onclick="showMessage()">Click Me</button>

  <script>
  function showMessage() {
    alert("Hello! This is JavaScript interaction.");
  }
  </script>`}
  />   
  <h3>8. What are the differences between HTML and Python?</h3> 
  <p>HTML is a markup language used for creating structure and appearance of web pages and web applications. Where as, Python is a general-purpose programming language used for a wide range of applications, including web development.</p> 
  <h3>9. What are forms and how to create forms in HTML?</h3> 
  <p>Forms are used to collect user input, such as text, numbers, and selections, which can be submitted to a server for processing. The form element is used to define an HTML form.</p>   
  <h3>10. What is checkbox and how to use checkbox?</h3>
  <p>To define a Checkbox, we need to specify the HTML type attribute with the value checkbox for an HTML input element.</p>
  <h3>11. What are the differences between the HTML checkbox and radio input elements?</h3>
 <p>The <code>radio</code> and <code>checkbox</code> input elements are used in HTML forms to allow users to select options. The main difference is how many options a user can select.
  </p>
  <ul>
    <li><b>Radio Button:</b> The <code>radio</code> input element allows the user to select only one option from a group.</li>
    <li><b>Checkbox:</b> The <code>checkbox</code> input element allows the user to select one or more options at the same time.</li>
  </ul>

  <p>In simple terms, radio buttons are used when only one option should be selected, while checkboxes are used when multiple options can be selected.
  </p>

<CodeBlock
language="html"
code={`<!-- Radio Buttons -->
<input type="radio" name="gender"> Male
<input type="radio" name="gender"> Female

<!-- Checkboxes -->
<input type="checkbox"> HTML
<input type="checkbox"> CSS
<input type="checkbox"> JavaScript`}
 />
 <h3>12. How to create a single line text box for searching queries?</h3>
 <p>To create a single line text box for search queries, use the HTML input element with the search. The HTML input element with the type search is used to add a single line text box for searching queries.h</p>
 <h3>13. What is an HTML checked attribute?</h3>
 <p>The HTML checked attribute specifies that an input element should be pre selected (checked) when the page loads.</p>
 <h3>14. What are the different types of input elements available and their uses?</h3>
 <p>The HTML <code>input</code> element can be displayed in different ways depending on the value of the <code>type</code> attribute. Some commonly used input types are:
  </p>

  <ul>
    <li><b>type="text":</b> Defines a single-line text input field where users can enter text.</li>
    <li><b>type="password":</b> Defines a single-line password input field where the entered characters are hidden.</li>
    <li><b>type="submit":</b> Defines a submit button that sends the form data to the server.</li>
    <li><b>type="radio":</b> Defines a radio button that allows the user to select only one option from a group.</li>
    <li><b>type="checkbox":</b> Defines a checkbox that allows the user to select multiple options.</li>
  </ul>

<CodeBlock
language="html"
code={`<input type="text" placeholder="Enter name">
<input type="password" placeholder="Enter password">
<input type="radio" name="gender"> Male
<input type="checkbox"> HTML
<input type="submit" value="Submit">`}
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

export default HTML_Practice_Set_3
