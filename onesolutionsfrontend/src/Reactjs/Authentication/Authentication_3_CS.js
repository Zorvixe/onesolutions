import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Authentication_3_CS = ({
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
    <h1>Authentication & Authorization | Part 3 | Cheat Sheet</h1>
  
    <section>
      <h2>1. Router Switch</h2>
      <p>
        The <b>Switch</b> component can contain any React component inside it.
      </p>
      <ul>
        <li>Route</li>
        <li>User defined Components</li>
        <li>Redirect</li>
      </ul>
    </section>
  
    <section>
      <h2>2. Wrapper Component</h2>
      <p>
        Redirection logic can be reused by separating it into a React component
        called a <b>Wrapper Component</b>. Each route will be wrapped with it.
      </p>
  
      <h3>2.1 Protected Route</h3>
      <p>
        ProtectedRoute is a Wrapper Component which checks authentication and
        allows access only if the user is logged in.
      </p>
  

      <p>
        <b>File:</b> src/components/ProtectedRoute/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { Route, Redirect } from "react-router-dom";
  import Cookies from "js-cookie";
  const ProtectedRoute = (props) => {
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    return <Route {...props} />;
  };
  
  export default ProtectedRoute;`}
      />
    </section>
  

    <section>
      <h2>3. E-Commerce Application</h2>
      <p>
        <b>File:</b> src/App.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

        import LoginForm from "./components/LoginForm";
        import Home from "./components/Home";
        import Products from "./components/Products";
        import Cart from "./components/Cart";
        import NotFound from "./components/NotFound";
        import ProtectedRoute from "./components/ProtectedRoute";
        
        import "./App.css";
        
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
        );
        
        export default App;`}
      />
    </section>
  

    <section>
      <p>
        <b>File:</b> src/components/AllProductsSection/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import Cookies from "js-cookie"; 
  
  import ProductCard from "../ProductCard";
  import "./index.css";
  
  class AllProductsSection extends Component {
    state = {
      productsList: [],
    };
  
    componentDidMount() {
      this.getProducts();
    }
  
    getProducts = async () => {
      const apiUrl = "https://apis.ccbp.in/products";
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        headers: {
          Authorization: \`Bearer \${jwtToken}\`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.products.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        this.setState({
          productsList: updatedData,
        });
      }
    };
  
    renderProductsList = () => {
      const { productsList } = this.state;
      return (
        <div>
          <h1 className="products-list-heading">All Products</h1>
          <ul className="products-list">
            {productsList.map((product) => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      );
    };
  
    render() {
      return <>{this.renderProductsList()}</>;
    }
  }
  
  export default AllProductsSection;`}
      />
    </section>
  

    <section>
      <p>
        <b>File:</b> src/components/Cart/index.js
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import Header from "../Header";
  import "./index.css";
  
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
  );
  
  export default Cart;`}
      />
    </section>
  

    <section>
      <p>
        <b>File:</b> src/components/Header/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { Link, withRouter } from "react-router-dom";
  import Cookie from "js-cookie";
  import "./index.css";
  
  const Header = (props) => {
    const onClickLogout = () => {
      Cookie.remove("jwt_token");
      const { history } = props;
      history.replace("/login");
    };
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
    );
  };
  export default withRouter(Header);`}
      />
    </section>
  

    <section>
      <p>
        <b>File:</b> src/components/Home/index.js
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const Home = () => (
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
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="dresses to be noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  );
  
  export default Home;`}
      />
    </section>
  

<section>
      <p>
        <b>File:</b> src/components/LoginForm/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { Component } from "react";
  import Cookies from "js-cookie";
  import { Redirect } from "react-router-dom";
  
  import "./index.css";
  
  class LoginForm extends Component {
    state = {
      username: "",
      password: "",
      showSubmitError: false,
      errorMsg: "",
    };
  
    onChangeUsername = (event) => {
      this.setState({ username: event.target.value });
    };
  
    onChangePassword = (event) => {
      this.setState({ password: event.target.value });
    };
  
    onSubmitSuccess = (jwtTkoken) => {
      const { history } = this.props;
  
      Cookies.set("jwt_token", jwtTkoken, {
        expires: 30,
        path: "/",
      });
      history.replace("/");
    };
  
    onSubmitFailure = (errorMsg) => {
      console.log(errorMsg);
      this.setState({ showSubmitError: true, errorMsg });
    };
  
    submitForm = async (event) => {
      event.preventDefault();
      const { username, password } = this.state;
      const userDetails = { username, password };
      const url = "https://apis.ccbp.in/login";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token);
      } else {
        this.onSubmitFailure(data.error_msg);
      }
    };
  
    renderPasswordField = () => {
      const { password } = this.state;
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
      );
    };
  
    renderUsernameField = () => {
      const { username } = this.state;
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
      );
    };
  
    render() {
      const { showSubmitError, errorMsg } = this.state;
      const jwtToken = Cookies.get("jwt_token");
      if (jwtToken !== undefined) {
        return <Redirect to="/" />;
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
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      );
    }
  } 
  export default LoginForm;`}
      />
    </section>


    <section>
      <p>
        <b>File:</b>src/components/NotFound/index.js
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import "./index.css";

        const NotFound = () => (
          <div className="not-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
              alt="not-found"
              className="not-found-img"
            />
          </div>
        );
        
        export default NotFound;`}
      />
    </section>
  

<section>
      <p>
        <b>File:</b> src/components/ProductCard/index.js
      </p>
  
      <CodeBlock
        language="jsx"
        code={`import "./index.css";
  
  const ProductCard = (props) => {
    const { productData } = props;
    const { title, brand, imageUrl, rating, price } = productData;
  
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
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    );
  };
  export default ProductCard;`}
      />
    </section>
  
  
    <section>
      <p>
        <b>File:</b>  src/components/Products/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import AllProductsSection from "../AllProductsSection";

        import Header from "../Header";
        
        import "./index.css";
        
        const Products = () => (
          <>
            <Header />
            <div className="product-sections">
              <AllProductsSection />
            </div>
          </>
        );
        
        export default Products;`}
      />
    </section>
  

<section>
      <p>
        <b>File:</b>  src/components/ProtectedRoute/index.js
      </p>
      <CodeBlock
        language="jsx"
        code={`import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = (props) => {
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
            return <Redirect to="/login" />;
          }
     return <Route {...props} />;
        };
        
export default ProtectedRoute;`}
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

export default Authentication_3_CS;
