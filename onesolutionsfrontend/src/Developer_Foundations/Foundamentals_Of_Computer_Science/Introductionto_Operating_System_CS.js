import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Operating_System_CS = ({
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
    <div>
    <div className="intro-container">
  <h1>Introduction to Operating System | Cheat Sheet</h1>

  <section>
    <h2>1. Operating System</h2>

    <p>
      An <b>Operating System (OS)</b> is an interface between
      <b> hardware</b> and <b>software</b>.
    </p>

      <img
          src="/assets/img/OS.png"
          alt="software"
          style={{ width: "70%", height: "330px" }}
        />
  </section>

  {/* BOOT PROCESS */}

  <section>
    <h2>2. Boot Process</h2>

    <ul>
      <li>Computer Power ON</li>
      <li>Power On Self Test (POST) checks hardware</li>
      <li>BIOS selects boot device (HDD / USB / CD)</li>
      <li>Boot loader loads the Operating System</li>
      <li>OS Kernel starts and prepares the system</li>
    </ul>
      <img
          src="/assets/img/boot.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* OS KERNEL */}

  <section>
    <h2>3. OS Kernel</h2>

    <p>
      Kernel is the <b>core component</b> of the operating system.
    </p>

    <ul>
      <li>Users do not interact directly with the kernel</li>
      <li>Kernel interacts directly with hardware</li>
      <li>Manages hardware resources</li>
    </ul>
      <img
          src="/assets/img/OS-kernel.png"
          alt="software"
          style={{ width: "60%", height: "400px" }}
        />
  </section>

  {/* LINUX KERNEL */}

  <section>
    <h2>4. Linux Kernel</h2>

    <p>
      Linux is a free and open-source OS kernel developed by
      <b> Linus Torvalds</b>.
    </p>

    <p>
      Operating systems based on the Linux kernel are called
      <b> Linux Distributions (Linux Distros)</b>.
    </p>
      <img
          src="/assets/img/linux-k.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* COMPONENTS OF OS */}

  <section>
    <h2>5. Components of Operating System</h2>

    <ul>
      <li>Userspace</li>
      <li>Kernel</li>
    </ul>

    <p>
      Applications interact with the kernel, and the kernel communicates
      with hardware.
    </p>
      <img
          src="/assets/img/compo-os.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* USERSPACE */}

  <section>
    <h2>6. Userspace</h2>

    <p>
      Userspace includes everything outside the kernel.
    </p>

    <p>Examples:</p>

    <ul>
      <li>Text Editors</li>
      <li>Music Players</li>
      <li>Graphical User Interface (GUI)</li>
      <li>User Applications</li>
    </ul>
      <img
          src="/assets/img/user-space.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* RESPONSIBILITIES */}

  <section>
    <h2>7. Responsibilities of OS</h2>

    <h3>7.1 Abstraction</h3>

    <p>
      Abstraction hides complex hardware details and provides simple
      interfaces to applications.
    </p>

    <ul>
      <li>Hides internal hardware complexity</li>
      <li>Provides common APIs to applications</li>
      <li>Simplifies application development</li>
    </ul>

    <h3>7.2 Resource Management</h3>

    <p>
      OS manages hardware resources such as CPU, memory, and power.
    </p>

    <ul>
      <li>Allocates resources fairly</li>
      <li>Ensures efficient usage</li>
      <li>Prevents misuse of resources</li>
    </ul>

    <h3>7.3 Isolation and Protection</h3>

    <ul>
      <li>Applications run independently</li>
      <li>Failure of one application does not affect others</li>
    </ul>

    <h3>7.4 Multi-User System</h3>

    <p>
      Multiple users can access the system simultaneously.
    </p>
      <img
          src="/assets/img/multi-user.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* MEMORY MANAGEMENT */}

  <section>
    <h2>8. Memory Management</h2>

    <p>
      OS decides how much memory each application can use.
    </p>

    <p>
      It allocates both <b>RAM</b> and <b>CPU resources</b>.
    </p>
      <img
          src="/assets/img/memory-manage.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* PROCESS MANAGEMENT */}

  <section>
    <h2>9. Process Management</h2>

    <p>
      OS manages multiple running programs and CPU usage.
    </p>

    <p>
      CPU switches between processes quickly using
      <b> time slicing</b>.
    </p>

    <p>
      A time slice is a short time interval allocated for CPU execution.
    </p>
  </section>

  {/* FILE */}

  <section>
    <h2>10. File</h2>

    <p>
      A file is a collection of related information stored on storage media.
    </p>
  </section>

  {/* FILE EXTENSIONS */}

  <section>
    <h2>11. File Extensions</h2>

    <p>File extensions indicate file type.</p>

    <p><b>Examples:</b></p>

    <ul>
      <li>Images: .jpeg, .png, .tiff</li>
      <li>Videos: .mp4, .mov</li>
      <li>Documents: .html, .js, .py, .docx, .txt</li>
    </ul>
  </section>

  {/* FILES AND FOLDERS */}

  <section>
    <h2>12. Files and Folders</h2>

    <p>
      Files are organized inside folders.
    </p>

    <p>
      Folder hierarchy continues until reaching the root location.
    </p>

    <ul>
      <li>Windows Root → C:\</li>
      <li>Linux/macOS Root → /</li>
    </ul>

    
  </section>

  {/* FILE PATH */}

  <section>
    <h2>13. File Path</h2>

    <p>
      File path specifies the exact location of a file in the system.
    </p>

    <p>
      Folder names are separated using slashes.
    </p>
      <img
          src="/assets/img/file-path.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* FILE SYSTEM */}

  <section>
    <h2>14. File System</h2>

    <p>
      The kernel manages file storage using a file system.
    </p>

    <p>Three components:</p>

    <ul>
      <li>File System</li>
      <li>File Data</li>
      <li>File Metadata</li>
    </ul>
  </section>

  {/* FILE DATA */}

  <section>
    <h2>15. File Data</h2>

    <p>
      File data is stored in blocks on the disk.
    </p>

    <CodeBlock
      language="text"
      code={`Default Block Size = 4 KB`}
    />

    <p>
      Files occupy disk space in multiples of the block size.
    </p>
  </section>

  {/* FILE CONTENT */}

  <section>
    <h2>16. File Content Types</h2>

    <ul>
      <li>Text Files</li>
      <li>Non-Text Files</li>
    </ul>

    <h3>Text Files</h3>

    <p>
      Contain plain text readable by humans.
    </p>

    <p>Example: code files, .txt files</p>

    <h3>Non-Text Files</h3>

    <p>
      Contain binary data interpreted by applications.
    </p>

    <p>Examples: Images, Audio, Video</p>
  </section>

  {/* FILE METADATA */}

  <section>
    <h2>17. File Metadata</h2>

    <p>Metadata contains information about the file.</p>

    <ul>
      <li>File Owner</li>
      <li>Permissions (Read, Write, Execute)</li>
      <li>File Size</li>
      <li>Creation Date</li>
      <li>Last Modified Date</li>
    </ul>
      <img
          src="/assets/img/meta.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* FILE SYSTEM FEATURES */}

  <section>
    <h2>18. File System Features</h2>

    <ul>
      <li>File size limits</li>
      <li>File name limits</li>
      <li>Disk usage</li>
      <li>Encryption</li>
      <li>Search capability</li>
      <li>Backup & versioning</li>
    </ul>
  </section>

  {/* CASE SENSITIVITY */}

  <section>
    <h2>19. Case Sensitivity</h2>

    <p>
      Some file systems treat uppercase and lowercase file names differently.
    </p>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>File System</th>
          <th>Case Sensitive</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ext4 (Linux)</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>NTFS (Windows)</td>
          <td>No</td>
        </tr>
        <tr>
          <td>APFS (Mac)</td>
          <td>No</td>
        </tr>
        <tr>
          <td>FAT</td>
          <td>No</td>
        </tr>
      </tbody>
    </table>
      <img
          src="/assets/img/case-sense.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>
</div>
  

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

export default Introductionto_Operating_System_CS;
