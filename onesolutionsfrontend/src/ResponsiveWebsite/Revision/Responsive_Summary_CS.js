import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const Responsive_Summary_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
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
        background: "#f8f9fa",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50", fontSize: "30px" }}>
        Responsive Summary Cheat Sheet
      </h1>

      {/* Bootstrap Grid System */}
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
          Bootstrap Grid System
        </h2>

        <p>
          Bootstrap Grid System is a collection of reusable code snippets to
          create responsive layouts. It is made up of <b>containers</b>,{" "}
          <b>rows</b>, and
          <b>columns</b>.
        </p>

        <p>
          It uses a <b>12 column system</b> for layouting. We can create up to
          12 columns across the page.
        </p>

        <h3>1. Container</h3>

        <p>The purpose of a container is to hold rows and columns.</p>

        <CodeBlock language="html" code={`<div class="container"></div>`} />

        <p>
          Here, the container is a "div" element with the Bootstrap class name
          "container".
        </p>

        <h3>2. Row</h3>

        <p>The purpose of a row is to wrap all the columns.</p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row"></div>
</div>`}
        />

        <p>
          Here, the row is a "div" element with the Bootstrap class name "row".
        </p>

        <h3>3. Column</h3>

        <p>
          We should place the columns inside a row and the content inside a
          column.
        </p>

        <p>
          We can specify the number of columns our content should occupy in any
          device. The number of columns we specify should be a number in the
          range of "1" to "12".
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      I'm your content inside the grid!
    </div>
  </div>
</div>`}
        />

        <p>
          Here, the column is a "div" element with the Bootstrap class name
          "col-12".
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            If Bootstrap class name is "col-12", it occupies the entire width
            available inside the row.
          </p>
          <p>
            The Bootstrap class names "col-*" indicates the number of columns
            you would like to use out of the possible 12 columns per row. For
            example, "col-1", "col-5", etc.
          </p>
        </div>

        <h3>4. Column Wrapping</h3>

        <p>
          When we place more than 12 grid columns in a single row, the extra
          grid columns will wrap in a new line.
        </p>
      </section>

      {/* Responsive Breakpoints */}

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
          Responsive Breakpoints
        </h2>

        <h3>1. The Layout at different Breakpoints</h3>

        <p>
          Bootstrap provides different{" "}
          <b>Bootstrap Grid Column class name prefixes </b>
          for Five Responsive Tiers (Responsive Breakpoints).
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Device Size (Width)</th>
              <th>Class Name Prefix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra small devices</td>
              <td>&lt;576px</td>
              <td>col-</td>
            </tr>
            <tr>
              <td>Small devices</td>
              <td>&gt;=576px</td>
              <td>col-sm-</td>
            </tr>
            <tr>
              <td>Medium devices</td>
              <td>&gt;=768px</td>
              <td>col-md-</td>
            </tr>
            <tr>
              <td>Large devices</td>
              <td>&gt;=992px</td>
              <td>col-lg-</td>
            </tr>
            <tr>
              <td>Extra large devices</td>
              <td>&gt;=1200px</td>
              <td>col-xl-</td>
            </tr>
          </tbody>
        </table>

        <p>
          If we define the behaviour of the Bootstrap Grid Column in a
          particular device, similar behaviour is guaranteed in all devices with
          larger sizes.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-6">
      <h1 class="heading">Explore Paradise</h1>
      <p>The Explore Paradise is on the southern bank of the river Yamuna.</p>
    </div>
  </div>
