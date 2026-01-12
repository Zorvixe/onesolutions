import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Common_Mistake_3_CS = ({
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
  <h1>Common Mistakes | Part 3 | Cheat Sheet</h1>

  <section>
    <h2>1. User defined functions should be in arrow function syntax</h2>

    <p><b>Mistake:</b></p>
    <p>In the below code snippet, we have defined the <code>onChangeUsername</code> function as a function definition instead of an arrow function.</p>

    <p><b>File:</b> src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
        code={`import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'  
        class LoginForm extends Component {
            state = {
            username: '',
            password: '',
            showSubmitError: false,
            errorMsg: '',
            }
        
            onChangeUsername(event){
            this.setState({username: event.target.value})
            }
        
            onChangePassword = event => {
            this.setState({password: event.target.value})
            }
        
            onSubmitSuccess = jwtToken => {
            const {history} = this.props
        
        
            Cookies.set('jwt_token', jwtToken, {
                expires: 30,
            })
        
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
            console.log(data.error_msg)
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
                    placeholder="Password"
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
                    placeholder="Username"
                />
                </>
            )
            }
        
            render() {
            const {showSubmitError, errorMsg} = this.state
            const jwtToken = Cookies.get('jwt_token')
            if (jwtToken !== undefined) {
                return <Redirect to="/" />
            }
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
                    {showSubmitError && <p className="error-message">{errorMsg}</p>}
                </form>
                </div>
            )
            }
        }
        
export default LoginForm`}
        />

    <p><b>Explanation:</b></p>
    <ul>
      <li>In Class Components, normal functions execute in browser context, so <code>this</code> becomes undefined.</li>
      <li>Lifecycle methods run in React context, so they need not be arrow functions.</li>
    </ul>

    <p><b>Solution:</b></p>
    <p><b>File:</b> src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
 import Cookies from 'js-cookie'
 import {Redirect} from 'react-router-dom' 
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
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
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
export default LoginForm`}
    />
  </section>

  <section>
    <h2>2. Using Redirect Component in Callbacks or Event Listeners</h2>

    <p><b>Mistake:</b></p>
    <p>As the <code>Redirect</code> Component returns JSX, it should not be used in event handlers. </p>

    <p><b>File:</b> src/components/Header/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'
      const Header = props => {
        const onClickLogout = () => {
          Cookies.remove('jwt_token')
          return <Redirect to="/login" />
        }
      
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <div className="nav-bar-mobile-logo-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
      
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-image"
                    onClick={onClickLogout}
                  />
                </button>
              </div>
      
              <div className="nav-bar-large-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="nav-menu-mobile">
              <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                  <Link to="/" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                      alt="nav home"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
      
                <li className="nav-menu-item-mobile">
                  <Link to="/products" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                      alt="nav products"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
                <li className="nav-menu-item-mobile">
                  <Link to="/cart" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                      alt="nav cart"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      }
      
export default withRouter(Header)`}
    />

    <p><b>Explanation:</b></p>
    <ul>
      <li>Redirect returns JSX and should only be used in render().</li>
      <li>For navigation inside events, use history methods.</li>
    </ul>

    <p><b>Solution:</b></p>
    <p><b>File:</b>  src/components/Header/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie' 
 import './index.css'
      
      const Header = props => {
        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }
      
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <div className="nav-bar-mobile-logo-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
      
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-image"
                    onClick={onClickLogout}
                  />
                </button>
              </div>
      
              <div className="nav-bar-large-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="nav-menu-mobile">
              <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                  <Link to="/" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                      alt="nav home"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
      
                <li className="nav-menu-item-mobile">
                  <Link to="/products" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                      alt="nav products"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
                <li className="nav-menu-item-mobile">
                  <Link to="/cart" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                      alt="nav cart"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      } 
 export default withRouter(Header)`}
    />
  </section>

  <section>
    <h2>3. Using history.replace() in render() instead of Redirect</h2>

    <p><b>Mistake:</b></p>
    <p>Using <code>history.replace()</code> inside render method.</p>

    <p><b>Explanation:</b></p>
    <ul>
      <li>render() must return JSX.</li>
      <li>Redirect is a component and should be used inside render.</li>
    </ul>

    <p><b>File:</b>  src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
 import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
      
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
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
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          const {history} = this.props
          if (jwtToken !== undefined) {
            history.replace('/')
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
 export default LoginForm`}
    />

    <p><b>Solution:</b></p>
    <p><b>File:</b>  src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
      
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
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
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
           return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
 export default LoginForm`}
    />
  </section>

  <section>
    <h2>4. Missing withRouter() to get history prop</h2>

    <p><b>Mistake:</b></p>
    <p>Accessing history in a component that is not wrapped with <code>withRouter</code>.</p>
    <p><b>File:</b> src/components/Header/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Link} from 'react-router-dom'
  import Cookies from 'js-cookie'
import './index.css'
      
      const Header = props => {
        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }
      
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <div className="nav-bar-mobile-logo-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
      
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-image"
                    onClick={onClickLogout}
                  />
                </button>
              </div>
      
              <div className="nav-bar-large-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="nav-menu-mobile">
              <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                  <Link to="/" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                      alt="nav home"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
      
                <li className="nav-menu-item-mobile">
                  <Link to="/products" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                      alt="nav products"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
                <li className="nav-menu-item-mobile">
                  <Link to="/cart" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                      alt="nav cart"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      }
  export default Header`}
    />

    <p><b>Solution:</b></p>
    <p><b>File:</b> src/components/Header/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
      
      const Header = props => {
        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }
      
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <div className="nav-bar-mobile-logo-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
      
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-image"
                    onClick={onClickLogout}
                  />
                </button>
              </div>
      
              <div className="nav-bar-large-container">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                />
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
      
                  <li className="nav-menu-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="nav-menu-mobile">
              <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                  <Link to="/" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                      alt="nav home"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
      
                <li className="nav-menu-item-mobile">
                  <Link to="/products" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                      alt="nav products"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
                <li className="nav-menu-item-mobile">
                  <Link to="/cart" className="nav-link">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                      alt="nav cart"
                      className="nav-bar-image"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      }
      
 export default withRouter(Header)`}
    />
  </section>

  <section>
    <h2>5. When request object keys are incorrect</h2>
    <p><b>Mistake:</b></p>
    <p><b>File:</b> src/components/LoginForm/index.js</p>

    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
import Cookies from 'js-cookie'
 import {Redirect} from 'react-router-dom'
      
      import './index.css'
      
      class LoginForm extends Component {
        state = {
          userName: '',
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
          history.replace('/')
        }
      
        onSubmitFailure = errorMsg => {
          this.setState({showSubmitError: true, errorMsg})
        }
      
        submitForm = async event => {
          event.preventDefault()
          const {userName, password} = this.state
          const userDetails = {userName, password}
          const url = 'https://apis.ccbp.in/login'
          const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
 export default LoginForm`}
    />

    <p><b>Solution:</b></p>
    <p><b>File:</b> src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
 import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
      
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
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
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
 export default LoginForm`}
    />
  </section>

  <section>
    <h2>6. Not Updating the State when required</h2>

    <p><b>Mistake:</b></p>
    <p>On login failure, the <code>showSubmitError</code> state should be updated to display the error message</p>

    <p><b>File:</b>src/components/LoginForm/index.js</p>
       
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
  import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
      
      import './index.css'
      
      class LoginForm extends Component {
        state = {
          userName: '',
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
          history.replace('/')
        }
      
        onSubmitFailure = errorMsg => {
          this.setState({errorMsg})
        }
      
        submitForm = async event => {
          event.preventDefault()
          const {userName, password} = this.state
          const userDetails = {userName, password}
          const url = 'https://apis.ccbp.in/login'
          const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
export default LoginForm`}
    />

<p><b>Solution:</b></p>
<p><b>File:</b> src/components/LoginForm/index.js</p>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'
 import Cookies from 'js-cookie'
 import {Redirect} from 'react-router-dom'
      
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
      
       
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
      
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
          console.log(data.error_msg)
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
                placeholder="Password"
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
                placeholder="Username"
              />
            </>
          )
        }
      
        render() {
          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
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
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </form>
            </div>
          )
        }
      }
      
 export default LoginForm`}
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

export default Common_Mistake_3_CS;
