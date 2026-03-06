import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Understaing_Binary_CS = ({
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
    <h1>Understanding Binary | Cheat Sheet</h1>

    {/* BINARY REPRESENTATION */}

    <section>
      <h2>1. Binary Representation</h2>

      <p>
        A binary number is a number expressed in <b>Ones (1)</b> and{" "}
        <b>Zeros (0)</b>.
      </p>
         <img
          src="/assets/img/binary.png"
          alt="binary"
          style={{ width: "90%", height: "300px" }}
        />

      <h3>How Computers See Information</h3>

      <p>Computers see and process all information in binary form.</p>
    </section>

    {/* NUMBER SYSTEM */}

    <section>
      <h2>2. Number System</h2>

      <p>A number system is a writing system used for expressing numbers.</p>

      <h3>2.1 Decimal Notation</h3>

      <p>
        Decimal is the number system used in everyday mathematics. It uses
        digits from <b>0 to 9</b>.
      </p>

      <CodeBlock
        language="text"
        code={`4175 =
4 × 10³ + 1 × 10² + 7 × 10¹ + 5 × 10⁰
= 4175`}
      />
         <img
          src="/assets/img/decimal.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

      <p>
        Decimal notation has <b>base 10</b>, meaning it uses 10 unique digits.
      </p>
         <img
          src="/assets/img/m11.png"
          alt="math"
          style={{ width: "90%", height: "300px" }}
        />

      <h3>2.2 Binary Notation</h3>

      <p>Binary notation is the only notation understood by computers.</p>

      <p>Digits used: <b>0 and 1</b></p>

      <p>Binary system has <b>base 2</b>.</p>

      <CodeBlock
        language="text"
        code={`1101₂ =
1 × 2³ + 1 × 2² + 0 × 2¹ + 1 × 2⁰
= 8 + 4 + 1
= 13₁₀`}
      />
         <img
          src="/assets/img/Bnotation.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    </section>

    {/* BINARY FILE REPRESENTATION */}

    <section>
      <h2>3. Binary Representation for Different Files</h2>

      <p>
        All types of content such as <b>text, images, videos</b> must be
        converted to binary so that they can be stored by computers.
      </p>

      <p>
        Different content occupies different storage because they are
        represented using different lengths of binary numbers.
      </p>
    </section>

    {/* BIT STORAGE */}

    <section>
      <h2>4. Storing Integers in Bits</h2>

      <h3>4.1 Storing Integers in 4 Bits</h3>

      <p>
        Using 4 bits, we can represent <b>16 different values</b>.
      </p>

      <p>Range: <b>0 to 15</b></p>

         <img
          src="/assets/img/Bi_De.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

      <h3>4.2 n-Bit Binary Numbers</h3>

      <CodeBlock
        language="text"
        code={`Total combinations = 2ⁿ
Range = 0 to (2ⁿ − 1)

Example:
n = 8
Range = 0 to 255`}
      />
    </section>

    {/* NEGATIVE NUMBERS */}

    <section>
      <h2>5. Negative Numbers Representation</h2>

      <p>One bit is used to represent the sign of a number.</p>

      <ul>
        <li>0 → Positive number</li>
        <li>1 → Negative number</li>
      </ul>

         <img
          src="/assets/img/negative.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    </section>

    

    <section>
      <h2>6. Representing Images</h2>

      <p>
        An image is made up of small units called <b>pixels</b>.
      </p>

      <p>Each pixel stores a specific color value.</p>

         <img
          src="/assets/img/R1.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
           <img
          src="/assets/img/R2.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    </section>

    {/* COLORS */}

    <section>
      <h2>7. Representing Colors</h2>

      <p>
        Colors are represented using different models. A common one is the
        <b> RGB model</b>.
      </p>

      <ul>
        <li>Red</li>
        <li>Green</li>
        <li>Blue</li>
      </ul>


      <p>
        The intensity of RGB values is stored as numbers and then represented
        as binary inside computers.
      </p>
         <img
          src="/assets/img/RGB.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    </section>

    {/* TEXT */}

    <section>
      <h2>8. Representing Text</h2>

      <p>
        Each character is encoded as an integer and stored as a binary value.
      </p>

      <h3>8.1 ASCII</h3>

      <p>
        ASCII stands for <b>American Standard Code for Information Interchange</b>.
      </p>

      <ul>
        <li>Uses <b>1 byte (8 bits)</b></li>
        <li>Represents <b>256 characters</b></li>
        <li>Includes alphabets, numbers, and punctuation</li>
      </ul>
         <img
          src="/assets/img/ASCI.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

      <h3>8.2 Unicode</h3>

      <p>Unicode allows representing characters using more than one byte.</p>

      <h3>8.3 UTF-8</h3>

      <p>
        UTF-8 (Unicode Transformation Format-8) can represent up to
        <b> 1,112,064 characters</b>.
      </p>

      <p>UTF-8 keeps the same values for ASCII characters.</p>

         <img
          src="/assets/img/unicode.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    </section>

    {/* HARDWARE */}

    <section>
      <h2>9. How Computers Get 0s and 1s</h2>

      <p>Imagine a light bulb with a switch.</p>

      <ul>
        <li>Light ON → 1</li>
        <li>Light OFF → 0</li>
      </ul>

      <p>
        Computers use electronic circuits in a similar way to represent binary
        states.
      </p>
         <img
          src="/assets/img/zero.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
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
</div>
  );
};

export default Understaing_Binary_CS;
