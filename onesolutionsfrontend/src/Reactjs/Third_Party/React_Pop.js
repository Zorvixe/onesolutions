import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Pop = ({ subtopicId, goalName, courseName, subtopic }) => {
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
    <h1>React Popup | Reading Material</h1>

    <section>
      <h2>1. Third-Party Package – reactjs-popup</h2>
      <p>
        NPM contains <b>reactjs-popup</b>, a third-party package to display popups
        in your application.
      </p>
      <p>
        It provides a React component that helps you create simple and complex
        Modals, Tooltips, and Menus.
      </p>
  
      <p><b>Installation Command:</b></p>
      <CodeBlock 
      language="bash"
      code={`npm install reactjs-popup`} />
    </section>
  
    <section>
      <h2>1.1 Advantages</h2>
      <ul>
        <li>ReactJS provides Modal, Tooltip, and Menu</li>
        <li>Provides Support for controlled Modals & Tooltips</li>
      </ul>
    </section>
  
    <section>
      <h2>2. ReactJS Popup Props</h2>
      <p>We can provide different props to the ReactJS Popup component. Below are some of the most commonly used props.</p>
      <table className="table-diff" style={{width:`100%`}}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Default Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>trigger</td>
            <td>Element that triggers the popup</td>
            <td>JSX Element</td>
          </tr>
          <tr>
            <td>modal</td>
            <td>Displays popup as modal</td>
            <td>false</td>
          </tr>
          <tr>
            <td>position</td>
            <td>Position of tooltip</td>
            <td>bottom center</td>
          </tr>
          <tr>
            <td>open</td>
            <td>Controls open/close state</td>
            <td>false</td>
          </tr>
          <tr>
            <td>overlayStyle</td>
            <td>Custom overlay style</td>
            <td>object</td>
          </tr>
        </tbody>
      </table>
    </section>
  
<section>
      <h3>2.1 trigger Prop</h3>
      <p><b>File:</b> src/components/ReactPopup/index.js</p>
      <CodeBlock
        language="jsx"
        code={`import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
        
        const ReactPopUp = () => (
         <div className="popup-container">
           <Popup
             trigger={
               <button className="trigger-button" type="button">
                 Trigger
               </button>
             }
           >
             <div>
               <p>React is a popular and widely used programming language</p>
             </div>
           </Popup>
         </div>
        )
export default ReactPopUp`}
      />
        
        <p><b>File:</b> src/components/ReactPopup/index.css</p>
            <CodeBlock
        language="css"
        code={`.trigger-button {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Roboto';
            color: white;
            padding: 8px 15px 8px 15px;
            margin: 8px;
            background-color: #7c69e9;
            border: none;
            border-radius: 4px;
            outline: none;
           }
           .popup-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
           }`}
      />
       
       <p><b>File:</b> src/App.js</p>
            <CodeBlock
        language="jsx"
        code={`import ReactPopup from './components/ReactPopup'

        const App = () => {
         return <ReactPopup />
        }
        export default App`}
      />

       <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
        <p>The value of the trigger prop should be a JSX element.</p>
      </div>
    </section>
  
    <section>
      <h3>2.2 modal Prop</h3>
      <p><b>File:</b> src/components/ReactPopup/index.js</p>
      <CodeBlock
        language="jsx"
        code={`const ReactPopUp = () => (
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button">
                    Trigger
                  </button>
                }
              >
                <p>React is a popular and widely used programming language</p>
              </Popup>
            </div>
           )
           export default ReactPopUp`}
      />
    </section>
  
    <section>
      <h3>2.3 modal with Close Button</h3>
      <p><b>File:</b> src/components/ReactPopup/index.js</p>
      <CodeBlock
        language="jsx"
        code={`const ReactPopUp = () => (
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button">
                    Trigger
                  </button>
                }
              >
                {close => (
                  <>
                    <div>
                      <p>React is a popular and widely used programming language</p>
                    </div>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                  </>
                )}
              </Popup>
            </div>
           )
           export default ReactPopUp`}
      />
        <img
          src="/assets/img/popup-with-close.gif"
          alt="project"
          style={{ width: "100%", height: "300px" }}
        />
    </section>
  
    <section>
      <h3>2.4 position Prop</h3>
      <p><b>File:</b> src/components/ReactPopup/index.js</p>
      <CodeBlock
        language="jsx"
        code={`
        const ReactPopUp = () => (
         <div className="popup-container">
           <Popup
             trigger={
               <button type="button" className="trigger-button">
                 Trigger
               </button>
             }
             position="bottom left"
           >
             <p>React is a popular and widely used programming language</p>
           </Popup>
         </div>
        )
        export default ReactPopUp`}
      />
        <img
          src="/assets/img/popup-with-position.gif"
          alt="project"
          style={{ width: "100%", height: "300px" }}
        />

    </section>
  
    <section>
      <h3>2.5 overlayStyle Prop</h3>
      <p><b>File:</b> src/components/ReactPopup/index.js</p>
      <CodeBlock
        language="jsx"
        code={`
        const overlayStyles = {
         backgroundColor: '#ffff',
        }
        const ReactPopUp = () => (
         <div className="popup-container">
           <Popup
             modal
             trigger={
               <button type="button" className="trigger-button">
                 Trigger
               </button>
             }
             overlayStyle={overlayStyles}
           >
             <p>React is a popular and widely used programming language</p>
           </Popup>
         </div>
        )
        export default ReactPopUp`}
      />
        <img
          src="/assets/img/popup-overlay-styles.gif"
          alt="project"
          style={{ width: "100%", height: "300px" }}
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

export default React_Pop;
