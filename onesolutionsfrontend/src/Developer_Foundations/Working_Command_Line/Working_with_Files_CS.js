import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed


const Working_with_Files_CS = ({
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
  <h1>Working with Files | Cheat Sheet</h1>
  {/* TEXT EDITOR */}
  <section>
    <h2>1. Text Editor</h2>
    <p>A <b>text editor</b> is used for editing text files.</p>
    <p>Common text editors:</p>
    <ul>
      <li>Notepad++</li>
      <li>Sublime Text</li>
      <li>gEdit</li>
      <li>Visual Studio Code</li>
    </ul>
  </section>

  {/* NANO EDITOR */}

  <section>
    <h2>2. Nano Editor</h2>

    <p>
      <b>Nano</b> is an easy-to-use command line text editor for Unix and Linux systems.
    </p>

    <h3>Open File</h3>

    <CodeBlock language="bash" code={`nano filename`} />

    <h3>Updating File</h3>

    <p>Add or edit text directly inside the nano editor.</p>

    <h3>Saving File</h3>

    <CodeBlock language="text" code={`Ctrl + O`} />

    <p>Press <b>Enter</b> to confirm the filename.</p>

    <h3>Exit Nano</h3>

    <CodeBlock language="text" code={`Ctrl + X`} />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        Nano shortcuts are shown at the bottom of the editor window to help you
        quickly perform operations.
      </p>
    </div>
  </section>

  {/* VIEW FILE */}

  <section>
    <h2>3. Viewing File Contents</h2>

    <CodeBlock language="bash" code={`cat filename`} />
  </section>

  {/* FILTERING */}

  <section>
    <h2>4. Filtering Commands</h2>

    <p>We can filter file contents using commands like:</p>

    <ul>
      <li>head</li>
      <li>tail</li>
      <li>grep</li>
    </ul>

    <h3>4.1 head</h3>

    <p>Prints the first <b>N</b> lines of a file.</p>

    <p>Default: first <b>10 lines</b></p>

    <CodeBlock language="bash" code={`head -2 sentences.txt`} />

    <h3>4.2 tail</h3>

    <p>Prints the last <b>N</b> lines of a file.</p>

    <p>Default: last <b>10 lines</b></p>

    <CodeBlock language="bash" code={`tail -2 sentences.txt`} />
  </section>

  {/* WORD COUNT */}

  <section>
    <h2>5. Word Count</h2>

    <p>
      <b>wc</b> command counts number of lines, words, and characters in a file.
    </p>
      <img
          src="/assets/img/word-count.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />

    <CodeBlock language="bash" code={`wc filename`} />
  </section>

  {/* PIPING */}

  <section>
    <h2>6. Piping</h2>

    <p>
      Pipe (<b>|</b>) connects multiple commands so that the output of one
      command becomes the input of another command.
    </p>

    <CodeBlock language="bash" code={`command1 | command2`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`cat sentences.txt | head -2`} />
  </section>

  {/* GREP */}

  <section>
    <h2>7. grep Command</h2>

    <p>
      <b>grep</b> searches a file for lines containing a specific pattern.
    </p>

    <CodeBlock language="bash" code={`cat filename | grep "pattern"`} />

    <p>Example:</p>

    <CodeBlock language="bash" code={`cat sentences.txt | grep "morning"`} />
  </section>

  {/* OUTPUT REDIRECTION */}

  <section>
    <h2>8. Output Redirection</h2>

    <p>
      <b>{">"}</b> redirects output of a command into a file.
    </p>

    <CodeBlock language="bash" code={`command > filename`} />

    <p>Example:</p>

    <CodeBlock
      language="bash"
      code={`cat sentences.txt | head -2 > learnings.txt`}
    />
  </section>

  {/* COMPRESSION */}

  <section>
    <h2>9. Compressing Files</h2>

    <p>
      File compression reduces the number of bits needed to store data.
    </p>

    <p>Advantages:</p>

    <ul>
      <li>Less disk space</li>
      <li>Faster file transfer</li>
    </ul>

    <p>Common formats:</p>

    <ul>
      <li>gzip</li>
      <li>zip</li>
      <li>tar</li>
    </ul>
      <img
          src="/assets/img/compres.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* TAR */}

  <section>
    <h2>10. tar Command</h2>

    <h3>Compression</h3>

    <CodeBlock
      language="bash"
      code={`tar -czvf file-name.tar.gz path1 path2`}
    />

    <p>Example:</p>

    <CodeBlock
      language="bash"
      code={`tar -czvf my_collection.tar.gz videos report.txt`}
    />

    <h3>Extract Files</h3>

    <CodeBlock
      language="bash"
      code={`tar -xzvf filename.tar.gz -C path`}
    />

    <p>Example:</p>

    <CodeBlock
      language="bash"
      code={`tar -xzvf my_collection.tar.gz -C collections`}
    />
  </section>

  {/* ZIP */}

  <section>
    <h2>11. zip Command</h2>

    <p>Packages multiple files into a .zip archive.</p>

    <CodeBlock
      language="bash"
      code={`zip -r collections.zip videos report.txt`}
    />
  </section>

  {/* UNZIP */}

  <section>
    <h2>12. unzip Command</h2>

    <p>Extracts files from a ZIP archive.</p>

    <CodeBlock
      language="bash"
      code={`unzip collections.zip -d new-folder`}
    />
  </section>

  {/* SUMMARY */}

  <section>
    <h2>13. Summary</h2>

    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Command</th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>head</td>
          <td style={{ padding: "10px" }}>Prints first N lines of a file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>tail</td>
          <td style={{ padding: "10px" }}>Prints last N lines of a file</td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>wc</td>
          <td style={{ padding: "10px" }}>
            Counts lines, words and characters
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>grep</td>
          <td style={{ padding: "10px" }}>
            Searches for a specific pattern in files
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>tar</td>
          <td style={{ padding: "10px" }}>
            Compresses files and directories
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>zip</td>
          <td style={{ padding: "10px" }}>
            Packages files into a .zip archive
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>unzip</td>
          <td style={{ padding: "10px" }}>
            Extracts files from ZIP archive
          </td>
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

export default Working_with_Files_CS;