</div>`}
        />

        <h3>1.1 Class names in combination</h3>

        <p>
          We can use a combination of different Bootstrap class names for each
          Bootstrap Grid Column.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Bootstrap follows <b>Mobile First Approach</b>.
          </p>
          <p>
            First, design the Layout of a mobile version, and this will be
            adopted by devices with larger sizes.
          </p>
        </div>
      </section>

      {/* CSS Box Properties*/}
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

        <h3>1. Margin</h3>

        <p>
          We can get spacing between the two HTML elements with the CSS Box
          property "margin".
        </p>

        <p>
          To get space only on one particular side, we use{" "}
          <b>Margin Variants</b>.
        </p>

        <ul>
          <li>margin-top</li>
          <li>margin-right</li>
          <li>margin-bottom</li>
          <li>margin-left</li>
        </ul>

        <p>
          We can align HTML Block-level elements horizontally using CSS "margin"
          property.
        </p>

        <p>
          Apart from values that are specified in pixels, it also accepts "auto"
          keyword as a value.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            If we specify the CSS "text-align" property to the HTML Block-level
            element, it aligns the text or HTML Inline elements inside it.
          </p>
        </div>

        <h3>1.1 Auto Value</h3>

        <p>
          The child element will be horizontally centred inside the HTML
          container element.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="navbar-nav nav-items-center">
  <a class="nav-link active" href="#">
    Home
    <span class="sr-only">(current)</span>
  </a>
  <a class="nav-link" href="#">About Me</a>
  <a class="nav-link" href="#">Projects</a>
  <a class="nav-link" href="#">Testimonials</a>
</div>`}
        />

        <CodeBlock
          language="css"
          code={`@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

.nav-items-center {
  margin: auto;
}`}
        />

        <h3>1.2 Auto Value with Margin Variants</h3>

        <ul>
          <li>
            Using "auto" as a value for the CSS "margin-right" property takes up
            all the available space, and the element gets aligned to the left.
          </li>
          <li>
            Using "auto" as a value for the CSS "margin-left" property takes up
            all the available space, and the element gets aligned to the right.
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="navbar-nav nav-items-right">
  <a class="nav-link active" href="#">
    Home <span class="sr-only">(current)</span>
  </a>
  <a class="nav-link" href="#">About Me</a>
  <a class="nav-link" href="#">Projects</a>
  <a class="nav-link" href="#">Testimonials</a>
</div>`}
        />

        <CodeBlock
          language="css"
          code={`@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

