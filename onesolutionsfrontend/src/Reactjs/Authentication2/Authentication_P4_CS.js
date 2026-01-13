import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Authentication_P4_CS = ({
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
      <h1>Authentication & Authorisation | Part 4 | Cheat Sheet</h1>

      <section>
        <h2>1. Integrating APIs</h2>
        <h3>1.1 Get Exclusive Prime Deals</h3>
        <ul>
          <li>Exclusive Prime deals are only for Prime users.</li>
          <li>
            All Products are available for both Prime and Non-Prime users.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. API Call Possible Views</h2>

        <h3>2.1 Success View</h3>
        <p>
          When a Prime user logs in and accesses Prime Deals, the Exclusive
          Prime Deals section should be displayed.
        </p>

        <h3>2.2 Failure View</h3>
        <p>
          When a Non-Prime user accesses Prime Deals, the "Get Exclusive Deals"
          section should be displayed.
        </p>

        <p>
          <b>Reasons for API Call Failure:</b>
        </p>
        <ul>
          <li>Sending Unauthorized user credentials</li>
          <li>Not specifying Authorization header</li>
          <li>Using the wrong HTTP method</li>
        </ul>

        <h3>2.3 Loading View</h3>
        <p>
          While the API request is in progress, a loading spinner should be
          shown for both Prime and Non-Prime users.
        </p>
      </section>

      <section>
        <h2>3. E-Commerce Application</h2>

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
                <Route path="/not-found" component={NotFound} />
                <Redirect to="not-found" />
              </Switch>
            </BrowserRouter>
          )
          
export default App`}
        />

        <p>
          <b>File:</b> src/components/AllProductsSection/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import {Component} from 'react'
    import Loader from 'react-loader-spinner'
    import Cookies from 'js-cookie'
                import ProductCard from '../ProductCard'
                import './index.css'
                
                class AllProductsSection extends Component {
                  state = {
                    productsList: [],
                    isLoading: false,
                  }
                
                  componentDidMount() {
                    this.getProducts()
                  }
                
                  getProducts = async () => {
                    this.setState({
                      isLoading: true,
                    })
                    const jwtToken = Cookies.get('jwt_token')
                    const apiUrl = 'https://apis.oneSolution.in/products'
                    const options = {
                      headers: {
                        
                      },
                      method: 'GET',
                    }
                    const response = await fetch(apiUrl, options)
                    if (response.ok) {
                      const fetchedData = await response.json()
                      const updatedData = fetchedData.products.map(product => ({
                        title: product.title,
                        brand: product.brand,
                        price: product.price,
                        id: product.id,
                        imageUrl: product.image_url,
                        rating: product.rating,
                      }))
                      this.setState({
                        productsList: updatedData,
                        isLoading: false,
                      })
                    }
                  }
                
                  renderProductsList = () => {
                    const {productsList} = this.state
                    return (
                      <>
                        <h1 className="products-list-heading">All Products</h1>
                        <ul className="products-list">
                          {productsList.map(product => (
                            <ProductCard productData={product} key={product.id} />
                          ))}
                        </ul>
                      </>
                    )
                  }
                
                  renderLoader = () => (
                    <div className="products-loader-container">
                      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
                    </div>
                  )
                
                  render() {
                    const {isLoading} = this.state
                    return isLoading ? this.renderLoader() : this.renderProductsList()
                  }
                }
                
                export default AllProductsSection`}
        />

        <p>
          <b>File:</b>src/components/Cart/index.js
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
                  src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-cart-img.png"
                  alt="cart"
                  className="cart-img"
                />
              </div>
            </>
          )
          
          export default Cart`}
        />

        <p>
          <b>File:</b>src/components/Header/index.js
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
                  <Link to="/">
                    <img
                      className="website-logo"
                      src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-logo-img.png"
                      alt="website logo"
                    />
                  </Link>
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
                      src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-log-out-img.png"
                      alt="logout icon"
                      className="logout-icon"
                    />
                  </button>
                </div>
                <div className="nav-menu-mobile">
                  <ul className="nav-menu-list-mobile">
                    <Link to="/">
                      <li className="nav-menu-item-mobile">
                        <img
                          src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-home-icon.png"
                          alt="nav home"
                          className="nav-bar-image"
                        />
                      </li>
                    </Link>
                    <Link to="/products">
                      <li className="nav-menu-item-mobile">
                        <img
                          src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-products-icon.png"
                          alt="nav products"
                          className="nav-bar-image"
                        />
                      </li>
                    </Link>
                    <Link to="/cart">
                      <li className="nav-menu-item-mobile">
                        <img
                          src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-cart-icon.png"
                          alt="nav cart"
                          className="nav-bar-image"
                        />
                      </li>
                    </Link>
                  </ul>
                </div>
              </nav>
            )
          }
          export default withRouter(Header)`}
        />

        <p>
          <b>File:</b> src/components/Home/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import Cookies from 'js-cookie'
          import {Redirect, Link} from 'react-router-dom'
          
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
                      src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-home-img.png"
                      alt="clothes to be noticed"
                      className="home-mobile-img"
                    />
                    <p className="home-description">
                      Fashion is part of the daily air and it does not quite help that it
                      changes all the time. Clothes have always been a marker of the era
                      and we are in a revolution. Your fashion makes you been seen and
                      heard that way you are. So, celebrate the seasons new and exciting
                      fashion in your own way.
                    </p>
                    <Link to="/products">
                      <button type="button" className="shop-now-button">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                  <img
                    src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="dresses to be noticed"
                    className="home-desktop-img"
                  />
                </div>
              </>
            )
          }
          
          export default Home`}
        />
        <p>
          <b>File:</b> src/components/LoginForm/index.js
        </p>
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
                path: '/',
              })
              history.replace('/')
            }
          
            onSubmitFailure = errorMsg => {
              console.log(errorMsg)
              this.setState({showSubmitError: true, errorMsg})
            }
          
            submitForm = async event => {
              event.preventDefault()
              const {username, password} = this.state
              const userDetails = {username, password}
              const url = 'https://apis.oneSolution.in/login'
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
                    className="password-input-field"
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
                    className="username-input-field"
                    value={username}
                    onChange={this.onChangeUsername}
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
                    src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo-mobile-image"
                    alt="website logo"
                  />
                  <img
                    src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-login-img.png"
                    className="login-image"
                    alt="website login"
                  />
                  <form className="form-container" onSubmit={this.submitForm}>
                    <img
                      src="https://assets.oneSolution.in/frontend/react-js/nxt-trendz-logo-img.png"
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

        <p>
          <b>File:</b> src/components/NotFound/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import './index.css'

          const NotFound = () => (
            <div className="not-found-container">
              <img
                src="https://assets.oneSolution.in/frontend/react-js/not-found-blog-img.png"
                alt="not-found"
                className="not-found-img"
              />
            </div>
          )
          
          export default NotFound`}
        />
        <p>
          <b>File:</b> src/components/PrimeDealsSection/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import {Component} from 'react'
          import Cookies from 'js-cookie'
          import Loader from 'react-loader-spinner'
          
          import ProductCard from '../ProductCard'
          import './index.css'
          
          const apiStatusConstants = {
            initial: 'INITIAL',
            success: 'SUCCESS',
            failure: 'FAILURE',
            inProgress: 'IN_PROGRESS',
          }
          
          class PrimeDealsSection extends Component {
            state = {
              primeDeals: [],
              apiStatus: apiStatusConstants.initial,
            }
          
            componentDidMount() {
              this.getPrimeDeals()
            }
          
            getPrimeDeals = async () => {
              this.setState({
                apiStatus: apiStatusConstants.inProgress,
              })
          
              const jwtToken = Cookies.get('jwt_token')
          
              const apiUrl = 'https://apis.oneSolution.in/prime-deals'
              const options = {
                headers: {
                
                },
                method: 'GET',
              }
              const response = await fetch(apiUrl, options)
              if (response.ok === true) {
                const fetchedData = await response.json()
                const updatedData = fetchedData.prime_deals.map(product => ({
                  title: product.title,
                  brand: product.brand,
                  price: product.price,
                  id: product.id,
                  imageUrl: product.image_url,
                  rating: product.rating,
                }))
                this.setState({
                  primeDeals: updatedData,
                  apiStatus: apiStatusConstants.success,
                })
              }
              if (response.status === 401) {
                this.setState({
                  apiStatus: apiStatusConstants.failure,
                })
              }
            }
          
            renderPrimeDealsList = () => {
              const {primeDeals} = this.state
              return (
                <div>
                  <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
                  <ul className="products-list">
                    {primeDeals.map(product => (
                      <ProductCard productData={product} key={product.id} />
                    ))}
                  </ul>
                </div>
              )
            }
          
            renderPrimeDealsFailureView = () => (
              <img
                src="https://assets.oneSolution.in/frontend/react-js/exclusive-deals-banner-img.png"
                alt="Register Prime"
                className="register-prime-image"
              />
            )
          
            renderLoadingView = () => (
              <div className="products-loader-container">
                <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
              </div>
            )
          
            render() {
              const {apiStatus} = this.state
              switch (apiStatus) {
                case apiStatusConstants.success:
                  return this.renderPrimeDealsList()
                case apiStatusConstants.failure:
                  return this.renderPrimeDealsFailureView()
                case apiStatusConstants.inProgress:
                  return this.renderLoadingView()
                default:
                  return null
              }
            }
          }
          
          export default PrimeDealsSection`}
        />

        <p>
          <b>File:</b> src/components/ProductCard/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import './index.css'

          const ProductCard = props => {
            const {productData} = props
            const {title, brand, imageUrl, rating, price} = productData
          
            return (
              <li className="product-item">
                <img src={imageUrl} alt="product" className="thumbnail" />
                <h1 className="title">{title}</h1>
                <p className="brand">by {brand}</p>
                <div className="product-details">
                  <p className="price">Rs {price}/-</p>
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.oneSolution.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                </div>
              </li>
            )
          }
          export default ProductCard`}
        />
        <p>
          <b>File:</b> src/components/Products/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import AllProductsSection from '../AllProductsSection'
          import PrimeDealsSection from '../PrimeDealsSection'
          
          import Header from '../Header'
          
          import './index.css'
          
          const Products = () => (
            <>
              <Header />
              <div className="product-sections">
                <PrimeDealsSection />
                <AllProductsSection />
              </div>
            </>
          )
          
          export default Products`}
        />
        <p>
          <b>File:</b> src/components/ProtectedRoute/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`import {Redirect, Route} from 'react-router-dom'
          import Cookie from 'js-cookie'
          
          const ProtectedRoute = props => {
            const token = Cookie.get('jwt_token')
            if (token === undefined) {
              return <Redirect to="/login" />
            }
            return <Route {...props} />
          }
          
          export default ProtectedRoute`}
        />
      </section>

      <section>
        <h2>4. Best Practices</h2>

        <h3>4.1 State Variable - isLoading</h3>
        <p>Used to handle only Success View and Loading View.</p>
        <CodeBlock
          language="jsx"
          code={`render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </>
    )
  }`}
        />

        <h3>4.2 State Variable - apiStatus</h3>
        <p>Used to handle Success, Failure and Loading Views.</p>
        <CodeBlock
          language="jsx"
          code={`switch (apiStatus) {
    case apiStatusConstants.success:
      return this.renderPrimeDealsList()
    case apiStatusConstants.failure:
      return this.renderFailureView()
    case apiStatusConstants.inProgress:
      return this.renderLoader()
    default:
      return null
  }`}
        />

        <h3>4.3 Adding Initial State</h3>
        <p>Instead of empty strings, use predefined constants.</p>
        <p>
          <b>File:</b> src/components/PrimeDealsSection/index.js
        </p>
        <CodeBlock
          language="jsx"
          code={`...
          const apiStatusConstants = {
            initial: "INITIAL",
            inProgress: "IN_PROGRESS",
            success: "SUCCESS",
            failure: "FAILURE",
          };
          class PrimeDealsSection extends Component {
            state = {
              primeDeals: [],
              apiStatus: apiStatusConstants.initial,
            }
          
            renderPrimeDeals = () => {
              const { apiStatus } = this.state;
              switch (apiStatus) {
                case apiStatusConstants.success:
                  return this.renderPrimeDealsSuccessView();
                case apiStatusConstants.failure:
                  return this.renderPrimeDealsFailureView();
                case apiStatusConstants.inProgress:
                  return this.renderLoader();
                default:
                  return null;
              }
            };
            
            render() { 
                return <>{this.renderPrimeDeals()}</>
            }
           } 
          
          export default PrimeDealsSection`}
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

export default Authentication_P4_CS;
