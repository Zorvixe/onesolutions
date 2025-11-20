import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Reactjs_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

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
      <h1>Introduction to React JS | Cheat Sheet</h1>

      {/* 1. React JS */}
      <section>
        <h2>1. React JS</h2>
        <p>
          React JS is an open-source JavaScript library used to build user
          interfaces. It was developed by Facebook.
        </p>

        <h3>1.1 Why React JS?</h3>
        <ul>
          <li>Performant websites</li>
          <li>Fewer lines of code</li>
          <li>Improves readability of code</li>
          <li>Less time consuming</li>
          <li>Open Source</li>
          <li>Reusable code</li>
        </ul>

        <h3>1.2 Advantages of React JS</h3>
        <ul>
          <li>Easy to Learn</li>
          <li>Large Community</li>
          <li>Developer Toolset</li>
        </ul>
      </section>

      {/* 2. Running JavaScript in HTML */}
      <section>
        <h2>2. Running JavaScript in HTML</h2>
        <p>
          We can run JavaScript in HTML using the HTML <code>script</code>{" "}
          element. It is used to include JavaScript in HTML.
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="html"
          code={`<body>
  <div id="root"></div>
  <script type="text/javascript">
    const rootElement = document.getElementById("root");
    const element = document.createElement("h1");
    element.textContent = "Hello World!";
    element.classList.add("greeting");
    rootElement.appendChild(element);
  </script>
</body>`}
        />

        <p>
          Here the <code>type</code> attribute specifies the type of the script.
        </p>

        <p>
          To include an external JavaScript file, we can use the HTML{" "}
          <code>script</code> element with the attribute <code>src</code>. The{" "}
          <code>src</code> attribute specifies the path of an external JS file.
        </p>

        <CodeBlock
          language="html"
          code={`<script type="text/javascript" src="PATH_TO_JS_FILE.js"></script>`}
        />

        <p>
          {" "}
          <b>Note: </b>
          When the browser comes across a script element while loading the HTML,
          it must wait for the script to download, execute it, and only then can
          it process the rest of the page.
        </p>
        <p>
          So, we need to put a script element at the bottom of the page. Then
          the browser can see elements above it and doesn’t block the page
          content from showing.
        </p>
        <p>
          If more than one script elements are in the HTML, the script elements
          will be executed in the order they appear.
        </p>
      </section>

      {/* 3. Creating Elements using React JS */}
      <section>
        <h2>3. Creating Elements using React JS</h2>

        <h3>3.1 React CDN</h3>
        <CodeBlock
          language="html"
          code={`<script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>`}
        />

        <h3>3.2 React.createElement()</h3>
        <p>
          The <code>React.createElement()</code> method is used to create an
          element using React JS. It is similar to the{" "}
          <code>document.createElement()</code> method in regular JavaScript.
        </p>

        <h4>Syntax:</h4>
        <CodeBlock
          language="javascript"
          code={`React.createElement(type, props);`}
        />
        <p>
          <b>type</b> - Tag names like div, h1 and p, etc.
          <br />
          <b>props</b> - Properties like className, onClick and id, etc.
        </p>
        <p>Props are shorthand for properties. It is an optional argument.</p>

        <CodeBlock
          language="html"
          code={`<script type="module">
  const elementProps = { className: "greeting", children: "Hello world!" };
  const elementType = "h1";
  const element = React.createElement(elementType, elementProps);
</script>`}
        />

        <p>
          {" "}
          <b>Note: </b>
          The <code>type</code> attribute value of the HTML script element
          should be <b>module</b> to run React JS.
        </p>

        <h3>3.3 ReactDOM.render()</h3>
        <p>
          The <code>ReactDOM.render()</code> method is used to display the React
          element.
        </p>

        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`ReactDOM.render(reactElement, container);`}
        />
        <p>
          <b>reactElement</b> - What to render
          <br />
          <b>container</b> - Where to render
        </p>

        <CodeBlock
          language="html"
          code={`<body>
  <div id="root"></div>
  <script type="module">
    const elementProps = { className: "greeting", children: "Hello world!" };
    const elementType = "h1";
    const element = React.createElement(elementType, elementProps);
    ReactDOM.render(element, document.getElementById("root"));
  </script>
</body>`}
        />
      </section>

      {/* 4. JSX */}
      <section>
        <h2>4. JSX</h2>
        <p>
          React JS introduced a new HTML like syntax named <b>JSX</b> to create
          elements.
        </p>

        <CodeBlock
          language="jsx"
          code={`const element = <h1 className="greeting">Hello World</h1>;`}
        />

        <p>The above JSX element compiles to,</p>

        <CodeBlock
          language="javascript"
          code={`const elementProps = { className: "greeting", children: "Hello world!" };
const element = React.createElement("h1", elementProps);`}
        />

        <h3>Warning</h3>
        <p>
          In JSX, HTML tags always need to be closed. For example,{" "}
          <code>&lt;br /&gt;</code>, <code>&lt;img /&gt;</code>.
        </p>

        <h3>4.1 Babel</h3>
        <p>
          JSX is not JavaScript. We have to convert it to JavaScript using a
          code compiler. <b>Babel</b> is one such tool.
        </p>
        <p>
          It is a JavaScript compiler that translates JSX into regular
          JavaScript.
        </p>

        <CodeBlock
          language="html"
          code={`<script type="text/babel">
  const elementProps = { className: "greeting", children: "Hello world!" };
  const element = React.createElement("h1", elementProps);
  const element = <h1 className="greeting">Hello World</h1>;
  ReactDOM.render(element, document.getElementById("root"));
</script>`}
        />

        <h3>Note</h3>
        <ul>
          <li>
            For JSX, the <code>type</code> attribute value of the HTML script
            element should be <b>text/babel</b>.
          </li>
          <li>
            For providing class names in JSX, the attribute name should be{" "}
            <code>className</code>.
          </li>
        </ul>

        <h3>Differences between HTML and JSX:</h3>
        <table className="table-diff">
          <thead>
            <tr>
              <th>HTML</th>
              <th>JSX</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>class</td>
              <td>className</td>
            </tr>
            <tr>
              <td>for</td>
              <td>htmlFor</td>
            </tr>
          </tbody>
        </table>

        <h3>4.2 Embedding Variables and Expressions in JSX</h3>
        <p>
          We can embed variables and expressions using the flower brackets{" "}
          <code>{`{}`}</code>.
        </p>

        <h4>Embedding Variables in JSX:</h4>
        <CodeBlock
          language="html"
          code={`<body>
  <div id="root"></div>
  <script type="text/babel">
    const name = "Rahul";
    const className = "greeting";
    const element = <h1 className={className}>Hello {name}!</h1>;
    ReactDOM.render(element, document.getElementById("root"));
  </script>
</body>`}
        />

        <h4>Embedding Expressions in JSX:</h4>
        <CodeBlock
          language="html"
          code={`<body>
    <script type="text/babel">
    const element = (
        <div>
        <h1 className="greeting">Hello!</h1>
        <p>Good to see you here.</p>
        </div>
    );
    ReactDOM.render(element, document.getElementById("root"));
    </script>
</body>`}
        />

        <h3>4.3 Nesting JSX Elements</h3>
        <p>
          The <code>ReactDOM.render()</code> method returns only one element in
          render. So, we need to wrap the elements in parenthesis when writing
          nested elements.
        </p>
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

export default Introductionto_Reactjs_CS;