.nav-items-right {
  margin-left: auto;
}`}
        />
      </section>

      {/* Bootstrap Utilities */}
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
          Bootstrap Utilities
        </h2>

        <h3>1. Bootstrap Spacing Utilities</h3>

        <h4>1.1 Margin</h4>

        <table border="1" style={{ borderCollapse: "collapse", width: "75%" }}>
          <thead>
            <tr>
              <th>CSS Margin property</th>
              <th>Bootstrap class name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>margin</td>
              <td>m-*</td>
            </tr>
            <tr>
              <td>margin-top</td>
              <td>mt-*</td>
            </tr>
            <tr>
              <td>margin-right</td>
              <td>mr-*</td>
            </tr>
            <tr>
              <td>margin-bottom</td>
              <td>mb-*</td>
            </tr>
            <tr>
              <td>margin-left</td>
              <td>ml-*</td>
            </tr>
          </tbody>
        </table>

        <p>
          The asterisk ("*") symbol can be any number in the range of 0 to 5.
          For example, "m-5", "mr-2", "mb-3", etc.
        </p>

        <h4>1.1.1 Margin Values</h4>

        <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>

        <p>The spacer is a variable and has a value of 16 pixels by default.</p>

        <p>For example,</p>

        <ul>
          <li>"mb-3" = 1 * 16px = 16px</li>
          <li>"m-5" = 3 * 16px = 48px</li>
        </ul>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Avoid using CSS "margin-left" and "margin-right" properties for{" "}
            <b>Bootstrap Grid Columns</b>. It disturbs the Bootstrap Grid System
            and gives unexpected results.
          </p>
        </div>

        <p>
          Apart from the numbers 0-5, the margin also has the below Bootstrap
          class names.
        </p>

        <ul>
          <li>"m-auto"</li>
          <li>"ml-auto"</li>
          <li>"mr-auto"</li>
        </ul>

        <h4>1.2 Padding</h4>

        <table border="1" style={{ borderCollapse: "collapse", width: "75%" }}>
          <thead>
            <tr>
              <th>CSS Padding property</th>
              <th>Bootstrap class name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>padding</td>
              <td>p-*</td>
            </tr>
            <tr>
              <td>padding-top</td>
              <td>pt-*</td>
            </tr>
            <tr>
              <td>padding-right</td>
              <td>pr-*</td>
            </tr>
            <tr>
              <td>padding-bottom</td>
              <td>pb-*</td>
            </tr>
            <tr>
              <td>padding-left</td>
              <td>pl-*</td>
            </tr>
          </tbody>
        </table>

        <p>
          The asterisk ("*") symbol can be any number in the range of 0 to 5.
          For example, "p-3", "pr-1", "pb-5", etc.
        </p>

        <h4>1.2.1 Padding Values</h4>

        <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>

        <p>The spacer is a variable and has a value of 16 pixels by default.</p>

        <p>For example,</p>

        <ul>
          <li>"p-1" = 0.25 * 16px = 4px</li>
          <li>"pt-4" = 1.5 * 16px = 24px</li>
        </ul>

        <h3>2. Bootstrap Background Color Utilities</h3>

        <p>
          Values: bg-primary, bg-secondary, bg-success, bg-info, bg-warning,
          bg-light, bg-dark, bg-white, bg-danger
        </p>

        <h3>3 Bootstrap Sizing Utilities</h3>

        <h4>3.1 Percentage</h4>

        <p>
          You can use the below Bootstrap class names to specify the width of an
          HTML element in percentage.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>CSS property and value</th>
              <th>Bootstrap class name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width: 25%</td>
              <td>w-25</td>
            </tr>
            <tr>
              <td>width: 50%</td>
              <td>w-50</td>
            </tr>
            <tr>
              <td>width: 75%</td>
              <td>w-75</td>
            </tr>
            <tr>
              <td>width: 100%</td>
              <td>w-100</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<img
  src="https://d1tgh8fmlzexmh.cloudfront.net/onesolutions-responsive-website/em-ginger-fried-img.png"
  class="menu-item-image w-100"
/>`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            By default, the height of the image automatically adjusts when we
            alter the width.
          </p>
        </div>

        <h3>4. Bootstrap Shadow</h3>

        <p>
          To apply shadows to HTML elements, you can use the below Bootstrap
          class names.
        </p>

        <p>Bootstrap class names: shadow-none, shadow-sm, shadow, shadow-lg</p>

        <CodeBlock
          language="html"
          code={`<div class="shadow menu-item-card p-3 mb-3">
  <img
    src="https://d1tgh8fmlzexmh.cloudfront.net/onesolutions-responsive-website/em-ginger-fried-img.png"
    class="menu-item-image w-100"
  />
  <h1 class="menu-card-title">Non-Veg Starters</h1>
  <a href="" class="menu-item-link">
    View All
    <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="#d0b200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
      />
    </svg>
  </a>
</div>`}
        />

        <h3>5. Bootstrap Flex Utilities</h3>

        <h4>5.1 Order</h4>

        <p>
          The Bootstrap Order class names are used to change the visual order of
          the flex items that appear inside the Flex Container.
        </p>

        <p>For example, "order-1", "order-2", "order-3", etc.</p>

        <p>
          We can use any number in the range of "0" to "12" for a bootstrap
          "order" class name.
        </p>

        <p>
          These class names are responsive. So, you can set the order by
          breakpoint.
        </p>

        <p>For example, "order-1", "order-md-2", "order-lg-3", etc.</p>

        <h3>6. Bootstrap Display Utilities</h3>

        <p>
          We can hide and show HTML elements responsively for each screen size
          with the Display utilities.
        </p>

        <p>
          We can hide HTML Elements using "d--none" class names, where ""
          represents breakpoints ("sm", "md", "lg", "xl")
        </p>

        <p>For example, "d-none", "d-sm-none", "d-md-none", etc.</p>

        <CodeBlock
          language="html"
          code={`<div class="my-container">
  <p class="box">Box 1</p>
  <p class="box d-none">Box 2</p>
  <a href="" class="d-md-none">wikipedia</a>
</div>`}
        />

        <p>
          Based on the type of HTML element, we can use "d--inline" and
          "d--block" class names to show HTML element.
        </p>

        <p>For example, "d-block", "d-md-inline", "d-lg-block", etc.</p>

        <h3>7. Bootstrap Position Utilities</h3>

        <h4>7.1 Fixed Top</h4>

        <p>
          The bootstrap class name "fixed-top" positions an HTML element at the
          top of the viewport irrespective of the scrolling.
        </p>

        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">...</nav>`}
        />

        <h4>7.2 Fixed Bottom</h4>

        <p>
          The bootstrap class name "fixed-bottom" positions an HTML element at
          the bottom of the viewport irrespective of the scrolling.
        </p>

        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-bottom">...</nav>`}
        />
      </section>

      {/* Bootstrap Components */}
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
          Bootstrap Components
        </h2>

        <h3>1. Bootstrap Navbar</h3>

        <p>
          A Navbar is a navigation header that is placed at the top of the page.
          With Bootstrap, a Navbar can extend or collapse, depending on the
          device size.
        </p>

        <h4>1.1. HTML Nav element</h4>

        <p>
          The HTML "nav" element is a container element similar to the HTML
          "div" element. We use the HTML "nav" element to add a Navbar to our
          website.
        </p>

        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-light"></nav>`}
        />

        <h4>1.2. Nav Items inside Navbar</h4>

        <CodeBlock
          language="html"
          code={`<a class="nav-link active" href="#">
  Home
  <span class="sr-only">(current)</span>
</a>
<a class="nav-link" href="#">Features</a>
<a class="nav-link" href="#">Pricing</a>
<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
  Disabled
</a>`}
        />

        <h4>1.3. Nav link</h4>

        <CodeBlock
          language="html"
          code={`<a class="nav-link" href="#">Features</a>`}
        />

        <h4>1.4 Adding Links to the Sections</h4>

        <ul>
          <li>Adding id to the section to which we want to navigate.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="wcu-section pt-5 pb-5" id="wcuSection">...</div>`}
        />

        <ul>
          <li>Providing id as "href" Attribute value to the Nav Item.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<a class="nav-link active" id="navItem1" href="#wcuSection">
  Why Choose Us?
  <span class="sr-only">(current)</span>
</a>`}
        />

        <h3>2. Modal</h3>

        <p>Example:</p>

        <CodeBlock
          language="html"
          code={`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* Bootstrap Containers */}
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
          Bootstrap Containers
        </h2>

        <h3>1. Container</h3>

        <p>
          The Bootstrap class name <b>"container"</b> provides us default left
          and right spacings starting from smaller devices for a better user
          experience. It has one fixed width for each breakpoint in Bootstrap
          (extra small, small, medium, large, and extra large).
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Device Size (Width)</th>
              <th>Container Max Width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra small devices</td>
              <td>&lt; 576px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Small devices</td>
              <td>&gt;= 576px</td>
              <td>540px</td>
            </tr>
            <tr>
              <td>Medium devices</td>
              <td>&gt;= 768px</td>
              <td>720px</td>
            </tr>
            <tr>
              <td>Large devices</td>
              <td>&gt;= 992px</td>
              <td>960px</td>
            </tr>
            <tr>
              <td>Extra large devices</td>
              <td>&gt;= 1200px</td>
              <td>1140px</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      <h1>Explore Paradise</h1>
      <p>
        The Explore Paradise is an ivory-white marble mausoleum on the southern
        bank of the river Yamuna in the Indian city of Agra.
      </p>
    </div>
  </div>
</div>`}
        />

        <h3>2. Fluid Container</h3>

        <p>
          The Bootstrap class name <b>"container-fluid"</b> is a full width
          container, spanning the entire width of the viewport.
        </p>

        <p>
          If we don’t need left and right spacings, we can use the Bootstrap
          class name
          <b> "container-fluid"</b> instead of <b>"container"</b>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <h1>Explore Paradise</h1>
      <p>
        The Explore Paradise is an ivory-white marble mausoleum on the southern
        bank of the river Yamuna in the Indian city of Agra.
      </p>
    </div>
  </div>
