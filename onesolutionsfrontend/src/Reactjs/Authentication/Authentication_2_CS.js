import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Authentication_2_CS = ({
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
      <h1>Authentication & Authorization | Part 2 | Cheat Sheet</h1>

      <section>
        <h2>1. JWT Token</h2>
        <p>
          JSON Web Token is a standard used to create access tokens. These
          access tokens are also called JWT Tokens.
        </p>
        <p>
          The client uses these access tokens on every subsequent request to
          communicate with the server.
        </p>

        <div className="Note-container">
          <p>
            While making HTTP requests, we have to send the access token in HTTP
            headers using the key <code>Authorization</code>.
          </p>
        </div>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock code={`Authorization: Bearer jwt_token`} />

        <h3>1.1 Storing JWT Token in State</h3>
        <p>When we store the JWT Token in the state,</p>
        <ul>
          <li>On page refresh, the JWT token will be lost</li>
          <li>It is difficult to pass state data to all components</li>
        </ul>
      </section>

      <section>
        <h2>2. Storage Mechanisms</h2>

        <p>
          <b>Client-Side Data Storage:</b>
        </p>
        <ul>
          <li>Local Storage</li>
          <li>Cookies</li>
          <li>Session Storage</li>
          <li>IndexedDB</li>
        </ul>

        <p>
          <b>Server-Side Data Storage:</b>
        </p>
        <ul>
          <li>Database storage on the server</li>
        </ul>
      </section>
      <p>Different types of Client-Side data storage mechanisms are:</p>
      <ul>
        <li>Local Storage</li>
        <li>Cookies</li>
        <li>Session Storage</li>
        <li>IndexedDB</li>
      </ul>

      <section>
        <h2>3. Cookies</h2>
        <p>
          A cookie is a piece of data stored on the user's computer by the
          browser.
        </p>

        <h3>Cookie Contains</h3>
        <ul>
          <li>
            <b>Name &amp; Value</b>
          </li>
          <li>
            <b>Expires</b> – The date the cookie will expire. If this is blank,
            the cookie will expire when the user quits the browser.
          </li>
          <li>
            <b>Domain</b> – The domain name of the website.
          </li>
          <li>
            <b>Path</b> – The path to the directory or web page that set the
            cookie. If blank, the cookie can be accessed from any page on the
            site.
          </li>
          <li>
            <b>Secure</b> – If set, the cookie is only sent over secure (HTTPS)
            connections.
          </li>
        </ul>

        <h3>3.1 Why Cookies?</h3>
        <ul>
          <li>We can set expiry duration</li>
          <li>Used heavily in authentication</li>
        </ul>

        <p>
          <b>Examples:</b>
        </p>
        <ul>
          <li>Banking apps → expire in minutes</li>
          <li>Facebook → expire in months/years</li>
        </ul>

        <h3>3.2 Cookies vs Local Storage</h3>
        <table className="table-diff">
          <thead>
            <tr>
              <th>Cookies</th>
              <th>Local Storage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>We can set an expiration for Cookies</td>
              <td>Local storage data never expires</td>
            </tr>
            <tr>
              <td>Cookies can store up to 4KB of data</td>
              <td>Local Storage can store up to 5 to 10 MB of data</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3.3 Third Party Package – js-cookie</h2>
        <p>
          <b>Installation Command:</b>
        </p>
        <CodeBlock code={`npm install js-cookie --save`} />

        <h3>Methods</h3>
        <ul>
          <li>
            <code>Cookies.set()</code>-It is used to set the cookie
          </li>
          <li>
            <code>Cookies.get()</code>-It is used to get the cookie
          </li>
          <li>
            <code>Cookies.remove()</code>-It is used to remove the cookie
          </li>
        </ul>

        <h4>
          <code>Cookies.set()</code>
        </h4>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`Cookies.set('CookieName', 'CookieValue', { expires: DAYS})`}
        />
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`Cookies.set('ACCESS_TOKEN', 'Us1L90PXl...', { expires: 1 });`}
        />

        <h4>
          <code>Cookies.get()</code>
        </h4>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock language="javascript" code={`Cookies.get('CookieName');`} />
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`Cookies.get('ACCESS_TOKEN');`}
        />

        <h4>
          <code>Cookies.remove()</code>
        </h4>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`Cookies.remove('CookieName')`}
        />

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`Cookies.remove('ACCESS_TOKEN')`}
        />
      </section>

      <section>
        <h2>4. Redirect Component</h2>
        <p>
          The react-router-dom provides the Redirect component. It can be used
          whenever we want to redirect to another path.
        </p>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock language="jsx" code={`<Redirect to="PATH" />`} />

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock language="jsx" code={`<Redirect to="/login" />`} />

        <h3>4.1 Redirect Component vs history Methods</h3>
        <ul>
          <li>
            Use <b>Redirect</b> inside render()
          </li>
          <li>
            Use <b>history.push / replace</b> in event handlers
          </li>
        </ul>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i> Note
            </h6>
          </div>
          <p>
            The <code>Redirect</code> component uses the{" "}
            <code>history.push()</code> and
            <code> history.replace()</code> methods behind the scenes.
          </p>
        </div>
      </section>

      <section>
        <h2>5. withRouter</h2>
        <p>
          The <code>history</code> prop will be available for only components
          which are directly given for Route.
        </p>
        <p>
          To provide <code>history</code> prop to other components, we can wrap
          it with the <code>withRouter</code> function while exporting it.
        </p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="jsx"
          code={`import { withRouter } from 'react-router-dom'
  ----
  export default withRouter(ComponentName)`}
        />
      </section>

      <section>
        <h2>6. E-Commerce Application Flow</h2>

        <ul>
          <li>Make Authentication Request to Login API</li>
          <li>Handle Login API Response </li>
          <ul>
            <li>On Login Success</li>
            <li>On Login Failure</li>
          </ul>
          <li>Store JWT Token</li>
        </ul>
      </section>

      <section>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import {BrowserRouter, Route, Switch} from 'react-router-dom'
  
  import LoginForm from './components/LoginForm'
  import Home from './components/Home'
  import Products from './components/Products'
  import Cart from './components/Cart'
  import NotFound from './components/NotFound'
  
  import './App.css'
  
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
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
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
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="logout icon"
            className="logout-icon"
          />
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
          <b>File:</b> src/components/Home/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="dresses to be noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="dresses to be noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home`}
        />
      </section>

      <section>
        <p>
          <b>File:</b> src/components/LoginForm/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
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
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm`}
        />
      </section>

      <section>
        <p>
          <b>File:</b> src/components/NotFound/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import './index.css'
  const NotFound = () => (
  <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not-found"
        className="not-found-img"
      />
  </div>
  )
          
export default NotFound`}
        />
      </section>

      <section>
        <p>
          <b>File:</b> src/components/Products/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import Header from '../Header'
import './index.css' 
     const Products = () => (
         <>
            <Header />
            <div className="products-container">
           <img
               src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png"
               alt="products"
                className="products-img"
             />
          </div>
         </>
      )   
 export default Products`}
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

export default Authentication_2_CS;
