import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Router1_CS = ({
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
    <h1>Routing using React Router | Cheat Sheet</h1>
  
    <section>
      <h2>1. Web Apps</h2>
      <p>
        Web applications are categorized based on how the content is delivered.
      </p>
  
      <h3>Types of Web Applications</h3>
      <ul>
        <li>Multi-page Application (MPA)</li>
        <li>Single-page Application (SPA)</li>
      </ul>
  
      <h3>1.1 Multi-page Application (MPA)</h3>
      <ul>
        <li>
          Every URL is associated with separate HTML, CSS, and JavaScript files.
        </li>
        <li>
          The browser downloads new resources whenever the URL changes.
        </li>
      </ul>
  
      <h3>1.2 Single-page Application (SPA)</h3>
      <ul>
        <li>All URLs are mapped to a single HTML page.</li>
        <li>
          Only required components (HTML, CSS, JS) are loaded dynamically.
        </li>
      </ul>
  
      <h4>1.2.1 Advantages of SPA</h4>
      <ul>
        <li>Faster page loading</li>
        <li>Loads only necessary components on navigation</li>
        <li>React is mainly used to build SPAs</li>
      </ul>
    </section>
  
    <section>
      <h2>2. React Router</h2>
      <p>
        React Router is used to build Single-page applications with navigation
        support.
      </p>
  
      <p>React Router provides the following components:</p>
      <ul>
        <li>BrowserRouter</li>
        <li>Link</li>
        <li>Route</li>
        <li>Switch</li>
      </ul>
  
      <h3>2.1 BrowserRouter</h3>
      <p>
        <code>BrowserRouter</code> wraps the entire application to enable routing.
      </p>
      <p><b>Syntax:</b></p>
      <CodeBlock
        language="jsx"
        code={`<BrowserRouter>
    <Component1 />
    <Component2 />
  </BrowserRouter>`}
      />
  
      <h3>2.2 Link</h3>
      <p>
        The <code>Link</code> component is used to navigate between routes.
      </p>
      <p><b>Syntax:</b></p>
  
      <CodeBlock
        language="jsx"
        code={`<Link to="/path">Display Text</Link>`}
      />
  
      <p>
        The <code>to</code> prop specifies the absolute path.
      </p>
  
      <h3>2.3 Route</h3>
      <p>
        The <code>Route</code> component renders a UI component when the path
        matches the current URL.
      </p>
  
      <CodeBlock
        language="jsx"
        code={`<Route path="/path" component={Component} />`}
      />
  
      <h4>2.3.1 exact</h4>
      <p>
        Renders the route only if the path matches the URL exactly.
      </p>
  
      <CodeBlock
        language="jsx"
        code={`<Route exact path="/home" component={Home} />`}
      />
  
      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i className="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          If the user enters an undefined path, the component will not be rendered.
        </p>
      </div>
  
      <h3>2.4 Switch</h3>
      <p>
        The <code>Switch</code> component renders only the first matching route.
      </p>
  
      <CodeBlock
        language="jsx"
        code={`<Switch>
    <Route path="/path1" component={Component1} />
    <Route path="/path2" component={Component2} />
    <Route component={NotFound} />
  </Switch>`}
      />
    </section>
  
    <section>
      <h2>3. Routing Example</h2>
  
      <h3>File: src/App.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { BrowserRouter, Route, Switch } from "react-router-dom";
  import Header from "./components/Header";
  import Home from "./components/Home";
  import About from "./components/About";
  import Contact from "./components/Contact";
  import NotFound from "./components/NotFound";
  
  const App = () => (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  
  export default App;`}
      />
  
      <h3>File: src/components/Header/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { Link } from "react-router-dom";
  import "./index.css";
  
  const Header = () => (
    <nav className="nav-header">
      <ul className="nav-menu">
        <li>
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li>
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li>
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
  
  export default Header;`}
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

export default React_Router1_CS;