</div>`}
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
            borderBottom: "4px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          HTML Elements
        </h2>

        <p>In general, HTML elements can be divided into two categories.</p>

        <ul>
          <li>Block-level Elements</li>
          <li>Inline Elements</li>
        </ul>

        <h3>1. Block-level Elements</h3>

        <p>
          These elements always start in a new line and take up the{" "}
          <b>full width </b>
          available. So, an HTML Block-level element occupies the entire
          horizontal space of its parent element.
        </p>

        <p>
          For example, the HTML "h1" element, "p" element, "div" element, etc.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 class="heading">The seven wonders of the world</h1>
<p class="paragraph">The Explore Paradise is one of the seven wonders of the world</p>`}
        />

        <h3>2. Inline Elements</h3>

        <p>
          These elements do not start in a new line and only take up as much
          width as necessary.
        </p>

        <p>
          For example, the HTML "button" element, "img" element, "a" element,
          etc.
        </p>

        <CodeBlock
          language="html"
          code={`<imgHH
  src="https://d1tgh8fmlzexmh.cloudfront.net/onesolutions-static-website/mysore-palace2-img.png"
  class="image"
/>
<img
  src="https://d1tgh8fmlzexmh.cloudfront.net/onesolutions-static-website/varanasi1-img.png"
  class="image"
/>
<p class="paragraph">
  The <a class="link-text" href="https://en.wikipedia.org/wiki/Taj_Mahal">Explore Paradise</a>
  is one of the seven wonders of the world.
</p>`}
        />

        <h3>3. HTML Span Element</h3>

        <p>
          The HTML "span" element is a <b>generic inline container</b> element
          which is mainly used for styling text in HTML Elements.
        </p>

        <CodeBlock
          language="html"
          code={`<p class="wcu-card-description">
  Food Coupons & Offers upto
  <span class="offers">50% OFF</span>
  and Exclusive Promo Codes on All Online Food Orders.
</p>`}
        />

        <CodeBlock
          language="css"
          code={`.offers {
  color: #323f4b;
  font-style: italic;
  font-weight: 600;
}`}
        />
      </section>

      {/* Css Selectors */}
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
          CSS Selectors
        </h2>

        <p>
          The CSS Selectors are used to select the HTML Elements that we want to
          style.
        </p>

        <p>The different types of CSS Selectors are:</p>

        <ul>
          <li>Simple Selectors</li>
          <li>Compound Selectors</li>
          <li>Complex Selectors and many more</li>
        </ul>

        <h3>Simple Selectors</h3>

        <ul>
          <li>Class Selector</li>
          <li>ID Selector</li>
          <li>Type (tag name) Selector</li>
          <li>Attribute Selector</li>
          <li>Universal Selector</li>
          <li>Pseudo-class</li>
        </ul>

        <h3>1. Class Selector</h3>

        <p>
          The CSS Class Selector selects all the HTML elements that have a given
          CSS class selector as their class attribute value. It consists of a
          dot ("."), followed by the class name of the HTML element.
        </p>

        <CodeBlock
          language="html"
          code={`<p class="paragraph">The population of India is around 138 crores.</p>`}
        />

        <CodeBlock
          language="css"
          code={`.paragraph {
  color: blue;
}`}
        />

        <p>
          Here, the CSS class selector is <strong>".paragraph"</strong>. So, it
          selects all the HTML elements that have an HTML attribute name{" "}
          <strong>"class"</strong>, and its value <strong>"paragraph"</strong>.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            There can be <b>**more than one**</b> HTML element with the same
            class name in the HTML document.
          </p>
        </div>

        <h3>2. ID Selector</h3>

        <p>
          The CSS ID selector selects an HTML element based on its ID attribute
          value. It consists of a hash ("#"), followed by the ID of the HTML
          element.
        </p>

        <CodeBlock
          language="html"
          code={`<p id="populationParagraph">
  The population of India is around 138 crores.
</p>`}
        />

        <CodeBlock
          language="css"
          code={`#populationParagraph {
  color: blue;
}`}
        />

        <p>
          Here, the CSS ID selector is <strong>"#populationParagraph"</strong>.
          So, it selects the HTML element that has an HTML attribute name{" "}
          <strong>"id"</strong>, and its value{" "}
          <strong>"populationParagraph"</strong>.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            There should be only <b>**one**</b> HTML element with a given ID in
            the entire HTML document. The HTML "id" attribute value doesn't need
            to have the prefix "section" as onesolutions UI Kit is not used.{" "}
          </p>
        </div>

        <h3>3. Type (Tag Name) Selector</h3>

        <p>
          The CSS Type Selector selects all the HTML elements based on their tag
          names ("h1", "p", "div", etc.).
        </p>

        <CodeBlock
          language="html"
          code={`<p>The population of India is around 138 crores.</p>`}
        />

        <CodeBlock
          language="css"
          code={`p {
  color: blue;
}`}
        />

        <p>
          Here, the CSS Type selector is <strong>"p"</strong>. So, it selects
          all the HTML elements that have a tag name <strong>"p"</strong>.
        </p>
      </section>

      {/* CSS Building Blocks */}
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
          CSS Building Blocks
        </h2>

        <p>
          In CSS, the styles that are applied to HTML elements depend on three
          fundamental concepts.
        </p>

        <ul>
          <li>Inheritance</li>
          <li>Specificity</li>
          <li>Cascade</li>
        </ul>

        <h3>1. CSS Inheritance</h3>

        <p>
          The mechanism through which the value of certain CSS properties is
          passed on from parent elements to child elements is called{" "}
          <strong>Inheritance</strong>.
        </p>

        <h4>1.1 Parent Element</h4>

        <p>
          If the HTML elements are placed inside another HTML element, then the
          outer HTML element is called the <strong>parent element</strong> of
          the HTML elements inside it.
        </p>

        <CodeBlock
          language="html"
          code={`<div>
  <h1>The seven wonders of the world</h1>
  <p>
    The <a href="https://en.wikipedia.org/wiki/Taj_Mahal">Explore Paradise</a>
    is one of the seven wonders of the world.
  </p>
</div>`}
        />

        <p>From the above Code Snippet, we can say:</p>

        <ul>
          <li>
            The HTML <strong>"div"</strong> element is the parent element of the
            HTML
            <strong>"h1"</strong> and <strong>"p"</strong> elements.
          </li>
          <li>
            The HTML <strong>"p"</strong> element is the parent element of the
            HTML
            <strong>"a"</strong> element.
          </li>
        </ul>

        <h4>1.2 Child Element</h4>

        <p>
          An HTML element that is directly inside the parent element is called
          the
          <strong> child element</strong> of that parent element.
        </p>

        <CodeBlock
          language="html"
          code={`<div>
  <h1>The seven wonders of the world</h1>
  <p>
    The <a href="https://en.wikipedia.org/wiki/Taj_Mahal">Explore Paradise</a>
    is one of the seven wonders of the world.
  </p>
</div>`}
        />

        <p>From the above Code Snippet, we can say:</p>

        <ul>
          <li>
            The HTML <strong>"h1"</strong> and <strong>"p"</strong> elements are
            the child elements of the HTML <strong>"div"</strong> element.
          </li>
          <li>
            The HTML <strong>"a"</strong> element is the child element of the
            HTML
            <strong>"p"</strong> element.
          </li>
        </ul>

        <p>CSS properties can be categorized into two types:</p>

        <ul>
          <li>Inherited properties</li>
          <li>Non-inherited properties</li>
        </ul>

        <h4>1.3 Inherited Properties</h4>

        <p>
          If the CSS properties applied to the parent element{" "}
          <b>are inherited</b> by the child elements, then they are called{" "}
          <strong>Inherited properties</strong>.
        </p>

        <p>Some of the CSS Inherited Properties are:</p>

        <ul>
          <li>
            <strong>Text related Properties</strong>
            <ul>
              <li>"font-family"</li>
              <li>"font-style"</li>
              <li>"font-weight"</li>
              <li>"text-align"</li>
            </ul>
          </li>
          <li>
            <strong>List related Properties</strong>
            <ul>
              <li>"list-style-type"</li>
            </ul>
          </li>
          <li>"color" property and many more.</li>
        </ul>

        <h4>1.4 Non-inherited Properties</h4>

        <p>
          If the CSS properties applied to the parent element are
          <strong> not inherited</strong> by the child elements, then they are
          called
          <strong> Non-inherited properties</strong>.
        </p>

        <p>Some of the CSS Non-inherited properties are:</p>

        <ul>
          <li>
            <strong>CSS Box Properties</strong>
            <ul>
              <li>"width"</li>
              <li>"height"</li>
              <li>"margin"</li>
              <li>"padding"</li>
              <li>"border-style"</li>
              <li>"border-width"</li>
              <li>"border-color"</li>
              <li>"border-radius"</li>
            </ul>
          </li>
          <li>
            <strong>CSS Background Properties</strong>
            <ul>
              <li>"background-image"</li>
              <li>"background-color"</li>
              <li>"background-size"</li>
            </ul>
          </li>
          <li>"text-decoration" and many more.</li>
        </ul>

        <h3>2. CSS Specificity</h3>

        <p>
          Specificity is how browsers decide which CSS property values are the
          <b> most relevant</b> to an HTML element and, therefore, will be
          applied.
        </p>

        <p>
          The following list of CSS Selectors is in the lowest to highest order
          by specificity.
        </p>

        <ul>
          <li>Type (tag name) Selector</li>
          <li>Class Selector</li>
          <li>ID Selector</li>
        </ul>

        <h4>2.1 Type Selector & Class Selector</h4>

        <p>
          A Class Selector is <b>more specific</b> compared to a Type (tag name)
          Selector as it selects only the HTML elements that have a specific
          class attribute value in the HTML document.
        </p>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            It doesn't overwrite the entire CSS Ruleset but only overwrites the
            CSS properties that are the same.
          </p>
        </div>

        <h4>2.2 Class Selector & ID Selector</h4>

        <p>
          An ID Selector is more specific when compared to a Class Selector as
          we provide a unique ID within the HTML document and it selects only a
          single HTML Element.
        </p>

        <h4>2.3 Inline Styles</h4>

        <p>
          Inline Styles have the highest specificity. They overwrite any other
          styles specified using CSS Selectors.
        </p>

        <h3>3. CSS Cascade</h3>

        <p>
          The source order of CSS Rulesets matters. When two CSS Rulesets have
          equal specificity, the one that comes last in the CSS is applied.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The styles that apply to the HTML Elements are not determined by the
            <strong> **order the classes**</strong> defined in the HTML "class"
            attribute, but instead the order in which they appear in the CSS.
          </p>
        </div>

        <h4>3.1 The !important Exception</h4>

        <p>
          It is a special piece of CSS used to make a particular CSS property
          and value the most specific thing, irrespective of source order and
          specificity.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 class="style-1">About India</h1>`}
        />

        <CodeBlock
          language="css"
          code={`.style-1 {
  color: green;
}

