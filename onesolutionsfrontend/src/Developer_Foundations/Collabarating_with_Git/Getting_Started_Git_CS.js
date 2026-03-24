import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed


const Getting_Started_Git_CS = ({
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
  <h1>Getting Started with Git | Cheat Sheet</h1>

  {/* WORKING ON PROJECT */}

  <section>
    <h2>1. Working on a Project</h2>

    <h3>Managing Versions of a Document</h3>

    <p>
      When building software or writing documents we continuously make
      changes and improvements.
    </p>

    <p>
      Versioning helps manage these changes and maintain different versions
      of the project files.
    </p>

    <h3>Advantages of Versioning</h3>

    <ul>
      <li>Revert to older versions easily</li>
      <li>Track how files changed over time</li>
      <li>Recover previous versions when mistakes occur</li>
    </ul>
  </section>

  {/* PROJECT MANAGEMENT */}

  <section>
    <h2>2. Managing Versions of a Project</h2>

    <p>
      When developing a software project we continuously update existing
      files to add new features and fix bugs.
    </p>

    <h3>Collaboration</h3>

    <p>
      Large projects involve many developers working on multiple files.
      Manually tracking changes becomes difficult.
    </p>

    <p>
      Even a small mistake can break the entire application.
    </p>

    <h3>Versioning</h3>

    <p>Version control helps answer questions like:</p>

    <ul>
      <li>Who modified a file?</li>
      <li>When were the changes made?</li>
      <li>What exactly was changed?</li>
    </ul>
  </section>

  {/* SOURCE CODE MANAGEMENT */}

  <section>
    <h2>3. Source Code Management</h2>

    <h3>Version Control System</h3>

    <p>
      A <b>Version Control System (VCS)</b> tracks changes in project files
      and allows switching between different versions.
    </p>

    <p>Popular Version Control Systems:</p>

    <ul>
      <li>Git</li>
      <li>Subversion</li>
      <li>Mercurial</li>
    </ul>
  </section>

  {/* GIT */}

  <section>
    <h2>4. Git</h2>

    <p>
      Git is a <b>free and open-source distributed version control system</b>.
    </p>

    <p>
      It is used for tracking changes in any set of files and managing
      source code in software development.
    </p>
    
  </section>

  {/* REPOSITORY */}

  <section>
    <h2>5. Repository</h2>

    <p>
      A <b>Git Repository (Repo)</b> stores all project files along with
      their version history.
    </p>

    <p>
      It acts like a database that keeps track of different versions of
      project files.
    </p>
  </section>

  {/* SNAPSHOTS */}

  <section>
    <h2>6. Snapshots</h2>

    <p>
      Git takes a snapshot of project files whenever changes are saved.
    </p>

    <p>
      These snapshots are called <b>commits</b> in Git terminology.
    </p>
  </section>

  {/* TRACKING FILES */}

  <section>
    <h2>7. Tracking Files</h2>

    <p>
      By default Git does not track file changes automatically.
    </p>

    <p>
      We must explicitly tell Git which files to track.
    </p>

    <h3>Selecting Specific Changes</h3>

    <p>
      Sometimes we only want selected changes to be part of a snapshot.
    </p>

    <p>
      Git creates a snapshot of changes that are present in the
      <b> staging area</b>.
    </p>
  </section>

  {/* GIT FILE STATES */}

  <section>
    <h2>8. Git's View of Repository</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>State</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>
            Description
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>Untracked Files</td>
          <td style={{ padding: "10px" }}>
            Files not yet tracked by Git
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Tracked Files</td>
          <td style={{ padding: "10px" }}>
            Files monitored by Git for changes
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Modified Files</td>
          <td style={{ padding: "10px" }}>
            Files changed after the last commit
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Staged Files</td>
          <td style={{ padding: "10px" }}>
            Files ready to be committed
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Committed Files</td>
          <td style={{ padding: "10px" }}>
            Files unchanged since the last commit
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* DISTRIBUTED VCS */}

  <section>
    <h2>9. Distributed Version Control System</h2>

    <p>
      Git is a <b>distributed version control system</b>.
    </p>

    <p>
      Every developer has a complete copy of the repository along with
      its entire history.
    </p>
  </section>

  {/* REPOSITORY HOSTING */}

  <section>
    <h2>10. Git Repository Hosting</h2>

    <p>
      Cloud platforms allow storing and managing Git repositories online.
    </p>

    <ul>
      <li>GitHub</li>
      <li>Bitbucket</li>
    </ul>
  </section>

  {/* CREATE ACCOUNT */}

  <section>
    <h2>11. Creating GitHub Account</h2>

    <p>Create an account by visiting:</p>

    <CodeBlock language="text" code={`https://github.com`} />
     <img
          src="/assets/img/git.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />
  </section>

  {/* SHARING REPO */}

  <section>
    <h2>12. Sharing Repository</h2>

    <p>
      You can collaborate by inviting users to your repository.
    </p>

    <p>
      Navigate to <b>Settings → Manage Access → Invite a Collaborator</b>.
    </p>
     <img
          src="/assets/img/repo.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />
  </section>

  {/* INSTALL GIT */}

  <section>
    <h2>13. Installing Git Client</h2>

    <h3>Linux</h3>

    <CodeBlock language="bash" code={`sudo apt install git`} />

    <h3>Mac</h3>

    <CodeBlock language="bash" code={`sudo brew install git`} />
  </section>

  {/* CONFIG AUTHOR */}

  <section>
    <h2>14. Setting Author Information</h2>

    <CodeBlock
      language="bash"
      code={`git config --global user.name "Your Name"
git config --global user.email "youremailaddress@example.com"`}
    />
  </section>

  {/* COLOR */}

  <section>
    <h2>15. Command Line Coloring</h2>

    <CodeBlock language="bash" code={`git config --global color.ui auto`} />
  </section>

  {/* VIEW CONFIG */}

  <section>
    <h2>16. Viewing Git Configuration</h2>

    <CodeBlock language="bash" code={`git config -l`} />

    <p>Sample Output:</p>

    <CodeBlock
      language="text"
      code={`user.name=User
user.email=user@gmail.com
color.ui=auto`}
    />
  </section>

  {/* CLONE */}

  <section>
    <h2>17. Cloning Repository</h2>

    <p>Creates a copy of remote repository on your computer.</p>

    <CodeBlock
      language="bash"
      code={`git clone https://github.com/icecream-dev/tutorial.git`}
    />

    <p>
      The <b>.git</b> folder stores all version history and metadata.
    </p>
  </section>

  {/* REMOTE */}

  <section>
    <h2>18. Display Remote Repository</h2>

    <CodeBlock language="bash" code={`git remote -v`} />

    <p>Sample Output:</p>

    <CodeBlock
      language="text"
      code={`origin https://github.com/icecream-dev/tutorial.git (fetch)
origin https://github.com/icecream-dev/tutorial.git (push)`}
    />
  </section>

  {/* INIT */}

  <section>
    <h2>19. Initializing Git Repository</h2>

    <CodeBlock language="bash" code={`git init`} />

    <p>
      Initializes a Git repository in the current working directory.
    </p>
  </section>

  {/* ADD REMOTE */}

  <section>
    <h2>20. Adding Remote Repository</h2>

    <CodeBlock
      language="bash"
      code={`git remote add origin https://github.com/icecream-dev/tutorial-2.git`}
    />
  </section>

  {/* TOKEN WARNING */}

  <section>
    <h2>21. GitHub Authentication Warning</h2>

    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i>Note
        </h6>
      </div>

      <p>
        GitHub no longer supports password authentication for
        <b> git clone</b>, <b>git push</b>, and <b>git pull</b>.
      </p>

      <p>
        You must use a <b>Personal Access Token (PAT)</b> instead of a password.
      </p>
    </div>
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

export default  Getting_Started_Git_CS;
