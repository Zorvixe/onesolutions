import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Styled_Compo_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Styled Components | Cheat Sheet</h1>

      <section>
        <h2>1. Styling React Components</h2>
        <p>React Components can be styled in different ways:</p>
        <ul>
          <li>Using CSS</li>
          <li>CSS-in-JS</li>
          <li>SASS & SCSS</li>
          <ul>
            {" "}
            <li>many more...</li>
          </ul>
        </ul>
        <h3>1.1 Using CSS</h3>
        <p>
          Writing CSS in external CSS files for each component and passing class
          name as a value to the className attribute.
        </p>

        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import "./App.css";
  const App = () => <h1 className="heading">Hello World</h1>;
  export default App;`}
        />

        <p>
          <b>File:</b> src/App.css
        </p>
        <CodeBlock
          language="css"
          code={`.heading {
    color: #0070c1;
    font-family: 'Roboto';
  }`}
        />

        <h3>1.2 CSS-in-JS</h3>
        <p>
          CSS-in-JS is a styling technique where JavaScript is used to style
          React Components.
        </p>
        <ul>
          <li>Styled Components</li>
          <li>Emotion</li>
          <li>Radium</li>
        </ul>
      </section>

      <section>
        <h2>2. Styled Components</h2>
        <p>
          Styled Components are one of the new ways to use CSS in modern
          JavaScript. Styled Components are used to reuse styles.
        </p>

        <h3>2.1 Installation</h3>
        <CodeBlock code={`npm install styled-components`} />

        <h3>2.2 Syntax</h3>
        <CodeBlock
          language="jsx"
          code={`const StyledComponentName = styled.tagName\`
    property1: value1;
    property2: value2;
  \`;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>StyledComponentName should always start with a Capital letter.</p>
        </div>

        <h3>2.3 Importing styled</h3>
        <p>
          In general, styled components are placed inside the
          styledComponents.js file.
        </p>
        <p>
          <b>File:</b> src/styledComponents.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import styled from "styled-components";`}
        />
        <p>
          styled is an internal utility method that transforms the styling from
          JavaScript into actual CSS.
        </p>

        <h3>2.4 Creating and Exporting Styled Component</h3>
        <p>
          <b>File:</b> src/styledComponents.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import styled from "styled-components";
  
  export const Heading = styled.h1\`
    color: #0070c1;
    font-family: "Roboto";
  \`;`}
        />

        <h3>2.5 Importing and Rendering Styled Component</h3>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Heading } from "./styledComponents";
  
  const App = () => <Heading>Hello World</Heading>;
  export default App;`}
        />

        <h3>2.6 Adapting based on props</h3>
        <p>With styled components we can re-use the styles created.</p>
        <CodeBlock
          language="jsx"
          code={`<StyledComponent propName="propValue">...</StyledComponent>`}
        />

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`const StyledComponentName = styled.tagName\`
        property1: value1;
        property2: \${props => /* access prop value */};
        ...
      \`;`}
        />
        <p>
          <b>Example</b>
        </p>
        <p>
          <b>File:</b>src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import "./App.css";
          import { CustomButton } from "./styledComponents";
          
          const App = () => (
            <>
              <CustomButton type="button" color="#ffffff" bgColor="#0070c1">Click</CustomButton>
              <CustomButton type="button" color="#0070c1" bgColor="#ffffff">Click</CustomButton>
            </>
          );
          export default App;`}
        />
        <p>
          <b>File:</b>src/styledComponents.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import styled from "styled-components";

      export const CustomButton = styled.button\`
        padding: 10px;
        font-size: 15px;
        color: \${props => props.color};
        background-color: \${props => props.bgColor};
        border: 2px solid #0070c1;
        border-radius: 4px;
      \`;
      `}
        />
        <p>Value passed as prop can be accessed as props.propName.</p>
        <h3>2.7 Modularity of Code</h3>
        <p>
          <b>Example</b>
        </p>
        <p>
          <b>File:</b>src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`<CustomButton type="button" outline={false}>Click</CustomButton>`}
        />
        <p>
          The color and bgColor are the part of styling, instead of passing them
          as props, we can passthe type of button to handle styles in styled
          components.
        </p>

        <h3>2.8 Conditional Styling using Props</h3>
        <p>We can apply styles conditionally using ternary operator.</p>

        <CodeBlock
          language="jsx"
          code={`Condition ? ExpressionIfTrue : ExpressionIfFalse;`}
        />

        <CodeBlock
          language="jsx"
          code={`const StyledComponentName = styled.tagName\`
      property1: value1;
      property2: \${(props) => (props.name === someValue ? value2 : value3)};
    \`;`}
        />

        <p>
          <b>Example</b>
        </p>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { CustomButton } from "./styledComponents";

    const App = () => (
      <>
        <CustomButton type="button" outline={false}>Click</CustomButton>
        <CustomButton type="button" outline={true}>Click</CustomButton>
      </>
    );

    export default App;`}
        />

        <p>
          <b>File:</b> src/styledComponents.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import styled from "styled-components";

    export const CustomButton = styled.button\`
      padding: 10px;
      margin-right: 20px;
      font-size: 15px;
      color: \${(props) => (props.outline ? "#0070c1" : "#ffffff")};
      border-radius: 4px;
      border: 2px solid #0070c1;
      background-color: \${(props) => (props.outline ? "#ffffff" : "#0070c1")};
    \`;`}
        />
      </section>

      <section>
        <h2>3. Advantages of Styled Components</h2>

        <h3>3.1 Unique Class Names</h3>
        <p>Styled Components generate unique class names automatically.</p>

        <h3>3.2 Elimination of Dead Styles</h3>
        <p>Unused styles are removed automatically.</p>

        <h3>3.3 Dynamic Styling</h3>
        <p>Styles can change based on props.</p>

        <h3>3.4 Props Differentiation</h3>
        <p>
          Styled components can differentiate HTML attributes and custom props.
        </p>

        <h3>3.5 Easier Debugging</h3>
        <p>
          Better class names appear in DevTools using
          babel-plugin-styled-components.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>CRACO is used to configure babel-plugin-styled-components.</p>
        </div>

        <h3>3.6 Global Styling</h3>
        <p>Global styles are created using createGlobalStyle.</p>

        <CodeBlock
          language="jsx"
          code={`import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle\`
  body {
    margin: 0;
    font-family: Roboto;
  }
\`;`}
        />
      </section>

      <section>
        <h2>4. Extending Styles</h2>
        <p>Styled components can inherit styles from another component.</p>

        <CodeBlock
          language="jsx"
          code={`export const OutlineButton = styled(CustomButton)\`
  color: #0070c1;
  background-color: #ffffff;
\`;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>OutlineButton still renders a button element.</p>
        </div>
      </section>

      <section>
        <h2>5. The "as" Prop</h2>
        <p>The "as" prop changes the rendered HTML element.</p>

        <CodeBlock
          language="jsx"
          code={`<CustomButton as="a" href="#">Click</CustomButton>`}
        />
      </section>

      <section>
        <h2>6. Boolean Attribute</h2>
        <p>Boolean props are true if present, false if absent.</p>

        <CodeBlock
          language="jsx"
          code={`<CustomButton outline>Click</CustomButton>`}
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

export default Styled_Compo_CS;
