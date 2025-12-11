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

        <h3>1. Heading, Paragraph, Button, Div</h3>
        <CodeBlock
          language="html"
          code={`<h1>Expolre Paradise</h1>
<p>Forgetable Memories wherever you want to go</p>
<button>Explore Places</button>
<div>
  <h1>Expolre Paradise</h1>
  <p>Forgetable Memories</p>
  <button>Explore Places</button>
</div>`}
        />

        <h3>2. Image Element</h3>
        <CodeBlock
          language="html"
          code={`<img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765392869/paris_1_zckrjw.avif" />`}
        />
        <p>
          <strong>src</strong> → Image URL
        </p>

        <h3>3. Anchor Element</h3>
        <CodeBlock
          language="html"
          code={`<a href="https://www.ccbp.in/">Explore Places</a>`}
        />
        <CodeBlock
          language="html"
          code={`<a href="#section1">Go to Section 1</a>
<div id="section1">Section 1</div>`}
        />
        <CodeBlock
          language="html"
          code={`<a href="https://www.ccbp.in/" target="_blank">Open in new tab</a>`}
        />

        <h3>4. Void Elements</h3>
        <CodeBlock
          language="html"
          code={`<img src="..." />
<br />
<hr />`}
        />

        <h3>5. Lists</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <h4>Unordered List</h4>
            <CodeBlock
              language="html"
              code={`<ul>
  <li>Painting</li>
  <li>Reading Books</li>
</ul>`}
            />
            <p
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              Painting
              <br />
              Reading Books
            </p>
          </div>
          <div>
            <h4>Ordered List</h4>
            <CodeBlock
              language="html"
              code={`<ol>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ol>`}
            />
            <p
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              1. HTML
              <br />
              2. CSS
              <br />
              3. JavaScript
            </p>
          </div>
        </div>
        <CodeBlock
          language="css"
          code={`.unordered-square-list { list-style-type: square; }
.ordered-lower-roman-list { list-style-type: lower-roman; }`}
        />
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
        <ul style={{ fontSize: "1.1rem" }}>
          <li>
            <b
              style={{
                textAlign: "center",
                color: "#ffffff",
                backgroundColor: "#25b1cc",
                fontFamily: "Roboto",
                fontSize: "16px",
                borderRadius: "10px",
                fontWeight: "bold",
                padding: "6px",
              }}
            >
              Home Page
            </b>{" "}
            <strong>id:</strong> Unique →{" "}
            <code>&lt;div id="section-1" data-section data-default&gt;</code>{" "}
            (One Solutions UI Kit needs <code>section</code> prefix)
          </li>
          <li>
            <b
              style={{
                textAlign: "center",
                color: "#ffffff",
                backgroundColor: "#25b1cc",
                fontFamily: "Roboto",
                fontSize: "16px",
                borderRadius: "5px",
                fontWeight: "bold",
                padding: "6px",
              }}
            >
              {" "}
              Other Pages
            </b>{" "}
            <strong>id:</strong> Unique →{" "}
            <code>&lt;div id="section-1" data-section&gt;</code> (One Solutions
            UI Kit needs <code>section</code> prefix)
          </li>
          <li>
            <strong>onclick:</strong> <code>onclick="display('section-3')"</code>
          </li>
          <li>
            <strong>src, href, target="_blank"</strong>
          </li>
        </ul>
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
          CSS Text Properties
        </h2>
        <CodeBlock
          language="css"
          code={`selector {
  text-align: center;
  color: #25b1cc;
  font-family: "Roboto";
  font-size: 36px;
  font-style: italic;
  font-weight: bold;
  text-decoration: underline;
}`}
        />

        <h3>Colors</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            "#ffa500",
            "#ff0000",
            "#0000ff",
            "#008000",
            "#012d36",
            "#25b1cc",
          ].map((c) => (
            <div
              key={c}
              style={{
                background: c,
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
                minWidth: "100px",
                textAlign: "center",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* CSS Background & Box Properties */}
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
            borderBottom: "4px solid #f39c12",
            paddingBottom: "0.5rem",
          }}
        >
          Background & Box Properties
        </h2>
        <CodeBlock
          language="css"
          code={`.card {
  background-color: lightblue;
  background-image: url("ocean.jpg");
  background-size: cover;
  height: 200px;
  width: 250px;
  border-width: 2px;
  border-style: solid;
  border-color: orange;
  border-radius: 20px;
  padding: 20px;
  margin: 15px;
}`}
        />
        <p>
          <strong>border-style required</strong> for border to show!
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
            borderBottom: "4px solid #8e44ad",
            paddingBottom: "0.5rem",
          }}
        >
          Viewport Units
        </h2>
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
            borderBottom: "4px solid #16a085",
            paddingBottom: "0.5rem",
          }}
        >
          Reusability
        </h2>
        <CodeBlock
          language="html"
          code={`<button class="button button-green">Explore Places</button>`}
        />
        <CodeBlock
          language="css"
          code={`.button { width: 138px; height: 36px; border-radius: 10px; }
.button-green { background-color: #8cc63f; }`}
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
          Bootstrap 4.5 CDN
        </h2>
        <CodeBlock
          language="html"
          code={`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>`}
        />

        <h3>Buttons</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-outline-success">Outline</button>
          <button className="btn btn-danger">Danger</button>
        </div>

        <h3>Text & BG Colors</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          <span className="text-primary">text-primary</span>
          <span className="bg-warning text-white p-2">bg-warning</span>
        </div>
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
