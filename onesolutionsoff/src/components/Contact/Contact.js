import React, { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | One Solutions";
  }, []);

  return (
    <div>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Contact</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Contact</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="contact-main-wrapper">

            {/* Map */}
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30766863.45380839!2d60.963977322087494!3d19.72451447390969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x417ccb1ab4a05d77%3A0x3444361db5588762!2sOne%20Solutions%20Ekam!5e0!3m2!1sen!2sin!4v1758951890819!5m2!1sen!2sin"
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
              <div className="contact-cards-container" data-aos="fade-up" data-aos-delay="300">

                <div className="contact-card">
                  <div className="icon-box"><i className="bi bi-geo-alt"></i></div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Hyderabad, Almasguda Telangana, India</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box"><i className="bi bi-envelope"></i></div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>onesolutions06092024@gmail.com</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box"><i className="bi bi-telephone"></i></div>
                  <div className="contact-text">
                    <h4>Call</h4>
                    <p>+91 8328590444</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box"><i className="bi bi-clock"></i></div>
                  <div className="contact-text">
                    <h4>Open Hours</h4>
                    <p>Monday - Friday: 9AM - 6PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container" data-aos="fade-up" data-aos-delay="400">
                <h3>Get in Touch</h3>
                <p>
                  Have questions about our training programs, placements, or digital solutions?
                  Fill out the form below and our team will get back to you within 24 hours.
                  We’re here to help you start your journey towards a successful career in IT.
                </p>

                <form className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                  </div>

                  <div className="form-submit mt-3">
                    <button type="submit">Send Message</button>
                    <div className="social-links">
                      <a href="#"><i className="bi bi-twitter"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* End Contact Section */}
    </div>
  );
};

export default Contact;
