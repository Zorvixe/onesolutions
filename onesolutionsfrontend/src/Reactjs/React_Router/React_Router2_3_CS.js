import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Router2_3_CS = ({
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
    <h1>Routing using React Router | Part 2 & 3 | Cheat Sheet</h1>

    <section>
      <h2>1. API Calls</h2>
      <p>
        In general, API calls are made inside
        <code>componentDidMount()</code> so that rendering is not blocked.
      </p>
  
      <h3>1.1 Fetch</h3>
      <p>
        <code>fetch()</code> is a promise-based API that returns a response object.
      </p>
      <p>
        In backend APIs, data is usually sent using <b>snake_case</b> naming
        conventions.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`fetch("https://apis.ccbp.in/blogs")
    .then(response => response.json())
    .then(data => console.log(data));`}
      />
    </section>
  
    <section>
      <h2>2. Route Props</h2>
      <p>
        When a component is rendered using <code>Route</code>, React Router
        provides additional props.
      </p>
  
      <ul>
        <li>match</li>
        <li>location</li>
        <li>history</li>
      </ul>
  
      <h3>2.1 match</h3>
      <p>
        The <code>match</code> object contains information about how a route
        matched the URL.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`const { match } = this.props;
  const { params } = match;
  console.log(params.id);`}
      />
    </section>
  
    <section>
      <h2>3. BlogsList Example</h2>
  
      <h3>File: src/App.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { BrowserRouter, Route, Switch } from "react-router-dom";
  import Header from "./components/Header";
  import About from "./components/About";
  import Contact from "./components/Contact";
  import BlogsList from "./components/BlogsList";
  import BlogItemDetails from "./components/BlogItemDetails";
  import NotFound from "./components/NotFound";
  import "./App.css";
  
  const App = () => (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={BlogsList} />
        <Route exact path="/blogs/:id" component={BlogItemDetails} />
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
  
      <h3>File: src/components/BlogsList/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import Loader from "react-loader-spinner";
  import BlogItem from "../BlogItem";
  import "./index.css";
  
  class BlogsList extends Component {
    state = { isLoading: true, blogsData: [] };
  
    componentDidMount() {
      this.getBlogsData();
    }
  
    getBlogsData = async () => {
      const response = await fetch("https://apis.oneSolution.in/blogs");
      const data = await response.json();
  
      this.setState({
        blogsData: data,
        isLoading: false,
      });
    };
  
    render() {
      const { isLoading, blogsData } = this.state;
  
      if (isLoading) {
        return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />;
      }
  
      return (
        <ul className="blogs-list">
          {blogsData.map(eachBlog => (
            <BlogItem key={eachBlog.id} blogData={eachBlog} />
          ))}
        </ul>
      );
    }
  }
  
  export default BlogsList;`}
      />
  
      <h3>File: src/components/BlogItem/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { Link } from "react-router-dom";
  import "./index.css";
  
  const BlogItem = props => {
    const { blogData } = props;
    const { id, imageUrl, topic, title, avatarUrl, author } = blogData;
  
    return (
      <Link to={\`/blogs/\${id}\`} className="item-link">
        <div className="item-container">
          <img src={imageUrl} alt={title} className="item-image" />
          <div className="item-info">
            <p className="topic-text">{topic}</p>
            <h1 className="item-title">{title}</h1>
            <div className="author-info">
              <img src={avatarUrl} alt={author} className="avatar" />
              <p className="author-name">{author}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  export default BlogItem;`}
      />
  
      <h3>File: src/components/BlogItemDetails/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import Loader from "react-loader-spinner";
  import "./index.css";
  
  class BlogItemDetails extends Component {
    state = { blogData: {}, isLoading: true };
  
    componentDidMount() {
      this.getBlogItemData();
    }
  
    getBlogItemData = async () => {
      const { match } = this.props;
      const { id } = match.params;
  
      const response = await fetch(\`https://apis.ccbp.in/blogs/\${id}\`);
      const data = await response.json();
  
      this.setState({
        blogData: data,
        isLoading: false,
      });
    };
  
    render() {
      const { blogData, isLoading } = this.state;
  
      if (isLoading) {
        return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />;
      }
  
      return (
        <div className="blog-details-container">
          <h1>{blogData.title}</h1>
          <p>{blogData.content}</p>
        </div>
      );
    }
  }
  
  export default BlogItemDetails;`}
      />
  
      <h3>File: src/components/About/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const About = () => (
    <div className="about-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/about-blog-img.png"
        alt="about"
        className="about-img"
      />
      <h1 className="about-heading">About</h1>
      <p className="about-paragraph">
        All about Blogs of frontend developers
      </p>
    </div>
  );
  
  export default About;`}
      />
  
      <h3>File: src/components/Contact/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const Contact = () => (
    <div className="contact-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/contact-blog-img.png"
        alt="contact"
        className="contact-img"
      />
      <h1 className="contact-heading">Contact</h1>
    </div>
  );
  
  export default Contact;`}
      />
  
      <h3>File: src/components/NotFound/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const NotFound = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not-found"
        className="not-found-img"
      />
    </div>
  );
  
  export default NotFound;`}
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

export default React_Router2_3_CS;
