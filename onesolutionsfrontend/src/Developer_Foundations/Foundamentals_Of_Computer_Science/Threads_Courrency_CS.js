import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Threads_Courrency_CS= ({
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
  <h1>Threads & Concurrency | Cheat Sheet</h1>

  {/* PROCESS EXECUTION */}

  <section>
    <h2>1. Process Execution State</h2>

    <p>
      The <b>Program Counter</b> determines the next instruction to be executed.
    </p>

    <p>
      This results in a sequence of instructions often referred to as a
      <b> thread of execution</b>.
    </p>

      <img
          src="/assets/img/PES.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* THREADS */}

  <section>
    <h2>2. Threads</h2>

    <p>
      A <b>thread</b> is the sequential flow of control within a process.
    </p>

    <p>Each thread contains:</p>

    <ul>
      <li>Program Counter</li>
      <li>Register Set</li>
      <li>Stack Space</li>
    </ul>
     
  </section>

  {/* MULTITHREADED PROCESS */}

  <section>
    <h2>3. Multi-Threaded Process</h2>

    <p>
      A process can contain multiple threads.
    </p>

    <p>
      Each thread may run on a different CPU core, allowing better
      utilization of multi-core processors.
    </p>
     <img
          src="/assets/img/multi.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

     <section>
    <h2>Single-Thread Process</h2>
     <img
          src="/assets/img/single-thread.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>

  {/* PROCESS VS THREADS */}

  <section>
    <h2>4. Process vs Threads</h2>

    <ul>
      <li>Threads are lightweight.</li>
      <li>Threads are faster to create and terminate.</li>
      <li>Context switching between threads is faster.</li>
      <li>Communication between threads is quicker.</li>
    </ul>
  </section>

  {/* EXAMPLES */}

  <section>
    <h2>5. Example</h2>

    <h3>Google Chrome</h3>

    <ul>
      <li>Browser Process – Core browser control</li>
      <li>Render Process – Web page rendering</li>
      <li>Plugin Processes</li>
      <li>GPU Process – Graphics processing</li>
    </ul>

    <p>
      Each browser tab runs as a separate process in Chrome.
    </p>

    <p>
      Example: 10 tabs → 10 processes
    </p>
      <img
          src="/assets/img/google.png"
          alt="software"
          style={{ width: "60%", height: "430px" }}
        />

    <h3>Mozilla Firefox</h3>

    <p>
      Firefox uses fewer processes and runs multiple tabs as threads
      within those processes.
    </p>

    <p>
      This reduces memory usage compared to Chrome.
    </p>
  </section>

  {/* ADVANTAGES */}

  <section>
    <h2>6. Advantages of Multi-Threading</h2>

    <ul>
      <li>Improved responsiveness</li>
      <li>Resource sharing</li>
      <li>Lower overhead</li>
      <li>Better utilization of multi-core processors</li>
    </ul>
  </section>

  {/* CONCURRENCY */}

  <section>
    <h2>7. Thread Concurrency</h2>

    <p>
      Concurrency refers to multiple threads executing simultaneously.
    </p>

    <p>
      It occurs when several threads run in parallel or overlap in
      execution.
    </p>

    <h3>Advantages</h3>

    <ul>
      <li>Responsive applications</li>
      <li>Better performance</li>
      <li>Efficient resource utilization</li>
    </ul>

    <h3>Disadvantages</h3>

    <p>
      Multi-threaded programs are harder to develop and debug.
    </p>
  </section>

  {/* CONCURRENCY ISSUE */}

  <section>
    <h2>8. Concurrency Issue Example</h2>

    <CodeBlock
      language="python"
      code={`def transfer_amount(u1, u2, amt):
    b1 = get_balance(u1)
    b2 = get_balance(u2)

    b1 -= amt
    b2 += amt

    update_balance(u1, b1)
    update_balance(u2, b2)

transfer_amount(u1, u2, 1000)`}
    />

    <p>
      If another thread interrupts execution during the transaction,
      inconsistent results may occur.
    </p>
  </section>

  {/* CRITICAL SECTION */}

  <section>
    <h2>9. Critical Section</h2>

    <p>
      A <b>critical section</b> is a part of code where shared resources
      are accessed.
    </p>

    <p>
      Only one thread should execute this section at a time.
    </p>

    <h3>Solution</h3>

    <ul>
      <li>Use locks</li>
      <li>Ensure mutual exclusion</li>
    </ul>

    <p>Threads must:</p>

    <ul>
      <li>Acquire lock before entering critical section</li>
      <li>Release lock after leaving the section</li>
    </ul>
  </section>

  {/* DEADLOCK */}

  <section>
    <h2>10. Deadlock</h2>

    <p>
      Deadlock occurs when processes are blocked because each process
      holds a resource and waits for another resource held by another
      process.
    </p>
      <img
          src="/assets/img/dead-lock.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
  </section>


  {/* DEADLOCK CONDITIONS */}

  <section>
    <h2>11. Deadlock Conditions</h2>

    <ul>
      <li>
        <b>Mutual Exclusion</b> – Only one process can use a resource at a time.
      </li>

      <li>
        <b>Hold and Wait</b> – Process holds a resource while waiting for another.
      </li>

      <li>
        <b>No Preemption</b> – Resources cannot be forcibly taken from a process.
      </li>

      <li>
        <b>Circular Wait</b> – Processes wait for each other in a circular chain.
      </li>
    </ul>
  </section>

  {/* DEADLOCK SOLUTION */}

  <section>
    <h2>12. Dealing with Deadlock</h2>

    <ul>
      <li>Avoid deadlocks by breaking one of the deadlock conditions.</li>
      <li>Detect deadlocks and recover from them.</li>
    </ul>
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

export default Threads_Courrency_CS;
