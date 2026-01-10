import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Lists_Keys_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

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
      <h1>List & Keys | Cheat Sheet</h1>

      {/* 1. Keys */}
      <section>
        <h2>1. Keys</h2>
        <p>
          Keys help React identify which items have changed, added, or removed
          in a list. They give a stable identity to elements inside an array.
        </p>

        <h3>Why Keys?</h3>
        <p>
          Without keys, React may re-render unnecessary components, causing
          performance issues and UI bugs.
        </p>

        <h3>Best Practice</h3>
        <p>
          Use a <b>unique string</b> (like an ID from data) as the key.
        </p>

        <CodeBlock
          language="jsx"
          code={`const userDetailsList = [
  { uniqueNo: 1, name: "Esther Howard", role: "Developer" },
  { uniqueNo: 2, name: "John Doe", role: "Designer" }
];

// Correct
userDetailsList.map(user => (
  <UserProfile key={user.uniqueNo} userDetails={user} />
));`}
        />
      </section>

      {/* 1.1 Keys as Props */}
      <section>
        <h2>1.1 Keys as Props</h2>
        <p>
          <b>Keys are not passed as props</b> to the component. They are used
          internally by React.
        </p>

        <CodeBlock
          language="jsx"
          code={`const UserProfile = (props) => {
  const { userDetails } = props;
  console.log(props.key); // undefined
  return <li>{userDetails.name}</li>;
};

// In parent
<UserProfile key={user.uniqueNo} userDetails={user} />`}
        />

        <h3>Need the ID inside component?</h3>
        <p>Pass it explicitly as a prop with a different name.</p>

        <CodeBlock
          language="jsx"
          code={`// Parent
<UserProfile
  key={user.uniqueNo}
  uniqueNo={user.uniqueNo}
  name={user.name}
/>

// Child
const UserProfile = ({ uniqueNo, name }) => {
  return <li>ID: {uniqueNo} - {name}</li>;
};`}
        />
      </section>

      {/* 2. Users List Application */}
      <section>
        <h2>2. Users List Application</h2>

        <h3>App.js</h3>
        <CodeBlock
          language="jsx"
          code={`import UserProfile from './components/UserProfile';

const userDetailsList = [
  {
    uniqueNo: 1,
    imageUrl: 'https://assets.Onesolution.in/frontend/react-js/esther-howard-img.png',
    name: 'Esther Howard',
    role: 'Software Developer'
  },
  {
    uniqueNo: 2,
    imageUrl: 'https://assets.Onesolution.in/frontend/react-js/john-doe-img.png',
    name: 'John Doe',
    role: 'UI Designer'
  }
];

const App = () => (
  <ul>
    {userDetailsList.map(user => (
      <UserProfile key={user.uniqueNo} userDetails={user} />
    ))}
  </ul>
);

export default App;`}
        />

        <h3>UserProfile/index.js</h3>
        <CodeBlock
          language="jsx"
          code={`const UserProfile = ({ userDetails }) => {
  const { imageUrl, name, role } = userDetails;

  return (
    <li className="user-card">
      <img src={imageUrl} alt="avatar" className="avatar" />
      <div>
        <h1>{name}</h1>
        <p>{role}</p>
      </div>
    </li>
  );
};

export default UserProfile;`}
        />
      </section>

      {/* 3. Common Issues */}
      <section>
        <h2>3. Common Issues</h2>

        <h3>Using Index as Key (Avoid)</h3>
        <CodeBlock
          language="jsx"
          code={`// Avoid: Causes re-rendering issues on reorder/delete
userDetailsList.map((user, index) => (
  <UserProfile key={index} userDetails={user} />
));`}
        />

        <h3>Fix: ENOSPC Error (Linux)</h3>
        <CodeBlock
          language="bash"
          code={`# Increase file watchers limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# Verify
cat /proc/sys/fs/inotify/max_user_watches`}
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

export default Lists_Keys_CS;
