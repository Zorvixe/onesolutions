import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Rect_Chrono_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>React Chrono | Reading Material</h1>

      <section>
        <h2>1. Third-Party Package react-chrono</h2>
        <p>
          NPM contains <b>react-chrono</b>, a third-party package to display
          timelines in your application.
        </p>
        <p>
          It provides a React component <code>Chrono</code> to build a timeline
          that displays events chronologically.
        </p>

        <p>
          <b>Installation Command:</b>
        </p>
        <CodeBlock language="bash" code={`npm install react-chrono`} />

        <h3>1.1 Advantages</h3>
        <ul>
          <li>Supports Horizontal, Vertical, and Tree modes</li>
          <li>Supports slideshow autoplay</li>
          <li>Keyboard navigation</li>
        </ul>
      </section>

      <section>
        <h2>2. Chrono Props</h2>
        <p>
          We can provide different props to the ReactJS Chrono component. Below
          are some of the most commonly used props.
        </p>

        <table className="table-diff" style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mode</td>
              <td>Sets timeline mode</td>
              <td>HORIZONTAL</td>
            </tr>
            <tr>
              <td>items</td>
              <td>Collection of timeline items</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>theme</td>
              <td>Customizes colors</td>
              <td>No default</td>
            </tr>
          </tbody>
        </table>

        <h3>2.1 mode</h3>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock language="jsx" code={`<Chrono mode="VERTICAL" />`} />

        <h3>2.2 items</h3>
        <p>
          The <code>items</code> prop defines the timeline data.
        </p>

        <table className="table-diff" style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>title</td>
              <td>Title of timeline item</td>
              <td>String</td>
            </tr>
            <tr>
              <td>cardTitle</td>
              <td>Title of card</td>
              <td>String</td>
            </tr>
            <tr>
              <td>cardSubtitle</td>
              <td>Subtitle of card</td>
              <td>String</td>
            </tr>
            <tr>
              <td>cardDetailedText</td>
              <td>Detailed description</td>
              <td>String / String[]</td>
            </tr>
            <tr>
              <td>media</td>
              <td>Image / video object</td>
              <td>Object</td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="css"
          code={`.chrono-container {
            width: 500px;
            height: 400px;
          }`}
        />
        <CodeBlock
          language="jsx"
          code={`import {Chrono} from 'react-chrono'

          const items = [
            {
              title: 'May 1940',
              cardTitle: 'Dunkirk',
              cardSubtitle: 'Men of the British Expeditionary Force.',
              cardDetailedText:
                'On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and attacking northern France.',
            },
          ]
          
          const App = () => (
            <div className="chrono-container">
              <Chrono items={items} />
            </div>
          )
          
          export default App`}
        />
        <p>
          <b>Output:</b>
        </p>
        <p>
          A single timeline item is created with the values of the Timeline Item
          Model in the items prop.
        </p>
        <img
          src="/assets/img/chrono.png"
          alt="project"
          style={{ width: "100%", height: "500px" }}
        />
        <div className="Warning-container">
          <div className="icon-warning">
            <h6>
              <i className="bi bi-exclamation-triangle"></i> Warning
            </h6>
          </div>
          <p>
            If any property misses in the Timeline Item Model, the respective value won't
            be displayed in the timeline item.
          </p>
        </div>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
            The Chrono Component should be wrapped in a container that has a width and
            height.
          </p>
        </div>

      </section>

      <section>
        <h3>2.3 theme</h3>
        <CodeBlock
          language="jsx"
          code={`<Chrono
    theme={{
      primary: "red",
      secondary: "blue",
      cardBgColor: "yellow",
      cardForeColor: "violet",
      titleColor: "red",
    }}
  />`}
        />
      </section>

      <section>
        <h2>3. Rendering Custom Content</h2>
        <p>
          The custom content can be inserted by just passing the elements
          between the Chrono tags.
        </p>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="css"
          code={`.chrono-container {
            width: 400px;
            height: 600px;
          }
          
          .image {
            width: 200px;
            height: 200px;
          }`}
        />

        <CodeBlock
          language="jsx"
          code={`import {Chrono} from 'react-chrono'

          const App = () => (
            <div className="chrono-container">
              <Chrono mode="VERTICAL">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/csk-logo-img.png"
                    className="image"
                    alt="chennai-super-kings"
                  />
                </div>
                <div>
                  <h1>Mumbai Indians</h1>
                  <p>IPL Team winner for the year 2019 is Mumbai Indians.</p>
                </div>
              </Chrono>
            </div>
          )
          
          export default App`}
        />
        <p>
          <b>Output:</b>
        </p>
        <p>
          Each HTML div element is automatically converted into a timeline item
          and inserted into the timeline card.
        </p>
        <img
          src="/assets/img/chrono2.png"
          alt="project"
          style={{ width: "90%", height: "500px" }}
        />


        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
         The items prop is optional and custom rendering is supported on all three modes.
          </p>
        </div>
        <p><b>Example:</b></p>
        <CodeBlock
          language="css"
          code={`.chrono-container {
            width: 400px;
            height: 600px;
          }
          
          .image {
            width: 200px;
            height: 200px;
          }`}
        />
         <CodeBlock
          language="jsx"
          code={`import {Chrono} from 'react-chrono'

          const items = [{title: '2018'}, {title: '2019'}]
          
          const App = () => (
            <div className="chrono-container">
              <Chrono mode="VERTICAL" items={items}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/csk-logo-img.png"
                  className="image"
                  alt="chennai-super-kings"
                />
                <div>
                  <h1>Mumbai Indians</h1>
                  <p>IPL Team winner for the year 2019 is Mumbai Indians.</p>
                </div>
              </Chrono>
            </div>
          )
          
          export default App`}
        />
        <p><b>Output:</b></p>
        <img
          src="/assets/img/chrono3.png"
          alt="project"
          style={{ width: "100%", height: "500px" }}
        />
      </section>

      <section>
        <h2>4. Reference</h2>
        <p>
          Refer to the official <b>react-chrono</b> documentation for more
          details.
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

export default Rect_Chrono_CS;
