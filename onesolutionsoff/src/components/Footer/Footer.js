import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer accent-background">
        <div className="container footer-top">
          <div className="row gy-4">
            {/* About */}
            <div className="col-lg-5 col-md-12 footer-about">
              <Link to="/" className="logo d-flex align-items-center me-auto">
                <img
                  src="/assets/img/ONE_SOLUTIONS_NEW_LOGO.png"
                  alt="logo"
                  style={{ borderRadius: "6px", objectFit: "contain" }}
                />
              </Link>
              <p>
                <strong>From Learning to Earning:</strong> Join the{" "}
                <strong>Best Software Training & Placement Institute</strong>.
                Unlock unlimited placement drives & 1:1 mentorship with hands-on
                training in Full Stack Development, Digital Marketing, and Data
                Analyst to secure your dream tech job.
              </p>
              <div className="stats d-flex flex-wrap mt-3 gap-3">
                <span>📈 83% Placement Rate</span>
                <span>🤝 100+ Hiring Partners</span>
                <span>🎓 100+ Got Their First Job</span>
              </div>
              <div className="social-links d-flex mt-4">
                <a
                  href="https://www.instagram.com/onesolutionsekam/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100015794794387"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/one-solutions-ekam-ose-131947329"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://www.youtube.com/@OneSolutionsEkam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            {/* Featured Courses */}
            <div className="col-lg-4 col-6 footer-links">
              <h4>Featured Courses</h4>
              <ul>
                <li>
                  <Link to="/fullstackdevelopment">
                    💻 Full Stack Development <span className="badge bg-primary">Featured</span>
                  </Link>
                </li>
                <li>
                  <Link to="/digital_marketing">
                    📢 Digital Marketing <span className="badge bg-success">Popular</span>
                  </Link>
                </li>
                <li>
                  <Link to="/data_analyst">
                    📊 Data Analyst <span className="badge bg-warning">Certificate</span>
                  </Link>
                </li>
              </ul>
              <p className="small mt-2">
                Certified programs • Lifetime Access • Expert Instructors • Online Learning
              </p>
            </div>

            {/* Testimonials / Reviews */}
            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Student Success</h4>
              <p>
                <em>
                  “The projects & mentorship were top-notch. I landed my first
                  software job in just 2 months.”
                </em>
              </p>
              <p>- Neha Verma, Data Analyst @ TCS</p>
              <p className="mt-3">
                ⭐ 4.8/5 Based on 500+ Student Reviews
              </p>
              <div className="review-links">
                <a href="#" className="me-2">Google Reviews</a> | 
                <a href="#" className="mx-2">LinkedIn</a> | 
                <a href="#">Trustpilot</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container copyright text-center mt-4">
          <p>
            © {new Date().getFullYear()} One Solutions – All Rights Reserved.
            Designed, Developed & Maintained by{" "}
            <a
              href="https://www.zorvixetechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zorvixe Technologies
            </a>
          </p>
          <p className="small">
            50+ Expert Instructors • 100+ Active Students • 96% Career Growth Success
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