h1 {
  color: orange !important;
}`}
        />

        <p>
          The only way to override a <strong>"!important"</strong> property
          value is to include another <strong>"!important"</strong> property
          value. The added property value should either come later in the order
          or should be of higher specificity.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Always look for a way to use specificity before even considering
            <strong> "!important"</strong>.
          </p>

          <p>
            Only use <strong>"!important"</strong> when you want to override
            foreign CSS (from external libraries, like Bootstrap).
          </p>
        </div>
      </section>

      {/* Style Attribute */}
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
          Style Attribute
        </h2>

        <h3>Inline Styles</h3>

        <p>
          The Inline styles are applied <b>directly</b> to an HTML element. They
          use the HTML
          <strong> "style"</strong> attribute, with CSS property values defined
          within it.
        </p>

        <h4>Syntax:</h4>

        <CodeBlock
          language="html"
          code={`<tag style="property1: value1; property2: value2; ...">
  Content
</tag>`}
        />

        <p>
          An HTML <strong>"style"</strong> attribute value can consist of one or
          more CSS property values.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <p>
            Inline Styles have the <strong>highest specificity</strong>. They
            overwrite any other styles specified using CSS Selectors.
          </p>
        </div>

        <h4>Why Inline Styles are Not Recommended</h4>

        <p>Using Inline Styles is not recommended because:</p>

        <ul>
          <li>Inline Styles are not reusable.</li>
          <li>Writing HTML and CSS separately increases code readability.</li>
        </ul>
      </section>

      {/* Icons*/}
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
          Icons
        </h2>

        <h3>1. Adding Icons</h3>

        <p>
          There are a limited number of icon choices in Bootstrap Icons. Since
          we don’t have the desired icons in Bootstrap Icons, we use
          <strong> Font Awesome Icons</strong>.
        </p>

        <h3>1.1 Font Awesome Icons</h3>

        <p>
          To use the Font Awesome Icons, you need to add the below Font Awesome
          Icons Kit Code in the HTML <strong>"head"</strong> element.
        </p>

        <CodeBlock
          language="html"
          code={`<script
  src="https://kit.fontawesome.com/ac42c3b1f7.js"
  crossorigin="anonymous"
