import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Class_Component_State2_CS = ({
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
    <h1>Class Component and State | Part 2 | Cheat Sheet</h1>
  
    <section>
      <h2>1. setState() Object Syntax</h2>
      <p>
        The <code>setState()</code> object syntax can be used while updating the
        state to a value that is independent of the previous state.
      </p>
  
      <h3>Syntax</h3>
            <CodeBlock
                language="javascript"
                code={`this.setState(
     { propertyName1: propertyValue1 },
     { propertyName2: propertyValue2 }
     // and many more...
);`}
            />
  
      <h3>1.1 Callback vs Object</h3>
  
      <h4>Callback</h4>
      <p>
        Used when updating the state based on the previous state value.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`this.setState(prevState => {
    return { count: prevState.count + 1 };
  });`}
      />
  
      <h4>Object</h4>
      <p>
        Used when updating the state to a static value.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`this.setState({ quantity: 2 });`}
      />
    </section>
  
    <section>
      <h2>2. Sending Function as Callback</h2>
      <p>
        We can pass functions as props to child components. This allows the child
        component to communicate with the parent component.
      </p>
  
      <h3>Syntax</h3>
      <CodeBlock
        language="jsx"
        code={`<ComponentName functionName={this.functionName} />`}
      />
    </section>
  
    <section>
      <h2>3. Input Element</h2>
      <p>
        In React, the Input Element value can be handled in two ways:
      </p>
  
      <ul>
        <li>Controlled Input</li>
        <li>Uncontrolled Input</li>
      </ul>
  
      <h3>3.1 Controlled Input</h3>
      <p>
        If the Input Element value is handled by React State, then it is called a
        Controlled Input. This is the recommended approach in React.
      </p>
  
      <h4>Example</h4>
            <CodeBlock
                language="jsx"
                code={`import { Component } from "react";        
class App extends Component {
    state = {
        searchInput: "",
    };
        
  onChangeSearchInput = event => {
    this.setState({
        searchInput: event.target.value,
     });
};
        
    render() {
    const { searchInput } = this.state;
        
    return (
        <input
        type="text"
        onChange={this.onChangeSearchInput}
        value={searchInput}
        />
    );
    }
}
        
export default App;`}
            />
  
      <h3>3.2 Uncontrolled Input</h3>
      <p>
        If the Input Element value is handled by the browser itself, then it is
        called an Uncontrolled Input.
      </p>
  
      <p>
        Uncontrolled inputs behave like traditional HTML inputs. The value is
        managed by the DOM, not by React State.
      </p>
  
      <h4>Example</h4>
      <CodeBlock
        language="jsx"
        code={`<input type="text" />`}
      />
    </section>
  
    <section>
      <h2>4. Searchable Users List Application</h2>
  
      <h3>File: src/App.js</h3>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import UserProfile from "./components/UserProfile";
  import "./App.css";
  
  const initialUserDetailsList = [
    {
      uniqueNo: 1,
      imageUrl:
        "https://assets.Onesolution.in/frontend/react-js/esther-howard-img.png",
      name: "Esther Howard",
      role: "Software Developer",
    },
    {
      uniqueNo: 2,
      imageUrl:
        "https://assets.Onesolution.in/frontend/react-js/floyd-miles-img.png",
      name: "Floyd Miles",
      role: "Product Manager",
    },
  ];
  
  class App extends Component {
    state = {
      searchInput: "",
      userDetailsList: initialUserDetailsList,
    };
  
    onChangeSearchInput = event => {
      this.setState({ searchInput: event.target.value });
    };
  
    deleteUser = uniqueNo => {
      const { userDetailsList } = this.state;
  
      const filteredUsers = userDetailsList.filter(
        user => user.uniqueNo !== uniqueNo
      );
  
      this.setState({ userDetailsList: filteredUsers });
    };
  
    render() {
      const { searchInput, userDetailsList } = this.state;
  
      const filteredUsersList = userDetailsList.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
  
      return (
        <div className="container">
          <input
            type="search"
            placeholder="Search User"
            onChange={this.onChangeSearchInput}
          />
          <ul>
            {filteredUsersList.map(user => (
              <UserProfile
                key={user.uniqueNo}
                userDetails={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </ul>
        </div>
      );
    }
  }
  
  export default App;`}
      />
  
      <h3>File: src/components/UserProfile/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const UserProfile = props => {
    const { userDetails, deleteUser } = props;
    const { imageUrl, name, role, uniqueNo } = userDetails;
  
    const onDelete = () => {
      deleteUser(uniqueNo);
    };
  
    return (
      <li className="user-card-container">
        <img
          src={imageUrl}
          className="profile-pic"
          alt="profile-pic"
        />
        <div>
          <h1>{name}</h1>
          <p>{role}</p>
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </li>
    );
  };
  
  export default UserProfile;`}
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

export default Class_Component_State2_CS;
