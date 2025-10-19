import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Static_Summary_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>📘 Static Summary Cheat Sheet</h1>
      

      {/* 1. HTML Basic Structure */}
      <section>
        <h2>1. HTML Basic Structure</h2>
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

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>
        <ul>
          <li>
            <strong>Heading Element:</strong> <code>&lt;h1&gt;Tourism&lt;/h1&gt;</code>
          </li>
          <li>
            <strong>Paragraph Element:</strong>{" "}
            <code>&lt;p&gt;Plan your trip wherever you want to go&lt;/p&gt;</code>
          </li>
          <li>
            <strong>Button Element:</strong>{" "}
            <code>&lt;button&gt;Get Started&lt;/button&gt;</code>
          </li>
          <li>
            <strong>Container Element:</strong>
            <CodeBlock
              language="html"
              code={`<div>
  <h1>Tourism</h1>
  <p>Plan your trip wherever you want to go</p>
  <button>Get Started</button>
</div>`}
            />
          </li>
          <li>
            <strong>Image Element:</strong> <code>&lt;img src="IMAGE_URL"/&gt;</code>
          </li>
          <li>
            <strong>Anchor Element:</strong>{" "}
            <code>&lt;a href="URL"&gt;Content&lt;/a&gt;</code>
          </li>
        </ul>
      </section>

      {/* 3. Void Elements */}
      <section>
        <h2>3. Void Elements</h2>
        <p>These have only a start tag, no end tag.</p>
        <CodeBlock language="html" code={`<img src="..."/>`} />
      </section>

      {/* 4. Line Break */}
      <section>
        <h2>4. Line Break Element</h2>
        <CodeBlock
          language="html"
          code={`<p>
  Twinkle, twinkle, little star, <br />
  How I wonder what you are!
</p>`}
        />
      </section>

      {/* 5. Horizontal Rule */}
      <section>
        <h2>5. Horizontal Rule Element</h2>
        <CodeBlock
          language="html"
          code={`<h1 class="heading">Twinkle Twinkle Little Star</h1>
<hr />
<p>Twinkle, twinkle, little star.</p>`}
        />
      </section>

      {/* 6. Lists */}
      <section>
        <h2>6. HTML Lists</h2>
        <p>Two types: Unordered List (ul) and Ordered List (ol)</p>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>Painting</li>
  <li>Reading Books</li>
</ul>`}
        />
        <CodeBlock
          language="html"
          code={`<ol>
  <li>HTML</li>
  <li>CSS</li>
</ol>`}
        />
      </section>

      {/* 7. Attributes */}
      <section>
        <h2>7. HTML Attributes</h2>
        <ul>
          <li><code>id</code> — unique identifier for an element.</li>
          <li><code>onclick</code> — triggers when element is clicked.</li>
          <li><code>src</code> — specifies the image source.</li>
          <li><code>href</code> — specifies hyperlink reference.</li>
          <li><code>target="_blank"</code> — opens link in new tab.</li>
        </ul>
      </section>

      {/* 8. CSS Syntax */}
      <section>
        <h2>8. CSS Syntax</h2>
        <CodeBlock
          language="css"
          code={`selector {
  property: value;
}`}
        />
      </section>

      {/* 9. Text Properties */}
      <section>
        <h2>9. CSS Text Properties</h2>
        <ul>
          <li>text-align: center | left | right</li>
          <li>color: red | #ff0000 | rgb(0,0,0)</li>
          <li>font-family: "Roboto"</li>
          <li>font-size: 36px</li>
          <li>font-style: italic</li>
          <li>font-weight: bold</li>
          <li>text-decoration: underline | overline | line-through</li>
        </ul>
      </section>

      {/* 10. Background Properties */}
      <section>
        <h2>10. CSS Background Properties</h2>
        <ul>
          <li><strong>background-color</strong>: lightblue</li>
          <li><strong>background-image</strong>: url("...")</li>
          <li><strong>background-size</strong>: cover</li>
        </ul>
      </section>

      {/* 11. Box Properties */}
      <section>
        <h2>11. CSS Box Properties</h2>
        <ul>
          <li>height: 200px</li>
          <li>width: 250px</li>
          <li>border-width: 2px</li>
          <li>border-radius: 20px</li>
          <li>border-color: orange</li>
          <li>border-style: dashed</li>
          <li>padding: 10px</li>
          <li>margin: 10px</li>
        </ul>
      </section>

      {/* 12. Viewport Units */}
      <section>
        <h2>12. Viewport Units</h2>
        <p>
          <strong>vh</strong> = 1% of viewport height | <strong>vw</strong> = 1% of viewport width
        </p>
      </section>

      {/* 13. Reusability */}
      <section>
        <h2>13. Reusability</h2>
        <ul>
          <li>Same class can be applied to multiple elements.</li>
          <li>Multiple class names can be added to class attribute.</li>
        </ul>
      </section>

      {/* 14. Bootstrap */}
      <section>
        <h2>14. Bootstrap</h2>
        <p>Include CDN inside head:</p>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`}
        />
      </section>

      {/* 15. Flexbox with Bootstrap */}
      <section>
        <h2>15. Flexbox with Bootstrap</h2>
        <ul>
          <li><code>d-flex</code> — flex container</li>
          <li><code>flex-row</code> | <code>flex-column</code></li>
          <li><code>justify-content-start</code>, <code>center</code>, <code>end</code>, <code>between</code></li>
        </ul>
      </section>

      {/* 16. Predefined Styles */}
      <section>
        <h2>16. Predefined Bootstrap Styles</h2>
        <ul>
          <li>Buttons: btn, btn-primary, btn-outline-primary</li>
          <li>Text colors: text-primary, text-success...</li>
          <li>Background colors: bg-primary, bg-warning...</li>
        </ul>
      </section>

      {/* 17. Components */}
      <section>
        <h2>17. Bootstrap Components</h2>
        <p>Carousel, Cards, Alerts, etc.</p>
      </section>

      {/* 18. Bootstrap Utilities */}
      <section>
        <h2>18. Bootstrap Utilities</h2>
        <p>Embed Youtube Videos:</p>
        <CodeBlock
          language="html"
          code={`<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item"
    src="https://www.youtube.com/embed/49HTIoCccDY?rel=0"
    allowfullscreen>
  </iframe>
</div>`}
        />
      </section>

      {/* 19. CCBP UI Kit */}
      <section>
        <h2>19. CCBP UI Kit</h2>
        <p>Add Script before &lt;/body&gt;:</p>
        <CodeBlock
          language="html"
          code={`<script src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/js/ccbp-ui-kit.js"></script>`}
        />
      </section>

      {/* 20. Extra Tips */}
      <section>
        <h2>20. Extra Tips</h2>
        <ul>
          <li>Upload images to Cloudinary for URLs</li>
          <li>Link CSS files using &lt;link&gt; inside &lt;head&gt;</li>
          <li>Use HTML image when image is content</li>
          <li>Use CSS background when image is decoration</li>
          <li>Margin = outside space | Padding = inside space</li>
        </ul>
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Static_Summary_CS;
