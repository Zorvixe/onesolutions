import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Expressjs_CS_3 = ({
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
      <h1>Introduction to Express JS | Part 3 | Cheat Sheet</h1>

      {/* SQLITE METHODS */}

      <section>
        <h2>1. SQLite Methods</h2>
        <p>
          The SQLite package provides multiple methods to execute SQL queries on
          a database.
        </p>
        <ul>
          <li>all()</li>
          <li>get()</li>
          <li>run()</li>
          <li>exec(), etc.</li>
        </ul>

        <h3>1.1 get()</h3>
        <p>Used to get a single row from the table.</p>

        <CodeBlock language="javascript" code={`db.get(SQL_QUERY);`} />

        <h3>1.2 run()</h3>
        <p>Used to insert, update or delete data.</p>

        <CodeBlock language="javascript" code={`db.run(SQL_QUERY);`} />
      </section>

      {/* NODEMON */}

      <section>
        <h2>2. Node JS Third-party Packages</h2>

        <h3>2.1 Nodemon</h3>

        <p>
          Nodemon automatically restarts the server whenever we make changes.
        </p>

        <CodeBlock language="bash" code={`npm install -g nodemon`} />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>

          <ul>
            <li>
              The-g indicates that the nodemon will be installed globally in the
              environment.
            </li>
            <li>
              While executing the file, replace the node with the nodemon. For
              example, nodemon index.js.
            </li>
          </ul>
        </div>
      </section>

      {/* GOODREADS API */}

      <section>
        <h2>3. GoodReads APIs</h2>

        <h3>3.1 Get Book</h3>

        <CodeBlock
          language="javascript"
          code={`app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
  
    const getBookQuery = \`
      SELECT *
      FROM book
      WHERE book_id = \${bookId};
    \`;
  
    const book = await db.get(getBookQuery);
    response.send(book);
  });`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p> Path parameter can be any name.</p>
        </div>

        {/* ADD BOOK */}

        <h3>3.2 Add Book</h3>
        <p>
          To add a book to the Database, you need to send a request body in JSON
          format.
        </p>

        <CodeBlock
          language="javascript"
          code={`app.use(express.json());
  
  app.post("/books/", async (request, response) => {
    const bookDetails = request.body;
  
    const {
      title,
      authorId,
      rating,
      ratingCount,
      reviewCount,
      description,
      pages,
      dateOfPublication,
      editionLanguage,
      price,
      onlineStores,
    } = bookDetails;
  
    const addBookQuery = \`
      INSERT INTO book
      (title, author_id, rating, rating_count, review_count,
       description, pages, date_of_publication,
       edition_language, price, online_stores)
      VALUES
      ('\${title}', \${authorId}, \${rating}, \${ratingCount},
       \${reviewCount}, '\${description}', \${pages},
       '\${dateOfPublication}', '\${editionLanguage}',
       \${price}, '\${onlineStores}');
    \`;
  
    const dbResponse = await db.run(addBookQuery);
    response.send(\`Book Successfully Added with ID \${dbResponse.lastID}\`);
  });`}
        />

     <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p> express.json() is used to read JSON request body.
        </p>
        </div>

        {/* UPDATE BOOK */}

        <h3>3.3 Update Book</h3>

        <CodeBlock
          language="javascript"
          code={`app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const bookDetails = request.body;

  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

  const updateBookQuery = \`
    UPDATE book
    SET
      title = '\${title}',
      author_id = \${authorId},
      rating = \${rating},
      rating_count = \${ratingCount},
      review_count = \${reviewCount},
      description = '\${description}',
      pages = \${pages},
      date_of_publication = '\${dateOfPublication}',
      edition_language = '\${editionLanguage}',
      price = \${price},
      online_stores = '\${onlineStores}'
    WHERE book_id = \${bookId};
  \`;

  await db.run(updateBookQuery);
  response.send("Book Updated Successfully");
});`}
        />

<div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p> request.params is used to access path parameters.
        </p>
        </div>

        {/* DELETE BOOK */}

        <h3>3.4 Delete Book</h3>

        <CodeBlock
          language="javascript"
          code={`app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
  
    const deleteBookQuery = \`
      DELETE FROM book
      WHERE book_id = \${bookId};
    \`;
  
    await db.run(deleteBookQuery);
    response.send("Book Deleted Successfully");
  });`}
        />

        {/* GET AUTHOR BOOKS */}

        <h3>3.5 Get Author Books</h3>

        <CodeBlock
          language="javascript"
          code={`app.get("/authors/:authorId/books/", async (request, response) => {
    const { authorId } = request.params;
  
    const getAuthorBooksQuery = \`
      SELECT *
      FROM book
      WHERE author_id = \${authorId};
    \`;
  
    const booksArray = await db.all(getAuthorBooksQuery);
    response.send(booksArray);
  });`}
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

export default Introductionto_Expressjs_CS_3;
