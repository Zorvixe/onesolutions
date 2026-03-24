import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Network_Layer_CS = ({
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
  <h1>Network Layer | Cheat Sheet</h1>

  {/* IP ADDRESS */}

  <section>
    <h2>1. IP Address</h2>

    <p>
      An <b>IP Address</b> identifies a device on a network. IP addresses belong
      to the network rather than the device itself.
    </p>

    <p>Example:</p>

    <CodeBlock language="text" code={`172.16.254.1`} />

    <p>
      A device can have different IP addresses depending on the network it
      connects to, while the MAC address remains constant.
    </p>
  </section>

  {/* IPV4 */}

  <section>
    <h2>2. IPv4 Addressing</h2>

    <p>
      IPv4 addresses are <b>32-bit numbers</b> divided into four groups called
      <b> octets</b>.
    </p>

    <ul>
      <li>Each octet contains 8 bits</li>
      <li>Each octet ranges from 0 – 255</li>
      <li>Written in dotted decimal notation</li>
    </ul>
      <img
          src="/assets/img/IPV4.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

    <CodeBlock language="text" code={`Example: 192.168.1.1`} />

    <p>
      Total possible IPv4 addresses:
    </p>

    <CodeBlock language="text" code={`2^32 ≈ 4 Billion IP Addresses`} />
  </section>

  {/* IPV6 */}

  <section>
    <h2>3. IPv6 Addressing</h2>

    <p>
      IPv6 addresses are <b>128-bit numbers</b>.
    </p>

    <ul>
      <li>Divided into 8 groups</li>
      <li>Each group contains 4 hexadecimal digits</li>
      <li>Each group represents 16 bits</li>
    </ul>
      <img
          src="/assets/img/IPV6.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

    <CodeBlock
      language="text"
      code={`Example:
2001:0db8:85a3:0000:0000:8a2e:0370:7334`}
    />
  </section>

  {/* ROUTER */}

  <section>
    <h2>4. Router</h2>

    <p>
      A <b>Router</b> forwards data between independent networks.
    </p>

    <ul>
      <li>Stores route information for multiple networks</li>
      <li>Works at the Network Layer</li>
    </ul>
  </section>

  {/* WIRELESS ROUTER */}

  <section>
    <h2>5. Wireless Router</h2>

    <p>A wireless router combines multiple networking components:</p>

    <ul>
      <li>Router</li>
      <li>Switch</li>
      <li>Wireless Access Point</li>
    </ul>
      <img
          src="/assets/img/router.png"
          alt="software"
          style={{ width: "50%", height: "300px" }}
        />
  </section>

  {/* WIRELESS ACCESS POINT */}

  <section>
    <h2>6. Wireless Access Point (WAP)</h2>

    <p>
      A Wireless Access Point allows Wi-Fi devices to connect to a wired
      network.
    </p>
      <img
          src="/assets/img/WAP.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* ROUTE */}

  <section>
    <h2>7. Route</h2>

    <p>
      A route is the sequence of communication links and packet switches that
      a packet travels through from sender to receiver.
    </p>

    <p>
      Routers continuously select optimal paths to balance traffic and improve
      reliability.
    </p>
      <img
          src="/assets/img/route1.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* SUBNETTING */}

  <section>
    <h2>8. Subnetting</h2>

    <p>
      Subnetting is the process of dividing a large network into smaller
      networks called <b>subnets</b>.
    </p>

    <p>Advantages:</p>

    <ul>
      <li>Improved network efficiency</li>
      <li>Better security</li>
      <li>Easier network management</li>
    </ul>
      <img
          src="/assets/img/subnetting.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* SUBNET ADDRESS */}

  <section>
    <h2>9. Subnet Components</h2>

    <ul>
      <li>
        <b>Network ID</b> → Identifies the network
      </li>

      <li>
        <b>Host ID</b> → Identifies devices within the network
      </li>

      <li>
        <b>Subnet Mask</b> → Separates network and host portions
      </li>
    </ul>

    <table
    className="custom-table"
    >
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Binary Format</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>223.1.1.2</td>
          <td>11011111 00000001 00000001 00000010</td>
        </tr>

        <tr>
          <td>Subnet Mask</td>
          <td>255.255.255.0</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* CIDR */}

  <section>
    <h2>10. CIDR Notation</h2>

    <p>
      CIDR (Classless Inter-Domain Routing) uses slash notation to represent
      the IP address and subnet mask.
    </p>

    <CodeBlock language="text" code={`223.1.1.2/24`} />

    <ul>
      <li>/24 represents the number of 1's in the subnet mask</li>
    </ul>

    <table
     className="custom-table"
    >
      <thead>
        <tr>
          <th>CIDR</th>
          <th>IP Range</th>
          <th>Possible Hosts</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>223.1.1.0/24</td>
          <td>223.1.1.0 – 223.1.1.255</td>
          <td>254</td>
        </tr>

        <tr>
          <td>223.2.1.0/23</td>
          <td>223.2.0.0 – 223.2.1.255</td>
          <td>510</td>
        </tr>

        <tr>
          <td>223.3.1.0/22</td>
          <td>223.3.0.0 – 223.3.3.255</td>
          <td>1022</td>
        </tr>
      </tbody>
    </table>
    <br></br>

    <div className="Note-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-journal-text"></i> Note
        </h6>
      </div>

      <ul>
        <li>First address → Network address</li>
        <li>Last address → Broadcast address</li>
      </ul>
    </div>
      <img
          src="/assets/img/CIDR.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* FORWARDING */}

  <section>
    <h2>11. Forwarding</h2>

    <p>Basic routing process:</p>

    <ol>
      <li>Router receives packet</li>
      <li>Router checks destination IP</li>
      <li>Looks up routing table</li>
      <li>Forwards packet to next hop</li>
    </ol>
      <img
          src="/assets/img/forward.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* ROUTING TABLE */}

  <section>
    <h2>12. Routing Table</h2>

    <p>
      Routers maintain routing tables that specify where packets should be
      forwarded.
    </p>

    <table
   className="custom-table"
    >
      <thead>
        <tr>
          <th>Destination</th>
          <th>Next Hop</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>9.1.1.0/24</td>
          <td>172.16.5.10</td>
        </tr>

        <tr>
          <td>223.1.1.0/24</td>
          <td>172.16.5.11</td>
        </tr>

        <tr>
          <td>64.0.10.0/24</td>
          <td>172.16.5.12</td>
        </tr>

        <tr>
          <td>* (Default Route)</td>
          <td>172.16.5.10</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* HOP */}

  <section>
    <h2>13. Hop</h2>

    <p>
      A hop occurs when a packet moves from one router to another router in
      a network.
    </p>
      <img
          src="/assets/img/hop.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* TTL */}

  <section>
    <h2>14. Time To Live (TTL)</h2>

    <p>
      TTL defines the number of router hops a packet can pass through before
      it is discarded.
    </p>
    
  </section>

  {/* DATA TRANSFER */}

  <section>
    <h2>15. Transferring Data Over Network</h2>

    <p>
      Data is encapsulated at each network layer with headers and footers.
    </p>

    <p>
      At the receiving end, the process is reversed and data is
      de-encapsulated layer by layer until it reaches the application.
    </p>
     
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

export default Network_Layer_CS;