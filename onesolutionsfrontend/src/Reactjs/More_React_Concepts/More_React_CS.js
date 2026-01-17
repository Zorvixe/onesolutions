import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const More_React_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>More React Concepts | Cheat Sheet</h1>

      <section>
        <h2>1. Reconciliation</h2>
        <h3>1.1 Virtual DOM</h3>
        <p>
          A Virtual DOM is a JS object, which is the virtual representation of
          an HTML DOM.
        </p>
        <p>
          Whenever new elements are added to the UI, a virtual DOM is created.
        </p>
        <img
          src="/assets/img/virtual-dom.png"
          alt="Client-Server"
          style={{ width: "85%", height: "285px" }}
        />

        <p>
          React compares the new virtual DOM with the current virtual DOM and
          updates only the differences in the real DOM. This process is called{" "}
          <b>Reconciliation</b>.
        </p>
      </section>

      <section>
        <h2>2. React Batch Updating</h2>
        <p>
          React combines multiple <code>setState()</code> calls into a single
          update.
        </p>
        <img
          src="/assets/img/batch.png"
          alt="Client-Server"
          style={{ width: "85%", height: "285px" }}
        />

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react"

          class Counter extends Component {
            state = { count: 0 }
          
            onIncrement = () => {
              this.setState((prevState) => ({ count: prevState.count + 1 }))
              this.setState((prevState) => ({ count: prevState.count + 1 }))
              this.setState((prevState) => ({ count: prevState.count + 1 }))
            }
          
            render() {
              const { count } = this.state
              console.log("render() called")
              return (
                <>
                  <p className="count">Count {count}</p>
                  <button onClick={this.onIncrement}>Increase</button>
                </>
              )
            }
          }
          
          export default Counter`}
        />
        <p>
          In the above example, render is called only once due to batch
          updating.
        </p>
      </section>

      <section>
        <h2>3. setState() Syntax</h2>

        <h3>3.1 Object Syntax</h3>
        <p>Object Syntax is used while updating the state to a value.</p>
        <CodeBlock
          language="jsx"
          code={`this.setState({
    count: 5,
  })`}
        />

        <h3>3.2 Callback Syntax</h3>
        <p>
          Callback Syntax is used while updating the state to a value that is
          computed based on the previous state.
        </p>
        <CodeBlock
          language="jsx"
          code={`this.setState((prevState) => ({ count: prevState.count + 1 }))`}
        />

        <h3>3.3 Object Syntax vs Callback Syntax</h3>

        <p>
          <b>Object Syntax:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react"

          class Counter extends Component {
            state = { count: 0 }
          
            onIncrement = () => {
              this.setState({ count: this.state.count + 1 })
              this.setState({ count: this.state.count + 1 })
              this.setState({ count: this.state.count + 1 })
            }
          
            render() {
              const { count } = this.state
              return (
                <>
                  <p className="count">Count {count}</p>
                  <button onClick={this.onIncrement}>Increase</button>
                </>
              )
            }
          }
          
          export default Counter`}
        />
        <p>
          When the HTML button element is clicked, the value of the state
          variable count is 1.
        </p>
        <p>
          When the Object Syntax is used, this.state.count is same for every
          setState statement as setState is asynchronous.
        </p>
        <p>
          <b>Callback Syntax:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react"

          class Counter extends Component {
            state = { count: 0 }
          
            onIncrement = () => {
              this.setState((prevState) => ({ count: prevState.count + 1 }))
              this.setState((prevState) => ({ count: prevState.count + 1 }))
              this.setState((prevState) => ({ count: prevState.count + 1 }))
            }
          
            render() {
              const { count } = this.state
              return (
                <>
                  <p className="count">Count {count}</p>
                  <button onClick={this.onIncrement}>Increase</button>
                </>
              )
            }
          }
          
          export default Counter`}
        />
        <p>
          When the HTML button element is clicked, the value of the state
          variable count is 3.
        </p>
      </section>

      <section>
        <h2>4. Children Prop</h2>
        <p>
          <code>children</code> is a special prop that represents the content
          between opening and closing tags.
        </p>

        <h3>4.1 Passing Text as Children</h3>
        <p>
          <b>File:</b>src/components/Post/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import "./index.css"
          import SocialButton from "./SocialButton"
          
          const Post = () => (
            <div className="post-container">
              <p className="paragraph">Hooks are a new addition</p>
              <SocialButton>Like</SocialButton>
            </div>
          )
          
          export default Post`}
        />

        <h3>4.2 Accessing Children</h3>
        <p>
          <b>File:</b>src/components/SocialButton/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import "./index.css"
  
  const SocialButton = (props) => (
    <button className="social-button">{props.children}</button>
  )
  
  export default SocialButton`}
        />
      </section>

      <section>
        <h2>5. Controlled vs Uncontrolled Input</h2>

        <h3>5.1 Controlled Input</h3>
        <p>
          If the Input Element value is handled by a React State, then it is
          called Controlled Input.
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react"

          class App extends Component {
            state = {
              searchInput: "",
            }
          
            onChangeSearchInput = (event) => {
              this.setState({
                searchInput: event.target.value,
              })
            }
          
            render() {
              const { searchInput } = this.state
              return (
                <>
                  <input
                    type="text"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                  <p>{searchInput}</p>
                </>
              )
            }
          }
          
          export default App`}
        />

        <h3>5.2 Uncontrolled Input</h3>
        <p>
          If the Input Element value is handled by the browser itself, then it
          is called Uncontrolled Input.
        </p>
        <b>Example:</b>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react"

          class App extends Component {
            state = {
              searchInput: "",
            }
          
            onChangeSearchInput = (event) => {
              this.setState({
                searchInput: event.target.value,
              })
            }
          
            render() {
              const { searchInput } = this.state
              return (
                <>
                  <input type="text" onChange={this.onChangeSearchInput} />
                  <p>{searchInput}</p>
                </>
              )
            }
          }
          
          export default App`}
        />
      </section>

      <section>
        <h2>6. Props vs State</h2>
        <ul>
          <li>The props and state are plain JS objects.</li>
          <li>The props and state changes trigger the render method.</li>
        </ul>

        <table className="table-diff" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Props</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Props get passed to the component, similar to function
                parameters
              </td>
              <td>
                State is created and managed within the component, similar to a
                variable declared within the function
              </td>
            </tr>
            <tr>
              <td>
                Props are used to pass data and event handlers down to child
                components
              </td>
              <td>
                State is used to store the component's data that changes over
                time
              </td>
            </tr>
            <tr>
              <td>Props are immutable. A component cannot change the props</td>
              <td>State should be immutable and updated using setState()</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>7. State Should Be Minimal</h2>
        <p>We need the state to make the applications interactive.</p>
        <p>
          To build the application correctly, you first need to think of the
          minimal set of the state that the application needs.
        </p>
        <p>Let's take an example application, Projects.</p>
        <img
          src="/assets/img/project.png"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />

        <p>
          <b>Think of all the pieces of data in the Projects Application:</b>
        </p>
        <ul>
          <li>The original list of projects</li>
          <li>The active tab item</li>
          <ul>
            <li>The text decoration of the text – Underline</li>
            <li>The color of the text</li>
          </ul>
          <li>The filtered list of projects</li>
        </ul>

        <p>
          <b>Ask these three questions to decide whether something is State:</b>
        </p>
        <ul>
          <li>
            Is it passed from a parent via props? If yes, it is probably not
            state.
          </li>
          <li>
            Does it remain unchanged over time? If yes, it is probably not
            state.
          </li>
          <li>
            Can it be computed from other state or props? If yes, it is not
            state.
          </li>
        </ul>

        <p>
          <b>Which one is State in our application?</b>
        </p>
        <table className="table-diff" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Is State?</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The original list of projects</td>
              <td>No</td>
              <td>It is passed as props</td>
            </tr>
            <tr>
              <td>The active tab item</td>
              <td>Yes</td>
              <td>
                It changes over time and can’t be computed from anything else
              </td>
            </tr>
            <tr>
              <td>The filtered list of projects</td>
              <td>No</td>
              <td>
                It can be computed using the original list and active tab item
              </td>
            </tr>
            <tr>
              <td>Text decoration (Underline)</td>
              <td>No</td>
              <td>It can be derived from the active tab item</td>
            </tr>
            <tr>
              <td>Text color</td>
              <td>No</td>
              <td>It can be derived from the active tab item</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>8. Keys</h2>
        <p>Keys help React identify list items uniquely.</p>

        <CodeBlock
          language="jsx"
          code={`const usersList = [
            {
              uniqueNo: 1,
              name: "Rahul",
            },
            {
              uniqueNo: 2,
              name: "Praneetha",
            },
            {
              uniqueNo: 3,
              name: "Varakumar",
            },
          ]
          const listItems = usersList.map((user) => (
            <li key={user.uniqueNo}>{user.name}</li>
          ))`}
        />

        <h3>8.1 Keys in Lists</h3>
        <p>
          When the state of a component changes, React updates the Virtual DOM
          tree and compares it with the previous one.
          <br />
          After finding the differences, React updates only the changed parts in
          the actual HTML DOM.
          <br />
          React checks the node type and attributes to decide what needs to be
          updated.
          <br />
          This process becomes problematic in the case of lists because all list
          items look similar.
          <br />
          So, React cannot easily identify which items are added, removed, or
          changed without keys.
        </p>
        <p>
          <b>Example - 1:</b>
        </p>
        <img
          src="/assets/img/example11.gif"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />

        <p>When a new list item is added to the end of the list,</p>
        <ul>
          <li>React creates a new virtual DOM with the three list items.</li>
          <li>
            React compares the first two list items in the current virtual DOM
            and the new virtual DOM.
          </li>
          <li>
            Since the two list items in both the previous and current virtual
            DOMs are matched, React creates only the last list item at the end
            in the HTML DOM.
          </li>
        </ul>
        <p><b>Example 2</b></p>
        <img
          src="/assets/img/example11.gif"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />

        <p>When a new list item is added to the start of the list,</p>
        <ul>
          <li>React creates a new virtual DOM with the three list items.</li>
          <li>
            React compares the first list item in the current virtual DOM and
            the new virtual DOM.
          </li>
          <li>
            Since the first list item in both the previous and current virtual
            DOMs is different, React treats as the whole list is changed in the
            current virtual DOM.
          </li>
          <li>React creates all the three list items in the HTML DOM.</li>
        </ul>
        <p>
          So, React will recreate every element, instead of reusing the two
          elements that remained the same between the previous and current
          virtual DOMs. It leads to bad performance.
        </p>
        <p>
          That's where keys are important. Using keys, every item in a list will
          have a unique identifier (ID).
        </p>
        <img
          src="/assets/img/ex2.gif"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />

        <p>
          So, React can easily detect what needs to be changed or not,
          re-rendering only the ones with changes.
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

export default More_React_CS;