></script>`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <p>
            The CSS Property <strong>"border-radius"</strong> allows you to add
            circular corners to an HTML element. We need to provide the same
            height and width to get circular corners; otherwise, we will get
            elliptical corners.
          </p>
        </div>

        <h3>2. Bootstrap Icons</h3>

        <h4>2.1 How to add the Bootstrap Icons</h4>

        <ul>
          <li>
            Go to{" "}
            <a href="https://icons.getbootstrap.com" target="_blank">
              https://icons.getbootstrap.com
            </a>
            in your web browser. You will find many icons.
          </li>
          <li>Click on the icon you need.</li>
          <li>
            For the icon used in this section, click on
            <strong> "arrow-right-short"</strong>.
          </li>
          <li>Copy the HTML code and paste it.</li>
          <li>
            Change the HTML attributes <strong>"width"</strong>,
            <strong> "height"</strong>, and <strong>"fill"</strong> of the HTML
            <strong> "svg"</strong> element as you need.
          </li>
        </ul>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The HTML <strong>"svg"</strong> element is an HTML inline element.
            We can use it to add icons to our website.
          </p>
        </div>
      </section>
      {/*CSS Colors*/}
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
          CSS Colors
        </h2>

        <h3>Transparent</h3>

        <p>
          The CSS "transparent" keyword represents a fully transparent color.
          This makes the background behind the colored HTML element completely
          visible.
        </p>

        <p>For example, to set a transparent background color:</p>

        <CodeBlock
          language="css"
          code={`.custom-outline-button {
  background-color: transparent;
}`}
        />

        <p>
          This allows you to set the background color of the HTML element to
          transparent so that any background HTML element will show through.
        </p>

        <p>
          Bootstrap also provides you with a class name
          <strong> "bg-transparent"</strong> to set the background color to
          transparent.
        </p>
      </section>

      {/*CSS Gradients*/}
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
          CSS Gradients
        </h2>

        <p>
          A special type of Background Image formed by the transition between
          two or more colors.
        </p>

        <p>There are mainly two types of gradients:</p>

        <ul>
          <li>Linear Gradient</li>
          <li>Radial Gradient</li>
        </ul>

        <h3>1. Linear Gradient</h3>

        <p>
          To create the most basic type of gradient, all you need is to specify
          two colors. You must have at least two colors, but you can have as
          many as you want.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="linear-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.linear-gradient-background {
  height: 100vh;
  background-image: linear-gradient(#2196f3, #f44336);
}`}
        />

        <h4>1.1 Changing Direction</h4>

        <p>
          By default, linear gradients run from top to bottom. You can change
          their transition by specifying a direction.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>to top</td>
              <td>Colors transition (change) from bottom to top</td>
            </tr>
            <tr>
              <td>to bottom</td>
              <td>
                It is a default direction. Colors transition (change) from top
                to bottom
              </td>
            </tr>
            <tr>
              <td>to left</td>
              <td>Colors transition (change) from right to left</td>
            </tr>
            <tr>
              <td>to right</td>
              <td>Colors transition (change) from left to right</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="css"
          code={`.linear-gradient-background {
  background-image: linear-gradient(to right, #2196f3, #f44336);
}`}
        />

        <h4>1.2 Using more than two colors</h4>

        <p>
          You don't have to limit yourself to two colors. You may use as many as
          you like! By default, colors are evenly spaced along the gradient.
        </p>

        <CodeBlock
          language="css"
          code={`.linear-gradient-background-with-more-colors {
  height: 100vh;
  background-image: linear-gradient(red, blue, yellow, orange);
}`}
        />

        <h3>2. Radial Gradient</h3>

        <CodeBlock
          language="html"
          code={`<div class="radial-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.radial-gradient-background {
  height: 100vh;
  background-image: radial-gradient(#2196f3, #f44336);
}`}
        />

        <h4>2.1 Using more than two colors</h4>

        <p>
          You don't have to limit yourself to two colors. You may use as many as
          you like! By default, colors are evenly spaced along the gradient.
        </p>

        <CodeBlock
          language="css"
          code={`.radial-gradient-background-with-more-colors {
  height: 100vh;
  background-image: radial-gradient(red, blue, yellow, orange);
}`}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                height: "120px",
                background: "linear-gradient(to right, #2196f3, #f44336)",
                borderRadius: "8px",
              }}
            ></div>
            <CodeBlock
              language="css"
              code={`background-image: linear-gradient(to right, #2196f3, #f44336);`}
            />
          </div>
          <div>
            <div
              style={{
                height: "120px",
                background: "radial-gradient(circle, #2196f3, #f44336)",
                borderRadius: "8px",
              }}
            ></div>
            <CodeBlock
              language="css"
              code={`background-image: radial-gradient(#2196f3, #f44336);`}
            />
          </div>
        </div>
      </section>

      {/* CSS Units */}
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
          CSS Units
        </h2>

        <h3>Percentage</h3>

        <p>
          To define the size of a Child Element relative to its Parent Element,
          we can use Percentages.
        </p>
      </section>

      {/* Continue Button */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
          style={{
            padding: "1rem 3rem",
            fontSize: "1.3rem",
            backgroundColor: isSubtopicCompleted ? "#95a5a6" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: isSubtopicCompleted ? "not-allowed" : "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            transition: "all 0.3s",
          }}
        >
          {isSubtopicCompleted ? "Completed" : "Mark as Complete & Continue"}
        </button>
      </div>
    </div>
  );
};

export default Responsive_Summary_CS;
