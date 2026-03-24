import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Computer_Hardware_CS = ({
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
  <h1>Overview of Computer Hardware | Cheat Sheet</h1>

  {/* COMPUTER HARDWARE */}

  <section>
    <h2>1. Computer Hardware</h2>

    <p>
      Computer hardware refers to the <b>physical components</b> required for a
      computer system to function.
    </p>
       <img
          src="/assets/img/computer.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />

    <p>
      Hardware components are categorized into:
    </p>

    <ul>
      <li>Internal Components</li>
      <li>External Components</li>
    </ul>
  </section>

  {/* INTERNAL COMPONENTS */}

  <section>
    <h2>2. Internal Components</h2>

    <p>Components found inside the CPU case:</p>

    <ul>
      <li>Motherboard</li>
      <li>Processor</li>
      <li>RAM</li>
      <li>Graphics Card (GPU)</li>
      <li>Fans</li>
      <li>Hard Disk</li>
    </ul>
  </section>

  {/* EXTERNAL COMPONENTS */}

  <section>
    <h2>3. External Components</h2>

    <p>
      External hardware components or peripherals are input/output devices.
    </p>

    <ul>
      <li>Keyboard</li>
      <li>Mouse</li>
      <li>Monitor</li>
      <li>Speakers</li>
      <li>USB Drives</li>
      <li>WebCam</li>
    </ul>
  </section>

  {/* PORTS */}

  <section>
    <h2>4. Ports</h2>

    <p>
      Ports allow different hardware components to connect to the computer.
    </p>

    <ul>
      <li>DVI</li>
      <li>VGA</li>
      <li>HDMI</li>
      <li>Display Port</li>
    </ul>

    <h3>USB Port</h3>

    <p>
      USB (Universal Serial Bus) standardizes many peripheral connections.
    </p>
       <img
          src="/assets/img/usb.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

    <p>
      It supports:
    </p>

    <ul>
      <li>Data transfer</li>
      <li>Power supply</li>
      <li>Audio/video transmission</li>
    </ul>

    <p>
      Modern devices mostly use <b>USB Type-C</b>.
    </p>
  </section>

  {/* MOTHERBOARD */}

  <section>
    <h2>5. Motherboard</h2>

    <p>
      The motherboard is the central communication backbone of the computer.
    </p>

    <p>
      All internal and external components connect through the motherboard.
    </p>
       <img
          src="/assets/img/mother.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* CPU */}

  <section>
    <h2>6. CPU (Central Processing Unit)</h2>
   <img
          src="/assets/img/cpu.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />
    <p>
      The CPU processes instructions from programs and performs calculations.
    </p>

    <p>
      It executes millions of instructions every second.
    </p>


    <h3>6.1 CPU Instruction Set</h3>

    <p>Programs are broken into simple instructions such as:</p>

    <ul>
      <li>Add two numbers</li>
      <li>Load value from memory</li>
      <li>Store value to memory</li>
    </ul>

    <h3>6.2 CPU Clock Speed</h3>

    <p>
      Clock speed measures how many instructions the CPU can execute per
      second.
    </p>

    <CodeBlock
      language="text"
      code={`1 GHz = 1 Billion instructions per second`}
    />

    <p>Higher clock speed means a faster CPU.</p>

    <h3>6.3 CPU Cores</h3>

    <p>
      A CPU core is an independent processor inside the CPU.
    </p>
       <img
          src="/assets/img/cpu-core.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />

    <p>
      Multiple cores allow parallel processing.
    </p>
  </section>

  {/* STORAGE */}

  <section>
    <h2>7. Hard Drive</h2>

    <p>
      Hard drives store permanent and temporary data.
    </p>

    <p>
      SSD (Solid State Drive) is about <b>25× faster</b> than HDD.
    </p>
       <img
          src="/assets/img/hard-core.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* RAM */}

  <section>
    <h2>8. RAM</h2>

    <p>
      RAM is temporary storage used while programs are running.
    </p>

    <p>
      RAM is measured in <b>GB</b>.
    </p>

    <p>
      RAM is <b>volatile memory</b>, meaning data is lost when power is off.
    </p>

    <p>
      RAM is much faster than other storage devices.
    </p>
       <img
          src="/assets/img/ram.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* RAM VS HARD DRIVE */}

  <section>
    <h2>9. RAM vs Hard Drive</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th>RAM</th>
          <th>Hard Drive</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Volatile Memory</td>
          <td>Non-volatile Memory</td>
        </tr>

        <tr>
          <td>Faster</td>
          <td>Relatively slower</td>
        </tr>

        <tr>
          <td>More expensive</td>
          <td>Relatively cheaper</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* REGISTERS */}

  <section>
    <h2>10. Registers</h2>

    <p>
      Registers are extremely fast storage located inside the CPU.
    </p>

    <ul>
      <li>Much faster than RAM</li>
      <li>Very small storage</li>
      <li>Used for immediate CPU operations</li>
    </ul>
  </section>

  {/* ACCESS TIMES */}

  <section>
    <h2>11. Data Access Times</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th>Storage Device</th>
          <th>Access Time</th>
          <th>Transfer Speed</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Registers</td>
          <td>&lt; 2 nanoseconds</td>
          <td>~100 GB/s</td>
        </tr>

        <tr>
          <td>RAM</td>
          <td>~100 nanoseconds</td>
          <td>~10 GB/s</td>
        </tr>

        <tr>
          <td>Hard Disk</td>
          <td>Milliseconds</td>
          <td>~1000 MB/s</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* RUNNING APPLICATIONS */}

  <section>
    <h2>12. Running Applications</h2>

    <p>
      Applications are stored in the hard drive.
    </p>

    <p>
      When running, they are loaded into RAM.
    </p>

    <p>
      The CPU loads frequently used data into registers for faster execution.
    </p>
       <img
          src="/assets/img/run-app.png"
          alt="software"
          style={{ width: "100%", height: "300px" }}
        />
  </section>

  {/* 32 BIT 64 BIT */}

  <section>
    <h2>13. 32-bit and 64-bit Systems</h2>

    <ul>
      <li>32-bit processor supports up to 4 GB RAM</li>
      <li>64-bit processor supports much larger RAM capacity</li>
    </ul>
  </section>

  {/* GPU */}

  <section>
    <h2>14. Graphics Card (GPU)</h2>

    <p>
      GPU is a specialized processor designed for graphics processing.
    </p>
       <img
          src="/assets/img/graphic-card.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

    <p>
      Used for:
    </p>

    <ul>
      <li>3D rendering</li>
      <li>Gaming</li>
      <li>Machine learning</li>
    </ul>
  </section>

  {/* CPU VS GPU */}

  <section>
    <h2>15. CPU vs GPU</h2>

    <table  className="custom-table">
      <thead>
        <tr>
          <th>CPU</th>
          <th>GPU</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Handles many types of instructions</td>
          <td>Handles specialized instructions</td>
        </tr>

        <tr>
          <td>Few cores</td>
          <td>Thousands of cores</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* BIOS */}

  <section>
    <h2>16. BIOS</h2>

    <p>
      BIOS (Basic Input Output System) initializes hardware and loads the
      operating system.
    </p>

    <p>
      It performs hardware checks during system startup.
    </p>
       <img
          src="/assets/img/BIOS.png"
          alt="software"
          style={{ width: "100%", height: "300px" }}
        />
  </section>

  {/* UEFI */}

  <section>
    <h2>17. UEFI</h2>

    <p>
      UEFI (Unified Extensible Firmware Interface) is the modern replacement
      for BIOS.
    </p>

    <ul>
      <li>Supports modern hardware</li>
      <li>Secure boot</li>
      <li>Faster boot time</li>
    </ul>
       <img
          src="/assets/img/UEFI.png"
          alt="software"
          style={{ width: "100%", height: "300px" }}
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

export default Computer_Hardware_CS;
