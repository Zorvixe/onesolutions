import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Ondemand2_Session_CS = ({
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
    <h1>On-Demand Session | Part 2 | Cheat Sheet</h1>
  
    <section>
      <h2>1. Third-Party Packages</h2>
      <p>
        A third-party package is a reusable piece of code that can be installed
        and used in our application.
      </p>
  
      <h3>UUID (Universally Unique Identifier)</h3>
      <p>
        Using the UUID package, we can generate a unique id.
      </p>
  
      <h3>1.1 Installing UUID</h3>
      <CodeBlock
        language="bash"
        code={`npm install uuid`}
      />
  
      <h3>1.2 Importing of UUID</h3>
      <p>
        The UUID package provides <code>uuidv4()</code>, which returns a unique id
        whenever it is called.
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import { v4 as uuidv4 } from "uuid";`}
      />
    </section>
  
    <section>
      <h2>2. Best Practice</h2>
            <ul>
        <li>
            The state should be immutable. We shouldn’t update the array or object
            directly.
        </li>
        <li>
            The best practice is to create a new array or object using the spread
            operator.
        </li>
        </ul>

  
      <p><b>Incorrect:</b></p>
            <CodeBlock
                language="javascript"
                code={`this.state.contactsList = initialContactsList;
        this.state.contactsList.push(newContact);`}
            />
        
            <p><b>Correct:</b></p>
            <CodeBlock
                language="javascript"
                code={`this.setState(prevState => ({
            contactsList: [...prevState.contactsList, newContact],
     }));`}
            />
    </section>
  
    <section>
      <h2>2.1 Updating a Property of an Item inside List</h2>
      <p>
        We should not update the property of a list item directly. Instead, we
        should create a new object and return it.
      </p>
  
      <h3>Syntax</h3>
      <CodeBlock
        language="javascript"
        code={`{ ...object, newItem }`}
      />
  
      <h3>Example</h3>
      <p><b>File: src/App.js</b></p>
  
            <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactItem from "./components/ContactItem";
import "./App.css";
     const initialContactsList = [
        {
            id: uuidv4(),
            name: "Ram",
            mobileNo: 9999988888,
            isFavorite: false,
        },
        {
            id: uuidv4(),
            name: "Pavan",
            mobileNo: 8888866666,
            isFavorite: true,
        },
        {
            id: uuidv4(),
            name: "Nikhil",
            mobileNo: 9999955555,
            isFavorite: false,
        },
        ];

    class App extends Component {
        state = {
            contactsList: initialContactsList,
            name: "",
            mobileNo: "",
        };

    toggleIsFavorite = id => {
            this.setState(prevState => ({
            contactsList: prevState.contactsList.map(eachContact => {
                if (id === eachContact.id) {
                return { ...eachContact, isFavorite: !eachContact.isFavorite };
                }
                return eachContact;
            }),
            }));
        };

    onAddContact = event => {
            event.preventDefault();
            const { name, mobileNo } = this.state;

      const newContact = {
            id: uuidv4(),
            name,
            mobileNo,
            isFavorite: false,
            };

        this.setState(prevState => ({
            contactsList: [...prevState.contactsList, newContact],
            name: "",
            mobileNo: "",
            }));
        };

        onChangeMobileNo = event => {
            this.setState({ mobileNo: event.target.value });
        };

        onChangeName = event => {
            this.setState({ name: event.target.value });
        };

        render() {
            const { name, mobileNo, contactsList } = this.state;

            return (
            <div className="app-container">
                <div className="responsive-container">
                <h1 className="heading">Contacts</h1>

                <form
                    className="contact-form-container"
                    onSubmit={this.onAddContact}
                >
                    <input
                    value={name}
                    onChange={this.onChangeName}
                    className="input"
                    placeholder="Name"
                    />
                    <input
                    className="input"
                    value={mobileNo}
                    onChange={this.onChangeMobileNo}
                    placeholder="Mobile Number"
                    />
                    <button type="submit" className="button">
                    Add Contact
                    </button>
                </form>

                <ul className="contacts-table">
                    <li className="table-header">
                    <p className="table-header-cell name-column">Name</p>
                    <hr className="separator" />
                    <p className="table-header-cell">Mobile Number</p>
                    </li>

                    {contactsList.map(eachContact => (
                    <ContactItem
                        key={eachContact.id}
                        contactDetails={eachContact}
                        toggleIsFavorite={this.toggleIsFavorite}
                    />
                    ))}
                </ul>
                </div>
            </div>
            );
        }
        }

export default App;`}
        />

    </section>
  
    <section>
      <h2>3. Contacts App Final Code</h2>
  
      <h3>File: src/App.js</h3>
            <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactItem from "./components/ContactItem";
import "./App.css";
     const initialContactsList = [
        {
            id: uuidv4(),
            name: "Ram",
            mobileNo: 9999988888,
            isFavorite: false,
        },
        {
            id: uuidv4(),
            name: "Pavan",
            mobileNo: 8888866666,
            isFavorite: true,
        },
        {
            id: uuidv4(),
            name: "Nikhil",
            mobileNo: 9999955555,
            isFavorite: false,
        },
        ];

     class App extends Component {
        state = {
            contactsList: initialContactsList,
            name: "",
            mobileNo: "",
        };

        toggleIsFavorite = id => {
            this.setState(prevState => ({
            contactsList: prevState.contactsList.map(eachContact => {
                if (id === eachContact.id) {
                return { ...eachContact, isFavorite: !eachContact.isFavorite };
                }
                return eachContact;
            }),
            }));
        };

        onAddContact = event => {
            event.preventDefault();
            const { name, mobileNo } = this.state;

            const newContact = {
            id: uuidv4(),
            name,
            mobileNo,
            isFavorite: false,
            };

            this.setState(prevState => ({
            contactsList: [...prevState.contactsList, newContact],
            name: "",
            mobileNo: "",
            }));
        };

        onChangeMobileNo = event => {
            this.setState({ mobileNo: event.target.value });
        };

        onChangeName = event => {
            this.setState({ name: event.target.value });
        };

        render() {
            const { name, mobileNo, contactsList } = this.state;

            return (
            <div className="app-container">
                <div className="responsive-container">
                <h1 className="heading">Contacts</h1>

                <form
                    className="contact-form-container"
                    onSubmit={this.onAddContact}
                >
                    <input
                    value={name}
                    onChange={this.onChangeName}
                    className="input"
                    placeholder="Name"
                    />
                    <input
                    className="input"
                    value={mobileNo}
                    onChange={this.onChangeMobileNo}
                    placeholder="Mobile Number"
                    />
                    <button type="submit" className="button">
                    Add Contact
                    </button>
                </form>

                <ul className="contacts-table">
                    <li className="table-header">
                    <p className="table-header-cell name-column">Name</p>
                    <hr className="separator" />
                    <p className="table-header-cell">Mobile Number</p>
                    </li>

                    {contactsList.map(eachContact => (
                    <ContactItem
                        key={eachContact.id}
                        contactDetails={eachContact}
                        toggleIsFavorite={this.toggleIsFavorite}
                    />
                    ))}
                </ul>
                </div>
            </div>
            );
        }
        }
 export default App;`}
        />

      <h3>File: src/components/ContactItem/index.js</h3>
            <CodeBlock
        language="jsx"
        code={`import "./index.css";
    const ContactItem = props => {
    const { contactDetails, toggleIsFavorite } = props;
    const { name, mobileNo, isFavorite, id } = contactDetails;

     const starImgUrl = isFavorite
            ? "https://assets.Onesolution.in/frontend/react-js/star-filled-img.png"
            : "https://assets.Onesolution.in/frontend/react-js/star-outline-img.png";

        const onClickFavoriteIcon = () => {
            toggleIsFavorite(id);
        };

        return (
            <li className="table-row">
            <div className="table-cell name-column">
                <p>{name}</p>
            </div>
            <hr className="separator" />
            <div className="table-cell mobile-no-column">
                <p className="mobile-no-value">{mobileNo}</p>
                <button
                type="button"
                className="favorite-icon-container"
                onClick={onClickFavoriteIcon}
                >
                <img src={starImgUrl} className="favorite-icon" alt="star" />
                </button>
            </div>
            </li>
        );
        };

export default ContactItem;`}
        />

    </section>

      {/* Continue Button */}
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

export default Ondemand2_Session_CS;
