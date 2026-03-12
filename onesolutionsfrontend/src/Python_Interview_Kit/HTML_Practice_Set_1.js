import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock, OutputBlock } from "../CodeOutputBlocks";

const HTML_Practice_Set_1 = ({
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
      <h2>HTML Practice Set - 1</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
      <h3>1. What is HTML?</h3>
      <p>HTML stands for HyperText Markup Language. It is the standard markup language used to create and structure web pages.<br/>HTML uses tags (elements) to define different parts of a webpage such as headings, paragraphs, images, links, tables, and forms. These tags tell the browser how to display the content on the webpage.</p>
      <h3>2. What are HTML elements?</h3>
      <p>HTML elements are the basic building blocks of a webpage. They define the structure and content of the page, such as headings, paragraphs, images, and links.<br/>
       Most HTML elements consist of three parts:<br/><ul>
        <li><b>start tag</b>: The start tag begins the element, </li>
        <li><b>content</b>: the content is the information displayed, </li>
        <li><b>end tag</b>: the end tag closes the element.</li>
        </ul> </p><p>For example, a paragraph element is written as:</p>
       <CodeBlock
        language="html"
        code={`<p>This is a paragraph</p>`}
        />
       <h3>3. What are the different levels of HTML heading elements?</h3>
       <p>HTML provides six levels of heading elements, from h1 to h6. These headings are used to define titles and subheadings on a webpage and help organize the content in a hierarchical structure.
        </p>
        <ul>
          <li><strong>h1</strong> – The most important heading, usually used for the main title of the webpage.</li>
          <li><strong>h2</strong> – Used for major section headings.</li>
          <li><strong>h3</strong> – Used for sub-sections within an h2 section.</li>
          <li><strong>h4</strong> – Used for smaller sub-sections.</li>
          <li><strong>h5</strong> – Used for minor headings.</li>
          <li><strong>h6</strong> – The least important heading, used for the smallest heading level.</li>
        </ul>
        <CodeBlock
        language="html"
        code={`<h1>Main Heading</h1>
        <h2>Sub Heading</h2>
        <h3>Section Heading</h3>
        <h4>Sub Section</h4>
        <h5>Minor Heading</h5>
        <h6>Smallest Heading</h6>`}
        />
        <h3>4. What are the differences between the HTML ordered List and the HTML unordered List?</h3>
        <p>The main difference between Ordered Lists and Unordered Lists is the way the items are displayed and organized on a webpage.
        </p>
        <ul>
          <li><b>Ordered List (ol): </b> is used when the items follow a specific order or sequence.</li>
          <ul><li>The list items in an ordered list are usually displayed using numbers or letters.</li>
          </ul><li><b>Unordered List (ul): </b> is used when the items do not follow any specific order or hierarchy.</li>
          <ul><li>The list items in an unordered list are displayed using bullet points or other symbols.</li>
          <li>We create an ordered list using the <code>ol</code> element.</li>
          <li>We create an unordered list using the <code>ul</code> element.</li>
          <li>By default, ordered lists display numbers, while unordered lists display bullet points.</li>
        </ul></ul>
        <CodeBlock
        language="html"
        code={`<!-- Ordered List -->
        <ol>
          <li>First Item</li>
          <li>Second Item</li>
          <li>Third Item</li>
        </ol>

        <!-- Unordered List -->
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Mango</li>
        </ul>`}
        />
        <h3>5. What is an HTML class attribute?</h3>
        <p>
        The HTML <code>class</code> attribute is used to assign <code>one or more</code> class names to an HTML element. 
        These class names are used to apply styles using CSS or to select and manipulate elements using JavaScript. 
        Multiple elements can share the same class name, which helps apply the same styling or behavior to many elements at once.
        </p>

        <CodeBlock
        language="html"
        code={`<p class="text-style">Hello World</p>
        <div class="box">Content</div>`}
        />
        <h3>6. Why do we use the id attribute in HTML?</h3>
        <p>The id attribute is used in HTML to assign a <code>unique identifier</code> to an element, which can be used for linking, styling, and scripting purposes.<br/> It must be unique within the page.<br/> The HTML id attribute is used to assign the id to an HTML element.<br/> The id has to be unique in the HTML document.<br/> It is used to change the properties of a specific element using CSS or Javascript.</p>
        <h3>7. What is a viewport?</h3>
        <p>The viewport refers to the <code>visible area</code>of a web page within a browser window or device screen. The viewport can be different for different devices and screen sizes. Viewport is the visible area of a web page, varying based on device type.</p>
        <h3>8. What is the extension of an HTML file?</h3>
        <p>HTML files are identified by the file extension <code>.html</code>, which is an abbreviation for Hypertext Markup Language, the markup language used to create web pages. HTML files have an extension called .html The extension .html indicates that the file is an HTML file.</p>
        <h3>9. What are the differences between the HTML id attribute and the HTML class attribute?</h3>
        <p>The <code>id</code> and <code>class</code> attributes are used in HTML to specify the styles and behaviors of a HTML element. The main differences between them are that id must be unique within the document, while class can be used for multiple elements, and id has higher CSS specificity. Theattribute is used to specify one or more classes while the id attribute is used to specify a unique identifier for an element. In an HTML document there can be multiple elements with the same class name while the id should be unique. HTML class</p>
        <h3>10. What is the use of an HTML anchor element?</h3>
        <p>The HTML anchor element lets you create <code>clickable links</code> on a webpage that takes you to different parts of the same webpage or another webpage, document or resource. The destination of the link is specified using the href attribute.</p>
        <h3>11. What is the structure of an HTML document?</h3>
        <p> An HTML document has a basic structure that helps the browser understand and display the webpage correctly. It consists of several important parts.</p>
        <ul>
          <li><b>DOCTYPE:</b> Declares the HTML version used in the document.</li>
          <li><b>html:</b> The root element that wraps the entire HTML document.</li>
          <li><b>head:</b> Contains metadata such as the page title, links to CSS files, and other information that is not displayed on the webpage.</li>
          <li><b>body:</b> Contains the visible content of the webpage such as headings, paragraphs, images, links, and other elements.</li>
        </ul>

        <p>While creating an HTML page, different elements are used inside the <code>head</code> and <code>body</code> sections to organize and display the content properly.</p>

        <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
        <html>
        <head>
          <title>My Webpage</title>
        </head>
        <body>
          <h1>Welcome</h1>
          <p>This is my webpage</p>
        </body>
        </html>`}
        />
        <h3>12. What are the differences between HTML Tags and HTML Elements?</h3>
        <p>HTML tag Is a keyword or a code enclosed in angle brackets that define the type of HTML element, An HTML element is made up of the opening and closing tags, along with the content between them, and it represents a structure or content within the web page. Therefore, tags define HTML elements, which are the fundamental building blocks of a web page. An HTML tag is a keyword or a code used to define the structure and format of an HTML document. They are the starting and ending parts of an HTML element. They begin with symbol and end with symbol. HTML Elements generally consist of a start tag, content, and an end tag.</p>
        <h3>13. What are the important parts of an HTML document?</h3>
        <p>The important parts of an HTML document are:
          <br/> DOCTYPE is at the beginning, indicating the version of HTML html is the main container wrapping the whole HTML document head is the container for metadata, not seen by users like page title, etc. body is the container for visible content like text, images, etc. While coding HTML, use various elements within head and body to organize and style your content.</p>
        <h3>14. What is the use of doctype?</h3>
        <p>The doctype declaration is an important part of an HTML document that specifies the version of the HTML used in the web page. It ensures that the web page is displayed correctly in the browser by informing it how to interpret the HTML code. The doctype should be included at the beginning of every HTML document. The doctype is a small piece of code at the beginning of an HTML document that tells web browsers which version of HTML to use. This helps browsers display the web page correctly. It's important and usually written as DOCTYPE html.</p>
        <h3>15. What is nested HTML?</h3>
        <p>Nested HTML refers to the placing of one or more HTML elements inside another element.</p>
        <h3>16. What are the diffetent types of lists in HTML?</h3>
        <p>In HTML, there are three primary list types.<br/>
        <ul><li>The unordered List is used to group related items without any particular order. </li>
       <li>The ordered list is used to group related items in a specific sequence </li>
       <li>the description list is used to display name/value pairs, such as terms with their definitions.</li>
        </ul> </p>
        <h3>17. What is an HTML marquee tag?</h3>
        <p>The HTML <code>"marquee"</code> tag was used to create scrolling effects for content on web pages. It has several attributes for customization but is now outdated and not recommended for modern web development due to compatibility issues. Instead, use CSS animations or JavaScript libraries for more control and responsiveness.</p>
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

export default HTML_Practice_Set_1
