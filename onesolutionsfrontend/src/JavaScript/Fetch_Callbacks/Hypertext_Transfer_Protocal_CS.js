import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Hypertext_Transfer_Protocal_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

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
      <h1>Hypertext Transfer Protocol (HTTP) | Cheat Sheet</h1>

      <section>
        <h2>1. Web Resources</h2>
        <p>A Web Resource is any data that can be obtained via internet.</p>
        <p>A resource can be:</p>
        <ul>
          <li>HTML document</li>
          <li>CSS document</li>
          <li>JSON Data or Plain text</li>
          <li>Image, Video, etc.</li>
        </ul>
      </section>

      <section>
        <h2>2. Uniform Resource Locator (URL)</h2>
        <p>
          URL is a text string that specifies where a resource can be found on
          the internet.
        </p>
        <p>
          <b>Syntax:</b>{" "}
          <code>protocol://domainName/path?query-parameters</code>
        </p>
        <p>
          Example:{" "}
          <code>http://www.flipkart.com/watches?type=digital&rating=4</code>
        </p>
        <ul>
          <li>
            <code>http</code> is a Protocol
          </li>
          <li>
            <code>www.flipkart.com</code> is a Domain Name
          </li>
          <li>
            <code>/watches</code> is a Path
          </li>
          <li>
            <code>type=digital&amp;rating=4</code> is the Query Parameters
          </li>
        </ul>
      </section>

      <section>
        <h3>2.1 Protocol</h3>
        <p>
          A protocol is a standard set of rules that allow electronic devices to
          communicate with each other.
        </p>
        <ul>
          <li>Hypertext Transfer Protocol (HTTP)</li>
          <li>Hypertext Transfer Protocol Secure (HTTPS)</li>
          <li>Web Sockets, etc.</li>
        </ul>

        <h4>2.1.1 HTTP</h4>
        <p>
          The Hypertext Transfer Protocol (HTTP), is a protocol used to transfer
          resources over the web.
        </p>
        <p>Examples: Internet forums, Educational sites, etc.</p>
        <ul>
          <li>
            <b>HTTP Request:</b> Message sent by the client
          </li>
          <li>
            <b>HTTP Response:</b> Message sent by the server
          </li>
        </ul>

        <h4>2.1.2 HTTPS</h4>
        <p>
          In Hypertext Transfer Protocol Secure (HTTPS), information is
          transferred in an encrypted format and provides secure communication.
        </p>
        <p>
          Examples: Banking Websites, Payment gateway, Login Pages, Emails and
          Corporate Sector Websites, etc.
        </p>
      </section>

      <section>
        <h3>2.2 Domain Name</h3>
        <p>It indicates which Web server is being requested.</p>

        <h3>2.3 Path</h3>
        <p>The path is to identify the resources on the server.</p>
        <p> Examples:</p>
        <ul>
          <li>
            <b>/watches in</b> <code>http://www.flipkart.com/watches</code>
          </li>
          <li>
            <b>/electronics/laptops/gaming</b> in
            <code> http://www.flipkart.com/electronics/laptops/gaming</code>
          </li>
        </ul>

        <h3>2.4 Query Parameters</h3>
        <p>
          Query parameters add some criteria to the request for the resource.
        </p>
        <p>
          Example:{" "}
          <code>http://www.flipkart.com/watches?type=digital&amp;rating=4</code>
        </p>
      </section>

      <section>
        <h2>3. HTTP</h2>

        <h3>3.1 HTTP Requests</h3>
        <p>
          HTTP requests are messages sent by the client to initiate an action on
          the server. Includes:
        </p>
        <ul>
          <li>Start Line</li>
          <li>Headers</li>
          <li>Body</li>
        </ul>

        <h4>3.1.1 Start Line</h4>
        <p>A Start Line specifies:</p>
        <ul>
          <li>URL</li>
          <li>HTTP Method</li>
          <li>HTTP Version</li>
        </ul>

        <h4>HTTP Methods</h4>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET (Read)</td>
              <td>Request for a resource(s) from the server</td>
            </tr>
            <tr>
              <td>POST (Create)</td>
              <td>Submit data to the server</td>
            </tr>
            <tr>
              <td>PUT (Update)</td>
              <td>
                The data within the request must be stored at the URL supplied,
                replacing any existing data
              </td>
            </tr>
            <tr>
              <td>DELETE (Delete)</td>
              <td>Delete a resource(s)</td>
            </tr>
          </tbody>
        </table>

        <h4>HTTP Version</h4>
        <table border="1" style={{ borderCollapse: "collapse", width: "40%" }}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1991</td>
              <td>HTTP/0.9</td>
            </tr>
            <tr>
              <td>1994</td>
              <td>HTTPS</td>
            </tr>
            <tr>
              <td>1996</td>
              <td>HTTP/1.0</td>
            </tr>
            <tr>
              <td>1997</td>
              <td>HTTP/1.1</td>
            </tr>
            <tr>
              <td>2015</td>
              <td>HTTP/2</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>HTTP/3</td>
            </tr>
          </tbody>
        </table>

        <h4>3.1.2 Headers</h4>
        <p>
          HTTP Headers let the client and server pass additional information
          with a request or response.
        </p>

        <h4>3.1.3 Body</h4>
        <p>
          We place the data in the Request body when we want to send data to the
          server (e.g., form details).
        </p>
      </section>

      <section>
        <h3>3.2 HTTP Responses</h3>
        <p>
          HTTP responses are messages sent by the server as an answer to the
          client’s request.
        </p>

        <h4>3.2.1 Status Line</h4>
        <p>A Status line specifies:</p>
        <ul>
          <li>HTTP version</li>
          <li>Status code</li>
          <li>Status text</li>
        </ul>

        <h4>Status Code Series</h4>
        <table border="1" style={{ borderCollapse: "collapse", width: "40%" }}>
          <thead>
            <tr>
              <th>Status Code Series</th>
              <th>Indicates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1XX</td>
              <td>Information</td>
            </tr>
            <tr>
              <td>2XX</td>
              <td>Success</td>
            </tr>
            <tr>
              <td>3XX</td>
              <td>Redirection</td>
            </tr>
            <tr>
              <td>4XX</td>
              <td>Client Error</td>
            </tr>
            <tr>
              <td>5XX</td>
              <td>Server Error</td>
            </tr>
          </tbody>
        </table>

        <h4>Status text examples</h4>
        <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>Status Code</th>
              <th>Status Text</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200</td>
              <td>OK</td>
            </tr>
            <tr>
              <td>204</td>
              <td>No Response</td>
            </tr>
            <tr>
              <td>301</td>
              <td>Moved Permanently</td>
            </tr>
            <tr>
              <td>401</td>
              <td>Unauthorized</td>
            </tr>
            <tr>
              <td>403</td>
              <td>Forbidden</td>
            </tr>
            <tr>
              <td>404</td>
              <td>Not Found</td>
            </tr>
          </tbody>
        </table>

        <h4>3.2.2 Body</h4>
        <p>Response Body contains the resource data requested by the client.</p>

        <h4>HTTP Responses Summary</h4>
        <ul>
          <li>Status Line</li>
          <li>HTTP version</li>
          <li>Status code: 1XX, 2XX, 3XX, 4XX, 5XX</li>
          <li>Status text</li>
          <li>Headers</li>
          <li>Body</li>
        </ul>
      </section>

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

export default Hypertext_Transfer_Protocal_CS;
