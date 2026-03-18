import React from 'react'

const NodeJS_Practice_Set_1 = () => {
  return (
    <div>
      <h1>React Js 1</h1>
      <h3>1. What is nonblocking I/O in node?</h3>
      <p>Nonblocking I/O in Node JS enables concurrent task execution, preventing application blocking during file reading or database querying. This enhances performance and scalability by allowing other tasks to continue while waiting for I/O operations.</p>
      <h3>2. Why is the use of Node JS?</h3>
      <p>Node JS enables server-side execution of JavaScript and offers scalability, high performance, and the ability to handle large concurrent requests. It has a wide range of modules and packages, making it suitable for building web applications and APIs.</p>
      <h3>3. What is an API?</h3>
      <p>An API is a software intermediary that allows two applications to talk to each other. For example, OLA, and UBER use Google Maps API to provide their services.</p>
      <h3>4. How to create a server?</h3>
      <p>To create a server using Node JS and Express, 1. First, Import the Express module. 2. Create an Express application. 3. Make the server listen on port 3000. This establishes a server that can handle incoming requests on port 3000.</p>
      <h3>5. What is CRUD?</h3>
      <p>CRUD in Node JS refers to the basic operations of Create, Read, Update, and Delete. It involves creating data with a POST request, reading data with a GET request, updating data with PUT or PATCH requests, and deleting data with a DELETE request.</p>
      <h3>6. What is the difference between authentication and authorization?</h3>
      <p>Authentication verifies user identity using username and password. Authorization controls access rights and permissions. Authentication confirms identity, while authorization grants or denies access based on authenticated identity.</p>
      <h3>7. What is NPM?</h3>
      <p>NPM is the package manager for the Node JS packages. It provides a command line tool that allows you to publish, discover, install, and develop node programs.</p>
      <h3>8. What is Node JS?</h3>
      <p>Node JS is an open-source runtime environment that allows you to run JavaScript code on the server side. It is efficient for building scalable and high-performance applications. Node JS is commonly used for building web servers, APIs, and real-time applications.</p>
      <h3>9. What is Express JS?</h3>
      <p>It is a free and open-source, server-side Web Application Framework for Node JS. It provides a robust set of features to build web and mobile applications quickly and easily.</p>
      <h3>10. What is REST API?</h3>
      <p>REST stands for Representational State Transfer. It is a set of principles that define how Web standards, such as HTTP and URLs, are supposed to be used.</p>
      <h3>11. Explain inbuilt node packages?</h3>
      <p>Node JS comes with several built-in packages. Some of the commonly used built-in packages in Node JS include: 'fs', 'http', 'path', 'events', etc.</p>
      <h3>12. What are server-side web applications?</h3>
      <p>Server-side web applications are applications where the processing and rendering of web pages happen on the server. The server generates the HTML content and sends it to the client's browser for display. Examples of server-side web application frameworks include Node JS, Python, ...</p>
      <h3>13. On which engine does Node JS run?</h3>
      <p>Node JS runs on the V8 JavaScript engine, which is developed by Google.</p>
      <h3>14. Explain any five packages of NPM.</h3>
      <p>Express: A web app framework. Jsonwebtoken: Generates/verifies JWTs for authentication and secure data transmission. SQLite: A lightweight serverless relational database engine. Bcrypt: Provides encryption, comparison, etc. Sqlite3: Interacts with SQLite databases.</p>
      <h3>15. What is the main HTTP request methods?</h3>
      <p>The GET method to retrieve data from server without changes actual data. The POST method to send new data for server. The PUT method to update, replacing existing server data. The DELETE method to remove data from the server. The PATCH method to partly update data, altering specific attributes.</p>
      <h3>16. What are Path Parameters and Query Parameters?</h3>
      <p>Path parameters are part of the URL path. They are used to identify a specific resource. Query parameters are appended to the URL and are separated using a question mark. These parameters come after the path of the URL and allow clients to send additional information to the server.</p>
      <h3>17. What is the purpose of the PUT method?</h3>
      <p>The "PUT" method in HTTP is designed to update existing resources on a server and it will not make any new changes or create new data no matter how many times you send the same PUT request to the server.</p>
      
    </div>
    
  )
}

export default NodeJS_Practice_Set_1
