import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Recharts = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Recharts | Reading Material</h1>

      <section>
        <h2>1. Third-Party Package – recharts</h2>
        <p>
          NPM contains <b>recharts</b>, a third-party package to display charts
          in your application.
        </p>
        <p>It supports different types of charts like:</p>
        <ul>
          <li>Bar Chart</li>
          <li>Pie Chart</li>
          <li>Area Chart</li>
          <li>Composed Chart</li>
        </ul>

        <p>It supports different visualization methods:</p>
        <ul>
          <li>
            <b>Cartesian:</b> Area, Bar, Line
          </li>
          <li>
            <b>Polar:</b> Pie, Radar, Radial Bar
          </li>
        </ul>

        <h3>Installation Command</h3>
        <CodeBlock language="bash" code={`npm install recharts`} />

        <h3>1.1 Advantages</h3>
        <ul>
          <li>Responsive</li>
          <li>Built for React from scratch</li>
          <li>Highly Customizable</li>
        </ul>
      </section>

      <section>
        <h2>2. Bar Chart</h2>
        <p>The BarChart component represents the container of the Bar Chart.</p>

        <b>Example:</b>
        <CodeBlock
          language="jsx"
          code={`import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

    const data = [
      { group: "Group A", boys: 200, girls: 400 },
      { group: "Group B", boys: 3000, girls: 500 },
      { group: "Group C", boys: 1000, girls: 1500 },
      { group: "Group D", boys: 700, girls: 1200 },
    ];

    const App = () => {
      const format = (value) => (value > 1000 ? value / 1000 + "k" : value);

      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="group" />
            <YAxis tickFormatter={format} />
            <Legend />
            <Bar dataKey="boys" fill="#1f77b4" />
            <Bar dataKey="girls" fill="#fd7f0e" />
          </BarChart>
        </ResponsiveContainer>
      );
    };

    export default App;
    `}
        />

        <p>
          <b>Output:</b>
        </p>
        <img
          src="/assets/img/chart1.png"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />
      </section>

      <section>
        <h2>3. Components in Bar Chart</h2>
        <p>
          The recharts supports different Components for the Bar Chart. Below
          are some of the most commonly used Components.
        </p>

        <h3>3.1 ResponsiveContainer</h3>
        <p>Makes the chart responsive to its parent container.</p>
        <h3>Props:</h3>
        <p>
          We can provide different props to the ReactJS ResponsiveContainer
          Component. Below are some of the most commonly used props.
        </p>
        <table className="table-diff" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width</td>
              <td>100% `value can be percentage string or number`</td>
            </tr>
            <tr>
              <td>height</td>
              <td>100% ` value can be percentage string or number`</td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
            One of the props <code>width</code> or <code>height</code> should be
            a percentage string in the <code>ResponsiveContainer</code>{" "}
            component.
          </p>
        </div>
      </section>

      <section>
        <h2>3.2 XAxis</h2>
        <p>
          The <b>XAxis</b> Component represents the X-Axis of a Chart.
        </p>

        <p>
          <b>Props:</b>
        </p>
        <table className="table-diff" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dataKey</td>
              <td>
                The key of the object in data to display its value on the axis
              </td>
              <td>No default value (string or number)</td>
            </tr>
            <tr>
              <td>tick</td>
              <td>
                Represents a tick. If false → no ticks, object → tick
                configuration, React element → custom tick
              </td>
              <td>No default value</td>
            </tr>
            <tr>
              <td>tickFormatter</td>
              <td>Formatter function for tick values</td>
              <td>No default value (Function)</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Example – tickFormatter:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`const DataFormatter = number => {
  if (number > 1000) {
    return \`\${(number / 1000).toString()}k\`
  }
  return number.toString()
}`}
        />
      </section>

      <section>
        <h2>3.3 YAxis</h2>
        <p>
          The <b>YAxis</b> Component represents the Y-Axis of a Chart.
        </p>
        <p>
          The props of the YAxis Component are similar to the XAxis Component.
        </p>
      </section>

      <section>
        <h2>3.4 Legend</h2>
        <p>
          The <b>Legend</b> Component represents the legend of a Chart.
        </p>
        <p>
          By default, legend content is generated using the name of Line, Bar,
          Area, etc. If no name is provided, the <code>dataKey</code> is used.
        </p>

        <p>
          <b>Props:</b>
        </p>
        <table className="table-diff" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>iconType</td>
              <td>Type of icon in legend item</td>
              <td>No default value</td>
            </tr>
            <tr>
              <td>layout</td>
              <td>Layout of legend items</td>
              <td>horizontal</td>
            </tr>
            <tr>
              <td>verticalAlign</td>
              <td>Vertical alignment of legend</td>
              <td>middle</td>
            </tr>
            <tr>
              <td>align</td>
              <td>Horizontal alignment of legend</td>
              <td>center</td>
            </tr>
            <tr>
              <td>wrapperStyle</td>
              <td>Inline styles for legend container</td>
              <td>No default value</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3.5 Bar</h2>
        <p>
          The <b>Bar</b> Component represents a bar in the Chart.
        </p>

        <p>
          <b>Props:</b>
        </p>
        <table className="table-diff" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dataKey</td>
              <td>Key of the object in data to display bar value</td>
              <td>No default value</td>
            </tr>
            <tr>
              <td>name</td>
              <td>Name of the bar</td>
              <td>No default value</td>
            </tr>
            <tr>
              <td>fill</td>
              <td>Color to fill the bar</td>
              <td>Any valid color</td>
            </tr>
            <tr>
              <td>barSize</td>
              <td>Width or height of the bar</td>
              <td>No default value</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
            The value of the <code>name</code> prop is used in tooltip and
            legend. If not provided, the <code>dataKey</code> will be used.
          </p>
        </div>
      </section>

      <section>
        <h2>4. PieChart</h2>
        <p>
          The <b>PieChart</b> Component represents the container of the Pie
          Chart.
        </p>

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts"

          const data = [
            {
              count: 809680,
              language: "Telugu",
            },
            {
              count: 4555697,
              language: "Hindi",
            },
            {
              count: 12345657,
              language: "English",
            },
          ]
          
          const App = () => {
            return (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    cx="70%"
                    cy="40%"
                    data={data}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="40%"
                    outerRadius="70%"
                    dataKey="count"
                  >
                    <Cell name="Telugu" fill="#fecba6" />
                    <Cell name="Hindi" fill="#b3d23f" />
                    <Cell name="English" fill="#a44c9e" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
            )
          }
          
          export default App`}
        />
        <p>
          <b>Output:</b>
        </p>
        <img
          src="/assets/img/pie1.png"
          alt="project"
          style={{ width: "85%", height: "285px" }}
        />
      </section>

      <section>
        <h2>5. Components in Pie Chart</h2>

        <h3>5.1 Pie</h3>
        <p>
          The <b>Pie</b> Component represents a pie in the Chart.
        </p>

        <table className="table-diff" style={{ width: `90%` }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cx</td>
              <td>X-coordinate of center</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>cy</td>
              <td>Y-coordinate of center</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>data</td>
              <td>Source data array</td>
              <td>No default</td>
            </tr>
            <tr>
              <td>startAngle</td>
              <td>Start angle of first sector</td>
              <td>0</td>
            </tr>
            <tr>
              <td>endAngle</td>
              <td>End angle of last sector</td>
              <td>360</td>
            </tr>
            <tr>
              <td>innerRadius</td>
              <td>Inner radius of sectors</td>
              <td>0</td>
            </tr>
            <tr>
              <td>outerRadius</td>
              <td>Outer radius of sectors</td>
              <td>0</td>
            </tr>
            <tr>
              <td>dataKey</td>
              <td>Key to display value</td>
              <td>No default</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
            If percentage is used for <code>innerRadius</code> or{" "}
            <code>outerRadius</code>, the value is calculated based on container
            size.
          </p>
        </div>

        <h3>5.2 Cell</h3>
        <p>
          The <b>Cell</b> Component represents the cell of a Chart.
        </p>

        <table className="table-diff" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Default Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>Name of the cell (used in legend)</td>
              <td>No default</td>
            </tr>
            <tr>
              <td>fill</td>
              <td>Color of the cell</td>
              <td>Any valid color</td>
            </tr>
          </tbody>
        </table>

        <p>
          The <b>ResponsiveContainer</b> and <b>Legend</b> components in Pie
          Chart work similar to those in Bar Chart.
        </p>
      </section>

      <section>
        <h2>6. Reference</h2>
        <p>
          To know more about Recharts, you can refer to the official
          documentation.
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

export default Recharts;
