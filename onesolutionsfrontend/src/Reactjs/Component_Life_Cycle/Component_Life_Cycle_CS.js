import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Component_Life_Cycle_CS = ({
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
    <h1>Component Life Cycle | Cheat Sheet</h1>

    <section>
      <h2>1. Component Life Cycle Phases</h2>
      <p>
        Every React Component goes through three phases throughout its lifetime:
      </p>
      <ul>
        <li>Mounting Phase</li>
        <li>Updating Phase</li>
        <li>Unmounting Phase</li>
      </ul>
    </section>
  
    <section>
      <h2>2. Mounting Phase</h2>
      <p>
        In this phase, the instance of a component is created and inserted into the DOM.
      </p>
  
      <h3>2.1 Methods</h3>
      <p>The following methods are called in order:</p>
      <ul>
        <li><code>constructor()</code></li>
        <li><code>render()</code></li>
        <li><code>componentDidMount()</code></li>
      </ul>
  
      <h4>2.1.1 constructor()</h4>
      <p>
        The <code>constructor()</code> method is used to initialize state and class variables.
      </p>
      <p><b>Syntax:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`constructor(props) {
    super(props);
    // initialize state and class variables
  }`}
      />
  
      <p>
      We must call the <code>super(props)</code> method before any other statement. Calling <code>super(props)</code> makes sure that <code>constructor()</code> of the React.Component gets called and initializes the instance.
      </p>
  
      <h4>Initializing State using Props</h4>
      <CodeBlock
        language="jsx"
        code={`constructor(props) {
super(props);
this.state = {
 date: props.date,
    };
}`}
      />
  
      <h4>2.1.2 render()</h4>
      <p>
        The <code>render()</code> method returns the JSX that is displayed on the UI.
      </p>
  
      <h4>2.1.3 componentDidMount()</h4>
      <p>
        The <code>componentDidMount()</code> method runs after the component is added to the DOM.
      </p>
      <p>Used for:</p>
      <ul>
        <li>Starting timers</li>
        <li>Making API calls</li>
        <li>Subscribing to events</li>
      </ul>
    </section>
  
    <section>
      <h2>3. Updating Phase</h2>
      <p>
        This phase occurs whenever the component’s state or props change.
      </p>
  
      <h3>3.1 Methods</h3>
      <h4>3.1.1 render()</h4>
      <p>
        The <code>render()</code> method is called again whenever state updates.
      </p>
    </section>
  
    <section>
      <h2>4. Unmounting Phase</h2>
      <p>
        In this phase, the component is removed from the DOM.
      </p>
  
      <h3>4.1 Methods</h3>
      <h4>4.1.1 componentWillUnmount()</h4>
      <p>
        Used to clean up resources before the component is destroyed.
      </p>
  
      <p>Examples:</p>
      <ul>
        <li>Clearing timers</li>
        <li>Cancelling API calls</li>
        <li>Removing event listeners</li>
      </ul>
    </section>
  
    <section>
      <h2>5. Clock Example</h2>
  
      <h3>File: src/App.js</h3>
      <CodeBlock
  language="jsx"
  code={`import { Component } from "react";
import Clock from "./components/Clock";
import "./App.css";
class App extends Component {
  state = {
    showClock: false,
  };

  onToggleClock = () => {
    this.setState(prevState => {
      const { showClock } = prevState;
      return {
        showClock: !showClock,
      };
    });
  };

  render() {
    const { showClock } = this.state;

    return (
      <div className="app-container">
        <button
          onClick={this.onToggleClock}
          type="button"
          className="toggle-button"
        >
          {showClock ? "Show Clock" : "Hide Clock"}
        </button>

        {showClock && <Clock />}
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
          The logical <code>&&</code> operator is useful for conditional rendering.
        </p>
      </div>
  
      <h3>File: src/components/Clock/index.js</h3>
      <CodeBlock
  language="jsx"
  code={`import { Component } from "react";
import "./index.css";
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    const { date } = this.state;

    return (
      <div className="clock-container">
        <h1 className="heading">Clock</h1>
        <p className="time">{date.toLocaleTimeString()}</p>
      </div>
    );
  }
}
export default Clock;`}
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

export default Component_Life_Cycle_CS;
