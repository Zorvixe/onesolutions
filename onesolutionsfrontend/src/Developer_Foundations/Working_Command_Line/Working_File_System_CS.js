import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
import Working_File_System from "./Working_File_System";


const Working_File_System_CS = ({
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
 < div className="intro-container">
  <h1>Working with File System | Cheat Sheet</h1>

  <section>
    <h2>1. Working With Files</h2>

    <h3>1.1 Creating a File</h3>
    <p><b>touch</b> creates an empty file.</p>

    <CodeBlock language="bash" code={`touch filename`} />

    <h3>1.2 Viewing File Content</h3>
    <p><b>cat</b> reads contents of a file and prints it.</p>

    <CodeBlock language="bash" code={`cat filename`} />

    <h3>1.3 Echo Command</h3>
    <p><b>echo</b> prints a string in the terminal.</p>

    <CodeBlock language="bash" code={`echo "content"`} />

    <h3>1.4 Writing to Files using echo</h3>
    <p>Using <b>{">"}</b> operator we can redirect the output into a file.</p>

    <CodeBlock language="bash" code={`echo "Hello World!" > filename`} />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        If the file does not exist, it will be created automatically when using
        the <b>{">"}</b> operator.
      </p>
    </div>

    <h3>1.5 Renaming a File</h3>
    <p><b>mv</b> command renames files.</p>

    <CodeBlock language="bash" code={`mv source destination`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`mv practice.txt exam.txt`} />

    <h3>1.6 Copying Files</h3>
    <p><b>cp</b> copies files.</p>

    <CodeBlock language="bash" code={`cp src_file dest_file`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`cp exam.txt fun_text.txt`} />

    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i>Note
        </h6>
      </div>
      <p>If destination file exists, cp overrides its contents.</p>
    </div>

    <h3>1.7 Deleting a File</h3>

    <CodeBlock language="bash" code={`rm filename`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`rm exam.txt`} />

    <h3>1.8 Hidden Files</h3>

    <p>
      Linux hides sensitive system files to avoid accidental changes.
      Hidden files start with <b>.</b>
    </p>

    <CodeBlock language="bash" code={`ls -a`} />

    <ul>
      <li><b>.</b> → Current directory</li>
      <li><b>..</b> → Parent directory</li>
    </ul>
  </section>

  {/* FILE COMMAND SUMMARY */}

  <section>
    <h2>2. File Commands Summary</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Command</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>touch</td>
          <td style={{ padding: "10px" }}>Creates an empty file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>cat</td>
          <td style={{ padding: "10px" }}>Reads contents of file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>echo</td>
          <td style={{ padding: "10px" }}>Writes text to output</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>mv</td>
          <td style={{ padding: "10px" }}>Renames files</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>cp</td>
          <td style={{ padding: "10px" }}>Copies files</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>rm</td>
          <td style={{ padding: "10px" }}>Deletes files</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>ls -a</td>
          <td style={{ padding: "10px" }}>Shows hidden files</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* WORKING WITH DIRECTORIES */}

  <section>
    <h2>3. Working with Directories</h2>

    <h3>3.1 Creating a Directory</h3>

    <CodeBlock language="bash" code={`mkdir directory_name`} />

    <h3>3.2 Current Working Directory</h3>

    <CodeBlock language="bash" code={`pwd`} />

    <h3>3.3 Changing Directory</h3>

    <CodeBlock language="bash" code={`cd directory_path`} />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        <b>cd /</b> moves directly to the root directory.
      </p>
    </div>

    <h3>3.4 Parent Directory</h3>

    <CodeBlock language="bash" code={`cd ..`} />

    <p>.. represents parent directory.</p>
  </section>

  {/* FILE PATHS */}

  <section>
    <h2>4. File Paths</h2>

    <h3>4.1 Absolute Path</h3>
    <p>Complete path from the root directory.</p>

    <h3>4.2 Relative Path</h3>
    <p>Path relative to current working directory.</p>

    <ul>
      <li><b>.</b> → Current directory</li>
      <li><b>..</b> → Parent directory</li>
    </ul>
  </section>

  {/* HOME DIRECTORY */}

  <section>
    <h2>5. Home Directory</h2>

    <p>Each user has a personal directory called <b>Home Directory</b>.</p>

    <CodeBlock language="bash" code={`cd ~`} />

    <p>Or simply:</p>

    <CodeBlock language="bash" code={`cd`} />
  </section>

  {/* DIRECTORY OPERATIONS */}

  <section>
    <h2>6. Directory Operations</h2>

    <h3>Renaming Directory</h3>

    <CodeBlock language="bash" code={`mv tutorial commands`} />

    <h3>Moving Files</h3>

    <CodeBlock language="bash" code={`mv welcome.txt commands`} />

    <h3>Copying Files to Directory</h3>

    <CodeBlock language="bash" code={`cp welcome.txt commands`} />

    <h3>Copying Directory</h3>

    <CodeBlock language="bash" code={`cp -r source_path destination_path`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`cp -r commands linux`} />

    <h3>Deleting Directory</h3>

    <CodeBlock language="bash" code={`rm -r directory_name`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`rm -r commands`} />
  </section>

  {/* DIRECTORY SUMMARY */}

  <section>
    <h2>7. Directory Commands Summary</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Command</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>mkdir</td>
          <td style={{ padding: "10px" }}>Creates a directory</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>pwd</td>
          <td style={{ padding: "10px" }}>Shows current directory</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>cd</td>
          <td style={{ padding: "10px" }}>Changes directory</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>rm -r</td>
          <td style={{ padding: "10px" }}>Deletes directory</td>
        </tr>
      </tbody>
    </table>
  </section>



      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Working_File_System_CS;
