import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Workingwith_Lists_CS = ({
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
    <div className="intro-container">
      <h1>Working with List | Cheat Sheeeet</h1>

      {/* Object */}
      <section>
        <h2>Object</h2>
        <p>
          In general, anything that can be assigned to a variable in Python is
          referred to as an <b>object</b>.
        </p>
        <p>Strings, Integers, Floats, Lists etc. are all objects.</p>
        <h3>Examples</h3>
        <ul>
          <li>"A"</li>
          <li>1.25</li>
          <li>[1,2,3]</li>
        </ul>
      </section>

      {/* Identity of an Object */}
      <section>
        <h2>Identity of an Object</h2>
        <p>
          Whenever an object is created in Python, it is given a unique
          identifier (<b>id</b>). This unique id can differ each time you run
          the program.
        </p>
        <p>
          Every object used in a Python program is stored in computer memory,
          and its id is related to its memory location.
        </p>
        <img
          src="/assets/img/Identify_Object.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "300px" }}
        />
      </section>

      {/* Finding Id */}
      <section>
        <h2>Finding Id</h2>
        <p>
          We can use the <code>id</code> function to find the id of an object.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(id("Hello"))`} />
        <h3>Output</h3>
        <OutputBlock output={`140589419285168`} />
      </section>

      {/* Id of Lists */}
      <section>
        <h2>Id of Lists</h2>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = [1, 2, 3]\nprint(id(list_a))\nprint(id(list_b))`}
        />
        <h3>Output</h3>
        <OutputBlock output={`139637858236800\n139637857505984`} />
      </section>

      {/* Modifying Lists - 1 */}
      <section>
        <h2>Modifying Lists - 1</h2>
        <p>
          When an existing list is assigned to another variable, both{" "}
          <code>list_a</code> and <code>list_b</code> will refer to the same
          object.
        </p>
        <img
          src="/assets/img/Modifing_List_1.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "300px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = list_a\nprint(id(list_a))\nprint(id(list_b))`}
        />
        <h3>Output</h3>
        <OutputBlock output={`140334087715264\n140334087715264`} />
      </section>

      {/* Modifying Lists - 2 */}
      <section>
        <h2>Modifying Lists - 2</h2>
        <p>
          When assigned an existing list, both variables refer to the same
          object. Any modification through one reference affects the other.
        </p>
        <img
          src="/assets/img/Modifing_List_2.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "300px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3, 5]\nlist_b = list_a\nlist_b[3] = 4\nprint("list a :", list_a)\nprint("list b :", list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`list a : [1, 2, 3, 4]\nlist b : [1, 2, 3, 4]`} />
      </section>

      {/* Modifying Lists - 3 */}
      <section>
        <h2>Modifying Lists - 3</h2>
        <p>
          The assignment updates the reference to a <b>new object</b>.
        </p>
        <img
          src="/assets/img/Modifing_List_3.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "280px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = list_a\nlist_a = [6, 7]\nprint("list a :", list_a)\nprint("list b :", list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`list a : [6, 7]\nlist b : [1, 2]`} />
      </section>

      {/* Modifying Lists - 4 */}
      <section>
        <h2>Modifying Lists - 4</h2>
        <p>
          The assignment using <code>+</code> creates a new list object and
          updates the reference.
        </p>
        <img
          src="/assets/img/Modifing_List_4.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "280px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = list_a\nlist_a = list_a + [6, 7]\nprint("list a :", list_a)\nprint("list b :", list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`list a : [1, 2, 6, 7]\nlist b : [1, 2]`} />
      </section>

      {/* Modifying Lists - 5 */}
      <section>
        <h2>Modifying Lists - 5</h2>
        <p>
          A <b>compound assignment (+=)</b> updates the existing list instead of
          creating a new one.
        </p>
        <img
          src="/assets/img/Modifing_List_5.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "280px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = list_a\nlist_a += [6, 7]\nprint("list a :", list_a)\nprint("list b :", list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`list a : [1, 2, 6, 7]\nlist b : [1, 2, 6, 7]`} />
      </section>

      {/* Modifying Lists - 6 */}
      <section>
        <h2>Modifying Lists - 6</h2>
        <p>
          Updating mutable objects affects the list values since references are
          shared.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = [3, list_a]\nlist_a[1] = 4\nprint(list_a)\nprint(list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 4]\n[3, [1, 4]]`} />
      </section>

      {/* Modifying Lists - 7 */}
      <section>
        <h2>Modifying Lists - 7</h2>
        <p>
          Updating <b>immutable</b> objects does not affect the list values
          because the reference changes.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [1, a]\nprint(list_a)\na = 3\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 2]\n[1, 2]`} />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Workingwith_Lists_CS;
