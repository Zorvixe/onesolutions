import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Compter_Networks_CS = ({
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
   <div>
 <div className="intro-container">
  <h1>Understanding Computer Networks | Cheat Sheet</h1>

  {/* INTERNET */}

  <section>
    <h2>1. Internet</h2>

    <p>
      The <b>Internet</b> is a global computer network that connects billions
      of computing devices around the world.
    </p>

    <ul>
      <li>Billions of Users</li>
      <li>Billions of Devices</li>
      <li>Millions of Applications</li>
    </ul>
      <img
          src="/assets/img/internet.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* NETWORK MODEL */}

  <section>
    <h2>2. Network Model</h2>

    <p>
      To reduce complexity, computer networks are organized into
      <b> layered models</b>.
    </p>

    <ul>
      <li>Each layer provides services to the layer above it</li>
      <li>Each layer abstracts the implementation of the lower layer</li>
    </ul>
      <img
          src="/assets/img/network-model.png"
          alt="software"
          style={{ width: "70%", height: "300px" }}
        />

    <p>
      Data is wrapped with headers (and sometimes footers) at each layer.
      This unit is called a <b>Protocol Data Unit (PDU)</b>.
    </p>

    <p>
      At the receiver side, the process is reversed and the data is
      <b> de-encapsulated</b>.
    </p>
  </section>

  {/* NETWORK LAYERS */}

  <section>
    <h2>3. Network Layers</h2>
      <img
          src="/assets/img/TCP.png"
          alt="software"
          style={{ width: "85%", height: "300px" }}
        />

    <h3>3.1 Physical Layer</h3>

    <p>
      Responsible for transmitting raw signals across physical media.
    </p>

    <ul>
      <li>Networking cables</li>
      <li>Wi-Fi hardware</li>
      <li>Cellular hardware</li>
    </ul>

    <h3>3.2 Data Link Layer</h3>

    <p>
      Defines how signals are interpreted and ensures reliable communication
      between directly connected devices.
    </p>

    <h3>3.3 Network Layer</h3>

    <p>
      Responsible for routing data across different networks.
    </p>

    <p>Example Protocol: <b>Internet Protocol (IP)</b></p>

    <h3>3.4 Transport Layer</h3>

    <p>
      Ensures data is delivered to the correct application process.
    </p>

    <h3>3.5 Application Layer</h3>

    <p>
      Provides services for applications such as web browsing and email.
    </p>
  </section>

  {/* TCP IP MODEL */}

  <section>
    <h2>4. TCP/IP Network Model</h2>

    <p>
      The TCP/IP model explains how data travels across the internet using
      layered architecture.
    </p>

    <p>
      It can be compared to delivering a package:
    </p>
    <img
          src="/assets/img/IP.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />
    <ul>
      <li>Physical Layer → Delivery truck and roads</li>
      <li>Data Link Layer → Moving between intersections</li>
      <li>Network Layer → Selecting route between addresses</li>
      <li>Transport Layer → Delivering to correct person</li>
      <li>Application Layer → Contents of the package</li>
    </ul>
  </section>

  {/* PROTOCOL */}

  <section>
    <h2>5. Protocol</h2>

    <p>
      A <b>protocol</b> is a set of rules that allow devices to communicate
      with each other.
    </p>

    <p>Protocols define:</p>

    <ul>
      <li>Format of messages</li>
      <li>Order of messages</li>
    </ul>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "70%" }}
    >
      <thead>
        <tr>
          <th>Layer</th>
          <th>Protocols</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td>HTTP, SMTP</td>
        </tr>
        <tr>
          <td>Transport</td>
          <td>TCP, UDP</td>
        </tr>
        <tr>
          <td>Network</td>
          <td>IP</td>
        </tr>
        <tr>
          <td>Data Link</td>
          <td>Ethernet, Wi-Fi</td>
        </tr>
        <tr>
          <td>Physical</td>
          <td>10Base-T, 802.11</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* NETWORK CABLES */}

  <section>
    <h2>6. Wired Network Cables</h2>

    <p>
      Cables connect devices and allow data transmission between them.
    </p>
  </section>

  {/* NETWORK PORT */}

  <section>
    <h2>7. Network Port</h2>
      <img
          src="/assets/img/network-port.png"
          alt="software"
          style={{ width: "100%", height: "300px" }}
        />
          <img
          src="/assets/img/network-port1.png"
          alt="software"
          style={{ width: "100%", height: "300px" }}
        />

    <p>
      Network ports are physical connectors that attach devices to a
      computer network.
    </p>
  </section>

  {/* HUB */}

  <section>
    <h2>8. Hub</h2>

    <p>
      A hub broadcasts incoming data to all connected devices.
    </p>

    <p>
      Each device must check whether the data is intended for it.
    </p>
      <img
          src="/assets/img/hub.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* MAC ADDRESS */}

  <section>
    <h2>9. MAC Address</h2>

    <p>
      MAC (Media Access Control) address is a globally unique identifier
      assigned to a network interface.
    </p>

    <p>
      MAC address characteristics:
    </p>

    <ul>
      <li>48-bit number</li>
      <li>Six groups of hexadecimal numbers</li>
    </ul>

    <CodeBlock
      language="text"
      code={`Example MAC Address:
00:1A:3F:F1:4C:C6`}
    />

    <p>
      MAC addresses remain the same regardless of the network location.
    </p>
  </section>

  {/* DATA COLLISIONS */}

  <section>
    <h2>10. Data Collisions</h2>

    <p>
      Data collisions occur when multiple devices send signals at the same
      time on the same communication channel.
    </p>

    <p>
      The network where collisions occur is called a
      <b> Collision Domain</b>.
    </p>
      <img
          src="/assets/img/collision.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* CSMA */}

  <section>
    <h2>11. Carrier Sense Multiple Access (CSMA)</h2>

    <p>
      CSMA allows devices to check whether the communication channel is free
      before transmitting data.
    </p>

    <p>
      This method is also called <b>Listen Before Talking</b>.
    </p>
  </section>

  {/* NETWORK SWITCH */}

  <section>
    <h2>12. Network Switch</h2>

    <p>
      A switch sends data only to the intended destination device.
    </p>

    <ul>
      <li>Stores MAC addresses</li>
      <li>Reduces network collisions</li>
      <li>Improves performance</li>
    </ul>
      <img
          src="/assets/img/network-switch.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* HUB VS SWITCH */}

  <section>
    <h2>13. Hub vs Switch</h2>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>Hub</th>
          <th>Switch</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Operates at Physical Layer</td>
          <td>Operates at Data Link Layer</td>
        </tr>
        <tr>
          <td>Sends data to all ports</td>
          <td>Sends data to specific destination port</td>
        </tr>
        <tr>
          <td>High chance of collisions</td>
          <td>Minimal collisions</td>
        </tr>
        <tr>
          <td>Cannot store MAC addresses</td>
          <td>Stores MAC addresses</td>
        </tr>
      </tbody>
    </table>
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
   </div>
  );
};

export default Compter_Networks_CS;