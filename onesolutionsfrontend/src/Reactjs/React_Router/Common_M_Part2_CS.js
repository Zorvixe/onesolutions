import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Common_M_Part2_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Common Mistakes | Part 2 | Cheat Sheet</h1>

      <section>
        <h2>1. Rendering Promise Object</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <ul>
          <li>
            Async function returns a Promise object, but React cannot render a
            Promise.
          </li>
          <li>
            The best practice is to make API calls inside{" "}
            <code>componentDidMount()</code>.
          </li>
        </ul>
        <p>
          <b>File: </b>src/components/BlogsList/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from 'react'
    import Loader from 'react-loader-spinner'
    import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
    import BlogItem from '../BlogItem'
    import './index.css'
        class BlogsList extends Component {
        state = { isLoading: true, blogsData: [] }

        getBlogsData = async () => {
            const response = await fetch('https://apis.solution.in/blogs')
            const statusCode = await response.statusCode
            console.log(statusCode)

            const data = await response.json()

            const formattedData = data.map(eachItem => ({
            id: eachItem.id,
            title: eachItem.title,
            imageUrl: eachItem.image_url,
            avatarUrl: eachItem.avatar_url,
            author: eachItem.author,
            topic: eachItem.topic,
            }))
        }

        render() {
            const { blogsData, isLoading } = this.state
            console.log(isLoading)

            return (
            <div className="blog-list-container">
                {this.getBlogsData()}
            </div>
            )
        }
        }

export default BlogsList`}
        />

        <p>
          <b>Solution:</b>
        </p>
        <p>
          <b>File: </b>src/components/BlogsList/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Component } from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = { isLoading: true, blogsData: [] }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.solution.in/blogs')
    const statusCode = await response.statusCode
    console.log(statusCode)

    const data = await response.json()

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({ blogsData: formattedData, isLoading: false })
  }

  render() {
    const { blogsData, isLoading } = this.state
    console.log(isLoading)

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => (
            <BlogItem blogData={item} key={item.id} />
          ))
        )}
      </div>
    )
  }
}

export default BlogsList`}
        />
      </section>

      <section>
        <h2>2. Using Link and Route without BrowserRouter</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App`}
        />

        <p>
          <b>Solution:</b>
        </p>
        <p>
          <b>File:</b>src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
        />

        <p>
          <b>File: </b>src/components/Header/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { Link } from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="blog-container">
      <h1 className="blog-title">Dev Blog</h1>
      <ul className="nav-menu">
        <Link className="nav-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="nav-link" to="/about">
          <li>About</li>
        </Link>
        <Link className="nav-link" to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  </nav>
)

export default Header`}
        />
      </section>

      <section>
        <h2>3. Providing Wrong Route Path</h2>
        <p>
          <b>Mistake:</b>
        </p>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/abot" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
        />
        <p>
          <b>Solution:</b>
        </p>
        <p>
          <b>File:</b> src/App.js
        </p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />
  <p><b>File: </b> src/components/Header/index.js</p>
  <CodeBlock
  language="jsx"
  code={`import { Link } from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="blog-container">
      <h1 className="blog-title">Dev Blog</h1>
      <ul className="nav-menu">
        <Link className="nav-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="nav-link" to="/about">
          <li>About</li>
        </Link>
        <Link className="nav-link" to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  </nav>
)

export default Header`}
 />

      </section>

      <section>
        <h2>4. Missing exact keyword</h2>

          <p>
          <b>Mistake:</b>
          </p>
            <ul>
            <li>Switch renders only the first Route that matches the current path.</li>
            <li>If <code>Switch</code> is missed, the browser may render multiple Routes for a single path.</li>
            </ul>
            
            <p><b>File:</b> src/App.js</p>
            <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />
         <p> <b>Solution:</b></p>
         <p><b>File:</b> src/App.js</p>
         <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />

      </section>

      <section>
        <h2>5. Missing Switch</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p><b>File: </b>src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Route exact path="/" component={BlogsList} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/blogs/:id" component={BlogItemDetails} />
    <Route component={NotFound} />
  </BrowserRouter>
)

export default App`}
 />


        <p>
          <b>Solution:</b>
        </p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />

      </section>

      <section>
        <h2>6. Placing Common Component inside Switch</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p>
          Placing common components like Header inside Switch causes them to
          render conditionally.
        </p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Header />
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />


        <p>
          <b>Solution:</b>
        </p>
        <p>Place common components outside the Switch.</p>
      </section>
      <p><b>File:</b> src/App.js</p>
      <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />

      <section>
        <h2>7. Providing same PATH for multiple Routes</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p>
          If same path is used, Switch renders only the first matched route.
        </p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/about" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />

        <p>
          <b>Solution:</b>
        </p>
        <p>Ensure each Route has a unique path.</p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />

      </section>

      <section>
        <h2>8. Missing Colon (:) in Path Parameters</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p>
            <b>File:</b>src/App.js 
       </p>

    <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />
        <p>
          <b>Solution:</b>
        </p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App`}
 />
      </section>


      <section>
        <h2>9. Accessing Promise Object</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <p>
        In the Promise Object response, we got an error message with key <code>error_msg</code>.but in the below code snippet, we are trying to access the promise object with the wrong key <code>errorText</code> so undefined will be logged in the console.
        </p>
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
    const url = 'https://apis.Onesolution.in/login'
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
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm`}
 />

        <p>
          <b>Solution:</b>
        </p>
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
    const url = 'https://apis.Onesolution.in/login'
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
        <h2>10. Ordering of Routes inside Switch</h2>

        <p>
          <b>Mistake:</b>
        </p>
        <ul>
        <li>
            In the below code snippet, the <code>NotFound</code> component is placed first
            inside the <code>Switch</code> component.
        </li>
        <li>
            If a route does not have a <code>path</code> and it is placed first inside
            <code>Switch</code>, the browser will render it for <b>all paths</b>.
        </li>
        </ul>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App`}
 />

        <p>
          <b>Solution:</b>
        </p>
        <p><b>File:</b> src/App.js</p>
        <CodeBlock
  language="jsx"
  code={`import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import BlogsList from './components/BlogsList'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={BlogsList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blogs/:id" component={BlogItemDetails} />
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

export default Common_M_Part2_CS;
