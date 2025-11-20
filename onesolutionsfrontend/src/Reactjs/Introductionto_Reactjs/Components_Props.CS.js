import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Components_Props_CS = ({
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
      <h1>Components and Props | Cheat Sheet</h1>

      {/* 1. Component */}
      <section>
        <h2>1. Component</h2>
        <p>A Component is a JavaScript function that returns a JSX element.</p>

        <h3>Example:</h3>
        <CodeBlock
          language="jsx"
          code={`const Welcome = () => <h1 className="message">Hello, User</h1>;`}
        />

        <p>
          The component name should always start with a <b>capital letter</b> as
          React treats lowercase names as HTML elements.
        </p>

        <CodeBlock
          language="html"
          code={`<script type="text/babel">
  const Welcome = () => <h1 className="message">Hello, User</h1>;
  ReactDOM.render(<Welcome />, document.getElementById("root"));
</script>`}
        />
        <p>
          We can call the component using self-closing tags as shown above:{" "}
          <code>&lt;Welcome /&gt;</code>.
        </p>
      </section>

      {/* 1.1 Properties (Props) */}
      <section>
        <h2>1.1 Properties (Props)</h2>
        <p>
          React allows us to pass information to a component using <b>props</b>.
        </p>

        <h3>1.1.1 Passing Props</h3>
        <p>
          We can pass props to any component just like we declare attributes for
          an HTML element.
        </p>

        <CodeBlock
          language="jsx"
          code={`<Component propName1="propValue1" propName2="propValue2" />`}
        />

        <CodeBlock
          language="jsx"
          code={`const Welcome = () => <h1 className="message">Hello, User</h1>;

ReactDOM.render(
  <Welcome name="Rahul" greeting="Hello" />,
  document.getElementById("root")
);`}
        />

        <h3>1.1.2 Accessing Props</h3>
        <p>
          Components accept props as parameters and can access them directly.
        </p>

        <CodeBlock
          language="javascript"
          code={`const Component = (props) => {
  // We can access props here
};`}
        />

        <CodeBlock
          language="jsx"
          code={`const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};

ReactDOM.render(
  <Welcome name="Rahul" greeting="Hello" />,
  document.getElementById("root")
);`}
        />
      </section>

      {/* 1.2 Component is Reusable */}
      <section>
        <h2>1.2 Component is Reusable</h2>
        <p>
          A Component is a reusable piece of code that can be used in various
          parts of an application.
        </p>

        <CodeBlock
          language="jsx"
          code={`const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};

ReactDOM.render(
  <div>
    <Welcome name="Rahul" greeting="Hello" />
    <Welcome name="Sita" greeting="Hi" />
  </div>,
  document.getElementById("root")
);`}
        />
      </section>

      {/* 1.3 Component is Composable */}
      <section>
        <h2>1.3 Component is Composable</h2>
        <p>We can include one component inside another component.</p>

        <CodeBlock
          language="jsx"
          code={`const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};

const Greetings = () => (
  <div>
    <Welcome name="Rahul" greeting="Hello" />
    <Welcome name="Sita" greeting="Hi" />
  </div>
);

ReactDOM.render(<Greetings />, document.getElementById("root"));`}
        />
      </section>

      {/* 2. Third-party Packages */}
      <section>
        <h2>2. Third-party Packages</h2>
        <p>
          Creating a real-world app involves a lot of setup. Facebook provides{" "}
          <b>create-react-app</b> to simplify the setup process.
        </p>

        <h3>2.1 create-react-app</h3>
        <p>Installation Command:</p>

        <CodeBlock language="bash" code={`npm install -g create-react-app`} />

        <p>This installs create-react-app globally in your environment.</p>

        <h3>2.1.1 Creating a React Application</h3>
        <CodeBlock language="bash" code={`create-react-app myapp --use-npm`} />

        <h3>2.1.2 React Application Folder Structure</h3>
        <ul>
          <li>
            <b>public/</b>: Assets like images, icons, videos, etc.
          </li>
          <li>
            <b>src/</b>: Main folder where React components are placed.
          </li>
          <li>
            <b>node_modules/</b>: Dependencies and sub-dependencies.
          </li>
          <li>
            <b>package-lock.json</b>: Ensures consistent dependency versions.
          </li>
        </ul>

        <p>
          The <b>index.js</b> in <code>src/</code> is the starting point of the
          app where <b>App.js</b> and <b>App.css</b> are imported.
        </p>

        <h3>2.1.3 Starting a React Application</h3>
        <CodeBlock language="bash" code={`npm start`} />

        <p>
          Open <b>http://localhost:3000</b> to view your application.
        </p>

        <h3>Note</h3>
        <p>All ES6 Modules should have a .js extension.</p>

        <h3>2.2 Pre-Configured Tools</h3>
        <ul>
          <li>Live editing (auto-reload components)</li>
          <li>ESLint (finds syntax and logic errors)</li>
          <li>Prettier (enforces code style)</li>
          <li>Babel (compiles JSX to JS)</li>
          <li>
            Webpack (bundles modules into one file — a process called{" "}
            <b>Bundling</b>)
          </li>
        </ul>
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

export default Components_Props_CS;
