import React, {useEffect} from "react";

const About = () => {
   useEffect(() => {
    document.title = "About Us | One Solutions ";
  }, []);

  return (
    <div>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">About</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="current">About Us</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <img
                src="assets/img/education/education-square-2.webp"
                alt="About Us"
                className="img-fluid rounded-4"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div className="about-content">
                <span className="subtitle">About Us</span>
                <h2>Shaping Futures Through Innovation in Education</h2>
                <p>
                  At One Solutions, we are committed to redefining learning by
                  integrating modern technology with high-quality education.
                  Our mission is to provide accessible, engaging, and
                  career-driven programs that empower students to thrive in a
                  rapidly changing world.
                </p>
                <div className="stats-row">
                  <div className="stats-item">
                    <span className="count">1+</span>
                    <p>Years of Excellence</p>
                  </div>
                  <div className="stats-item">
                    <span className="count">10+</span>
                    <p>Qualified Mentors</p>
                  </div>
                  <div className="stats-item">
                    <span className="count">100+</span>
                    <p>Learners Empowered Globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission / Vision / Values */}
          <div className="row mt-5 pt-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="mission-card">
                <div className="icon-box">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h3>Our Mission</h3>
                <p>
                  To deliver transformative education that bridges the gap
                  between academic knowledge and industry skills, equipping
                  students to succeed in their chosen careers.
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="mission-card">
                <div className="icon-box">
                  <i className="bi bi-eye"></i>
                </div>
                <h3>Our Vision</h3>
                <p>
                  To be a global leader in innovative education solutions,
                  empowering individuals to create positive change and build a
                  brighter future for society.
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
              <div className="mission-card">
                <div className="icon-box">
                  <i className="bi bi-award"></i>
                </div>
                <h3>Our Values</h3>
                <p>
                  We stand for integrity, innovation, inclusivity, and
                  excellence—ensuring that every learner receives the best
                  opportunity to unlock their true potential.
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="row mt-5 pt-3 align-items-center">
            <div className="col-lg-6 order-lg-2" data-aos="fade-up" data-aos-delay="300">
              <div className="achievements">
                <span className="subtitle">Why Choose Us</span>
                <h2>Redefining Education with Impact</h2>
                <p>
                  Choosing One Solutions means choosing a future-ready approach
                  to education. We combine innovation, mentorship, and industry
                  expertise to help learners achieve their goals.
                </p>
                <ul className="achievements-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Flexible and
                    accessible learning paths
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Industry-leading
                    instructors and mentors
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Practical,
                    hands-on course content
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Dedicated career
                    guidance and placement support
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Advanced online
                    learning platform with global reach
                  </li>
                </ul>
                <a href="#" className="btn-explore">
                  Discover More <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <div className="about-gallery">
                <div className="row g-3">
                  <div className="col-6">
                    <img
                      src="assets/img/education/education-1.webp"
                      alt="Student Collaboration"
                      className="img-fluid rounded-3"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="assets/img/education/students-3.webp"
                      alt="Student Success"
                      className="img-fluid rounded-3"
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <img
                      src="assets/img/education/campus-8.webp"
                      alt="Modern Campus Facilities"
                      className="img-fluid rounded-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /About Section */}
    </div>
  );
};

export default About;
