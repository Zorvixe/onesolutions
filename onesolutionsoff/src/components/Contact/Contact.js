import React, { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact Us | One Solutions";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ose.onesolutionsekam.in/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // toast.success(response.data.message);

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Show success modal
        document.getElementById("contactSuccessModal").style.display = "block";
      }
    } catch (error) {
      console.error("Contact submission error:", error);

      if (error.response) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
            // toast.error(err.msg);
          });
        } else if (error.response.data.error) {
          // toast.error(error.response.data.error);
        }
      } else {
        // toast.error("Failed to submit contact form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    document.getElementById("contactSuccessModal").style.display = "none";
  };

  return (
    <div>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Contact</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="current">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="contact-main-wrapper">
            {/* Map */}
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3807.9545710297916!2d78.5193028751644!3d17.365918883517608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDIxJzU3LjMiTiA3OMKwMzEnMTguOCJF!5e0!3m2!1sen!2sin!4v1768194917113!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="contact-content">
              <div
                className="contact-cards-container"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="contact-card">
                  <div className="icon-box">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Hyderabad, Dilsukhnagar Telangana, India</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>onesolutionsekam@gmail.com</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Call</h4>
                    <p>+91 8328590444</p>
                    <p>+91 7993971574</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Open Hours</h4>
                    <p>Monday - Friday: 9AM - 6PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="contact-form-container"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3>Get in Touch</h3>
                <p>
                  Have questions about our training programs, placements, or
                  digital solutions? Fill out the form below and our team will
                  get back to you within 24 hours. We're here to help you start
                  your journey towards a successful career in IT.
                </p>

                <form className="php-email-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                    ></textarea>
                  </div>

                  <div className="form-submit mt-3">
                    <button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <div className="social-links">
                      <a href="#">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <div
        id="contactSuccessModal"
        className="modal"
        style={{ display: "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="success-icon">
            <i className="bi bi-check-circle"></i>
          </div>
          <h3>Message Sent!</h3>
          <p>
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button className="btn btn-primary" onClick={closeModal}>
            OK
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: white;
          margin: 15% auto;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          text-align: center;
          position: relative;
        }
        .close {
          position: absolute;
          right: 20px;
          top: 15px;
          font-size: 28px;
          cursor: pointer;
        }
        .success-icon {
          font-size: 60px;
          color: #28a745;
          margin-bottom: 20px;
        }
        .form-submit button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Contact;
