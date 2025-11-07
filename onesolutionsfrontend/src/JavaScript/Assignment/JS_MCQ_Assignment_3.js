import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          1. In a Todos application, what is the main purpose of using{" "}
          <code>map()</code> when rendering todos?
        </p>
      </div>
    ),
    options: [
      "To modify each todo object permanently",
      "To loop through and return a new array of JSX elements",
      "To delete completed todos",
      "To add new todos to the list",
    ],
    answer: "To loop through and return a new array of JSX elements",
  },
  {
    question: (
      <div>
        <p>
          2. Which event is typically used to trigger adding a new todo when the
          user presses Enter in the input field?
        </p>
      </div>
    ),
    options: ["onClick", "onFocus", "onKeyDown", "onChange"],
    answer: "onKeyDown",
  },
  {
    question: (
      <div>
        <p>
          3. What is the correct way to toggle a todo's completion status in
          React?
        </p>
        <CodeBlock
          language="javascript"
          code={`setTodos(prevTodos =>
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );`}
        />
      </div>
    ),
    options: [
      "By changing the state variable directly",
      "By modifying the todo array directly",
      "By using setTodos with map and updating the specific todo",
      "By refreshing the page",
    ],
    answer: "By using setTodos with map and updating the specific todo",
  },
  {
    question: (
      <div>
        <p>
          4. In Todos Application 3, what is the purpose of using the{" "}
          <code>filter()</code> method?
        </p>
      </div>
    ),
    options: [
      "To remove completed todos from the list",
      "To find a todo by its ID",
      "To reorder todos alphabetically",
      "To fetch todos from the API",
    ],
    answer: "To remove completed todos from the list",
  },
  {
    question: (
      <div>
        <p>
          5. Which property is used to uniquely identify each todo item in the
          JSX rendering loop?
        </p>
      </div>
    ),
    options: ["name", "index", "id", "title"],
    answer: "id",
  },
  {
    question: (
      <div>
        <p>6. What does the below code do in a Todos app?</p>
        <CodeBlock
          language="javascript"
          code={`const updatedTodos = todos.filter(todo => todo.id !== id);
  setTodos(updatedTodos);`}
        />
      </div>
    ),
    options: [
      "Edits a todo title",
      "Deletes a todo with a specific id",
      "Marks a todo as completed",
      "Clears all todos",
    ],
    answer: "Deletes a todo with a specific id",
  },
  {
    question: (
      <div>
        <p>
          7. In React, what is the correct way to mark an input as a controlled
          component?
        </p>
        <CodeBlock
          language="javascript"
          code={`<input
    type="text"
    value={todoTitle}
    onChange={e => setTodoTitle(e.target.value)}
  />`}
        />
      </div>
    ),
    options: [
      "By omitting the value attribute",
      "By using defaultValue instead of value",
      "By using both value and onChange props",
      "By directly modifying the DOM element",
    ],
    answer: "By using both value and onChange props",
  },
  {
    question: (
      <div>
        <p>
          8. What is a common way to conditionally apply a CSS class for
          completed todos?
        </p>
        <CodeBlock
          language="javascript"
          code={`<li className={todo.completed ? "completed" : ""}>{todo.title}</li>`}
        />
      </div>
    ),
    options: [
      "By using inline styles only",
      "By using conditional className expressions",
      "By modifying CSS file directly",
      "By applying a hover effect",
    ],
    answer: "By using conditional className expressions",
  },
  {
    question: (
      <div>
        <p>
          9. Why do we use <code>useEffect()</code> in Todos Application 4?
        </p>
      </div>
    ),
    options: [
      "To fetch and store todos in localStorage when component mounts",
      "To refresh the browser automatically",
      "To reset the todos on every render",
      "To prevent rerenders of the todo list",
    ],
    answer: "To fetch and store todos in localStorage when component mounts",
  },
  {
    question: (
      <div>
        <p>
          10. In Todos Application 4, what is the main benefit of saving todos
          in localStorage?
        </p>
      </div>
    ),
    options: [
      "Todos remain even after the page is refreshed",
      "Todos are shared with other users automatically",
      "Todos are deleted when browser closes",
      "Todos can only be accessed by admin",
    ],
    answer: "Todos remain even after the page is refreshed",
  },
];

const JS_MCQ_Assignment_1 = () => {
  return <MCQLogic title="JS Assignment 3 - MCQs" questions={questionsData} />;
};

export default JS_MCQ_Assignment_1;
