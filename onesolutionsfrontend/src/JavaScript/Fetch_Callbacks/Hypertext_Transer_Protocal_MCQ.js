import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 ----------
  {
    question: (
      <div>
        <p>Which of the following correctly defines a Web Resource?</p>
      </div>
    ),
    options: [
      "A database that stores user information",
      "Any data that can be obtained via the internet",
      "A protocol used for data encryption",
      "A local file stored in the browser",
    ],
    answer: "Any data that can be obtained via the internet",
  },

  // ---------- 2 ----------
  {
    question: (
      <div>
        <p>What does the following URL component represent?</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/watches?type=digital&rating=4`}
        />
        <p>Here, <code>/watches</code> indicates the:</p>
      </div>
    ),
    options: [
      "Protocol",
      "Domain Name",
      "Path",
      "Query Parameter",
    ],
    answer: "Path",
  },

  // ---------- 3 ----------
  {
    question: (
      <div>
        <p>In the following URL, what are <code>type=digital&rating=4</code> called?</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/watches?type=digital&rating=4`}
        />
      </div>
    ),
    options: [
      "Query Parameters",
      "Domain Extensions",
      "Path Identifiers",
      "Request Headers",
    ],
    answer: "Query Parameters",
  },

  // ---------- 4 ----------
  {
    question: (
      <div>
        <p>Which HTTP method is used to delete a resource from the server?</p>
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "DELETE",
  },

  // ---------- 5 ----------
  {
    question: (
      <div>
        <p>Identify the correct syntax for specifying an HTTP request start line.</p>
        <CodeBlock
          language="text"
          code={`METHOD /path HTTP/version`}
        />
      </div>
    ),
    options: [
      "URL METHOD HTTP/version",
      "METHOD /path HTTP/version",
      "HTTP/version METHOD /path",
      "METHOD HTTP/version /path",
    ],
    answer: "METHOD /path HTTP/version",
  },

  // ---------- 6 ----------
  {
    question: (
      <div>
        <p>Which HTTP status code indicates that the request was successful?</p>
      </div>
    ),
    options: ["404", "200", "301", "500"],
    answer: "200",
  },

  // ---------- 7 ----------
  {
    question: (
      <div>
        <p>Which of the following protocols provides secure data transfer by encryption?</p>
      </div>
    ),
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    answer: "HTTPS",
  },

  // ---------- 8 ----------
  {
    question: (
      <div>
        <p>What does the 4XX series of HTTP status codes indicate?</p>
      </div>
    ),
    options: [
      "Server Error",
      "Client Error",
      "Redirection",
      "Success",
    ],
    answer: "Client Error",
  },

  // ---------- 9 ----------
  {
    question: (
      <div>
        <p>Which of the following represents a correct HTTPS example?</p>
        <CodeBlock
          language="text"
          code={`https://www.bankofindia.co.in/login`}
        />
      </div>
    ),
    options: [
      "HTTP Request",
      "Encrypted Communication",
      "File Path Locator",
      "FTP Session",
    ],
    answer: "Encrypted Communication",
  },

  // ---------- 10 ----------
  {
    question: (
      <div>
        <p>Which part of an HTTP response contains the requested resource data?</p>
      </div>
    ),
    options: [
      "Headers",
      "Body",
      "Status Line",
      "URL",
    ],
    answer: "Body",
  },
];
const Hypertext_Transer_Protocal_MCQ = () => {
    return (
      <MCQLogic
        title="Hypertext Transer Protocal - MCQs"
        questions={questionsData}
      />
    );
  };

export default Hypertext_Transer_Protocal_MCQ;
