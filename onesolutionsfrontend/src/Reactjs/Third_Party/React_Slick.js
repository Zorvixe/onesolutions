import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Rect_Slick = ({ subtopicId, goalName, courseName, subtopic }) => {
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
            <h1>React Slick | Reading Material</h1>

            <section>
                <h2>1. Third-Party Package – react-slick</h2>
                <p>
                NPM contains <b>react-slick</b>, a third-party package that provides a React
                component <code>Slider</code> to add a carousel to your application.
                </p>

                <p><b>Installation Command:</b></p>
                <CodeBlock 
                language="bash"
                code={`npm install react-slick`} />

                <p><b>Also install slick-carousel for CSS and fonts:</b></p>
                <CodeBlock 
                 language="bash"
                code={`npm install slick-carousel`} />
            </section>

            <section>
                <h2>1.1 Advantages</h2>
                <ul>
                <li>Easy to use</li>
                <li>Highly customizable</li>
                <li>More performant</li>
                </ul>
            </section>

            <section>
                <h2>2. Slider Props</h2>
                <p>Commonly used props of the <code>Slider</code> component:</p>

                <table className="table-diff" style={{ width:`90%`}}>
                <thead>
                    <tr>
                    <th>Prop</th>
                    <th>Description</th>
                    <th>Default Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>slidesToShow</td>
                    <td>Number of slides visible at a time</td>
                    <td>1</td>
                    </tr>
                    <tr>
                    <td>dots</td>
                    <td>Show or hide navigation dots</td>
                    <td>true</td>
                    </tr>
                    <tr>
                    <td>slidesToScroll</td>
                    <td>Number of slides to scroll per action</td>
                    <td>1</td>
                    </tr>
                    <tr>
                    <td>dotsClass</td>
                    <td>CSS class for dots</td>
                    <td>"slick-dots"</td>
                    </tr>
                </tbody>
                </table>
            </section>

            <section>
                <p><b>Example</b></p>
                <p><b>File:</b> src/components/ReactSlick/index.js</p>
                <CodeBlock
                language="jsx"
                code={`import Slider from 'react-slick'
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    import './index.css'
            const ReactSlick = () => {
            const settings = {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            }

            return (
                <div className="slider-container">
                <Slider {...settings}>
                    <h3>Slide 1</h3>
                    <h3>Slide 2</h3>
                    <h3>Slide 3</h3>
                </Slider>
                </div>
            )
            }
 export default ReactSlick`}
                />
            </section>

            <section>
                <p><b>File:</b> src/components/ReactSlick/index.css</p>
                <CodeBlock
                language="css"
                code={`.slider-container {
            background-color: #419be0;
            padding: 40px;
            }`}
                />
            </section>

            <section>
                <p><b>File:</b> src/App.js</p>
                <CodeBlock
                language="jsx"
                code={`import ReactSlick from './components/ReactSlick'

            const App = () => {
            return <ReactSlick />
            }

            export default App`}
                />
          <img
          src="/assets/img/react-slick-output.gif"
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

export default Rect_Slick;
