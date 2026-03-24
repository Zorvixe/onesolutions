import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Miscellaneous_Commands_CS_2 = ({
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
  <h1>Miscellaneous Commands - 2 | Cheat Sheet</h1>

  {/* NETWORKING COMMANDS */}

  <section>
    <h2>1. Networking Commands</h2>

    <h3>Network Connectivity</h3>

    <p>
      <b>ping</b> checks the network connectivity between the host and another
      server or host.
    </p>

    <CodeBlock language="bash" code={`ping hostname/IP_address`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`ping google.com`} />

    <h3>Route Path</h3>

    <p>
      <b>traceroute</b> prints the route that a packet takes to reach a host.
    </p>

    <CodeBlock language="bash" code={`traceroute host_address`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`traceroute google.com`} />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>

      <p>
        If a server is unreachable, <b>ping</b> helps identify connectivity
        issues and <b>traceroute</b> helps identify where the failure occurs.
      </p>
    </div>
  </section>

  {/* NETWORK INTERFACES */}

  <section>
    <h2>2. Network Interfaces</h2>

    <p>
      Network interfaces are software interfaces that connect networking
      hardware to the operating system.
    </p>

    <p>Common interfaces:</p>

    <ul>
      <li>Ethernet</li>
      <li>Loopback</li>
    </ul>

    <h3>Interface Information</h3>

    <p>
      <b>ifconfig</b> shows information about network interfaces.
    </p>

    <CodeBlock language="bash" code={`ifconfig`} />

    <h4>Ethernet Interface</h4>

    <p>
      <b>ethxxx</b> represents a physical Ethernet network interface card.
    </p>

    <h4>Loopback Interface</h4>

    <p>
      <b>lo</b> is a virtual interface used to connect to services running on
      the same system.
    </p>
  </section>

  {/* ENVIRONMENT VARIABLES */}

  <section>
    <h2>3. Environment Variables</h2>

    <p>
      Environment variables store system information that can be accessed by
      programs launched from the shell.
    </p>

    <h3>List Variables</h3>

    <CodeBlock language="bash" code={`env`} />

    <h3>Create or Update Variable</h3>

    <CodeBlock language="bash" code={`export VARIABLE_NAME=value`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`export CUSTOM_ENV_VARIABLE=10`} />

    <h3>Access Variable</h3>

    <CodeBlock language="bash" code={`echo $VARIABLE_NAME`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`echo $CUSTOM_ENV_VARIABLE`} />

    <h3>Delete Variable</h3>

    <CodeBlock language="bash" code={`unset VARIABLE_NAME`} />
  </section>

  {/* PATH */}

  <section>
    <h2>4. PATH Variable</h2>

    <p>
      <b>PATH</b> stores directories where executable programs are located.
    </p>

    <CodeBlock language="bash" code={`echo $PATH`} />
  </section>

  {/* ALIAS */}

  <section>
    <h2>5. Command Aliasing</h2>

    <p>
      <b>alias</b> creates a shortcut for commands.
    </p>

    <CodeBlock language="bash" code={`alias name="command"`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`alias t="traceroute"`} />

    <CodeBlock language="bash" code={`t google.com`} />

    <h3>Remove Alias</h3>

    <CodeBlock language="bash" code={`unalias alias_name`} />
  </section>

  {/* PERSISTENT VARIABLES */}

  <section>
    <h2>6. Persistent Environment Variables</h2>

    <p>
      Environment variables disappear after closing the terminal. To persist
      them, add them to <b>.bashrc</b> or <b>.bash_profile</b>.
    </p>

    <CodeBlock language="bash" code={`export VARIABLE_NAME=value`} />

    <p>Apply changes immediately:</p>

    <CodeBlock language="bash" code={`source ~/.bashrc`} />
  </section>

  {/* SYSTEM COMMANDS */}

  <section>
    <h2>7. System Commands</h2>

    <h3>System Time</h3>

    <p>
      <b>time</b> shows how long a command takes to execute.
    </p>

    <CodeBlock language="bash" code={`time command`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`time ls`} />

    <h3>Monitoring System</h3>

    <p>
      <b>top</b> displays running processes and system statistics.
    </p>

    <CodeBlock language="bash" code={`top`} />
  </section>

  {/* REMOTE OPERATIONS */}

  <section>
    <h2>8. Remote Operations</h2>

    <p>
      <b>ssh</b> (Secure Shell) allows secure remote login and command
      execution.
    </p>

    <CodeBlock language="bash" code={`ssh username@hostname`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`ssh user@localhost`} />
  </section>

  {/* SYSTEM CONTROL */}

  <section>
    <h2>9. System Control</h2>

    <h3>Shutdown System</h3>

    <CodeBlock language="bash" code={`poweroff`} />

    <h3>Reboot System</h3>

    <CodeBlock language="bash" code={`reboot`} />
  </section>

  {/* FILE COMPARISON */}

  <section>
    <h2>10. File Comparison</h2>

    <p>
      <b>diff</b> compares two files and shows the differences.
    </p>

    <CodeBlock language="bash" code={`diff file1 file2`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`diff text1.txt text2.txt`} />
  </section>

  {/* SUMMARY */}

  <section>
    <h2>11. Summary</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Command</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>ping</td>
          <td style={{ padding: "10px" }}>Checks network connectivity</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>traceroute</td>
          <td style={{ padding: "10px" }}>Shows route of packets</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>ifconfig</td>
          <td style={{ padding: "10px" }}>Shows network interface info</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>env</td>
          <td style={{ padding: "10px" }}>Lists environment variables</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>alias</td>
          <td style={{ padding: "10px" }}>Creates command shortcut</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>time</td>
          <td style={{ padding: "10px" }}>Measures command execution time</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>top</td>
          <td style={{ padding: "10px" }}>Monitors system processes</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>ssh</td>
          <td style={{ padding: "10px" }}>Remote login to another system</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>poweroff</td>
          <td style={{ padding: "10px" }}>Shutdown system</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>reboot</td>
          <td style={{ padding: "10px" }}>Restart system</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>diff</td>
          <td style={{ padding: "10px" }}>Compare two files</td>
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

export default Miscellaneous_Commands_CS_2;
