import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Nodejs_CS = ({
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
      <h1>Introduction to Node JS | Cheat Sheet</h1>

      <section>
        <h2>1. MERN Stack</h2>
        <p>
          MERN stands for <b>MongoDB, Express JS, React JS and Node JS.</b>
          It is a JavaScript stack used for easier and faster deployment of
          full-stack web applications.
        </p>

        <ul>
          <li>MongoDB → Database</li>
          <li>Express JS → Backend Framework</li>
          <li>React JS → Frontend Library</li>
          <li>Node JS → Runtime Environment</li>
        </ul>
      </section>

      <section>
        <h2>2. Node JS</h2>
        <p>
          Node JS is a JavaScript runtime environment that executes JavaScript
          code outside the browser.
        </p>

        <h3>Why Node JS?</h3>
        <ul>
          <li>Cross-platform (Windows, Linux, macOS)</li>
          <li>Huge number of third-party packages (NPM)</li>
          <li>Open source</li>
          <li>Massive community support</li>
        </ul>
      </section>

      <section>
        <h2>3. Running JavaScript Using Node JS</h2>
        <p>We can run JavaScript using Node in two ways:</p>

        <ul>
          <li>Node REPL</li>
          <li>Node CLI</li>
        </ul>

        <h3>3.1 Node REPL (Read-Eval-Print-Loop)</h3>
        <p>
          Type <code>node</code> in the terminal and press Enter.
        </p>

        <CodeBlock
          language="bash"
          code={`root@123# node
          Welcome to Node.js v12.18.3.
          Type ".help" for more information.
          > const a = 1
          undefined
          > const b = 2
          undefined
          > a+b
          3
          >`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Use <code>.exit</code> to leave the REPL.
          </p>
        </div>

        <h3>3.2 Node CLI</h3>
        <p>Write JavaScript in a file and run using Node.</p>

        <CodeBlock
          language="javascript"
          code={`// index.js
  const greetings = (name) => {
    console.log(\`Hello \${name}\`);
  };
  
  greetings("Raju");
  greetings("Abhi");`}
        />

        <CodeBlock language="bash" code={`node index.js`} />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>Save the file whenever the code changes.</p>
        </div>
      </section>

      <section>
        <h2>4. Modules in Node JS</h2>
        <p>
          Each JavaScript file in Node JS is treated as a separate module. To
          access one module from another, we use exports and imports.
        </p>

        <ul>
          <li>Common JS Modules</li>
          <li>ES6 (Modern JS) Modules</li>
        </ul>

        <h3>4.1 Common JS Modules</h3>

        <h4>4.1.1 Default Export</h4>

        <p>Exporting:</p>

        <CodeBlock
          language="javascript"
          code={`// calculator.js
  const add = (a, b) => {
    return a + b;
  };
  
  module.exports = add;`}
        />

        <p>Importing:</p>

        <CodeBlock
          language="javascript"
          code={`// index.js
  const add = require("./calculator");
  
  console.log(add(6, 3));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={` root@123# node index.js
          9 `}
        />

        <h4>4.1.2 Named Exports</h4>

        <p>Exporting:</p>

        <CodeBlock
          language="javascript"
          code={`// calculator.js
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  
  exports.add = add;
  exports.sub = sub;`}
        />

        <p>Importing:</p>

        <CodeBlock
          language="javascript"
          code={`const { add, sub } = require("./calculator");
  
  console.log(add(6, 3));
  console.log(sub(6, 3));`}
        />

        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={` root@123# node index.js
          9
          3 `}
        />
      </section>

      <section>
        <h2>Modern JS Module Exports</h2>
        <p>
          Modern JS Modules are known as <b>ES6 Modules.</b>
          The export and import keywords are introduced for exporting and
          importing one or more members in a module.
        </p>

        <h4>4.2.1 Default Export</h4>

        <p>Exporting:</p>

        <CodeBlock
          language="javascript"
          code={`// calculator.mjs
  const add = (a, b) => a + b;
  
  export default add;`}
        />

        <p>Importing:</p>

        <CodeBlock
          language="javascript"
          code={`// index.mjs
  import add from "./calculator.mjs";
  
  console.log(add(6, 3));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={` root@123# node index.js
          9 `}
        />

        <h4>4.2.2 Named Exports</h4>

        <p>Exporting:</p>

        <CodeBlock
          language="javascript"
          code={`// calculator.mjs
  export const add = (a, b) => a + b;
  export const sub = (a, b) => a - b;`}
        />

        <p>Importing:</p>

        <CodeBlock
          language="javascript"
          code={`import { add, sub } from "./calculator.mjs";
  
  console.log(add(6, 3));
  console.log(sub(6, 3));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={` root@123# node index.js
          9
          3 `}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            We must specify <code>.mjs</code> extension for ES6 modules. For
            Common JS, <code>.js</code> is optional.
          </p>
        </div>
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

export default Introductionto_Nodejs_CS;
