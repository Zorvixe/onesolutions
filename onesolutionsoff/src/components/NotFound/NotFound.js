import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
      document.title = "Notfound | One Solutions";
    }, []);
  return (
    <div className="page-404">
      <main className="main">
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">404</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="current">404</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* End Page Title */}

        {/* Error 404 Section */}
        <section id="error-404" className="error-404 section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="error-wrapper">
              <div className="row align-items-center">
                <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
                  <div className="error-illustration">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                  </div>
                </div>
                <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
                  <div className="error-content">
                    <span className="error-badge" data-aos="zoom-in" data-aos-delay="400">
                      Error
                    </span>
                    <h1 className="error-code" data-aos="fade-up" data-aos-delay="500">
                      404
                    </h1>
                    <h2 className="error-title" data-aos="fade-up" data-aos-delay="600">
                      Page Not Found
                    </h2>
                    <p className="error-description" data-aos="fade-up" data-aos-delay="700">
                      The page you are looking for might have been removed, had its
                      name changed, or is temporarily unavailable.
                    </p>

                    <div className="error-actions" data-aos="fade-up" data-aos-delay="800">
                      <Link to="/" className="btn-home">
                        <i className="bi bi-house-door"></i> Back to Home
                      </Link>
                      <a href="#" className="btn-help">
                        <i className="bi bi-question-circle"></i> Help Center
                      </a>
                    </div>

                    <div className="error-suggestions" data-aos="fade-up" data-aos-delay="900">
                      <h3>You might want to:</h3>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="bi bi-arrow-right-circle"></i> Check our sitemap
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-arrow-right-circle"></i> Contact support
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-arrow-right-circle"></i> Return to previous page
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Error 404 Section */}
      </main>
    </div>
  );
};

export default NotFound;
