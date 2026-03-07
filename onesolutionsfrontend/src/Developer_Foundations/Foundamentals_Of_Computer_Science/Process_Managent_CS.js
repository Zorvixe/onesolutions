import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Process_Managent_CS= ({
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
  <h1>Overview of Process Management | Cheat Sheet</h1>


  <section>
    <h2>1. Process</h2>

    <p>
      A <b>process</b> is a program that is currently executing.
    </p>

    <ul>
      <li>When a program is loaded into memory it becomes a process.</li>
      <li>Each instance of a program is treated as a separate process.</li>
    </ul>

      <img
          src="/assets/img/process.png"
          alt="process"
          style={{ width: "90%", height: "400px" }}
        />
  </section>

  {/* PROCESS MEMORY */}

  <section>
    <h2>2. Process Memory</h2>

    <p>Each process has its own memory space.</p>

    <ul>
      <li>
        <b>Stack:</b> Stores temporary data such as function parameters,
        return addresses, and local variables.
      </li>

      <li>
        <b>Heap:</b> Used for dynamic memory allocation during runtime.
      </li>

      <li>
        <b>Data:</b> Stores global variables and constants.
      </li>

      <li>
        <b>Text:</b> Contains the program code being executed.
      </li>
    </ul>

      <img
          src="/assets/img/text.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* CONTEXT SWITCHING */}

  <section>
    <h2>3. Context Switching</h2>

    <p>
      Context switching occurs when the operating system switches the CPU
      from one process to another process.
    </p>
  </section>

  {/* REASONS FOR CONTEXT SWITCH */}

  <section>
    <h2>4. Reasons for Context Switching</h2>

    <ul>
      <li>A higher priority process arrives.</li>
      <li>The running process requests I/O.</li>
      <li>The running process completes execution.</li>
    </ul>
  </section>

  {/* PROCESS STATES */}

  <section>
    <h2>5. Process States</h2>

    <p>A process moves through different states during its lifecycle.</p>

    <ul>
      <li>
        <b>New:</b> Process is created.
      </li>

      <li>
        <b>Ready:</b> Process waits for CPU allocation.
      </li>

      <li>
        <b>Running:</b> Process instructions are executed by CPU.
      </li>

      <li>
        <b>Waiting:</b> Process waits for resources (I/O, user input).
      </li>

      <li>
        <b>Terminated:</b> Process finishes execution.
      </li>
    </ul>

      <img
          src="/assets/img/terminate.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* PCB */}

  <section>
    <h2>6. Process Control Block (PCB)</h2>

    <p>
      PCB is a data structure maintained by the OS for every process.
    </p>

    <p>
      It stores information such as process state, CPU registers, memory
      details, and process ID (PID).
    </p>
      <img
          src="/assets/img/control-block.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* CPU SCHEDULING */}

  <section>
    <h2>7. CPU Scheduling</h2>

    <p>
      CPU scheduling determines which process should get CPU execution.
    </p>

    <ul>
      <li>Improves system efficiency</li>
      <li>Makes CPU usage fair</li>
      <li>Ensures fast response time</li>
    </ul>
      <img
          src="/assets/img/cpu-scheduling.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* SCHEDULING ALGORITHMS */}

  <section>
    <h2>8. CPU Scheduling Algorithms</h2>

    <ul>
      <li>First Come First Serve (FCFS)</li>
      <li>Shortest Job First (SJF)</li>
      <li>Priority Scheduling</li>
      <li>Round Robin Scheduling</li>
    </ul>
  </section>

  {/* SCHEDULING TERMS */}

  <section>
    <h2>9. CPU Scheduling Terminology</h2>

    <ul>
      <li>
        <b>Arrival Time:</b> Time when process enters ready queue.
      </li>

      <li>
        <b>Completion Time:</b> Time when process finishes execution.
      </li>

      <li>
        <b>Burst Time:</b> Time required by CPU to execute process.
      </li>

      <li>
        <b>Turnaround Time:</b> Total time spent by process in system.
      </li>

      <li>
        <b>Waiting Time:</b> Time process spends waiting in ready queue.
      </li>
    </ul>
  </section>

  {/* FCFS */}

  <section>
    <h2>10. First Come First Serve (FCFS)</h2>

    <p>
      The process that arrives first gets executed first.
    </p>

    <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Process</th>
          <th>Arrival Time</th>
          <th>Burst Time</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>P1</td>
          <td>0</td>
          <td>21</td>
        </tr>

        <tr>
          <td>P2</td>
          <td>1</td>
          <td>3</td>
        </tr>

        <tr>
          <td>P3</td>
          <td>2</td>
          <td>6</td>
        </tr>

        <tr>
          <td>P4</td>
          <td>3</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>

    <p>The process p1, p2, p3, and p4 are schedule with First Come First Serve are as follows.</p>
      <img
          src="/assets/img/first-come.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* SJF */}

  <section>
    <h2>11. Shortest Job First (SJF)</h2>

    <p>
      Shortest Job First(SJF) scheduling works on the process with the shortest burst time or duration first
    </p>
     <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Process</th>
          <th>Arrival Time</th>
          <th>Burst Time</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>P1</td>
          <td>0</td>
          <td>21</td>
        </tr>

        <tr>
          <td>P2</td>
          <td>1</td>
          <td>3</td>
        </tr>

        <tr>
          <td>P3</td>
          <td>2</td>
          <td>6</td>
        </tr>

        <tr>
          <td>P4</td>
          <td>0</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
    <p>The shortest job first scheduling for process p1, p2, p3, and p4 is as follows.</p>
     <img
          src="/assets/img/SJF.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* PRIORITY */}

 <section>
  <h2>12. Priority Scheduling</h2>

  <p>
    Priority Scheduling Algorithm selects the process with the
    <b> highest priority</b> for execution.
  </p>

  <p>
    If two processes have the same priority, they are executed using
    <b> First Come First Serve (FCFS)</b>.
  </p>

  <h3>Example</h3>

  <table
    border="1"
    cellPadding="6"
    style={{ borderCollapse: "collapse", width: "100%" }}
  >
    <thead>
      <tr>
        <th>Process</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
        <th>Priority</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>P1</td>
        <td>0</td>
        <td>21</td>
        <td>2</td>
      </tr>

      <tr>
        <td>P2</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
      </tr>

      <tr>
        <td>P3</td>
        <td>2</td>
        <td>6</td>
        <td>4</td>
      </tr>

      <tr>
        <td>P4</td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </tbody>
  </table>
  <p>The processes(p1, p2, p3, and p4) scheduled based on Priority Scheduling are as follows.</p>
    <img
          src="/assets/img/priority.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
</section>



{/* ROUND ROBIN */}

<section>
  <h2>13. Round Robin Scheduling</h2>

  <p>
    In Round Robin Scheduling, each process is given a fixed amount of
    CPU time called a <b>Time Slice</b> or <b>Time Quantum</b>.
  </p>

  <p>
    After the time slice expires, the CPU switches to the next process in
    the queue.
  </p>

  <h3>Example</h3>

  <table
    border="1"
    cellPadding="6"
    style={{ borderCollapse: "collapse", width: "100%" }}
  >
    <thead>
      <tr>
        <th>Process</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>P1</td>
        <td>0</td>
        <td>21</td>
      </tr>

      <tr>
        <td>P2</td>
        <td>1</td>
        <td>3</td>
      </tr>

      <tr>
        <td>P3</td>
        <td>2</td>
        <td>6</td>
      </tr>

      <tr>
        <td>P4</td>
        <td>3</td>
        <td>2</td>
      </tr>
    </tbody>
  </table>

  <p>
    Suppose the <b>Time Slice = 5 units</b>. Each process will execute for
    5 units before the CPU switches to the next process.
  </p>
    <img
          src="/assets/img/round-robbin.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
</section>
  {/* IPC */}

  <section>
    <h2>14. Inter Process Communication (IPC)</h2>

    <p>
      IPC allows processes to communicate and share data with each other.
    </p>

    <h3>Communication Methods</h3>

    <ul>
      <li>Shared Memory</li>
      <li>Message Passing</li>
    </ul>

    <h3>Shared Memory</h3>

    <p>
      A memory region is shared between processes for communication.
    </p>

    <h3>Message Passing</h3>

    <p>
      Processes exchange messages to communicate with each other.
    </p>
      <img
          src="/assets/img/mess-pass.png"
          alt="software"
          style={{ width: "60%", height: "400px" }}
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

export default Process_Managent_CS;
