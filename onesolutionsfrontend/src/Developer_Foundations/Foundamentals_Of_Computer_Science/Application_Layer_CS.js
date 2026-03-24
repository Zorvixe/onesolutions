import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Application_Layer_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

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
  <h1>Application Layer | Cheat Sheet</h1>
  {/* APPLICATION LAYER */}
  <section>
    <h2>1. Application Layer</h2>
    <p>
      The <b>Application Layer</b> provides network services directly to
      applications used by end users.
    </p>

    <p>Applications communicate using various protocols.</p>


    <table
    className="custom-table"
    >
      <thead>
        <tr>
          <th>Layer</th>
          <th>Application Layer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Protocols</td>
          <td>DNS, HTTP, FTP, SSH</td>
        </tr>
        <tr>
          <td>Data Unit</td>
          <td>Message</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* IP ADDRESS */}

  <section>
    <h2>2. IP Address</h2>

    <p>
      Every server on the internet has an <b>IP address</b>.
    </p>

    <p>
      Since IP addresses are difficult for humans to remember, domain
      names are used instead.
    </p>
     <img
          src="/assets/img/IP-A.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* URL */}

  <section>
    <h2>3. Accessing Websites</h2>

    <h3>URL – Uniform Resource Locator</h3>

    <p>
      Every object on a web server (HTML page, image, file) has a unique
      URL.
    </p>
     <img
          src="/assets/img/URL-A.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* DOMAIN NAME */}

  <section>
    <h2>4. Domain Name</h2>

    <p>
      Domain names are human-readable names used to access websites.
    </p>
     <img
          src="/assets/img/domain.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />


    <h3>Domain Registrars</h3>

    <p>
      Domain registrars manage the reservation and registration of
      domain names.
    </p>
     <img
          src="/assets/img/D-R.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* DNS */}

  <section>
    <h2>5. DNS (Domain Name System)</h2>

    <p>
      DNS is a distributed system that translates domain names into IP
      addresses.
    </p>

    <p>
      It allows users to access websites using domain names instead of
      remembering IP addresses.
    </p>
     <img
          src="/assets/img/DNS.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* DNS SERVERS */}

  <section>
    <h2>6. DNS Servers</h2>

    <p>There are five main DNS server types:</p>

    <ul>
      <li>Root Name Servers</li>
      <li>TLD Name Servers</li>
      <li>Authoritative Name Servers</li>
      <li>Caching Name Servers</li>
      <li>Recursive Name Servers</li>
    </ul>

    <ul>
      <li>Root servers redirect to TLD servers</li>
      <li>TLD servers redirect to Authoritative servers</li>
      <li>Authoritative servers return the IP address</li>
      <li>Caching/Recursive servers reduce lookup load</li>
    </ul>
      <h2> Root Server</h2>
      <p>Any domain name registered in the DNS is a domain name.
