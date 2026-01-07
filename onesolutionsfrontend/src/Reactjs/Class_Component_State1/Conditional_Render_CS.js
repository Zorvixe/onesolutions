import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Conditional_Render_CS = ({
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
    <h1>Conditional Rendering | Cheat Sheet</h1>
  
    <section>
      <h2>1. Conditional Rendering</h2>
      <p>
        Conditional Rendering allows us to render different elements or components
        based on a condition.
      </p>
  
      <p>Different ways to implement Conditional Rendering are:</p>
      <ul>
        <li>Using an If...Else Statement</li>
        <li>Using Element Variables</li>
        <li>Using Ternary Operators</li>
        <li>Using Logical && Operator</li>
      </ul>
  
      <h3>1.1 Using an If...Else Statement</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import "./App.css";
  
  class App extends Component {
    state = { isLoggedIn: true };
  
    renderAuthButton = () => {
      const { isLoggedIn } = this.state;
  
      if (isLoggedIn === true) {
        return <button>Logout</button>;
      } else {
        return <button>Login</button>;
      }
    };
  
    render() {
      return (
        <div className="container">
        {this.renderAuthButton()}
        </div>
      )
    }
  }
  
  export default App;`}
      />
  
      <h3>1.2 Using Element Variables</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import "./App.css";
  
  class App extends Component {
    state = { isLoggedIn: true };
  
    render() {
      const { isLoggedIn } = this.state;
      let authButton;
  
      if (isLoggedIn) {
        authButton = <button>Logout</button>;
      } else {
        authButton = <button>Login</button>;
      }
  
      return (
        <div className="container">{authButton}
        </div>
      )
    }
  }
  
  export default App;`}
      />
  
      <h3>1.3 Using Ternary Operators</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import "./App.css";
  
  class App extends Component {
    state = { isLoggedIn: true };
  
    render() {
      const { isLoggedIn } = this.state;
  
      return (
        <div className="container">
          {isLoggedIn ? <button>Logout</button> : <button>Login</button>}
        </div>
      );
    }
  }
  
  export default App;`}
      />
  
      <h3>1.4 Using Logical && Operator</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import "./App.css";
  
  class App extends Component {
    state = { isLoggedIn: true };
  
    render() {
      const { isLoggedIn } = this.state;
  
      return (
        <div className="container">
          {isLoggedIn && <button>Logout</button>}
          {!isLoggedIn && <button>Login</button>}
        </div>
      );
    }
  }
  
  export default App;`}
      />
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          Conditional Rendering can also be achieved using inline styles or CSS
          display property (<code>display: none</code>), but it is not preferable.
        </p>
      </div>
    </section>
  
    <section>
      <h2>2. Default Props</h2>
      <p>
        <code>defaultProps</code> is a property in a React Component used to set
        default values for props. This is similar to default parameters in a
        function.
      </p>
  
      <h3>Syntax</h3>
      <CodeBlock
        language="jsx"
        code={`ComponentName.defaultProps = {
    propName1: "propValue1",
    propName2: "propValue2",
  };`}
      />
  
      <h3>Example</h3>
      <p>
        <b>File:</b> src/Welcome/index.js
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
  
  Welcome.defaultProps = {
    name: "Rahul",
    greeting: "Hello",
  };
  
  export default Welcome;`}
      />
  
      <p>
        <b>File:</b> src/App.js
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import Welcome from "./Welcome";
  
  class App extends Component {
    state = { isLoggedIn: true };
  
    render() {
      return (
        <div className="container">
          <Welcome greeting="Hello" />
        </div>
      );
    }
  }
  
  export default App;`}
      />
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          While accessing props, the correct prop name should be provided.
        </p>
      </div>
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

export default Conditional_Render_CS;
