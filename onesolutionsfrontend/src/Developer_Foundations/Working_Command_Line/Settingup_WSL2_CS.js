import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
import SettingUp_WSL2 from "./SettingUp_WSL2";

const SettingUp_WSL2_CS = ({
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
  <h1>Getting Started with Command Line | Cheat Sheet</h1>

  {/* USER INTERFACE */}

  <section>
    <h2>1. User Interface</h2>

    <h3>Graphical User Interface (GUI)</h3>
    <p>
      Graphical User Interface (GUI) is commonly referred to as the
      User Interface (UI). It allows users to interact with computers
      using graphical elements like buttons, windows, and icons.
    </p>

    <h3>Command Line Interface (CLI)</h3>
    <p>
      Command Line Interface (CLI) allows users to perform powerful
      operations using text commands.
    </p>

    <p>
      A <b>command</b> is a text instruction given to a computer program
      to perform a specific task.
    </p>
     <img
          src="/assets/img/CLI.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* SHELL */}

  <section>
    <h2>2. What is Shell?</h2>

    <p>
      A <b>Shell</b> is software that interprets and executes commands
      provided by the user.
    </p>

    <p>
      A <b>Terminal</b> is a text input/output environment used to
      interact with the shell.
    </p>
  </section>

  {/* DIFFERENT SHELLS */}

  <section>
    <h2>3. Different Shells</h2>

    <ul>
      <li>Bourne Shell (sh)</li>
      <li>Bourne-Again Shell (bash)</li>
      <li>C Shell (csh)</li>
      <li>Korn Shell (ksh)</li>
      <li>Z Shell (zsh)</li>
    </ul>
  </section>

  {/* OPEN TERMINAL LINUX */}

  <section>
    <h2>4. Opening Terminal (Linux)</h2>

    <p>
      Bash is one of the most commonly used shells in Linux distributions.
    </p>

    <p>Steps:</p>

    <ul>
      <li>Open Applications / Dash</li>
      <li>Search for <b>Terminal</b></li>
    </ul>

    <p>Shortcut:</p>

    <CodeBlock language="text" code={`Ctrl + Alt + T`} />
     <img
          src="/assets/img/OT.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* MAC */}

  <section>
    <h2>5. Opening Terminal (Mac)</h2>

    <ul>
      <li>Open Launchpad and search for Terminal</li>
      <li>Press Command (⌘) + Space and type "Terminal"</li>
    </ul>
     <img
          src="/assets/img/MAC.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* WINDOWS */}

  <section>
    <h2>6. Windows Operating System</h2>

    <p>
      Windows users should install <b>WSL2 (Windows Subsystem for Linux)</b>
      to use Linux commands.
    </p>
  
    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i> Note
        </h6>
      </div>

      <p>
        Commands taught in Bash will not work properly in Windows
        PowerShell or Command Prompt.
      </p>
    </div>
  </section>

  {/* OPEN WSL */}

  <section>
    <h2>7. Opening WSL2 Ubuntu Terminal</h2>

    <p>Click Start and search for:</p>

    <CodeBlock language="text" code={`Ubuntu`} />
     <img
          src="/assets/img/Ubantu.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* CLOUD */}

  <section>
    <h2>8. Using Cloud Shell</h2>

    <p>
      Alternatively, you can use <b>Google Cloud Shell</b>.
    </p>

    <CodeBlock
      language="text"
      code={`https://shell.cloud.google.com/`}
    />
     <img
          src="/assets/img/bash.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* COMMANDS */}

  <section>
    <h2>9. Commands</h2>

    <h3>Listing Files and Directories</h3>

    <p>
      The <b>ls</b> command lists files and directories.
    </p>

    <CodeBlock language="bash" code={`ls`} />

    <h3>Using Additional Options</h3>

    <p>
      The <b>-l</b> and <b>-h</b> options show detailed information in
      human-readable format.
    </p>
     <img
          src="/assets/img/L-F.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />

    <CodeBlock language="bash" code={`ls -lh`} />

    <p>
      Some options require values as arguments.
    </p>

    <p>
      Example: <b>--block-size</b> option.
    </p>

    <CodeBlock language="bash" code={`ls --block-size=MB`} />
     <img
          src="/assets/img/LF-2.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* HELP */}

  <section>
    <h2>10. Get Options for Commands</h2>

    <p>
      The <b>--help</b> option displays available command options.
    </p>

    <CodeBlock language="bash" code={`ls --help`} />

    <p>
      This command is useful when you want to understand a command's
      parameters and usage.
    </p>
  </section>

  {/* CLEAR */}

  <section>
    <h2>11. Clear the Screen</h2>

    <p>The <b>clear</b> command clears the terminal screen.</p>

    <CodeBlock language="bash" code={`clear`} />

    <p>Shortcut:</p>

    <CodeBlock language="text" code={`Ctrl + L`} />
  </section>

  {/* MAN */}

  <section>
    <h2>12. User Manual for Commands</h2>

    <p>
      The <b>man</b> command displays the manual page of a command.
    </p>

    <CodeBlock language="bash" code={`man <command>`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`man ls`} />

    <p>Press <b>q</b> to exit the manual.</p>
  </section>

  {/* DATE */}

  <section>
    <h2>13. Get System Date and Time</h2>

    <CodeBlock language="bash" code={`date`} />
  </section>

  {/* WHOAMI */}

  <section>
    <h2>14. Get Current User</h2>

    <CodeBlock language="bash" code={`whoami`} />
  </section>

  {/* PREVIOUS COMMAND */}

  <section>
    <h2>15. Previous Commands</h2>

    <p>
      The shell keeps track of previously executed commands.
    </p>

    <ul>
      <li>⬆ Up Arrow → Previous command</li>
      <li>⬇ Down Arrow → Next command</li>
    </ul>
  </section>

  {/* HISTORY */}

  <section>
    <h2>16. Command History</h2>

    <p>
      The <b>history</b> command shows previously executed commands.
    </p>

    <CodeBlock language="bash" code={`history`} />

    <p>
      By default, it displays the last <b>500 commands</b>.
    </p>
  </section>

  {/* BASH HISTORY */}

  <section>
    <h2>17. Bash History File</h2>

    <p>
      Bash stores command history in the <b>.bash_history</b> file.
    </p>

    <CodeBlock language="bash" code={`cat .bash_history`} />
  </section>

  {/* EXIT */}

  <section>
    <h2>18. Exit Shell</h2>

    <p>The <b>exit</b> command ends the shell session.</p>

    <CodeBlock language="bash" code={`exit`} />
  </section>

  {/* SUMMARY */}

  <section>
    <h2>19. Summary</h2>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>Command</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>ls</td>
          <td>Lists files and directories</td>
        </tr>
        <tr>
          <td>date</td>
          <td>Displays system date and time</td>
        </tr>
        <tr>
          <td>whoami</td>
          <td>Displays current logged in user</td>
        </tr>
        <tr>
          <td>--help</td>
          <td>Shows options for a command</td>
        </tr>
        <tr>
          <td>man</td>
          <td>Displays command manual</td>
        </tr>
        <tr>
          <td>clear</td>
          <td>Clears the terminal</td>
        </tr>
        <tr>
          <td>history</td>
          <td>Shows command history</td>
        </tr>
        <tr>
          <td>exit</td>
          <td>Ends the shell session</td>
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

export default SettingUp_WSL2_CS;
