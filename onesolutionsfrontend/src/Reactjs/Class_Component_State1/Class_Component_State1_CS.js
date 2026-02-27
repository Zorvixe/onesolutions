import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Class_Component_State1_CS = ({
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
      <h1>Class Component and State | Cheat Sheet</h1>

      <section>
        <h2>1. Components</h2>
        <p>There are two ways to write React Components.</p>

        <p>They are:</p>
        <ul>
          <li>Functional Components</li>
          <li>Class Components</li>
        </ul>

        <h3>1.1 Functional Components</h3>
        <p>
          {" "}
          These are JavaScript functions that take props as a parameter if
          necessary and return a React element (JSX).{" "}
        </p>

        <CodeBlock
          language="jsx"
          code={`const Welcome = () => <h1>Hello, User</h1>;

 export default Welcome;`}
        />

        <h3>1.2 Class Components</h3>
        <p>These components are built using an ES6 class.</p>

        <p>To define a React Class Component,</p>
        <ul>
          <li>
            Create an ES6 class that extends <code>React.Component.</code>
          </li>
          <li>
            Add a single empty method to it called <code>render().</code>
          </li>
        </ul>

        <h4>1.2.1 extends</h4>
        <p>
          The <code>extends</code> keyword is used to inherit methods and
          properties from the <code>React.Component</code>.
        </p>

        <h4>1.2.2 render()</h4>
        <p>
          The <code>render()</code> method is the only required method in a
          class component. It returns the JSX element.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { Component } from "react";

class MyComponent extends Component {
  render() {
    return JSX;
  }
}`}
        />

        <p>
          Use <code>this.props</code> in the render() body to access the props
          in a class component.
        </p>

        <CodeBlock
          language="jsx"
          code={`class Welcome extends Component {
  render() {
    const { name } = this.props;
    return <h1>Hello, {name}</h1>;
  }
}`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>The component name should always be in the pascal case.</p>
        </div>
      </section>

      <section>
        <h2>2. React Events</h2>
        <p>
          Handling events with React elements is very similar to handling events
          on DOM elements. There are some syntax differences:
        </p>
        <ul>
          <li>
            React events are named using <b>camelCase,</b>rather than{" "}
            <b>lowercase.</b>
          </li>
          <li>
            With JSX, you pass a <b>function</b> as the event handler instead of
            a <b>string.</b>
          </li>
        </ul>

       
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>HTML</th>
              <th>JSX</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>onclick</td>
              <td>onClick</td>
            </tr>
            <tr>
              <td>onblur</td>
              <td>onBlur</td>
            </tr>
            <tr>
              <td>onchange</td>
              <td>onChange</td>
            </tr>
          </tbody>
        </table>

        <h3>Example</h3>
        <CodeBlock
          language="html"
          code={`<button onclick="activateLasers()">Activate Lasers</button>`}
        />

        <CodeBlock
          language="jsx"
          code={`<button onClick={activateLasers}>Activate Lasers</button>`}
        />

        <p>We should not call the function when adding an event in JSX.</p>

        <CodeBlock
          language="jsx"
          code={`class MyComponent extends Component {
  handleClick = () => {
    console.log("clicked");
  };

  render() {
    return <button onClick={this.handleClick()}>Click Me</button>;
  }
}`}
        />

        <p>
          In the above function,the <code>handleClick</code>is called instead of
          passed as a reference.
        </p>

        <CodeBlock
          language="jsx"
          code={`class MyComponent extends Component {
  handleClick = () => {
    console.log("clicked");
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}`}
        />
        <p>
          In the above function, the <code>handleClick</code> is passed as a
          reference. So, the function is not being called every time the
          component renders.
        </p>

        <h3>Providing Arrow Functions</h3>
        <p>
          To not change the context of <code>this</code>, we have to pass an
          arrow function to the event.
        </p>

        <CodeBlock
          language="jsx"
          code={`class MyComponent extends Component {
  handleClick() {
    console.log(this); // undefined
  }

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}`}
        />

        <CodeBlock
          language="jsx"
          code={`class MyComponent extends Component {
  handleClick = () => {
    console.log(this); // MyComponent
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}`}
        />
      </section>

      <section>
        <h2>3. State</h2>
        <p>
          State is a JavaScript object that stores the component's data that
          changes over time.
        </p>

        <p>When the state object changes, the component re-renders.</p>

        <h3>Initializing State</h3>
        <CodeBlock
          language="jsx"
          code={`class Counter extends Component {
  state = { count: 0 };

  render() {
    const { count } = this.state;
    return <p className="count">{count}</p>;
  }
}`}
        />

        <h3>3.1 Updating State</h3>
        <p>
          We can update the state using <code>setState()</code>. We can pass a
          function or object.
        </p>

        <h3>Providing Function as an Argument</h3>

        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`this.setState(prevState => ({ ... }))`}
        />
        <p>
          Here the previous state is sent as a parameter to the callback
          function.
        </p>

        <CodeBlock
          language="javascript"
          code={`onIncrement = () => {
  this.setState(prevState =>
    console.log(\`previous state value \${prevState.count}\`)
  );
}`}
        />

        <h3>3.2 State Updates are Merged</h3>
        <p>
          When updating state, only the specified key is updated. Other keys
          remain unchanged.
        </p>

        <CodeBlock
          language="jsx"
          code={`// Initial state
state = { key1: value1, key2: value2 };

// Updating only key1
this.setState(prevState => ({
  key1: value3
}));

// New state
state = { key1: value3, key2: value2 };`}
        />

        <h3>3.3 Functional Components vs Class Components</h3>
       
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Functional Components</th>
              <th>Class Components</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Renders UI based on props</td>
              <td>Renders UI based on props and state</td>
            </tr>
          </tbody>
        </table>
        <p>
          Use Class Components whenever the state is required.Otherwise,use the
          Functional Components.
        </p>
      </section>

      <section>
        <h2>4. Counter Application</h2>

        <h3>File: src/App.js</h3>
        <CodeBlock
          language="jsx"
          code={`import Counter from "./components/Counter";

const App = () => {
  return <Counter />;
};

export default App;`}
        />

        <h3>File: src/components/Counter/index.js</h3>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react";

import "./index.css";

class Counter extends Component {
  state = { count: 0 };

  onIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  onDecrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  render() {
    const { count } = this.state;

    return (
      <div className="container">
        <h1 className="count">Count {count}</h1>
        <button className="button" onClick={this.onIncrement}>
          Increase
        </button>
        <button className="button" onClick={this.onDecrement}>
          Decrease
        </button>
      </div>
    );
  }
}
export default Counter;`}
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

export default Class_Component_State1_CS;
