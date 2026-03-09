import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Memory_Managent_CS = ({
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
  <h1>Memory Management | Cheat Sheet</h1>

  {/* MEMORY MANAGEMENT */}

  <section>
    <h2>1. Memory Management</h2>

    <ul>
      <li>Allocates physical memory to processes</li>
      <li>Tracks allocated and available memory locations</li>
      <li>Manages virtual memory</li>
    </ul>
  </section>

  {/* TERMINOLOGY */}

  <section>
    <h2>2. Terminology</h2>

    <ul>
      <li>
        <b>Primary Memory / Main Memory / Physical Memory</b> → RAM
      </li>

      <li>
        <b>Secondary Memory</b> → Storage devices such as Hard Drives
        and SSDs
      </li>
    </ul>
  </section>

  {/* MEMORY ALLOCATION */}

  <section>
    <h2>3. Memory Allocation</h2>

    <p>
      Memory allocation is the process of assigning memory to
      computer programs.
    </p>

    <ul>
      <li>
        Each process can only access the address space allocated to it
      </li>

      <li>
        Access outside the allocated memory space is restricted
      </li>
    </ul>
     <img
          src="/assets/img/memo-allow.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />

    <p>Types of memory allocation:</p>

    <ul>
      <li>Contiguous Memory Allocation</li>
      <li>Non-Contiguous Memory Allocation</li>
    </ul>
  </section>

  {/* CONTIGUOUS MEMORY */}

  <section>
    <h2>4. Contiguous Memory Allocation</h2>

    <p>
      A single continuous block of memory is assigned to a process.
    </p>

    <p>
      Memory may also be allocated as blocks of fixed size.
    </p>
     <img
          src="/assets/img/conti-m-a.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* FRAGMENTATION */}

  <section>
    <h2>5. Fragmentation</h2>

    <p>
      Fragmentation occurs when memory is used inefficiently,
      reducing performance and capacity.
    </p>

    <p>Types of Fragmentation:</p>

    <ul>
      <li>External Fragmentation</li>
      <li>Internal Fragmentation</li>
    </ul>

    <h3>External Fragmentation</h3>

    <p>
      Enough total memory exists, but it is not contiguous,
      so allocation cannot be satisfied.
    </p>
     <img
          src="/assets/img/external-fra.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

    <h3>Internal Fragmentation</h3>

    <p>
      Allocated memory block is larger than the process
      requirement, leaving unused space.
    </p> <img
          src="/assets/img/internal-fra.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

  </section>

  {/* NON CONTIGUOUS */}

  <section>
    <h2>6. Non-Contiguous Memory Allocation</h2>

    <p>
      Memory blocks are allocated in different locations
      instead of one continuous block.
    </p>

    <ul>
      <li>Paging</li>
      <li>Segmentation</li>
    </ul>
  </section>

  {/* MMU */}

  <section>
    <h2>7. Memory Management Unit (MMU)</h2>

    <p>
      MMU is a hardware component responsible for mapping
      virtual addresses to physical addresses.
    </p>
     <img
          src="/assets/img/mmu.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
         <img
          src="/assets/img/mmu-1.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* PAGING */}

  <section>
    <h2>8. Paging</h2>

    <p>
      Logical memory is divided into fixed-size blocks called
      <b>pages</b>.
    </p>

    <p>
      Physical memory is divided into blocks called
      <b>frames</b>.
    </p>

    <p>
      Each page maps to a frame in physical memory.
    </p>
     <img
          src="/assets/img/paging.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* LOGICAL ADDRESS */}

  <section>
    <h2>9. Logical Address</h2>

    <p>A logical address contains two parts:</p>

    <ul>
      <li>Page Number</li>
      <li>Page Offset</li>
    </ul>
     <img
          src="/assets/img/logical-a.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

    <CodeBlock
      language="text"
      code={`Example:
Page Size = 1000 bytes

Logical Address = 4020
Page Number = 4
Offset = 20`}
    />
  </section>

  {/* PAGE TABLE */}

  <section>
    <h2>10. Page Table</h2>

    <p>
      Page table maps the page number referenced by the CPU
      to the frame number in physical memory.
    </p>

    <ul>
      <li>Each process has its own page table</li>
      <li>Frame number indicates where the page is stored</li>
      <li>Offset specifies the exact word location</li>
    </ul>
     <img
          src="/assets/img/page-table.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* VIRTUAL MEMORY */}

  <section>
    <h2>11. Virtual Memory</h2>

    <p>
      Virtual memory creates an illusion of larger memory
      than physically available RAM.
    </p>

    <ul>
      <li>Allows partially loaded programs to execute</li>
      <li>Logical address is also called virtual address</li>
      <li>Secondary memory acts as swap space</li>
    </ul>
     <img
          src="/assets/img/virtual-memory.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* SWAPPING */}

  <section>
    <h2>12. Swapping</h2>

    <p>
      Swapping moves processes between primary memory and
      secondary memory.
    </p>

    <ul>
      <li>
        <b>Swap In</b> → Bring process into RAM
      </li>

      <li>
        <b>Swap Out</b> → Move process to secondary storage
      </li>
    </ul>
     <img
          src="/assets/img/swapping.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* DEMAND PAGING */}

  <section>
    <h2>13. Demand Paging</h2>

    <p>
      Pages are loaded into memory only when they are needed.
    </p>

    <p>
      When a page is referenced for the first time,
      it is loaded from secondary memory.
    </p>
  </section>

  {/* PAGE REPLACEMENT */}

  <section>
    <h2>14. Page Replacement Algorithms</h2>

    <p>
      Page replacement algorithms determine which page should
      be removed when memory is full.
    </p>

    <ul>
      <li>Least Recently Used (LRU)</li>
      <li>Least Frequently Used (LFU)</li>
    </ul>

    <p>
      If the requested page exists in memory → <b>Page Hit</b>
    </p>

    <p>
      If the requested page is not in memory → <b>Page Miss / Page Fault</b>
    </p>
     <img
          src="/assets/img/PRA.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  {/* LRU */}

  <section>
    <h2>15. LRU Algorithm</h2>

    <p>
      Least Recently Used replaces the page that has not
      been used for the longest time.
    </p> <img
          src="/assets/img/LRU.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

  </section>

  {/* LFU */}

  <section>
    <h2>16. LFU Algorithm</h2>

    <p>
      Least Frequently Used replaces the page with the
      smallest number of accesses.
    </p>

    <p>
      If frequencies are equal, FIFO is used.
    </p>
     <img
          src="/assets/img/LFU.png"
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

export default Memory_Managent_CS;
