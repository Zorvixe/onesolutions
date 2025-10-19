import React from "react";
// ✅ Make sure you have your common cheat sheet styles here

const Introductionto_Dynamic_Application = () => {
  return (
    <div className="cheat-sheet-container">
      <h2>Introduction to Dynamic Applications</h2>
      <p>
        Dynamic applications allow web pages to interact with users, update content
        instantly, and respond to events without reloading the page. This is achieved
        using <strong>JavaScript</strong>.
      </p>

      <p className="note">Note: JavaScript makes your static pages interactive and dynamic.</p>

      <h3>1. What is a Dynamic Web Page?</h3>
      <ul>
        <li>Updates content without refreshing the page.</li>
        <li>Responds to user input instantly.</li>
        <li>Improves user experience and interactivity.</li>
      </ul>

      <h3>2. Adding JavaScript to HTML</h3>
      <pre>
{`<script>
  function showMessage() {
    document.getElementById("demo").innerHTML = "Hello, Dynamic World!";
  }
</script>

<button onclick="showMessage()">Click Me</button>
<p id="demo"></p>`}
      </pre>

      <h3>3. Event Handling</h3>
      <ul>
        <li>Events like <code>onclick</code>, <code>onmouseover</code>, <code>onchange</code> make elements interactive.</li>
        <li>JavaScript functions run when these events are triggered.</li>
      </ul>
      <pre>
{`<button onclick="alert('Button Clicked!')">Click Me</button>`}
      </pre>

      <h3>4. DOM Manipulation</h3>
      <p>
        The <strong>DOM (Document Object Model)</strong> allows you to dynamically
        access and update the content and structure of your web page.
      </p>
      <pre>
{`document.getElementById("demo").innerHTML = "Dynamic Content Updated!";`}
      </pre>

      <h3>5. Real-time Interactivity Example</h3>
      <pre>
{`<input type="text" id="nameInput" placeholder="Enter your name">
<button onclick="greetUser()">Greet</button>
<p id="greeting"></p>

<script>
  function greetUser() {
    const name = document.getElementById("nameInput").value;
    document.getElementById("greeting").innerHTML = "Hello, " + name + "!";
  }
</script>`}
      </pre>

      <h3>6. Key Points</h3>
      <ul>
        <li>JavaScript enables real-time updates and dynamic content.</li>
        <li>Event handling is essential for interactivity.</li>
        <li>DOM manipulation allows modification of HTML elements directly.</li>
      </ul>
    </div>
  );
};

export default Introductionto_Dynamic_Application;
