import React, { useState } from "react";

const Introduction_to_Databases_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Introduction to Databases | Cheat Sheet</h1>

      {/* 1. Concepts in Focus */}
      <section>
        <h2>1. Concepts in Focus</h2>
        <ul>
          <li>Data</li>
          <li>Database</li>
          <li>Database Management System (DBMS)</li>
          <li>Advantages</li>
          <li>Types of Databases</li>
          <li>Relational Database</li>
          <li>Non-Relational Database</li>
        </ul>
      </section>

      {/* 2. Data */}
      <section>
        <h2>2. Data</h2>
        <div className="img-text">
          <img
            src="/assets/img/Data_img.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              Any sort of information that is stored is called <b>data</b>.
            </p>
            <p>
              <b>Examples:</b>
            </p>
            <ul>
              <li>Messages & multimedia on WhatsApp</li>
              <li>Products and orders on Amazon</li>
              <li>Contact details in a telephone directory</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Database */}
      <section>
        <h2>3. Database</h2>
        <p>
          An organised collection of data is called a <b>database</b>.
        </p>
      </section>

      {/* 4. Database Management System (DBMS) */}
      <section>
        <h2>4. Database Management System (DBMS)</h2>
        <p>
          A software that is used to easily store and access data from the
          database in a secure way.
        </p>
        <img
          src="/assets/img/dbms_img.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
      </section>

      {/* 5. Advantages */}
      <section>
        <h2>5. Advantages of DBMS</h2>
        <ul>
          <li>
            <b>Security:</b> Data is stored and maintained securely.
          </li>
          <li>
            <b>Ease of Use:</b> Simplifies data creation and updates as data
            grows.
          </li>
          <li>
            <b>Durability and Availability:</b> Ensures consistent access to
            data anytime.
          </li>
          <li>
            <b>Performance:</b> Provides fast access for applications and users.
          </li>
        </ul>
      </section>

      {/* 6. Types of Databases */}
      <section>
        <h2>6. Types of Databases</h2>
        <p>
          There are different types of databases based on how we organize the
          data.
        </p>
        <img
          src="/assets/img/types_of_databases_img.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <ul>
          <li>Relational Database</li>
          <li>Non-Relational Database</li>
        </ul>
      </section>

      {/* 7. Relational Database */}
      <section>
        <h3>Relational Database</h3>

        <div className="img-text">
          <img
            src="/assets/img/relational_database_img.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              In relational databases, the data is organised in the form of{" "}
              <b>tables</b>.
            </p>
          </div>
        </div>

        <h3>Non-Relational Database</h3>
        <div className="img-text">
          <img
            src="/assets/img/non_relational_database_img.png"
            alt="DOM Tree"
            style={{ width: "70%", height: "300px" }}
          />
          <div className="text">
            <p>
              These four types are commonly referred as non-relational
              databases.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2>Note</h2>
        <ul>
          <li>Choice of database depends on project requirements.</li>
          <li>Relational databases are the most commonly used.</li>
        </ul>
      </section>

      <section>
        <h2>7. Relational Database</h2>
        <p>
          A <b>Relational DBMS (RDBMS)</b> is a DBMS designed specifically for
          relational databases.
        </p>
        <p>
          <b>Examples:</b>
        </p>
        <ul>
          <li>Oracle</li>
          <li>PostgreSQL</li>
          <li>MySQL</li>
          <li>SQLite</li>
          <li>SQL Server</li>
          <li>IBM DB2</li>
        </ul>
        <h2>8. Non-Relational Database</h2>
        <p>
          In <b>non-relational databases</b>, data is stored in{" "}
          <b>non-tabular formats</b> such as key-value pairs, documents, graphs,
          or wide-columns.
        </p>
        <p>
          A <b>Non-Relational DBMS</b> is a DBMS built for handling
          non-relational data structures.
        </p>

        <p>
          <b>Examples:</b>
        </p>
        <ul>
          <li>MongoDB</li>
          <li>Cassandra</li>
          <li>Redis</li>
          <li>DynamoDB</li>
          <li>Elasticsearch</li>
          <li>CouchDB</li>
        </ul>
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

export default Introduction_to_Databases_CS;
