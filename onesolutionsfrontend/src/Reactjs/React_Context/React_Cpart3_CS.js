import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Cpart3_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>React Context | Part 3 | Cheat Sheet</h1>

      <section>
        <h2>1. Context</h2>
        <p>Context can also be used:</p>
        <ul>
          <li>When data has to be available between different Routes.</li>
          <li>When data has to be available for more number of Components.</li>
        </ul>
      </section>

      <section>
        <h2>2. Using Context in methods</h2>
        <p>
          We can add Consumer or Provider in the class method when it returns
          JSX.
        </p>
        <p>
          In the below code snippet, we have used the Consumer Component in
          <code>renderProductDetailsView</code> because this method is returning
          JSX.
        </p>

        <p>
          <b>Example:</b>
        </p>
        <p>
          <b>File:</b> src/components/ProductItemDetails
        </p>

        <CodeBlock
          language="jsx"
          code={`class ProductItemDetails extends Component {
            state = {quantity: 1}
          
            onDecrement = () => {
              this.setState(prev =>
                prev.quantity > 1 ? {quantity: prev.quantity - 1} : prev,
              )
            }
          
            onIncrement = () => {
              this.setState(prev => ({quantity: prev.quantity + 1}))
            }
          
            render() {
              const {quantity} = this.state
          
              return (
                <CartContext.Consumer>
                  {value => (
                    <>
                      <Header />
                      <div className="product-item-details-container">
                        <h1>Product Details</h1>
          
                        <div className="quantity-container">
                          <button onClick={this.onDecrement}>
                            <BsDashSquare />
                          </button>
          
                          <p>{quantity}</p>
          
                          <button onClick={this.onIncrement}>
                            <BsPlusSquare />
                          </button>
                        </div>
          
                        <button
                          onClick={() => value.addCartItem({quantity})}
                          className="button"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </>
                  )}
                </CartContext.Consumer>
              )
            }
          }
          
          export default ProductItemDetails
          `}
        />
      </section>

      <section>
        <h2>3. Final Code</h2>
        <p>Run the below command in your IDE to download the final code.</p>
        <CodeBlock language="bash" code={`onesolutions start RJSIVIJ1YR`} />
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

export default React_Cpart3_CS;
