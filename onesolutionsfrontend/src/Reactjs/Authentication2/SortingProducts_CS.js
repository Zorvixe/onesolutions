import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const SortingProducts_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Sorting Products | Cheat Sheet</h1>

      <section>
        <h2>1. setState() – Callback Function</h2>
        <p>
          The <code>setState()</code> method is asynchronous. It accepts an
          optional callback function that runs after the state is updated.
        </p>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`this.setState({property1: value1,...}, callbackFunction)`}
        />
      </section>

      <section>
        <h2>2. React Icons</h2>
        <p>
          <code>react-icons</code> is a third-party package that provides
          popular icon libraries like FontAwesome, Bootstrap Icons, Material
          Icons, etc.
        </p>

        <h3>2.1 Installing React Icons</h3>
        <CodeBlock code={`npm install react-icons`} />

        <h3>2.2 Searching Icons</h3>
        <p>
          Visit the React Icons website and click on any icon to copy its name.
        </p>
        <img
          src="/assets/img/react-icons.png"
          alt="Client-Server"
          style={{ width: "70%", height: "285px" }}
        />

        <h3>2.3 Importing React Icons</h3>
        <p>The first letters of the icon name indicate the library.</p>
        <p>
          Each category of Icons have import statements separately, go to the
          category and copy the import statement.
        </p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { BsFilterRight } from "react-icons/bs";
      import { FaFacebookF } from "react-icons/fa";
      import { MdDelete } from "react-icons/md";
          
          const ReactIcon = (props) => {
            return (
              <div>
                <BsFilterRight />
                <FaFacebookF />
                <MdDelete />
              </div>
            );
          };
          
    export default ReactIcon;`}
        />
      </section>


    <section>
    <h2>3. Sorting Products</h2>
    <p>
      Sorting is implemented by passing <b>sortbyOptions</b> and handling the
      selected option using state and callback functions.
    </p>
  </section>

  <section>
    <p>
      <b>File:</b> src/components/AllProductsSection/index.js
    </p>
    <CodeBlock
      language="jsx"
      code={`renderProductsList = () => {
  const {productsList, activeOptionId} = this.state
  return (
    <>
      <ProductsHeader
        activeOptionId={activeOptionId}
        sortbyOptions={sortbyOptions}
        updateActiveOptionId={this.updateActiveOptionId}
      />
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  )
}`}
    />
  </section>

  <section>
    <p>
      <b>File:</b> src/components/ProductsHeader/index.js
    </p>
    <CodeBlock
      language="jsx"
      code={`import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId, updateActiveOptionId} = props

  const onChangeSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="products-header">
      <h1 className="products-title">All Products</h1>
      <div className="sort-container">
        <BsFilterRight className="sort-icon" />
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(option => (
            <option key={option.optionId} value={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader`}
    />
  </section>

  <section>
    <p>
      <b>File:</b> src/components/Cart/index.js
    </p>
    <CodeBlock
      language="jsx"
      code={`import Header from '../Header'
import './index.css'

const Cart = () => (
  <>
    <Header />
    <div className="cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="cart"
        className="cart-img"
      />
    </div>
  </>
)

export default Cart`}
    />
  </section>

  <section>
    <p>
      <b>File:</b> src/components/Header/index.js
    </p>
    <CodeBlock
      language="jsx"
      code={`import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <ul className="nav-menu">
          <Link to="/" className="nav-link"><li>Home</li></Link>
          <Link to="/products" className="nav-link"><li>Products</li></Link>
          <Link to="/cart" className="nav-link"><li>Cart</li></Link>
        </ul>
        <button type="button" className="logout-desktop-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)`}
    />
  </section>

  <section>
    <p>
      <b>File:</b> src/App.js
    </p>
    <CodeBlock
      language="jsx"
      code={`import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
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

export default SortingProducts_CS;
