import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const HTTP_Request_Using_JS_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>HTTP Requests using JS | Cheat Sheet</h1>

      {/* 1. Fetch */}
      <section>
        <h2>1. Fetch</h2>
        <p>
          The <code>fetch()</code> method is used to fetch resources across the
          Internet.
        </p>

        <p>
          <b>Syntax:</b> <code>fetch(URL, OPTIONS)</code>
        </p>
        <ul>
          <li>
            <strong>URL</strong> - URL of the resource
          </li>
          <li>
            <strong>OPTIONS</strong> - Request Configuration
          </li>
        </ul>

        <h3>1.1 Request Configuration</h3>
        <p>We can configure the fetch request with options like:</p>
        <ul>
          <li>Request Method</li>
          <li>Headers</li>
          <li>Body</li>
          <li>Credentials</li>
          <li>Cache</li>
        </ul>

        <p>Example:</p>
        <CodeBlock
          language="javascript"
          code={`let options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
};`}
        />
      </section>

      {/* 2. Making HTTP Requests */}
      <section>
        <h2>2. Making HTTP Requests using Fetch</h2>
        <p>
          The <code>method</code> property in options can be GET, POST, PUT,
          DELETE, etc. Default is GET.
        </p>

        <h3>2.1 GET</h3>
        <CodeBlock
          language="javascript"
          code={`let options = {
method: "GET"
};

fetch("https://gorest.co.in/public-api/users", options);`}
        />

        <h3>2.2 POST</h3>
        <CodeBlock
          language="javascript"
          code={`let data = {
name: "Rahul",
gender: "Male",
email: "rahul@gmail.com",
status: "Active"
};

let options = {
method: "POST",
headers: {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer ACCESS-TOKEN"
},
body: JSON.stringify(data)
};

fetch("https://gorest.co.in/public-api/users", options)
.then(function(response) {
  return response.json();
})
.then(function(jsonData) {
  console.log(jsonData);
});`}
        />

        <h3>2.3 PUT</h3>
        <CodeBlock
          language="javascript"
          code={`let data = {
  name: "Rahul Attuluri"
};

let options = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer ACCESS-TOKEN"
  },
  body: JSON.stringify(data)
};

fetch("https://gorest.co.in/public-api/users/1359", options)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    console.log(jsonData);
  });`}
        />

        <h3>2.4 DELETE</h3>
        <CodeBlock
          language="javascript"
          code={`let options = {
method: "DELETE",
headers: {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer ACCESS-TOKEN"
}
};

fetch("https://gorest.co.in/public-api/users/1359", options)
.then(function(response) {
  return response.json();
})
.then(function(jsonData) {
  console.log(jsonData);
});`}
        />
      </section>

      {/* 3. HTTP Response Object */}
      <section>
        <h2>3. HTTP Response Object Properties and Methods</h2>
        <p>The response object provides information about the HTTP response.</p>
        <ul>
          <li>
            <strong>status</strong> (number) - HTTP status code
          </li>
          <li>
            <strong>statusText</strong> (string) - Status text, e.g.
            "Unauthorized"
          </li>
          <li>
            <strong>headers</strong> - Response headers
          </li>
          <li>
            <strong>url</strong> - Requested URL
          </li>
          <li>
            <strong>text()</strong> - Get text from response
          </li>
          <li>
            <strong>json()</strong> - Parse response as JSON
          </li>
        </ul>

        <h3>Example</h3>
        <CodeBlock
          language="javascript"
          code={`let options = {
method: "GET"
};

fetch("https://gorest.co.in/public-api/users", options)
.then(function(response) {
  return response.status;
})
.then(function(status) {
  console.log(status);  // 200
});`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
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

export default HTTP_Request_Using_JS_CS;