Domain names are organized in subordinate levels (subdomains) of the DNS root domain, which is nameless.</p>
     <img
          src="/assets/img/Root-server.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* DNS RESOLUTION */}

  <section>
    <h2>7. DNS Resolution</h2>

    <ol>
      <li>Local DNS server contacts Root server</li>
      <li>Root server returns TLD server</li>
      <li>TLD server returns Authoritative server</li>
      <li>Authoritative server returns the IP address</li>
    </ol>
     <img
          src="/assets/img/DNS-R.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
        
  </section>

  {/* DNS UDP */}

  <section>
    <h2>8. DNS Transport Protocol</h2>

    <p>
      DNS typically uses <b>UDP</b> instead of TCP because:
    </p>

    <ul>
      <li>UDP is connectionless</li>
      <li>DNS queries are small</li>
      <li>One request and response fits in one datagram</li>
    </ul>
  </section>

  {/* DNS RECORD TYPES */}

  <section>
    <h2>9. DNS Record Types</h2>

    <table
    className="custom-table"
    >
      <thead>
        <tr>
          <th>Record</th>
          <th>Full Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>Address Record</td>
          <td>Maps domain to IPv4 address</td>
        </tr>
        <tr>
          <td>AAAA</td>
          <td>IPv6 Address Record</td>
          <td>Maps domain to IPv6 address</td>
        </tr>
        <tr>
          <td>CNAME</td>
          <td>Canonical Name</td>
          <td>Redirects one domain to another</td>
        </tr>
        <tr>
          <td>MX</td>
          <td>Mail Exchange</td>
          <td>Used for email routing</td>
        </tr>
        <tr>
          <td>NS</td>
          <td>Name Server</td>
          <td>Delegates DNS authority</td>
        </tr>
        <tr>
          <td>TXT</td>
          <td>Text Record</td>
          <td>Stores machine readable data</td>
        </tr>
      </tbody>
    </table>
    
    <br />
    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i> Note
        </h6>
      </div>

      <p>
        A domain can have multiple <b>A records</b>.
      </p>
    </div>
  </section>

  {/* WEB */}

  <section>
    <h2>10. Web</h2>

    <p>
      The web is a <b>client-server application</b>.
    </p>

    <ul>
      <li>Uses HTML documents</li>
      <li>Browsers act as clients</li>
      <li>Web servers host web content</li>
    </ul>

    <p>
      Web communication uses <b>HTTP/HTTPS</b> over TCP.
    </p>
  </section>

  {/* CLIENT SERVER */}

  <section>
    <h2>11. Client-Server Architecture</h2>

    <p>
      In this model, clients request services and servers respond.
    </p>

    <p>
      Example: A browser sends a request to a web server to retrieve a webpage.
    </p>
     <img
          src="/assets/img/C-S.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* WEB SERVER */}

  <section>
    <h2>12. Web Servers</h2>

    <ul>
      <li>Host web objects</li>
      <li>Always online</li>
      <li>Have a fixed IP address</li>
      <li>Default HTTP port: <b>80</b></li>
    </ul>
     <img
          src="/assets/img/web-server.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* HTTP */}

  <section>
    <h2>13. HTTP</h2>

    <p>
      HTTP uses a request-response model.
    </p>

    <ul>
      <li>Client sends request</li>
      <li>Server sends response</li>
    </ul>
    
  </section>

  {/* HTTP REQUEST */}

  <section>
    <h2>14. HTTP Request</h2>

    <p>HTTP request contains:</p>

    <ul>
      <li>Request Header</li>
      <li>Request Body</li>
    </ul>

    <p>Example header fields:</p>

    <CodeBlock
      language="text"
      code={`Host: developer.mozilla.org
Method: GET
Path: /
HTTP Version: HTTP/1.1`}
    />
  </section>

  {/* HTTP METHODS */}

  <section>
    <h2>15. HTTP Methods</h2>

    <ul>
      <li>GET → Retrieve data</li>
      <li>POST → Create new data</li>
      <li>PUT → Replace existing data</li>
      <li>DELETE → Remove data</li>
    </ul>
     <img
          src="/assets/img/HTTP.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* HTTP RESPONSE */}

  <section>
    <h2>16. HTTP Response</h2>

    <p>HTTP response contains:</p>

    <ul>
      <li>Response Header</li>
      <li>Response Body</li>
    </ul>

    <p>Header fields include:</p>

    <ul>
      <li>Status Code</li>
      <li>Content Type</li>
      <li>Content Length</li>
    </ul>
     <img
          src="/assets/img/HTTP-R.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* HTTP STATUS */}

  <section>
    <h2>17. HTTP Response Codes</h2>

    <ul>
      <li>1XX → Informational</li>
      <li>2XX → Success</li>
      <li>3XX → Redirection</li>
      <li>4XX → Client Error</li>
      <li>5XX → Server Error</li>
    </ul> <img
          src="/assets/img/HTTP-code.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />

  </section>

  {/* HTTPS */}

  <section>
    <h2>18. HTTPS</h2>

    <p>
      HTTPS encrypts communication between browser and server.
    </p>

    <ul>
      <li>Protects user privacy</li>
      <li>Ensures data integrity</li>
      <li>Default port: <b>443</b></li>
    </ul>
     <img
          src="/assets/img/HTP.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* DATA TRANSFER */}

  <section>
    <h2>19. Transferring Data Over Network</h2>

    <p>
      Data is encapsulated with headers at each layer to form a
      Protocol Data Unit (PDU).
    </p>

    <p>
      At the receiving side, the process is reversed through
      de-encapsulation until the application receives the data.
    </p>
     <img
          src="/assets/img/TDO.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>


  

      {/* Continue Button */}
      <div className="view-continue">
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

export default Application_Layer_CS;
