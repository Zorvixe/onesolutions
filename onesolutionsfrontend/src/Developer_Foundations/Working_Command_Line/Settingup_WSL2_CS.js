import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed


const Settingup_WSL2_CS = ({
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
  <h1>Setting Up WSL2 Manual | Cheat Sheet</h1>

  {/* INTRO */}

  <section>
    <h2>1. Setting Up WSL2 Ubuntu Terminal on Windows</h2>

    <p>
      This guide explains how to install and configure
      <b> WSL2 (Windows Subsystem for Linux)</b> on Windows 10 so that
      you can use an Ubuntu command-line environment.
    </p>
  </section>

  {/* SYSTEM REQUIREMENTS */}

  <section>
    <h2>2. System Requirements</h2>

    <p>The following hardware requirements are needed to install WSL2:</p>

    <ul>
      <li>64-bit processor with Second Level Address Translation (SLAT)</li>
      <li>Intel VT-x or AMD-V virtualization support</li>
      <li>Minimum 4 GB RAM</li>
      <li>Virtualization enabled in BIOS settings</li>
      <li>Windows 10 Version 1903 or later</li>
      <li>Build 18363.1049 or higher</li>
      <li>Minimum 15 GB free space on C: drive</li>
    </ul>
  </section>

  {/* QUICK TIP */}

  <section>
     <div className="Quick-Tip-container">
        <div className="icon-note">
          <h6>
            <i class="bi bi-lightbulb"></i>Pro Tip:
          </h6>
        </div>
    <p>To check Windows version and build number:</p>
    <CodeBlock language="text" code={`Press: Windows + R`} />
    <p>Then type:</p>
    <CodeBlock language="text" code={`winver`} />
    <p>Click <b>OK</b>.</p>
     </div>
  </section>

  {/* NOTE */}
<br/>
  <section>
    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i> Note
        </h6>
      </div>

      <p>
        If your Windows version is older, open <b>Settings → Update &
        Security → Check for Updates</b>. Install all updates and restart
        the system if required.
      </p>
    </div>
  </section>

  {/* SETUP WSL */}

  <section>
    <h2>4. Setup WSL</h2>

    <h3>Enable WSL Feature</h3>

    <p>Open <b>PowerShell as Administrator</b> and run:</p>

    <CodeBlock
      language="powershell"
      code={`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`}
    />
  </section>

  {/* VIRTUAL MACHINE */}

  <section>
    <h2>5. Enable Virtual Machine Platform</h2>

    <p>
      Enable the <b>Virtual Machine Platform</b> feature. Make sure
      virtualization is enabled in BIOS.
    </p>

    <p>You can verify virtualization in <b>Task Manager</b>.</p>

    <p>Run the following command in PowerShell:</p>

    <CodeBlock
      language="powershell"
      code={`dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`}
    />

    <p>Restart your computer after running the command.</p>
  </section>

  {/* DOWNLOAD KERNEL */}

  <section>
    <h2>6. Download WSL2 Kernel Package</h2>

    <ul>
      <li>Download the latest WSL2 Linux kernel update package</li>
      <li>Install the package by double-clicking it</li>
      <li>Allow elevated permissions if prompted</li>
    </ul>
  </section>

  {/* DEFAULT VERSION */}

  <section>
    <h2>7. Set WSL2 as Default Version</h2>

    <p>Open PowerShell and run:</p>

    <CodeBlock language="powershell" code={`wsl --set-default-version 2`} />
  </section>

  {/* INSTALL UBUNTU */}

  <section>
    <h2>8. Install Linux Distribution</h2>

    <p>Install <b>Ubuntu</b> from the Microsoft Store.</p>

    <p>After installation:</p>

    <ul>
      <li>Open <b>Ubuntu</b> from the Start Menu</li>
      <li>Create a username</li>
      <li>Create a password</li>
    </ul>

    <p>
      These credentials will be used to log in to the WSL Ubuntu
      environment.
    </p>
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

export default Settingup_WSL2_CS;
