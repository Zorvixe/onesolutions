import React from 'react'

const NodeJS_Practice_Set_2 = () => {
  return (
    <div>
      <h1>React Js 2</h1>
      <h3>1. Explain the post() method in Node JS.</h3>
      <p>The post() method in Node JS is used to send HTTP POST requests to a specified URL. It allows you to send data to the server in the request body.</p>
      <h3>2. What is the purpose of module.exports?</h3>
      <p>module.exports enables exporting functions, objects, or values for use in other modules. This promotes code reusability, modularity, and maintainability in Node JS applications.</p>
      <h3>3. What are URL, and API methods in Node JS?</h3>
      <p>In Node JS, URLs access web resources. The URL module resolves and parses URLs. API methods in Node JS interact with APIs, performing CRUD operations (GET, POST, PUT, DELETE) on exposed resources.</p>
      <h3>4. What is the difference between Express JS and Node JS?</h3>
      <p>Node JS is a JavaScript runtime environment that executes JavaScript code outside a web browser. While Express JS is a free and open-source Server-side Web Application Framework for Node JS. It provides features and tools for building web applications using Node JS.</p>
      <h3>5. What are Modules and their Methods in Express JS?</h3>
      <p>In Express JS, modules are reusable code pieces used for structuring the application, while methods are functions within modules that perform specific tasks. For example, the 'app' module handles HTTP requests, and the 'app.get()' method handles the get API.</p>
      <h3>6. What is the use of require() function?</h3>
      <p>The `require()` function in Node JS imports external modules or files and assigns their exported content to a variable, allowing you to use their functionality in your application.</p>
      <h3>7. What is the use of terminal (REPL), in Node JS?</h3>
      <p>The Node JS REPL (Read-Eval-Print Loop) is an interactive shell used for real-time code testing, debugging, and experimenting without creating separate script files, aiding in code evaluation and development.</p>
      <h3>8. What are Route paths in web applications, in combination with request methods and define the specific endpoints where requests can be made?</h3>
      <p>Route paths are URL patterns used in web applications to define the endpoints at which requests can be made. They are combined with the request methods app.METHOD(PATH, HANDLER) to specify the actions to be performed on those endpoints.</p>
      <h3>9. How to retrieve the body of a query?</h3>
      <p>To retrieve the body of a query in Node JS, you can use express.json() middleware to recognize the incoming request object as JSON and parse it. After that, you can access the HTTP request body using request.body.</p>
      <h3>10. What is the middleware function?</h3>
      <p>Middleware is a special function in Express JS that handles requests from the user or previous middleware. It processes the request and can either pass it to another middleware, call the API Handler, or send a response to the user.</p>
      <h3>11. Is node a single threaded application?</h3>
      <p>Yes, Node JS is mainly single-threaded. But it uses an event-driven, non-blocking I/O model to handle multiple requests at the same time, making it efficient for high-performance and scalable applications.</p>
      <h3>12. How to connect a database in NodeJS?</h3>
      <p>To connect a database in NodeJS, We can use `sqlite` and `sqlite3` node packages to connect SQLite Database from Node JS.</p>
      <h3>13. Explain Express js architecture.</h3>
      <p>Express.js has a simple and minimalist architecture. It allows developers to build web applications in a structured manner by using modular routes and middleware functions. It provides flexibility in handling HTTP requests and processing responses.</p>
      <h3>14. How to print Hello World in Node JS?</h3>
      <p>To print "Hello World" in Node.js, write console.log("Hello World"); in a JavaScript file and run it using node filename.js in the terminal.</p>
      <h3>15. What is package.json?</h3>
      <p></p>
      <p></p>
    </div>
  )
}

export default NodeJS_Practice_Set_2
