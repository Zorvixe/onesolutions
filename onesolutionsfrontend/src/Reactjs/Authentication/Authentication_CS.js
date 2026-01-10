import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Authentication_CS = ({
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
    <h1>Authentication & Authorization | Cheat Sheet</h1>
  
    <section>
      <h2>1. Client-Server Communication</h2>
      <img
          src="/assets/img/Client-server.png"
          alt="Client-Server"
          style={{ width: "70%", height: "285px" }}
        />

      <h3>1.1 Authentication</h3>
      <p>
        Authentication is the process of verifying a user's identity.
      </p>
  
      <h3>1.2 Authorization</h3>
      <p>
        Authorization is the process of verifying whether the authenticated user
        is permitted to access specific resources or perform actions.
      </p>
  
      <p><b>Example:</b></p>
      <ul>
        <li>
          <b>Admin</b> - Read, Create, Update, Delete resources
        </li>
        <li>
          <b>User</b> - Read and Create resources
        </li>
      </ul>
      <img
          src="/assets/img/Author.png"
          alt="Client-Server"
          style={{ width: "100%", height: "285px" }}
        />
    </section>
  
    <section>
      <h2>2. Authentication Flow</h2>
      <ul>
        <li>Make Login API request</li>
        <li>Handle Login API response</li>
        <li>On success, store JWT token</li>
        <li>Redirect user to protected routes</li>
        <li>On failure, show error message</li>
      </ul>

      <img
          src="/assets/img/Flow.png"
          alt="Client-Server"
          style={{ width: "80%", height: "285px" }}
        />
    </section>
  
    <section>
      <h2>3. Route Parameters</h2>
      <p>
        When a component is rendered by a <code>Route</code>, React Router passes
        additional props.
      </p>
  
      <p>They are:</p>
      <ul>
        <li><code>match</code></li>
        <li><code>history</code></li>
        <li><code>location</code></li>
      </ul>
  
      <h3>3.1 History</h3>
      <p>
        The <code>history</code> object is used to control browser navigation
        programmatically.
      </p>
  
      <p>Common methods:</p>
      <ul>
        <li><code>push()</code></li>
        <li><code>replace()</code></li>
        <li><code>go()</code></li>
        <li><code>goBack()</code></li>
        <li><code>goForward()</code></li>
      </ul>
      <p>The <code>history.push()</code> and <code>history.replace()</code> methods are used to navigate to other routes programmatically.</p>
  
      <h4>3.1.1 history.push()</h4>
      <p>
      With the <code>history.push()</code> method, the user can go forward and backwards in the browser, and the URL will change.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`history.push("/home");`}
      />
  
      <h4>3.1.2 history.replace()</h4>
      <p>
      The <code>history.replace()</code> method replaces the current URL with new one. The user can't go backwards to the previous URL.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`history.replace("/login");`}
      />
    </section>
  
    <section>
      <h2>4. E-Commerce Application</h2>
        <ul>
        <li>Make an Authentication Request to the Login API</li>
        <li>Handle the Login API Response</li>
        <li> Handle the Login API Response </li>
                <ul>
                <li>On Login Success</li>
                <li>On Login Failure</li>
                </ul>
       
        <li>Store the JWT Token</li>
        </ul>

  
      <h3>Authenticated Credentials</h3>
      <CodeBlock
  code={` Username: henry | Password: henry_the_developer
  Username: david | Password: the_miller@23
  Username: robert | Password: WilsonRobert45
  Username: mosh | Password: DevMosh22
  Username: rahul | Password: rahul@2021
  Username: praneetha | Password: praneetha@2021`}
/>

      <p><b>File:</b> src/App.js</p>
      <CodeBlock
        language="jsx"
        code={`import {BrowserRouter, Route, Switch} from 'react-router-dom'
  import LoginForm from './components/LoginForm'
  import Home from './components/Home'
  import Products from './components/Products'
  import Cart from './components/Cart'
  import NotFound from './components/NotFound'
  
  const App = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
  
  export default App`}
      />
       <p><b>File:</b> src/components/LoginForm/index.js</p>
       <CodeBlock
  language="jsx"
  code={`import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.Onesolution.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    return (
      <div className="login-form-container">
        <img
          src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm`}
 />
    <p>When the <code>history.push()</code> is triggered, the path will change. The switch inside App.js will trigger again, and the corresponding component will render.</p>
    </section>
  
    <section>
      <div className="Note-container">
        <div className="icon-note">
          <h6>Note</h6>
        </div>
        <ul>
          <li>
            If response status code is <b>2XX</b>, then <code>response.ok</code> is
            <b>true</b>.
          </li>
          <li>
            Whenever the route changes, <code>Switch</code> re-evaluates and renders
            the matched component.
          </li>
        </ul>
      </div>
    </section>


    <section>
    <p><b>File:</b>src/components/Home/index.js</p>
    <CodeBlock
  language="jsx"
  code={`import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
        <img
          src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="dresses to be noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <button type="button" className="shop-now-button">
          Shop Now
        </button>
      </div>
      <img
        src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="dresses to be noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)
export default Home`}
 />
  </section>



  <section>
  <p><b>File:</b>src/components/Cart/index.js</p>

    <CodeBlock
      language="jsx"
      code={`import Header from '../Header'
import './index.css'

const Cart = () => (
  <>
    <Header />
    <div className="cart-container">
      <img
        src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-cart-img.png"
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
  <p><b>File:</b>src/components/Header/index.js</p>
  <CodeBlock
  language="jsx"
  code={`import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <img
        className="website-logo"
        src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/products" className="nav-link">
          <li>Products</li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li>Cart</li>
        </Link>
      </ul>
      <button type="button" className="logout-desktop-btn">
        Logout
      </button>
      <button type="button" className="logout-mobile-btn">
        <img
          src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="logout icon"
          className="logout-icon"
        />
      </button>
    </div>
  </nav>
)

export default Header`}
 />

  </section>


  <section>
  <p><b>File:</b>src/components/Products/index.js</p>
  <CodeBlock
  language="jsx"
  code={`import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="products-container">
      <img
        src="https://assets.Onesolution.in/frontend/react-js/nxt-trendz-products-img.png"
        alt="products"
        className="products-img"
      />
    </div>
  </>
)

export default Products`}
 />

  </section>

<section>
  <p><b>File:</b>src/components/NotFound/index.js</p>
  <CodeBlock
  language="jsx"
  code={`import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.Onesolution.in/frontend/react-js/not-found-blog-img.png"
      alt="not-found"
      className="not-found-img"
    />
  </div>
);

export default NotFound;`}
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

export default Authentication_CS;
