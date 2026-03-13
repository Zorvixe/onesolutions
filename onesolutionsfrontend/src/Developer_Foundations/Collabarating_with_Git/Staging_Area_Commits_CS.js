import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed



const Staging_Area_Commits_CS = ({
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
<div  className="intro-container">
  <h1>Staging Area & Commits | Cheat Sheet</h1>

  {/* CREATING COMMIT */}

  <section>
    <h2>1. Creating a Commit</h2>

    <h3>Working Directory</h3>

    <p>
      The project folder where files are present is called the
      <b> Working Directory</b>.
    </p>

    <p>Example: Creating files inside the working directory.</p>

    <CodeBlock
      language="bash"
      code={`touch alice.txt
touch bob.txt`}
    />
  </section>

  {/* GIT VIEW */}

  <section>
    <h2>2. Git’s View of Repository</h2>

    <p>
      Git observes and tracks all file changes inside the working directory.
    </p>
     <img
          src="/assets/img/g-v.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* INSPECT REPO */}

  <section>
    <h2>3. Inspecting a Repository</h2>

    <p>
      Git tracks the changes in the working directory using the
      <b> git status</b> command.
    </p>

    <CodeBlock language="bash" code={`git status`} />

    <p>
      This command displays the state of the working directory and staging
      area.
    </p>
  </section>

  {/* MAKING CHANGES */}

  <section>
    <h2>4. Making Changes</h2>

    <p>Let’s add content to the files.</p>

    <h3>alice.txt</h3>

    <CodeBlock
      language="text"
      code={`Hi
What about your learning
Is it going good?`}
    />

    <h3>bob.txt</h3>

    <CodeBlock
      language="text"
      code={`Hi
What's your name?`}
    />
  </section>

  {/* STEPS COMMIT */}

  <section>
    <h2>5. Steps in Creating a Commit</h2>

    <ol>
      <li>Add changes to the staging area</li>
      <li>Create a commit with staged changes</li>
    </ol>
  </section>

  {/* ADD */}

  <section>
    <h2>6. Step 1: Adding Changes to Staging Area</h2>

    <p>
      The <b>git add</b> command adds file changes to the staging area.
    </p>

    <h3>Syntax</h3>

    <CodeBlock language="bash" code={`git add file_path`} />

    <h3>Example</h3>

    <CodeBlock language="bash" code={`git add alice.txt`} />
  </section>

  {/* COMMIT */}

  <section>
    <h2>7. Step 2: Committing Changes</h2>

    <p>
      A <b>commit</b> is a snapshot of the staged changes in the project.
    </p>

    <h3>Syntax</h3>

    <CodeBlock language="bash" code={`git commit -m "message"`} />

    <p>
      The message describes what changes were made and why.
    </p>

    <h3>Example</h3>

    <CodeBlock
      language="bash"
      code={`git commit -m "adds alice file"`}
    />
  </section>

  {/* LOG */}

  <section>
    <h2>8. Listing All Commits</h2>

    <p>
      The <b>git log</b> command displays the history of commits.
    </p>

    <CodeBlock language="bash" code={`git log`} />

    <p>
      In the output, <b>HEAD</b> refers to the current commit.
    </p>
     <img
          src="/assets/img/commits.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />
  </section>

  {/* COMMIT ID */}

  <section>
    <h2>9. Commit ID</h2>

    <p>
      Each commit is identified by a unique string called the
      <b> commit ID (hash)</b>.
    </p>

    <CodeBlock
      language="text"
      code={`8f00aaa0248bcdc38a8d8ba6267167a0478f5a63`}
    />

    <p>
      This ID uniquely identifies a specific commit in the repository.
    </p>
  </section>

  {/* DIFF */}

  <section>
    <h2>10. Unstaged Changes</h2>

    <p>
      The <b>git diff</b> command shows changes that are not yet staged.
    </p>

    <CodeBlock language="bash" code={`git diff`} />

    <p>Sample Output:</p>

    <CodeBlock
      language="text"
      code={`diff --git a/alice.txt b/alice.txt
index e69de29..35dc461 100644
--- a/alice.txt
+++ b/alice.txt
@@ -0,0 +1,2 @@
+Hi
+What about your learning
+It's going good`}
    />
  </section>

  {/* STAGED DIFF */}

  <section>
    <h2>11. Uncommitted Changes</h2>

    <p>
      The <b>git diff --staged</b> command shows changes that are staged but
      not yet committed.
    </p>

    <CodeBlock language="bash" code={`git diff --staged`} />
  </section>

  {/* REMOTE */}

  <section>
    <h2>12. Working with Remote Repository</h2>

    <p>
      Remote repositories allow collaboration and sharing of project
      changes.
    </p>
  </section>

  {/* PUSH */}

  <section>
    <h2>13. Pushing Commits</h2>

    <p>
      The <b>git push</b> command uploads local commits to a remote repository.
    </p>

    <h3>Syntax</h3>

    <CodeBlock language="bash" code={`git push -u origin master`} />
  </section>

  {/* EDITING ON GITHUB */}

  <section>
    <h2>14. Editing Files on GitHub</h2>

    <p>You can edit files directly from the GitHub website.</p>

    <ol>
      <li>Open the file you want to edit</li>
      <li>Click the pencil icon</li>
      <li>Edit the content</li>
      <li>Click <b>Commit changes</b></li>
    </ol>
  </section>

  {/* COMMIT LINK */}

  <section>
    <h2>15. Getting Commit Link</h2>

    <p>To share a specific commit:</p>

    <ol>
      <li>Click on <b>Commits</b> tab</li>
      <li>Select the commit ID</li>
      <li>Copy the URL</li>
      <li>Share the link</li>
    </ol>
  </section>

  {/* PULL */}

  <section>
    <h2>16. Pulling Commits</h2>

    <p>
      The <b>git pull</b> command downloads the latest commits from a
      remote repository.
    </p>

    <CodeBlock language="bash" code={`git pull origin master`} />
  </section>

  {/* TOKEN WARNING */}

  <section>
    <h2>17. GitHub Authentication Warning</h2>

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
        You must use a <b>Personal Access Token (PAT)</b> instead of a
        password.
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

export default  Staging_Area_Commits_CS;
