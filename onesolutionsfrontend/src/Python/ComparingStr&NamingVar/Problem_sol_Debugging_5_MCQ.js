import React from "react";
import MCQLogic from "../../MCQLogic";

const Problem_sol_Debugging_5_MCQ = ({ onComplete }) => {
  const questions = [
    // 1
    {
      question: "What does the floor division operator // return?",
      options: [
        {
          id: 1,
          text: (
            <span className="mcq-option-text">
              The integral part of the quotient
            </span>
          ),
        },
        {
          id: 2,
          text: <span className="mcq-option-text">The remainder</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">The decimal value</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">A syntax error</span>,
        },
      ],
      answer: 1,
    },

    // 2
    {
      question: "What is the result of: 3 // 2",
      code: `print(3 // 2)`,
      options: [
        { id: 1, text: <span className="mcq-option-text">1</span> },
        { id: 2, text: <span className="mcq-option-text">1.5</span> },
        { id: 3, text: <span className="mcq-option-text">2</span> },
        { id: 4, text: <span className="mcq-option-text">Error</span> },
      ],
      answer: 1,
    },

    // 3
    {
      question: "Which statement is equivalent to a += 1?",
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">a = a + 1</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">a = a - 1</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">a = 1</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">a = +1</span>,
        },
      ],
      answer: 1,
    },

    // 4
    {
      question: "What will be the output?",
      code: `a = 10
a -= 2
print(a)`,
      options: [
        { id: 1, text: <span className="mcq-option-text">12</span> },
        { id: 2, text: <span className="mcq-option-text">8</span> },
        { id: 3, text: <span className="mcq-option-text">10</span> },
        { id: 4, text: <span className="mcq-option-text">-2</span> },
      ],
      answer: 2,
    },

    // 5
    {
      question: "What is the escape sequence for inserting a new line?",
      options: [
        { id: 1, text: <span className="mcq-option-text">\n</span> },
        { id: 2, text: <span className="mcq-option-text">\t</span> },
        { id: 3, text: <span className="mcq-option-text">\\</span> },
        { id: 4, text: <span className="mcq-option-text">\'</span> },
      ],
      answer: 1,
    },

    // 6
    {
      question: "What is the output of the following code?",
      code: `print("Hello\\nWorld")`,
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">Hello World</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">Hello\nWorld</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">Hello World</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">Error</span>,
        },
      ],
      answer: 1,
    },

    // 7
    {
      question: "Which of these prints a valid string without error?",
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">print("It's Python")</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">print('It's Python')</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">print("Its Python')</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">print('It\"s Python')</span>,
        },
      ],
      answer: 1,
    },
  ];

  return (
    <MCQLogic
      title="Problem Solving & Debugging | Part 5 | MCQs"
      questions={questions}
      onComplete={onComplete}
    />
  );
};

export default Problem_sol_Debugging_5_MCQ;
