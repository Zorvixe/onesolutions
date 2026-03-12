import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const HTML_Practice_Set_2 = ({
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
      <h2>HTML Practice Set - 2</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
      <h3>1. What is an HTML heading element and an HTML paragraph element?</h3>
       <p>
        HTML heading elements and paragraph elements are used to organize and display text content on a webpage.
        </p>
        <ul>
          <li><b>HTML Heading Element:</b> Heading elements are used for titles and subheadings of a webpage. They range from <code>h1</code> to <code>h6</code>, where <code>h1</code> represents the main heading and <code>h6</code> represents the smallest heading.</li>

          <li><b>HTML Paragraph Element:</b> The paragraph element is represented by the <code>p</code> tag. It is used to group text into paragraphs and display blocks of text on a webpage.</li>
        </ul>
        <p>
        In simple terms, heading elements define the title or section headings of a webpage, while the paragraph element is used to display the main text content.
        </p>
        <CodeBlock
        language="html"
        code={`<h1>Welcome to My Website</h1>
        <p>This is a paragraph on the webpage.</p>`}
        />
      <h3>2.What is the difference between HTML div and span elements?</h3>
       <p>The <code>div</code> and <code>span</code> elements are HTML elements used to group and style content. 
        The main difference between them is how they are displayed on a webpage.
        </p><ul>
          <li><b>div:</b> The <code>div</code> element is a block-level element. It starts on a new line and takes up the full width of its parent element. It is usually used to group larger sections of content.</li>
          <li><b>span:</b> The <code>span</code> element is an inline element. It does not start on a new line and only takes up as much width as its content. It is mainly used to style or group small parts of text within other elements.</li>
        </ul>

        <p>In simple terms, <code>div</code> is used for larger sections or layouts, while <code>span</code> is used for smaller pieces of content inside other elements.</p>

        <CodeBlock
        language="html"
        code={`<div>
          <h2>Website Section</h2>
          <p>This is a paragraph inside a div.</p>
        </div>

        <p>This is a <span style="color:red;">highlighted</span> word.</p>`}
        />
        <h3>3. What is an HTML container element?</h3>
        <p>An HTML container element is an element that can be used to wrap or enclose other HTML elements, usually to provide structure, styling, or additional functionality to a web page. The div element is a good example for a HTML container element. A container element is an element that can hold other HTML elements inside it.</p>
        <h3>4. What are HTML tags?</h3>
        <p>HTML tags are key words that help shape and format the content of a webpage. They come in pairs and are surrounded by angle brackets. These tags tell web browsers how to show text, pictures, and other items on a webpage. The p tag which is used to create a paragraph, or the img tag which is used to display an image are the really good examples for HTML tags.</p>
        <h3>5. What is an HTML script element?</h3>
        <p>The HTML script element is a simple way to include and run JavaScript code in a webpage. It uses the script tag, which can either have code inside it or link to an external file through src attribute. This helps make web pages interactive and dynamic.</p>
        <h3>6. How many HTML h1 elements can be used on a web page?</h3>
        <p>You can have more than one h1 element on a web page, It is recommended to use just one h1 element for the main heading of the page to establish a clear structure and hierarchy of headings but it's recommended to use just one for a clear structure and better search results.</p>
        <h3>7. How to display images on the web page?</h3>
        <p>We can display images on the web page using the HTML img element. Generally, the HTML img element requires two main HTML attributes. src specifies the path to the image. alt specifies an alternate text for the image.</p>
        <h3>8. What are the attributes we can give to an HTML image element?</h3>
        <p>In HTML, the img element can have several attributes that control its appearance, behavior, and other characteristics. Few of the most common attributes for the img element are: src alt height width class, etc. The attributes we can give to an HTML image element:</p>
        <h3>9. What is an HTML image element?</h3>
        <p>The HTML img element defines an Image. In HTML the image element is a tag which is used to display images on a web page. The image element is represented by the img tag, and it requires a mandatory src attribute that specifies the URL or file path of the image that should be displayed on the web page. Additionally, The alt attribute is used to provide a description of the image for users who cannot see the image or for accessibility purposes. Additionally, the alt attribute is used to provide a description of the image for users who cannot see the image.</p>
        <h3>10. Does a hyperlink only apply to text?</h3>
        <p>Not necessarily. In addition to text we can apply hyperlinks to other HTML elements like images, buttons, etc.</p>
        <h3>11. What is the difference between HTML anchor element and HTML link element?</h3>
        <p>We can use the anchor element to navigate to other web resources or a specific element within the HTML document. Whereas, the link element is used to link external resources such as stylesheets, icons, and other files needed for the webpage to function properly.</p>
        <h3>12. What is the difference between HTML script element and HTML link element?</h3>
        <p>The script element is used to include Javascript in a webpage. The HTML script element is a simple way to include and run JavaScript code in a webpage. Whereas, the link element is used to link external resources such as stylesheets, icons, and other files needed for the webpage to function properly.</p>
        <h3>13. Which HTML element is used to create a horizontal line?</h3>
        <p>The hr element is used to create a horizontal line or rule in HTML, which can be used to visually separate content on a web page. The hr tag is a self closing tag.It does not require a separate closing tag. The hr element creates a horizontal line in the webpage. hr tag is a self closing tag.</p>
        <h3>14. What is meant by the HTML href attribute?</h3>
        <p>It is used to specify the URL of a hyperlink. This attribute is used in a tag to specify the hyperlink in the webpage In HTML, the href attribute is used to specify the URL or the location of a web resource. The HTML href attribute is used to specify the URL of the page or resource that a hyperlink points to. When a user clicks on a hyperlink, the browser will navigate to the URL specified in the href attribute.</p>
        <h3>15. Name some of the attributes used in HTML?</h3>
        <p>There are many attributes that can be used in HTML, depending on the specific element and its purpose. Here are the few commonly used Attributes in HTML<br/>
        <ul>
          <li> 1. Id</li>
          <li>2. Class</li>
          <li>3. Src</li>
          <li>4. Style <br/>Some other commonly used attributes include href (for links), alt (for images), and type</li>
          </ul></p>
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

export default HTML_Practice_Set_2
