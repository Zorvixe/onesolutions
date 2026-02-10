import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- CODE BLOCK QUESTIONS (10) ----------

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name):
        self.name = name

p = Product("Laptop")
print(p.name)`}
        />
      </div>
    ),
    options: ["Laptop", "Product", "Error", "None"],
    answer: "Laptop",
  },

  {
    question: (
      <div>
        <p>Which concept is demonstrated in this code?</p>
        <CodeBlock
          language="python"
          code={`class Electronic(Product):
    pass`}
        />
      </div>
    ),
    options: ["Composition", "Inheritance", "Encapsulation", "Abstraction"],
    answer: "Inheritance",
  },

  {
    question: (
      <div>
        <p>What is used to call the parent class method?</p>
        <CodeBlock
          language="python"
          code={`class Child(Parent):
    def show(self):
        Parent.show(self)`}
        />
      </div>
    ),
    options: ["self()", "super()", "Parent()", "init()"],
    answer: "super()",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`numbers = [1,2,3]
result = list(map(lambda x: x+1, numbers))
print(result)`}
        />
      </div>
    ),
    options: ["[2, 3, 4]", "[1, 2, 3]", "[1, 4, 9]", "Error"],
    answer: "[2, 3, 4]",
  },

  {
    question: (
      <div>
        <p>Which list will be produced?</p>
        <CodeBlock
          language="python"
          code={`list(filter(lambda x: x>2, [1,2,3,4]))`}
        />
      </div>
    ),
    options: ["[3, 4]", "[1, 2]", "[2, 3, 4]", "Error"],
    answer: "[3, 4]",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`from functools import reduce
print(reduce(lambda x,y: x+y, [1,2,3]))`}
        />
      </div>
    ),
    options: ["6", "123", "[1,2,3]", "Error"],
    answer: "6",
  },

  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`import math
print(math.sqrt(16))`}
        />
      </div>
    ),
    options: ["4.0", "4", "16", "Error"],
    answer: "4.0",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime
print(type(datetime.now()))`}
        />
      </div>
    ),
    options: ["datetime object", "string", "int", "Error"],
    answer: "datetime object",
  },

  {
    question: (
      <div>
        <p>What happens when this runs?</p>
        <CodeBlock
          language="python"
          code={`try:
    print(10/0)
except ZeroDivisionError:
    print("Error handled")`}
        />
      </div>
    ),
    options: [
      "Program crashes",
      "Error handled",
      "Nothing prints",
      "Syntax error",
    ],
    answer: "Error handled",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`x = 5
def test():
    global x
    x += 5

test()
print(x)`}
        />
      </div>
    ),
    options: ["10", "5", "Error", "None"],
    answer: "10",
  },

  // ---------- NORMAL QUESTIONS (5) ----------

  {
    question: "What is the main advantage of inheritance?",
    options: [
      "Increase program size",
      "Code reuse",
      "Faster execution only",
      "Remove objects",
    ],
    answer: "Code reuse",
  },

  {
    question: "Composition represents which relationship?",
    options: ["IS-A", "HAS-A", "PART-A", "USES-A"],
    answer: "HAS-A",
  },

  {
    question: "Which module is used for random number generation?",
    options: ["math", "random", "datetime", "sys"],
    answer: "random",
  },

  {
    question: "Which keyword modifies a global variable inside a function?",
    options: ["public", "global", "static", "modify"],
    answer: "global",
  },

  {
    question: "Which block always executes in exception handling?",
    options: ["try", "except", "finally", "else"],
    answer: "finally",
  },
];

const Miscellaneous_Python_Library_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Python",
        courseName || "Python Programming"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);

        if (onComplete) {
          onComplete();
        }
      } else {
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Python Inheritance & Libraries | MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Miscellaneous_Python_Library_MCQ;
