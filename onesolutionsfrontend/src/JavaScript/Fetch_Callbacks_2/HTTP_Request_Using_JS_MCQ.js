import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 ----------
  {
    question: (
      <div>
        <p>
          Which JavaScript method is used to fetch resources from the Internet?
        </p>
      </div>
    ),
    options: ["getResource()", "fetch()", "httpRequest()", "getData()"],
    answer: "fetch()",
  },

  // ---------- 2 ----------
  {
    question: (
      <div>
        <p>Which of the following is the correct syntax for a fetch request?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data", { method: "GET" });`}
        />
      </div>
    ),
    options: [
      `fetch("https://api.example.com/data")`,
      `get("https://api.example.com/data")`,
      `fetch("https://api.example.com/data", { method: "GET" });`,
      `http.get("https://api.example.com/data")`,
    ],
    answer: `fetch("https://api.example.com/data", { method: "GET" });`,
  },

  // ---------- 3 ----------
  {
    question: (
      <div>
        <p>
          By default, what is the HTTP method used in the fetch() request if no
          method is specified?
        </p>
      </div>
    ),
    options: ["POST", "GET", "PUT", "DELETE"],
    answer: "GET",
  },

  // ---------- 4 ----------
  {
    question: (
      <div>
        <p>
          Which of the following correctly sends data using a POST request with
          fetch?
        </p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Prathibha" })
});`}
        />
      </div>
    ),
    options: [
      "Using method 'GET'",
      "Using method 'POST' with headers and body",
      "Using method 'PUT'",
      "Using fetch() without any options",
    ],
    answer: "Using method 'POST' with headers and body",
  },

  // ---------- 5 ----------
  {
    question: (
      <div>
        <p>What does the following fetch example demonstrate?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/user/1", { method: "DELETE" });`}
        />
      </div>
    ),
    options: [
      "Fetching user details",
      "Creating a new user",
      "Updating user details",
      "Deleting user details",
    ],
    answer: "Deleting user details",
  },

  // ---------- 6 ----------
  {
    question: (
      <div>
        <p>
          Which property of the response object contains the HTTP status code?
        </p>
      </div>
    ),
    options: ["statusText", "headers", "status", "url"],
    answer: "status",
  },

  // ---------- 7 ----------
  {
    question: (
      <div>
        <p>
          Which method of the response object parses the response body as JSON?
        </p>
      </div>
    ),
    options: ["parseJSON()", "toJSON()", "json()", "stringify()"],
    answer: "json()",
  },

  // ---------- 8 ----------
  {
    question: (
      <div>
        <p>What will the following code log if the response status is 404?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data")
  .then(response => console.log(response.status));`}
        />
      </div>
    ),
    options: ["200", "404", "500", "403"],
    answer: "404",
  },

  // ---------- 9 ----------
  {
    question: (
      <div>
        <p>Which property of the response object contains the requested URL?</p>
      </div>
    ),
    options: ["body", "url", "headers", "statusText"],
    answer: "url",
  },

  // ---------- 10 ----------
  {
    question: (
      <div>
        <p>
          Which of the following fetch examples retrieves plain text content
          from a response?
        </p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://example.com/text")
  .then(response => response.text())
  .then(data => console.log(data));`}
        />
      </div>
    ),
    options: [
      "Using response.text()",
      "Using response.json()",
      "Using response.data()",
      "Using response.body()",
    ],
    answer: "Using response.text()",
  },
];

const HTTP_Request_Using_JS_MCQ = () => {
  return (
    <MCQLogic
      title="Hypertext Transer Protocal - MCQs"
      questions={questionsData}
    />
  );
};
export default HTTP_Request_Using_JS_MCQ;
