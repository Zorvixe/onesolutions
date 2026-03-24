import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Transport_Layers_CS = ({
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
< div className="intro-container">
  <h1>Transport Layer | Cheat Sheet</h1>

  {/* PROCESSES */}

  <section>
    <h2>1. Processes</h2>

    <p>
      Multiple applications can run simultaneously on a computer.
      For example, an email client and a web browser can run at the same time.
    </p>

    <p>
      Even if both services run on the same server, the data still reaches
      the correct application because of the Transport Layer.
    </p>
  </section>

  {/* PORT NUMBERS */}

  <section>
    <h2>2. Port Numbers</h2>

    <p>
      A <b>port</b> is a <b>16-bit number</b> used to direct traffic to
      specific services running on a networked computer.
    </p>
        <img
          src="/assets/img/PORT-N.png"
          alt="software"
          style={{ width: "60%", height: "300px" }}
        />
  </section>

  {/* SOCKET ADDRESS */}

  <section>
    <h2>3. Socket Address</h2>

    <CodeBlock
      language="text"
      code={`IP Address + Port Number = Socket Address`}
    />
        <img
          src="/assets/img/socket.png"
          alt="software"
          style={{ width: "85%", height: "300px" }}
        />
  </section>

  {/* MULTIPLEXING */}

  <section>
    <h2>4. Multiplexing and Demultiplexing</h2>

    <p>
      <b>Multiplexing:</b> The transport layer directs traffic from multiple
      applications to the network.
    </p>

    <p>
      <b>Demultiplexing:</b> At the receiving end, traffic is delivered to the
      correct application.
    </p>
        <img
          src="/assets/img/multiplex.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* HEADERS */}

  <section>
    <h2>5. Headers & Payload</h2>

    <p>Each packet contains two parts:</p>

    <ul>
      <li><b>Header</b></li>
      <li><b>Payload</b></li>
    </ul>

    <ul>
      <li>Data Link Layer Header → MAC Address</li>
      <li>Network Layer Header → IP Address</li>
      <li>Transport Layer Header → Port Number</li>
    </ul>
  </section>

  {/* PROTOCOLS */}

  <section>
    <h2>6. Transport Layer Protocols</h2>

    <ul>
      <li>Transmission Control Protocol (TCP)</li>
      <li>User Datagram Protocol (UDP)</li>
    </ul>
  </section>

  {/* PACKETS */}

  <section>
    <h2>7. Packets</h2>

    <p>
      Large messages are broken into smaller units called <b>packets</b>.
    </p>

    <p>
      Sending smaller packets improves network efficiency and reliability.
    </p>
        <img
          src="/assets/img/packets.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* ROUTE */}

  <section>
    <h2>8. Route</h2>

    <p>
      The sequence of links and routers a packet travels through is
      called a <b>route</b> or <b>path</b>.
    </p>

    <p>
      Routers balance traffic across different routes to ensure reliable
      delivery.
    </p>
        <img
          src="/assets/img/route2.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* SEQUENCE NUMBERS */}

  <section>
    <h2>9. Sequence Numbers</h2>

    <p>
      TCP ensures packets are assembled in the correct order using
      <b> 32-bit sequence numbers</b>.
    </p>
  </section>

  {/* PACKET LOSS */}

  <section>
    <h2>10. Packet Loss</h2>

    <p>Packets may be lost due to:</p>

    <ul>
      <li>TTL expiration</li>
      <li>Network congestion</li>
      <li>Hardware failures</li>
    </ul>
  </section>

  {/* TCP */}

  <section>
    <h2>11. Transmission Control Protocol (TCP)</h2>

    <p>
      TCP provides reliable data transfer between devices.
    </p>

    <h3>Acknowledgement</h3>

    <p>
      The receiver sends an acknowledgment (ACK) after receiving data.
    </p>

    <p>
      The ACK contains the sequence number of the next expected segment.
    </p>
  </section>

  {/* TCP CONNECTION */}

  <section>
    <h2>12. TCP Connection</h2>

    <ul>
      <li><b>SYN</b> → Initiates connection</li>
      <li><b>FIN</b> → Terminates connection</li>
    </ul>

    <h3>Three-Way Handshake</h3>

    <p>
      TCP uses a three-way handshake to establish a connection between
      client and server.
    </p>

    <p>After the handshake, data transfer begins.</p>
        <img
          src="/assets/img/Tcp-c.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* DATA TRANSMISSION */}

  <section>
    <h2>13. Data Transmission</h2>

    <p>
      Once the connection is established, data packets are sent along with
      sequence numbers.
    </p>

    <p>
      The receiver acknowledges each packet received.
    </p>  
      <img
          src="/assets/img/data-t.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* LOST PACKETS */}

  <section>
    <h2>14. Lost Packets</h2>

    <p>
      TCP connections can detect lost packets using a timeout.
    </p>

    <p>
After sending off a packet, the sender starts a timer and puts the packet in a retransmission queue.
    </p>
       <p>
If the timer runs out and the sender has not yet received an ACK from the recipient, it sends the packet again.
    </p>
        <img
          src="/assets/img/lost-packet.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

           <h2>14. Lost ACK</h2>
               <img
          src="/assets/img/lost-ack.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* DUPLICATE PACKETS */}

  <section>
    <h2>15. Premature timeout</h2>

    <p>
   The retransmission may lead to the recipient receiving duplicate packets, if a packet was not actually lost but just very slow to arrive or be acknowledged.
    </p>

    <p>
     If so, AS recipient has sequence it can simply discard duplicate packets.
    </p>
    <p>It's better to have the data twice than not at all!

</p>
    <img
          src="/assets/img/time-out.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* TERMINATION */}

  <section>
    <h2>16. TCP Connection Termination</h2>

    <p>
      TCP closes a connection using a <b>four-way handshake</b>.
    </p>
        <img
          src="/assets/img/hand-shake.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* TCP CONGESTION */}

  <section>
    <h2>17. TCP Congestion Control</h2>

    <p>
      TCP uses algorithms to avoid network congestion.
    </p>

    <h3>Slow Start</h3>

    <p>
      Transmission rate increases exponentially
      (1 → 2 → 4 → 8 → 16 packets).
    </p>

    <h3>Congestion Avoidance</h3>

    <p>
      Transmission rate increases linearly after packet loss.
    </p>
        <img
          src="/assets/img/traffic-int.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
  </section>

  {/* TCP SUMMARY */}

  <section>
    <h2>18. TCP Summary</h2>

    <ul>
      <li>Establish connection</li>
      <li>Send acknowledgements</li>
      <li>Terminate connection</li>
    </ul>
  </section>

  {/* TCP VS UDP */}

  <section>
    <h2>19. TCP vs UDP</h2>

    <p>
      UDP is useful for real-time applications such as video streaming
      and online gaming where speed is more important than reliability.
    </p>

    <p>
      TCP is used when accurate and complete delivery is required,
      such as emails and file transfers.
    </p>
        <img
          src="/assets/img/T-U.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />

  </section>

  {/* UDP */}

  <section>
    <h2>20. User Datagram Protocol (UDP)</h2>

    <ul>
      <li>No guarantee of message delivery</li>
      <li>No acknowledgment</li>
      <li>Less overhead</li>
    </ul>
  </section>

  {/* PRIVATE IPS */}

  <section>
    <h2>21. Public & Private IP Addresses</h2>

    <p>
      IANA assigns public IP ranges to organizations and ISPs.
    </p>

    <p>
      Some IP ranges are reserved for private networks.
    </p>

    <table  className="custom-table">
      <thead>
        <tr>
          <th>Private IP Range</th>
          <th>Possible Hosts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10.0.0.0 – 10.255.255.255</td>
          <td>16,777,216</td>
        </tr>
        <tr>
          <td>172.16.0.0 – 172.31.255.255</td>
          <td>1,048,576</td>
        </tr>
        <tr>
          <td>192.168.0.0 – 192.168.255.255</td>
          <td>65,536</td>
        </tr>
      </tbody>
    </table>
  </section>

  {/* NON ROUTABLE */}

  <section>
    <h2>22. Non-Routable Address Space</h2>

    <p>
      RFC 1918 defines IP ranges that are not routable on the public internet.
    </p>

    <CodeBlock
      language="text"
      code={`10.0.0.0/8
172.16.0.0/12
192.168.0.0/16`}
    />
  </section>

  {/* NAT */}

  <section>
    <h2>23. Network Address Translation (NAT)</h2>

    <p>
    With NAT, you can have hundreds even thousands of machines using non-routable address space.
    </p>

    <p>
     Yet, with just a single public IP, all those computers can still send traffic to and receive traffic from the internet.
    </p>
    <p>Yet, with just a single public IP, all those computers can still send traffic to and receive traffic from the internet.</p>
        <img
          src="/assets/img/nat.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
      <p>NAT is a technology that allows a gateway, usually a router, to rewrite the source IP of an outgoing IP datagram while retaining the original IP in order to rewrite it into the response.</p>
          <img
          src="/assets/img/nat-2.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
        <p>Here, we have two networks. Network A consists of the 10.1.1.0/24 address space and network B consists of the 138.76.29.0/24 address space. Sitting between these networks is a router that has an interface on network A with an IP of 10.1.1.1 and an interface on network B of 138.76.29.7. Computer 1 is on network A and has an IP of 10.1.1.100. And computer 2 is on network B and has an IP of 138.76.29.100.</p>
        <p>Computer 1 wants to communicate with a web server on computer 2.</p>
        <p>So it crafts the appropriate packet at all layers and sends this to its primary gateway, the router sitting between the two networks.
So far, this is a lot like many of our earlier examples, but in this instance,</p>

    <img
          src="/assets/img/nat-3.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
        <p>The router is configured to perform NAT for any outbound packets.
Normally, a router will inspect the contents of an IP datagram, decrement the TTL by 1, and forward the rest of the data at the network layer without touching it.</p>
<p>But with NAT, the router will also rewrite the source IP address, which in this instance, becomes the router's IP on network B or 138.76.29.7. When the datagram gets to computer 2, it'll look like it originated from the router, not from computer 1.</p>
    <img
          src="/assets/img/nat-4.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
        />
        <p>Now, computer 2 crafts its response and sends it back to the router. The router, knowing that this traffic is actually intended for computer 1, rewrites the destination IP field before forwarding it along.</p>
            <img
          src="/assets/img/nat-5.png"
          alt="software"
          style={{ width: "80%", height: "300px" }}
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
</div>
 
  );
};

export default Transport_Layers_CS;