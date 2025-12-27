import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Static_Summary_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsSubtopicCompleted(true);
    } catch (error) {
      console.error("Failed to mark subtopic complete:", error);
    }
  };
  return (
    <div
      className="intro-container"
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.7",
        background: "#f0f8ff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1a5276",
          fontSize: "30px",
          marginBottom: "0.5rem",
        }}
      >
        Static Summary Cheat Sheet
      </h1>

      {/* HTML Basic Structure */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          HTML Basic Structure
        </h2>
        <p>The basic structure of any HTML document is as follows:</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    Your code goes here
  </body>
</html>`}
        />
      </section>

      {/* HTML Elements */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #27ae60",
            paddingBottom: "0.5rem",
          }}
        >
          HTML Elements
        </h2>

        <h3>1. Heading</h3>
        <p>The HTML "h1" element defines a main heading.</p>
        <CodeBlock language="html" code={`<h1>Tourism</h1>`} />
        <h3>2. Paragraph Element</h3>
        <p>The HTML "p" element defines a paragraph.</p>
        <CodeBlock
          language="html"
          code={`<p>Plan your trip wherever you want to go</p>`}
        />
        <h3>3. Button Element</h3>
        <p>The HTML "button" element defines a button.</p>
        <CodeBlock language="html" code={`<button>Get Started</button>`} />
        <h3>4. Container Element</h3>
        <p>The HTML "div" element defines a container.</p>
        <CodeBlock
          language="html"
          code={`<div>
<h1>Tourism</h1>
<p>Plan your trip wherever you want to go</p>
<button>Get Started</button>
</div>`}
        />
        <h3>5. Image Element</h3>
        <p>The HTML "img" element defines an Image.</p>
        <b>Syntax: </b>
        <CodeBlock language="html" code={`<img src="IMAGE_URL"/>`} />
        <h3>5.1 The "src" Attribute</h3>
        <p>
          The HTML Attribute "src" specifies the <b>path (URL)</b> of the Image.
        </p>
        <CodeBlock
          language="html"
          code={`<img  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/tajmahal-img.png"/>`}
        />
        <h3>6. Anchor Element</h3>
        <p>
          The HTML "a" element defines a <b>Hyperlinks</b>.
        </p>
        <p>
          We use <b>Hyperlinks</b> to navigate to other web resources or a
          specific element within the HTML document. They are also called links.
        </p>
        <b>Syntax: </b>
        <CodeBlock language="html" code={`<a href="URL">Content</a>`} />
        <h3>6.1 HTML "href" Attribute</h3>
        <p>
          The HTML "href" Attribute specifies the URL/ path of the page where
          the link goes to.
        </p>
        <CodeBlock
          language="html"
          code={`<a href="https://www.ccbp.in/">Explore CCBP 4.0 Certification Programs</a>`}
        />
        <h3>6.2. Different ways to use the "Anchor" Element</h3>
        <h3>6.2.1 Navigate within the same HTML document</h3>
        <ul>
          <li>
            The HTML anchor "a" element can also be used to navigate to
            different sections within the same HTML document.
          </li>
          <li>
            Add an HTML "id" attribute to the section that you want to navigate
            to. Provide the hash symbol "#", and the value of the "id" attribute
            of that section as a value to the link's HTML "href" attribute.
          </li>
        </ul>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            While navigating to a particular section within the same HTML
            document, the content of that section doesn't start from the
            starting of a page when
          </p>
          <ul>
            <li>
              It has less content to fill the Viewport height and there are no
              sections after it.
            </li>
            <li>
              The content of that section and the content of the sections after
              it has less content to fill the Viewport height.
            </li>
          </ul>
        </div>

        <h3>6.2.2 HTML Image Element as Link</h3>
        <CodeBlock
          language="html"
          code={` <a href="https://www.ccbp.in/">
  <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/learn-technologies-img.png" />
</a>`}
        />
        <h3>7. Void Elements</h3>
        <p>
          The HTML elements that only have a start tag and do not contain
          content or end tag are called as <b>Void Elements</b>.
        </p>

        <b>Syntax: </b>
        <CodeBlock language="html" code={`<tag />`} />
        <p>For example, the HTML "img" element.</p>
        <CodeBlock
          language="html"
          code={`<img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/tajmahal-img.png"/>`}
        />

        <h3>8. Line Break Element</h3>
        <p>
          The HTML "br" element helps to break the text and continue it in the
          next line.
        </p>
        <CodeBlock
          language="html"
          code={`<p>
Twinkle, twinkle, little star, <br />
How I wonder what you are!
</p>`}
        />
        <h3>9. Horizontal Rule Element</h3>
        <p>
          The HTML "hr" element inserts a horizontal line and helps to separate
          the content.
        </p>
        <CodeBlock
          language="html"
          code={`<h1 class="heading">
  Twinkle Twinkle Little Star
</h1>
<hr />
<p>
  Twinkle, twinkle, little star.
</p>
<hr />`}
        />
        <h3>10. HTML Lists</h3>
        <p>
          The List is a way to group related pieces of information so that they
          are easy to read and understand.
        </p>
        <p>For example, Shopping list, Todo list, etc.</p>
        <p>There are mainly two types of Lists available in HTML.</p>
        <ul>
          <li>Unordered List</li>
          <li>Ordered List</li>
        </ul>
        <h3>11. Unordered List</h3>
        <p>
          It is a collection of related items that have no special order or
          sequence.
        </p>
        <p>For example, List of Hobbies</p>
        <ul>
          <li>Painting</li>
          <li>Reading Books</li>
          <li>Playing the Guitar</li>
        </ul>

        <p>
          The Unordered List starts with "<b>ul</b>" tag. It wraps around all
          the list items and each list item starts with the "<b>li</b>" tag.
        </p>

        <CodeBlock
          language="html"
          code={`<ul>
<li>Painting</li>
<li>Reading Books</li>
</ul>`}
        />

        <p>
          By default, list items in the Unordered List are marked with bullets.
        </p>
        <h3>11.1. Styling Unordered List</h3>
        <p>The CSS "list-style-type" property is used to style the List.</p>

        <CodeBlock
          language="css"
          code={`.unordered-square-list {
  list-style-type: square;
}`}
        />

        <p>
          You can use one of the below values of the CSS "list-style-type"
          property to style the Unordered List.
        </p>
        <code>Values: square, circle, disc, none</code>
        <h3>12. Ordered List</h3>
        <p>
          It is a collection of related items that follow some order or have a
          sequence.
        </p>
        <p>For example, Web Technologies</p>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>

        <p>
          The Ordered List starts with "<b>ol</b>" tag. It wraps around all the
          list items and each list item starts with the "<b>li</b>" tag.
        </p>

        <CodeBlock
          language="html"
          code={`<ol>
<li>Go through the HTML elements and CSS properties</li>
<li>Complete the Todolist Coding Practice</li>
<li>Go through the Bootstrap Concepts</li>
</ol>`}
        />

        <p>
          By default, list items in the Ordered List are marked with numbers.
        </p>
        <h3>12.1. Styling Ordered List</h3>
        <p>The CSS "list-style-type" property is used to style the List.</p>

        <CodeBlock
          language="css"
          code={`.ordered-lower-roman-list {
  list-style-type: lower-roman;
}`}
        />

        <p>
          You can use one of the below values of the CSS "list-style-type"
          property to style the Ordered List.
        </p>
        <code>
          Values: upper-alpha, lower-alpha, upper-roman, lower-roman, decimal,
          none
        </code>
      </section>

      {/* HTML Attributes */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #9b59b6",
            paddingBottom: "0.5rem",
          }}
        >
          HTML Attributes
        </h2>

        <h3>1. HTML "id" Attribute</h3>
        <p>
          The HTML "id" attribute specifies a unique id for an HTML element. The
          value of the "id" attribute must be unique within the HTML document.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="section1">Section 1</div>`}
        />

        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <ul>
            <li>
              The CCBP UI kit works only if the value of the HTML <b>id</b>{" "}
              attribute of the container section has the prefix as{" "}
              <b>section</b>.
            </li>
            <li>
              So, the id which we specify for any section should always contain
              its prefix as <b>section</b> if you are using CCBP UI Kit.
            </li>
          </ul>
        </div>

        <h3>2. HTML "onclick" Attribute</h3>
        <p>
          The "onclick" event occurs when the user clicks on an HTML Element.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary" onclick="display('section3')">
  Go to Section 3
</button>`}
        />

        <p>
          The value of an HTML "onclick" attribute should be enclosed in
          double-quotes and the value inside the brackets of "display()" should
          be enclosed in single quotes.
        </p>

        <h3>3. The "src" Attribute</h3>
        <p>The HTML Attribute "src" specifies the path (URL) of the Image.</p>

        <CodeBlock
          language="html"
          code={`<img
  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/tajmahal-img.png"
/>`}
        />

        <h3>4. HTML "href" Attribute</h3>
        <p>
          The HTML "href" Attribute specifies the URL/ path of the page where
          the link goes to.
        </p>

        <CodeBlock
          language="html"
          code={`<a href="https://www.ccbp.in/">Explore CCBP 4.0 Certification Programs</a>`}
        />

        <h3>5. HTML "target" Attribute</h3>
        <p>
          The HTML "target" Attribute specifies where to open the linked web
          resource.
        </p>

        <CodeBlock
          language="html"
          code={`<a href="https://www.ccbp.in/" target="_blank">
  Explore CCBP 4.0 Certification Programs
</a>`}
        />
      </section>

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          CSS Syntax
        </h2>

        <CodeBlock
          language="css"
          code={`selector {
  property1: value1;
  property2: value2;
}`}
        />
      </section>

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          CSS Text Properties
        </h2>

        <h3>1. Text Align</h3>
        <p>
          The CSS "text-align" property specifies the horizontal alignment of
          the text in an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.h-center {
  text-align: center;
}`}
        />

        <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>center</td>
              <td>Aligns the text to the center</td>
            </tr>
            <tr>
              <td>left</td>
              <td>Aligns the text to the left</td>
            </tr>
            <tr>
              <td>right</td>
              <td>Aligns the text to the right</td>
            </tr>
          </tbody>
        </table>

        <h3>2. Color</h3>
        <p>The CSS "color" property specifies the color of the text.</p>

        <CodeBlock
          language="css"
          code={`.main-heading {
  color: blue;
}
.paragraph {
  color: grey;
}`}
        />

        <h3>2.1. Sample Colors</h3>
        <p>Values: blue, grey, lightblue, orange, red, green</p>

        <h3>2.2. Hex Code</h3>
        <p>CSS Colors can be represented in multiple ways:</p>
        <ul>
          <li>Color names</li>
          <li>Hex Code</li>
          <li>HSL</li>
          <li>RGB and many more...</li>
        </ul>

        <p>
          Since few colors have the Color names, Hex Codes make a good
          alternative to pick a wide variety of colors.
        </p>

        <p>Some of the Color names and their Hex Codes are:</p>

        <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>Color Name</th>
              <th>Hex Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>orange</td>
              <td>#ffa500</td>
            </tr>
            <tr>
              <td>red</td>
              <td>#ff0000</td>
            </tr>
            <tr>
              <td>blue</td>
              <td>#0000ff</td>
            </tr>
            <tr>
              <td>green</td>
              <td>#008000</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#012d36</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#432711</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#25b1cc</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="css"
          code={`.button {
  background-color: #25b1cc;
}`}
        />

        <h3>2.2.1 How to pick a color using Hex Code</h3>
        <p>
          The color picker lets you pick a color among the approximately
          16,777,216 colors available.
        </p>
        <p>One of the simplest ways to access a color picker is:</p>
        <ul>
          <li>Type color picker in the Google Search bar and search it.</li>
        </ul>

        <img
          src="/assets/img/color_picker.png"
          alt="Color Picker"
          style={{ width: "90%", height: "350px" }}
        />
        <h3>3. Font Family</h3>
        <p>The CSS "font-family" property specifies the font for an element.</p>

        <CodeBlock
          language="css"
          code={`@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");
 .main-heading {
  font-family: "Roboto";
}
.paragraph {
  font-family: "Roboto";
}`}
        />

        <p>
          You can use one of the below values of the "font-family" property,
        </p>

        <img
          src="/assets/img/font_families.png"
          alt="DOM Tree"
          style={{ width: "50%", height: "350px" }}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              To use font families, you need to import their style sheets into
              your CSS file.
            </li>
            <li>
              There shouldn't be any spelling mistakes in the values of the{" "}
              <b>font-family</b> property.
            </li>
            <li>
              There must be quotations around the value of the{" "}
              <b>font-family</b> property.
            </li>
          </ul>
        </div>

        <h3>4. Font Size</h3>
        <p>The CSS "font-size" property specifies the size of the font.</p>

        <CodeBlock
          language="css"
          code={`.main-heading {
  font-size: 36px;
}
.paragraph {
  font-size: 28px;
}`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              You must add <b>px</b> after the number in the value of the{" "}
              <b>font-size</b> property.
            </li>
            <li>
              There shouldn't be any space between the number and <b>px</b>.
            </li>
            <li>
              There shouldn't be any quotations around the value of the{" "}
              <b>font-size</b> property.
            </li>
          </ul>
        </div>

        <h3>5. Font Style</h3>
        <p>
          The CSS "font-style" property specifies the font style for a text.
        </p>
        <p>You can use one of the below values of the "font-style" property,</p>
        <b>Value: normal,italic,oblique</b>

        <CodeBlock
          language="css"
          code={`.main-heading {
  font-style: italic;
}
.paragraph {
  font-style: normal;
}`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              There shouldn't be any spelling mistakes in the values of the{" "}
              <b>font-style</b> property.
            </li>
            <li>
              There shouldn't be any quotations around the value of the{" "}
              <b>font-style</b> property.
            </li>
          </ul>
        </div>

        <h3>6. Font Weight</h3>
        <p>
          The CSS "font-weight" property specifies how thick or thin characters
          in text should be displayed.
        </p>

        <CodeBlock
          language="css"
          code={`.main-heading {
  font-weight: bold;
}
.paragraph {
  font-weight: 200;
}`}
        />

        <p>
          You can use one of the below values of the "font-weight" property,
        </p>
        <b>
          Values: normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600,
          700, 800, 900
        </b>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              There shouldn't be any spelling mistakes in the values of the{" "}
              <b>font-weight</b> property.
            </li>
            <li>
              There shouldn't be any quotations around the value of the{" "}
              <b>font-weight</b> property.
            </li>
            <li>
              The numerical values given to the <b>font-weight</b> property must
              be in the range from <b>100</b> to <b>900</b> and should be the
              multiples of <b>100</b>.
            </li>
          </ul>
        </div>

        <h3>7. Text Decoration</h3>
        <p>
          The CSS "text-decoration" property specifies the decoration added to
          the text.
        </p>

        <CodeBlock
          language="css"
          code={`.main-heading {
  text-decoration: underline;
}
.paragraph {
  text-decoration: overline;
}`}
        />

        <p>
          You can use one of the below values of the "text-decoration" property,
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>underline</td>
              <td>Underline the text</td>
            </tr>
            <tr>
              <td>line-through</td>
              <td>Strike through the text</td>
            </tr>
            <tr>
              <td>overline</td>
              <td>Overline the text</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              There shouldn't be any spelling mistakes in the values of the{" "}
              <b>text-decoration</b> property.
            </li>
            <li>
              There shouldn't be any quotations around the value of the{" "}
              <b>text-decoration</b> property.
            </li>
            <li>
              Ensure that <b>text-decoration</b> and <b>line-through</b> are
              hyphenated.
            </li>
          </ul>
        </div>
      </section>

      {/* CSS Syntax & Text Properties */}

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          CSS Background Properties
        </h2>

        <h3>1. Background Color</h3>
        <p>
          The CSS "background-color" property specifies the background color of
          an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  background-color: lightblue;
}`}
        />

        <h3>2. Background Image</h3>
        <p>
          The CSS "background-image" property specifies the background image of
          an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  background-image: url("https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/ocean.jpg");
}`}
        />

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>url (URL)</td>
              <td>The URL to the image.</td>
            </tr>
          </tbody>
        </table>
        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <ul>
            <li>
              The background image takes the height of the content of an HTML
              element if you don't specify the height to it.
            </li>
            <li>
              The URL given to the <b>background-image</b> must be a valid URL
              to display the image.
            </li>
          </ul>
        </div>

        <h3>3. Background Size</h3>
        <p>
          The CSS "background-size" property specifies the size of the
          background image of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  background-size: cover;
}`}
        />
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cover</td>
              <td>
                Scales the image to the smallest size while maintaining the same
                aspect ratio (width/height) and covers the entire width and
                height even if the image is cropped.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Aspect Ratio is the ratio of the width and height (width/height) of
            an image.
          </p>
        </div>
      </section>

      {/* CSS Box Properties */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          CSS Box Properties
        </h2>

        <h3>1. Height</h3>
        <p>
          The CSS "height" property specifies the height of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  height: 200px;
}`}
        />

        <h3>2. Width</h3>
        <p>The CSS "width" property specifies the width of an HTML element.</p>

        <CodeBlock
          language="css"
          code={`.card {
  width: 250px;
}`}
        />

        <h3>3. Border Width</h3>
        <p>
          The CSS "border-width" property specifies the width of the border for
          all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-width: 2px;
}`}
        />

        <p>
          The CSS Property and value pair <code>border-width: 0px;</code>{" "}
          removes the border of an HTML element.
        </p>
        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <p>
            Specifying the CSS `border-style` property for an HTML element is
            mandatory. Otherwise, the CSS properties like `border-color`,
            `border-width` will not appear in the browser. The HTML `button`
            element is an exception as it appears with a border in the browser
            by default.
          </p>
        </div>

        <h3>4. Border Radius</h3>
        <p>
          The CSS "border-radius" property specifies the roundness of the
          corners of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-radius: 20px;
}`}
        />

        <p>
          You can use the below CSS properties to round a specific corner of an
          HTML element.
        </p>

        <p>
          <b>Properties: </b>border-top-left-radius, border-top-right-radius,
          border-bottom-left-radius, border-bottom-right-radius
        </p>

        <div className="Quick-Tip-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-lightbulb"></i>Pro Tip:
            </h6>
          </div>
          <p>
            Specifying the background color for an HTML element makes the border
            radius more visible.
          </p>
        </div>

        <h3>5. Border Color</h3>
        <p>
          The CSS "border-color" property specifies the color of the border for
          all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-color: orange;
}`}
        />

        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <p>
            Specifying the CSS `border-style` property for an HTML element is
            mandatory. Otherwise, the CSS properties like `border-color`,
            `border-width` will not appear in the browser. The HTML `button`
            element is an exception as it appears with a border in the browser
            by default.
          </p>
        </div>
        <h3>6. Border Style</h3>
        <p>
          The CSS "border-style" property specifies the style of the border for
          all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-style: dashed;
}`}
        />

        <p>
          You can use one of the below values of the CSS "border-style"
          property.
        </p>
        <b>Value: dotted, dashed, solid, none (default)</b>

        <h3>7. Padding</h3>
        <p>
          The CSS "padding" property specifies the space around the content of
          an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  padding: 10px;
}`}
        />

        <h3>8. Margin</h3>
        <p>
          The CSS "margin" property specifies the space around the four sides of
          an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card-container {
  margin: 10px;
}`}
        />

        <p>
          You can use the below CSS properties to apply a margin on the specific
          side of an HTML element,
        </p>

        <p>
          <b>Properties:</b> margin-top, margin-right, margin-bottom,
          margin-left
        </p>
      </section>

      {/* Viewport Units */}

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          Viewport
        </h2>

        <p>
          The browser's viewport is the area of the window in which web content
          can be seen.
        </p>

        <h3>1. Viewport Height</h3>
        <p>
          The CSS Viewport Height <b>"vh"</b> Unit equals to 1% of the height of
          the Viewport (browser window size).
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  height: 50vh;
}`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The height <b>100vh</b> sets an HTML element to the entire height of
            the Viewport (browser window size).
          </p>
        </div>

        <h3>2. Viewport Width</h3>
        <p>
          The CSS Viewport Width <b>"vw"</b> Unit equals to 1% of the width of
          the Viewport (browser window size).
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  width: 100vw;
}`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The width <b>100vw</b> sets an HTML element to the entire width of
            the Viewport (browser window size).
          </p>
        </div>
        <CodeBlock
          language="css"
          code={`.full-height { height: 100vh; }
