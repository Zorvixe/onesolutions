import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed



const Miscellaneous_Commands_CS_1 = ({
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
  <h1>Miscellaneous Commands - 1 | Cheat Sheet</h1>

  {/* SUPER USER */}

  <section>
    <h2>1. Super User & File Permissions</h2>
    <h3>Linux Users</h3>

    <p>
      The <b>root user</b>, also called the <b>superuser</b> or administrator,
      has access to all commands and files in Linux.
    </p>

    <h3>sudo Command</h3>

    <p>
      The <b>sudo</b> command temporarily gives administrative privileges
      to execute sensitive commands.
    </p>

    <CodeBlock language="bash" code={`sudo command`} />
  </section>

  {/* WHICH */}

  <section>
    <h2>2. Executable Path</h2>

    <p>
      <b>which</b> command is used to locate the executable path of a command.
    </p>

    <CodeBlock language="bash" code={`which command`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`which sudo`} />
  </section>

  {/* USER MANAGEMENT */}

  <section>
    <h2>3. User Management</h2>

    <h3>Create New User</h3>

    <CodeBlock language="bash" code={`sudo useradd username`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`sudo useradd abhi`} />

    <h3>Set / Change Password</h3>

    <CodeBlock language="bash" code={`sudo passwd username`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`sudo passwd abhi`} />

    <h3>Execute Command as Another User</h3>

    <CodeBlock language="bash" code={`su user`} />

    <CodeBlock language="bash" code={`su -c command user`} />
  </section>

  {/* FILE PERMISSIONS */}

  <section>
    <h2>4. File Permissions</h2>

    <h3>Authorization Levels</h3>

    <p>
      Linux multi-user systems provide two levels of security:
    </p>

    <ul>
      <li>Ownership</li>
      <li>Permissions</li>
    </ul>

    <h3>User Ownership Types</h3>

    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Type</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>Owner</td>
          <td style={{ padding: "10px" }}>User who owns the file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Group</td>
          <td style={{ padding: "10px" }}>
            Group of users with specific permissions
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Others</td>
          <td style={{ padding: "10px" }}>
            Users who are not owner or group members
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Permission Types</h3>

    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Permission</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>Read</td>
          <td style={{ padding: "10px" }}>Open and read a file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Write</td>
          <td style={{ padding: "10px" }}>Modify file contents</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Execute</td>
          <td style={{ padding: "10px" }}>Run file as a program</td>
        </tr>
      </tbody>
    </table>

     <img
          src="/assets/img/file-per.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* CHMOD */}

  <section>
    <h2>5. Changing Permissions</h2>

    <CodeBlock language="bash" code={`chmod permissions filename`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`chmod 764 sample.txt`} />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        <b>chmod</b> stands for <b>change mode</b>.
      </p>
    </div>
    <br/>

    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Number</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Binary</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Symbol</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Permission</th>
        </tr>
      </thead>

      <tbody>
        <tr><td style={{ padding: "10px" }}>0</td><td style={{ padding: "10px" }}>000</td><td style={{ padding: "10px" }}>---</td><td style={{ padding: "10px" }}>No Permission</td></tr>
        <tr><td style={{ padding: "10px" }}>1</td><td style={{ padding: "10px" }}>001</td><td style={{ padding: "10px" }}>--x</td><td style={{ padding: "10px" }}>Execute</td></tr>
        <tr><td style={{ padding: "10px" }}>2</td><td style={{ padding: "10px" }}>010</td><td style={{ padding: "10px" }}>-w-</td><td style={{ padding: "10px" }}>Write</td></tr>
        <tr><td style={{ padding: "10px" }}>3</td><td style={{ padding: "10px" }}>011</td><td style={{ padding: "10px" }}>-wx</td><td style={{ padding: "10px" }}>Write + Execute</td></tr>
        <tr><td style={{ padding: "10px" }}>4</td><td style={{ padding: "10px" }}>100</td><td style={{ padding: "10px" }}>r--</td><td style={{ padding: "10px" }}>Read</td></tr>
        <tr><td style={{ padding: "10px" }}>5</td><td style={{ padding: "10px" }}>101</td><td style={{ padding: "10px" }}>r-x</td><td style={{ padding: "10px" }}>Read + Execute</td></tr>
        <tr><td style={{ padding: "10px" }}>6</td><td style={{ padding: "10px" }}>110</td><td style={{ padding: "10px" }}>rw-</td><td style={{ padding: "10px" }}>Read + Write</td></tr>
        <tr><td style={{ padding: "10px" }}>7</td><td style={{ padding: "10px" }}>111</td><td style={{ padding: "10px" }}>rwx</td><td style={{ padding: "10px" }}>Read + Write + Execute</td></tr>
      </tbody>
    </table>
  </section>

  {/* CHOWN */}

  <section>
    <h2>6. Changing Ownership</h2>

    <CodeBlock language="bash" code={`sudo chown user filename`} />

    <CodeBlock language="bash" code={`sudo chown root sample.txt`} />

    <p>Change user and group:</p>

    <CodeBlock language="bash" code={`sudo chown user:group filename`} />
  </section>

  {/* PACKAGE MANAGER */}

  <section>
    <h2>7. Package Managers</h2>

    <h3>APT (Linux)</h3>

    <CodeBlock language="bash" code={`sudo apt install package_name`} />

    <h3>brew (macOS)</h3>

    <CodeBlock language="bash" code={`brew install package_name`} />

    <h3>yum (RedHat Linux)</h3>

    <CodeBlock language="bash" code={`yum package_name`} />
  </section>

  {/* DOWNLOADING FILES */}

 {/* DOWNLOADING FILES */}

<section>
  <h2>Downloading Files From Web</h2>

  <h3>wget</h3>

  <p>
    <b>wget</b> is a command-line utility used to download files from the web.
  </p>

  <h4>Install wget</h4>

  <p>Using apt:</p>
  <CodeBlock language="bash" code={`sudo apt install wget`} />

  <p>Using brew:</p>
  <CodeBlock language="bash" code={`sudo brew install wget`} />

  <p>Using yum:</p>
  <CodeBlock language="bash" code={`sudo yum install wget`} />

  <p>
    wget downloads the resource specified in the URL to the current directory.
  </p>

  <h4>Syntax</h4>

  <CodeBlock language="bash" code={`wget "URL"`} />

  <h4>Example</h4>

  <CodeBlock
    language="bash"
    code={`wget "https://www.lifewire.com/uses-of-command-wget-2201085"`}
  />
</section>

{/* CURL */}

<section>
  <h3>curl</h3>

  <p>
    <b>curl</b> is a command-line utility used to transfer data from or to a
    server.
  </p>

  <h4>Install curl</h4>

  <p>Using apt:</p>
  <CodeBlock language="bash" code={`sudo apt install curl`} />

  <p>Using brew:</p>
  <CodeBlock language="bash" code={`sudo brew install curl`} />

  <p>Using yum:</p>
  <CodeBlock language="bash" code={`sudo yum install curl`} />

  <p>
    curl prints the contents of the URL directly in the terminal output.
  </p>

  <h4>Syntax</h4>

  <CodeBlock language="bash" code={`curl "URL"`} />

  <h4>Example</h4>

  <CodeBlock language="bash" code={`curl "wttr.in"`} />
</section>

{/* SEARCH PACKAGE */}

<section>
  <h2>Searching a Package</h2>

  <p>
    <b>apt-cache</b> command is used to search for packages available in
    repositories.
  </p>

  <h4>Syntax</h4>

  <CodeBlock language="bash" code={`sudo apt-cache search package_name`} />

  <h4>Example</h4>

  <CodeBlock language="bash" code={`apt-cache search google`} />
</section>

{/* UPDATING PACKAGES */}

<section>
  <h2>Updating Packages</h2>

  <p>
    The system checks repositories to see if newer versions of installed
    programs are available.
  </p>

  <h3>update</h3>

  <p>
    Updates the package list and information about available package versions.
  </p>

  <CodeBlock language="bash" code={`sudo apt update`} />

  <h3>upgrade</h3>

  <p>Upgrades installed packages to the latest versions.</p>

  <CodeBlock language="bash" code={`sudo apt upgrade`} />
</section>

{/* LIST INSTALLED PACKAGES */}

<section>
  <h2>Listing Installed Packages</h2>

  <p>
    <b>dpkg -l</b> lists all installed packages in the system.
  </p>

  <CodeBlock language="bash" code={`sudo dpkg -l`} />
</section>

{/* ADDING REPOSITORY */}

<section>
  <h2>Adding Repository</h2>

  <p>
    <b>PPA (Personal Package Archive)</b> allows installing packages from
    third-party repositories.
  </p>

  <h3>add-apt-repository</h3>

  <p>Used to add a repository.</p>

  <CodeBlock
    language="bash"
    code={`sudo add-apt-repository repository_link`}
  />

  <h3>Adding Security Key</h3>

  <p>
    Linux verifies packages using a security key to ensure authenticity.
  </p>

  <CodeBlock language="bash" code={`sudo apt-key add - KEY_ID`} />
</section>

{/* REMOVE PACKAGE */}

<section>
  <h2>Removing a Package</h2>

  <p>
    <b>apt remove</b> removes an installed package from the system.
  </p>

  <h4>Syntax</h4>

  <CodeBlock language="bash" code={`sudo apt remove package_name`} />
</section>

  {/* PACKAGE COMMANDS */}

  <section>
    <h2>9. Package Management Commands</h2>

    <CodeBlock language="bash" code={`sudo apt update`} />
    <CodeBlock language="bash" code={`sudo apt upgrade`} />
    <CodeBlock language="bash" code={`sudo apt remove package_name`} />
    <CodeBlock language="bash" code={`sudo dpkg -l`} />
  </section>

  {/* SUMMARY */}

  <section>
    <h2>10. Summary</h2>

    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Command</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr><td style={{ padding: "10px" }}>sudo</td><td style={{ padding: "10px" }}>Temporarily elevates privileges</td></tr>
        <tr><td style={{ padding: "10px" }}>which</td><td style={{ padding: "10px" }}>Locate executable path</td></tr>
        <tr><td style={{ padding: "10px" }}>useradd</td><td style={{ padding: "10px" }}>Create new user</td></tr>
        <tr><td style={{ padding: "10px" }}>passwd</td><td style={{ padding: "10px" }}>Set or change password</td></tr>
        <tr><td style={{ padding: "10px" }}>su</td><td style={{ padding: "10px" }}>Execute command as another user</td></tr>
        <tr><td style={{ padding: "10px" }}>chmod</td><td style={{ padding: "10px" }}>Change file permissions</td></tr>
        <tr><td style={{ padding: "10px" }}>chown</td><td style={{ padding: "10px" }}>Change file ownership</td></tr>
        <tr><td style={{ padding: "10px" }}>apt</td><td style={{ padding: "10px" }}>Package manager for Linux</td></tr>
        <tr><td style={{ padding: "10px" }}>wget</td><td style={{ padding: "10px" }}>Download files from web</td></tr>
        <tr><td style={{ padding: "10px" }}>curl</td><td style={{ padding: "10px" }}>Transfer data from/to server</td></tr>
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

export default Miscellaneous_Commands_CS_1;
