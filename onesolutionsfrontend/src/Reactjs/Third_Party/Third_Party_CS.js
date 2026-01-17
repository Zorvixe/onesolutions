import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Third_Party_CS = ({
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
    <h1>Third-Party Packages | Cheat Sheet</h1>

    <section>
      <h2>1. Third-Party Packages</h2>
      <p>
        A Third-Party Package is a reusable code developed to perform a specific
        functionality.
      </p>

      <h3>1.1 Advantages</h3>
      <ul>
        <li>Easy integration</li>
        <li>Saves Time</li>
        <li>More productivity with fewer lines of code</li>
        <li>Better Error Handling</li>
        <li>More Customisation Options</li>
      </ul>

      <p>
        We have used many third-party packages like React Router, React Loader,
        React Icons, JWT, etc.
      </p>

      <p>
        <b>Node Package Manager (npm)</b> contains third-party packages for React JS,
        Node JS, Angular JS and many more libraries and frameworks.
      </p>
    </section>

    <section>
      <h2>1.2 Selecting a Third-Party Package</h2>

      <h3>Things to Consider</h3>
      <ul>
        <li>User Satisfaction</li>
        <li>Popularity (Number of Stars)</li>
        <li>Maintenance</li>
        <li>Documentation</li>
        <li>Number of Unresolved Issues</li>
      </ul>
    </section>

    <section>
      <h2>2. Third-Party Package – react-player</h2>
      <p>
        NPM contains a react-player, a third-party package that provides a React
        component for playing a variety of URLs like YouTube, Facebook, files,
        etc.
      </p>

      <h3>Installation Command</h3>
      <CodeBlock language="bash" code={`npm install react-player`} />
    </section>

    <section>
      <h2>2.1 React Player Props</h2>

      <table className="table-diff" style={{width:'90%'}}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>playing</td>
            <td>Play or Pause the video</td>
            <td>false</td>
          </tr>
          <tr>
            <td>controls</td>
            <td>Show native video controls</td>
            <td>false</td>
          </tr>
          <tr>
            <td>light</td>
            <td>Show video thumbnail</td>
            <td>false</td>
          </tr>
          <tr>
            <td>width</td>
            <td>Width of the player</td>
            <td>640px</td>
          </tr>
          <tr>
            <td>height</td>
            <td>Height of the player</td>
            <td>360px</td>
          </tr>
          <tr>
            <td>className</td>
            <td>Custom styling class</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Example</h2>

      <h3>File: src/App.js</h3>
      <CodeBlock
        language="jsx"
        code={`import VideoPlayer from './components/VideoPlayer'
import './App.css'

const App = () => <VideoPlayer />

export default App`}
      />

      <h3>File: src/components/VideoPlayer/index.js</h3>
      <CodeBlock
        language="jsx"
        code={`import ReactPlayer from 'react-player'
import './index.css'

const videoURL = 'https://youtu.be/YE7VzlLtp-4'

const VideoPlayer = () => (
  <div className="video-container">
    <h1 className="heading">Video Player</h1>
    <div className="responsive-container">
      <ReactPlayer url={videoURL} />
    </div>
  </div>
)

export default VideoPlayer`}
      />
    </section>

    <section>
      <h2>2.1.1 controls Prop</h2>
      <p><b>File:</b> src/components/VideoPlayer/index.js</p>
      <CodeBlock
        language="jsx"
        code={`const VideoPlayer = () => (
            <div className="video-container">
              <h1 className="heading">Video Player</h1>
              <div className="responsive-container">
                <ReactPlayer url={videoURL} controls />
              </div>
            </div>
          )
          export default VideoPlayer`}
      />
    </section>

    <section>
      <h2>2.1.2 playing Prop</h2>
      <p><b>File:</b> src/components/VideoPlayer/index.js</p>
      <CodeBlock
        language="jsx"
        code={`import {Component} from 'react'

        import ReactPlayer from 'react-player'
        
        import './index.css'
        
        const videoURL = 'https://youtu.be/YE7VzlLtp-4'
        
        class VideoPlayer extends Component {
          state = {
            isPlaying: false,
          }
        
          onClickPlay = () => {
            this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
          }
        
          render() {
            const {isPlaying} = this.state
            const btnText = isPlaying ? 'Pause' : 'Play'
        
            return (
              <div className="video-container">
                <h1 className="heading">Video Player</h1>
                <div className="responsive-container">
                  <ReactPlayer url={videoURL} playing={isPlaying} />
                </div>
                <button type="button" className="button" onClick={this.onClickPlay}>
                  {btnText}
                </button>
              </div>
            )
          }
        }
        
        export default VideoPlayer`}
      />
    </section>

    <section>
      <h2>Reference</h2>
      <p>
        To know more about react-player, refer to the official documentation.
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

export default Third_Party_CS;