.full-width { width: 100vw; }`}
        />
        <div
          style={{
            height: "100px",
            background: "linear-gradient(#3498db, #2ecc71)",
            margin: "1rem 0",
            borderRadius: "8px",
          }}
        ></div>
        <p>1vh = 1% of viewport height | 1vw = 1% of viewport width</p>
      </section>

      {/* Reusability */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          Reusability
        </h2>

        <h3>1. Reusability of CSS Rulesets</h3>
        <p>
          If we want the same style for multiple HTML elements, we can write the
          CSS Ruleset once and use it for different HTML elements.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  width: 138px;
  height: 36px;
  border-width: 0px;
  border-radius: 10px;
}`}
        />

        <CodeBlock
          language="html"
          code={`<button class="button">Get Started</button>
<button class="button">Visit Now</button>`}
        />

        <h3>2. Multiple class names as an HTML attribute value</h3>
        <p>
          We can provide multiple class names separated by space as a value to
          the HTML class attribute.
        </p>

        <p>
          <b>Syntax:</b>
        </p>

        <CodeBlock
          language="html"
          code={`<tag class = "name1 name2 name3 name4 ...">Content</tag>`}
        />

        <p>HTML attribute value: name1 name2 name3 name4 ...</p>
        <p>class names: name1, name2, name3, and name4</p>

        <CodeBlock
          language="css"
          code={`.button {
  width: 138px;
  height: 36px;
  border-width: 0px;
  border-radius: 10px;
}
.button-green {
  background-color: #8cc63f;
}`}
        />

        <CodeBlock
          language="html"
          code={`<button class="button button-green">Get Started</button>`}
        />
      </section>

      {/* Bootstrap */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #9b59b6",
            paddingBottom: "0.5rem",
          }}
        >
          Bootstrap
        </h2>
        <p>
          Bootstrap is a large collection of predefined reusable Code Snippets
          written in HTML, CSS, and Javascript. The Code Snippets include
          Buttons, Cards, Carousels, etc.
        </p>
        <h3>How to use Bootstrap?</h3>
        <p>
          To use the Code Snippets provided by Bootstrap, we need to add the
          below piece of code within the HTML head element. We call it
          <b> BootstrapCDN</b>.
        </p>
        <h3>Bootstrap 4.0 CDN</h3>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`}
        />
        <h3>Bootstrap 5.0 CDN</h3>
        <CodeBlock
          language="html"
          code={`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>`}
        />
      </section>

      {/* Flexbox */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #e67e22",
            paddingBottom: "0.5rem",
          }}
        >
          Bootstrap Flexbox
        </h2>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-center">
  <div>Centered Content</div>
</div>`}
        />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e67e22", color: "white" }}>
              <th>Class</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>d-flex</code>
              </td>
              <td>Flex container</td>
            </tr>
            <tr>
              <td>
                <code>flex-row</code>
              </td>
              <td>Horizontal (default)</td>
            </tr>
            <tr>
              <td>
                <code>flex-column</code>
              </td>
              <td>Vertical</td>
            </tr>
            <tr>
              <td>
                <code>justify-content-center</code>
              </td>
              <td>Center align</td>
            </tr>
            <tr>
              <td>
                <code>justify-content-between</code>
              </td>
              <td>Space between</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Carousel & Embed */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #c0392b",
            paddingBottom: "0.5rem",
          }}
        >
          Bootstrap Carousel & YouTube Embed
        </h2>
        <p>Change image src and video ID</p>
        <CodeBlock
          language="html"
          code={`<div class="carousel slide" data-ride="carousel" id="carouselExample">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="tajmahal-c1-img.png" />
    </div>
  </div>
</div>`}
        />

        <h3>YouTube Embed</h3>
        <CodeBlock
          language="html"
          code={`<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/49HTIoCccDY?rel=0"></iframe>
</div>`}
        />
      </section>

      {/* One Solutions UI Kit */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #34495e",
            paddingBottom: "0.5rem",
          }}
        >
          One Solutions UI Kit
        </h2>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Zorvixe/zorvixe-ui-kit/dist/zorvixe-ui-kit.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Zorvixe/zorvixe-ui-kit/dist/zorvixe-ui-kit.js"></script>`}
        />
        <p>
          Must be just before <code>&lt;/body&gt;</code>
        </p>
        <p>
          Uses <code>display('sectionId')</code> function
        </p>
      </section>

      {/* Tips & Best Practices */}
      <section
        style={{
          marginBottom: "4rem",
          background: "#2c3e50",
          color: "white",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <h2
          style={{ borderBottom: "4px solid #ecf0f1", paddingBottom: "0.5rem" }}
        >
          Pro Tips
        </h2>
        <ul style={{ fontSize: "1.1rem" }}>
          <li>HTML Image → when image is content</li>
          <li>CSS Background → when content is over image</li>
          <li>Padding → inside element | Margin → outside</li>
          <li>Cloudinary → free image hosting</li>
          <li>VS Code → best editor</li>
        </ul>
      </section>

      {/* Continue Button */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
          style={{
            padding: "1.2rem 3.5rem",
            fontSize: "1.4rem",
            backgroundColor: isSubtopicCompleted ? "#7f8c8d" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: isSubtopicCompleted ? "not-allowed" : "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            transition: "all 0.4s",
          }}
        >
          {isSubtopicCompleted ? "Completed" : "Mark as Complete & Continue"}
        </button>
      </div>
    </div>
  );
};

export default Static_Summary_CS;
