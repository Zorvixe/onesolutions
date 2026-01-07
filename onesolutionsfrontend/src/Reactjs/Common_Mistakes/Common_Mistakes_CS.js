import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Common_Mistakes_CS= ({
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
    <h1>Common Mistakes | Cheat Sheet</h1>
    <section>
      <h2>1. Missing Export Statement</h2>
      <p><b>Mistake:</b></p>

      <p><b>File:</b>src/App.js</p>

      <CodeBlock
  language="jsx"
  code={`import Counter from "./components/Counter";

const App = () => {
  return <Counter />;
};

export default App;`}
 />

 <p><b>File:</b>src/Components/Counter/index.js</p>

<CodeBlock
  language="jsx"
  code={`import { Component } from "react";
import "./index.css";

class Counter extends Component {
  render() {
    return (
      <p className="counter">Counter</p>
    );
  }
}

export default Counter;`}
 />
 </section>
  
    <section>
      <h2>2. Missing Import Statement</h2>
      <p><b>Mistake:</b></p>
      <p><b>File:</b>src/App.js</p>
  
      <CodeBlock
        language="jsx"
        code={`const App = () => {
    return <Counter />;
  };
  
  export default App;`}
      />

       <p><b>File:</b>src/Components/Counter/index.js</p>
                <CodeBlock
            language="jsx"
            code={`import { Component } from "react";
            import "./index.css";

            class Counter extends Component {
            render() {
                return (
                <p className="counter">Counter</p>
                );
            }
            }
            export default Counter;`}
            />
    </section>
  
    <section>
      <h2>3. Missing Extending the React Component Class</h2>
      <p><b>Mistake:</b></p>
      <p><b>File:</b>src/App.js</p>
                <CodeBlock
            language="jsx"
            code={`import Counter from "./components/Counter";

            const App = () => {
            return <Counter />;
            };

            export default App;`}
            />
    <p><b>File:</b>src/Components/Counter/index.js</p>
            <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
        import "./index.css";

        class Counter extends Component {
        render() {
            return (
            <p className="counter">Counter</p>
            );
        }
        }

        export default Counter;`}
        />
 </section>
  
    <section>
      <h2>4. class vs className</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`<p class="counter">Counter</p>`}
      />
  
      <p><b>Correct:</b></p>
      <CodeBlock
        language="jsx"
        code={`<p className="counter">Counter</p>`}
      />
    </section>
  
    <section>
      <h2>5. onclick vs onClick</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`<button onclick={this.onIncrement}>Increase</button>`}
      />
  
      <p><b>Correct:</b></p>
      <CodeBlock
        language="jsx"
        code={`<button onClick={this.onIncrement}>Increase</button>`}
      />
    </section>
  
    <section>
      <h2>6. Event Listeners inside Class Component</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`onIncrement() {
    const { count } = this.state;
    console.log(count);
  }`}
      />
  
      <p><b>Solution:</b></p>
      <CodeBlock
        language="javascript"
        code={`onIncrement = () => {
    const { count } = this.state;
    console.log(count);
  };`}
      />
    </section>
  
    <section>
      <h2>7. Passing Event Handler</h2>
      <p><b>Correct Way:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`<button onClick={this.onIncrement}>Increase</button>`}
      />
    </section>
  
    <section>
      <h2>8. Modifying the State Directly</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="javascript"
        code={`this.state.count = this.state.count + 1;`}
      />
  
      <p><b>Solution:</b></p>
      <CodeBlock
        language="javascript"
        code={`this.setState(prevState => ({
    count: prevState.count + 1
  }));`}
      />
  
      <h3>Updating Object</h3>
      <CodeBlock
        language="jsx"
        code={`const newPerson = { ...person, age: 29 };
  this.setState({ person: newPerson });`}
      />
  
      <h3>Updating List</h3>
      <CodeBlock
        language="jsx"
        code={`const updatedNumbers = [...numbers, 4];
  this.setState({ numbers: updatedNumbers });`}
      />
    </section>
  
    <section>
      <h2>9. Calling setState() from render()</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`render() {
    this.setState({ count: 0 });
    return <div />;
  }`}
      />
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          Calling <code>setState()</code> inside render causes an infinite loop.
        </p>
      </div>
    </section>
  
    <section>
      <h2>10. Invoking Event Handler</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`<button onClick={this.onIncrement()}>Increase</button>`}
      />
  
      <p><b>Correct:</b></p>
      <CodeBlock
        language="jsx"
        code={`<button onClick={this.onIncrement}>Increase</button>`}
      />
    </section>
  
    <section>
      <h2>11. setState() is Asynchronous</h2>
      <p>
        <code>setState()</code> does not update the state immediately.
      </p>
    </section>
  
    <section>
      <h2>12. React Component should return a single JSX element</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`const Welcome = () => (
    <h1>Hello</h1>
    <p>Learning React</p>
  );`}
      />
  
      <h3>12.1 Fragments</h3>
      <CodeBlock
        language="jsx"
        code={`const Welcome = () => (
    <>
      <h1>Hello</h1>
      <p>Learning React</p>
    </>
  );`}
      />
    </section>
  
    <section>
      <h2>13. Props are Read-only</h2>
      <p><b>Mistake:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`props.name = "Ramu";`}
      />
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          Props should never be modified directly. They are read-only.
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

export default Common_Mistakes_CS;
