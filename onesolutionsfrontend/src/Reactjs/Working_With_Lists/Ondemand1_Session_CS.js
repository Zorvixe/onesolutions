import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Ondemand1_Session_CS = ({
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
      <h1>On Demand Session | Cheat Sheet</h1>
<section>
        <h2>1. Projects Example</h2>

        <h3>File: src/App.js</h3>
        <CodeBlock
          language="jsx"
          code={`import { Component } from "react";

import TabItem from "./components/TabItem";
import ProjectItem from "./components/ProjectItem";
import Header from "./components/Header";

import "./App.css";

const tabsList = [
  { tabId: "STATIC", displayText: "Static" },
  { tabId: "RESPONSIVE", displayText: "Responsive" },
  { tabId: "DYNAMIC", displayText: "Dynamic" },
];

const projectsList = [
  {
    projectId: 0,
    category: "STATIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-s3-img.png",
    title: "Music Page",
    description:
      "The music page enables the users to browse through the images of all-time favorite music albums.",
  },
  {
    projectId: 1,
    category: "STATIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-s4-img.png",
    title: "Tourism Website",
    description:
      "A tourism website enables the user to browse through the images of popular destinations.",
  },
  {
    projectId: 2,
    category: "STATIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-s1-img.png",
    title: "Advanced Technologies",
    description:
      "A website that gives you a basic understanding of Advanced Technologies.",
  },
  {
    projectId: 3,
    category: "STATIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-s2-img.png",
    title: "Happy Meals",
    description: "Discover the best foods in over 1,000 restaurants.",
  },
  {
    projectId: 4,
    category: "RESPONSIVE",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-r4-img.png",
    title: "VR Website",
    description:
      "VR Website enables users to explore AR and VR Products and Industry happenings.",
  },
  {
    projectId: 5,
    category: "RESPONSIVE",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-r2-img.png",
    title: "Food Munch",
    description: "Food Much Website is a user-centric food tech website.",
  },
  {
    projectId: 6,
    category: "RESPONSIVE",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-r3-img.png",
    title: "Portfolio",
    description:
      "A portfolio is the best alternative for a resume to showcase your skills to the digital world.",
  },
  {
    projectId: 7,
    category: "RESPONSIVE",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-r1-img.png",
    title: "Design",
    description:
      "A website to showcase the best features and give more information about the Design tool.",
  },
  {
    projectId: 8,
    category: "DYNAMIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-d3-img.png",
    title: "Speed Typing Test",
    description:
      "Speed Typing Test Application is capable of calculating the time to type the randomly generated quote.",
  },
  {
    projectId: 9,
    category: "DYNAMIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-d1-img.png",
    title: "Random Joke Page",
    description:
      "Random Joke Page is an API-based dynamic Web Application that generates a new joke.",
  },
  {
    projectId: 10,
    category: "DYNAMIC",
    imageURL: "https://assets.ccbp.in/frontend/react-js/projects-d2-img.png",
    title: "Sizing An Image",
    description:
      "This is a dynamic web application capable of adjusting the size of an element using DOM manipulations.",
  },
];

class App extends Component {
  state = {
    activeTabId: tabsList[0].tabId,
  };

  clickTabItem = tabValue => {
    this.setState({ activeTabId: tabValue });
  };

  getFilteredProjects = () => {
    const { activeTabId } = this.state;
    return projectsList.filter(
      eachProject => eachProject.category === activeTabId
    );
  };

  render() {
    const { activeTabId } = this.state;
    const filteredProjects = this.getFilteredProjects();

    return (
      <div className="app-container">
        <Header />
        <h1 className="title">Projects</h1>
        <p className="description">
          Your skills and achievements showcase your strengths and abilities.
          Speak about any new skills or software you learnt to perform the
          project responsibilities.
        </p>

        <ul className="tabs-container">
          {tabsList.map(tabDetails => (
            <TabItem
              key={tabDetails.tabId}
              tabDetails={tabDetails}
              clickTabItem={this.clickTabItem}
              isActive={activeTabId === tabDetails.tabId}
            />
          ))}
        </ul>

        <ul className="project-list-container">
          {filteredProjects.map(projectDetails => (
            <ProjectItem
              key={projectDetails.projectId}
              projectDetails={projectDetails}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default App;`}
        />

        <h3>File: src/components/TabItem/index.js</h3>
        <CodeBlock
          language="jsx"
          code={`import "./index.css";

const TabItem = props => {
  const { tabDetails, clickTabItem, isActive } = props;
  const { tabId, displayText } = tabDetails;

  const onClickTabItem = () => {
    clickTabItem(tabId);
  };

  const activeTabBtnClassName = isActive ? "active-tab-btn" : "";

  return (
    <li className="tab-item-container">
      <button
        type="button"
        className={\`tab-btn \${activeTabBtnClassName}\`}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  );
};

export default TabItem;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            In the above code, multiple class names can be added using template
            literals.
          </p>
        </div>

        <h3>File: src/components/Header/index.js</h3>
        <CodeBlock
  language="jsx"
  code={`import "./index.css";

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <p className="website-logo">RA</p>
      <ul className="nav-menu">
        <li>
          <img
            className="social-network-img"
            src="https://image.flaticon.com/icons/png/512/174/174857.png"
            alt="Linked In"
          />
        </li>
        <li>
          <img
            className="social-network-img"
            src="https://image.flaticon.com/icons/png/512/25/25231.png"
            alt="Git Hub"
          />
        </li>
        <li>
          <img
            className="social-network-img"
            src="https://res.cloudinary.com/dmwrugc6z/image/upload/v1621681890/Background_4x_1_bzyjew.png"
            alt="Twitter"
          />
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;`}
 />


        <h3>File: src/components/ProjectItem/index.js</h3>
        <CodeBlock
  language="jsx"
  code={`import "./index.css";

const ProjectItem = props => {
  const { projectDetails } = props;
  const { projectId, imageURL, description, title } = projectDetails;

  return (
    <>
      <li className="project-item-container">
        <img
          className="project-item-image"
          src={imageURL}
          alt={\`project-item\${projectId}\`}
        />
        <div className="project-item-details-container">
          <h1 className="project-item-title">{title}</h1>
          <p className="project-item-description">{description}</p>
        </div>
      </li>
    </>
  );
};

export default ProjectItem;`}
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

export default Ondemand1_Session_CS;
