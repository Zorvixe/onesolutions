import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <div>

      {/* Courses Hero Section */}
      <section id="courses-hero" className="courses-hero section light-background">
        <div className="hero-content">
          <div className="container">
            <div className="row align-items-center">

              {/* Hero Left Content */}
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div className="hero-text">
                  <h2>From <strong>Learning to Earning</strong>: Join the Best Software Training & Placement Institute</h2>
                  <p>
                    Unlock unlimited placement drives & 1:1 mentorship with top software training and placement institute. Get hands-on training in Full Stack Development, Digital Marketing and Data Analyst and secure your dream tech job.
                  </p>

                  {/* Stats */}
                  <div className="hero-stats">
                    <div className="stat-item">
                      <span className="number">83%</span>
                      <span className="label">Placement Rate</span>
                    </div>
                    <div className="stat-item">
                      <span className="number">100+</span>
                      <span className="label">Hiring Partners</span>
                    </div>
                    <div className="stat-item">
                      <span className="number">100+</span>
                      <span className="label">Got Their First Job</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="hero-buttons">
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                    <Link to="/about" className="btn btn-outline">Learn More</Link>
                  </div>

                  {/* Features */}
                  <div className="hero-features">
                    <div className="feature">
                      <i className="bi bi-shield-check"></i>
                      <span>Certified Programs</span>
                    </div>
                    <div className="feature">
                      <i className="bi bi-clock"></i>
                      <span>Lifetime Access</span>
                    </div>
                    <div className="feature">
                      <i className="bi bi-people"></i>
                      <span>Expert Instructors</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Right Image */}
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div className="hero-image">
                  <div className="main-image">
                    <img
                      src="/assets/img/education/courses-13.webp"
                      alt="Online Learning"
                      className="img-fluid"
                    />
                  </div>

                  <div className="floating-cards">
                    <div className="course-card" data-aos="fade-up" data-aos-delay="300">
                      <div className="card-icon"><i className="bi bi-code-slash"></i></div>
                      <div className="card-content">
                        <h6>Web Development</h6>
                        <span>2,450 Students</span>
                      </div>
                    </div>

                    <div className="course-card" data-aos="fade-up" data-aos-delay="400">
                      <div className="card-icon"><i className="bi bi-palette"></i></div>
                      <div className="card-content">
                        <h6>Data Analyst</h6>
                        <span>1,890 Students</span>
                      </div>
                    </div>

                    <div className="course-card" data-aos="fade-up" data-aos-delay="500">
                      <div className="card-icon"><i className="bi bi-graph-up"></i></div>
                      <div className="card-content">
                        <h6>Digital Marketing</h6>
                        <span>3,200 Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Background Shapes */}
        <div className="hero-background">
          <div className="bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </section>
      {/* <!-- /Courses Hero Section --> */}

      {/* <!-- Featured Courses Section --> */}
      <section id="featured-courses" className="featured-courses section">

        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Featured Courses</h2>
          <p>Boost your career with industry-relevant, hands-on training programs designed by experts.</p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">

          <div className="row gy-4">

            {/* Full Stack Development */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="course-card">
                <div className="course-image">
                  <img src="/assets/img/course_images/full_stack_image.png" alt="Full Stack Development" className="img-fluid" />
                  <div className="badge featured">Featured</div>
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="level">Intermediate</span>
                    <span className="duration">24 Weeks</span>
                  </div>
                  <h3><a href="#">Full Stack Development</a></h3>
                  <p>Master front-end and back-end development with React, Node.js, and databases to become a job-ready Full Stack Developer.</p>

                  <div className="course-stats">
                    <div className="rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <span>(4.8)</span>
                    </div>
                    <div className="students">
                      <i className="bi bi-people-fill"></i>
                      <span>100+ students</span>
                    </div>
                  </div>
                  <a href="/fullstackdevelopment" className="btn-course">Enroll Now</a>
                </div>
              </div>
            </div>
            {/* <!-- End Course Item --> */}

            {/* Digital Marketing */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="course-card">
                <div className="course-image">
                  <img src="/assets/img/course_images/digital_markeiting_image.png" alt="Digital Marketing" className="img-fluid" />
                  <div className="badge popular">Popular</div>
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="level">Beginner</span>
                    <span className="duration">12 Weeks</span>
                  </div>
                  <h3><a href="#">Digital Marketing</a></h3>
                  <p>Learn SEO, Google Ads, Social Media Marketing, and Email Campaigns to grow businesses online.</p>

                  <div className="course-stats">
                    <div className="rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                      <span>(4.5)</span>
                    </div>
                    <div className="students">
                      <i className="bi bi-people-fill"></i>
                      <span>100+ students</span>
                    </div>
                  </div>
                  <a href="/digital_marketing" className="btn-course">Enroll Now</a>
                </div>
              </div>
            </div>
            {/* <!-- End Course Item --> */}

            {/* Data Analyst */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="course-card">
                <div className="course-image">
                  <img src="/assets/img/course_images/data_analyst_image.png" alt="Data Analyst" className="img-fluid" />
                  <div className="badge certificate">Certificate</div>
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="level">Intermediate</span>
                    <span className="duration">10 Weeks</span>
                  </div>
                  <h3><a href="#">Data Analyst</a></h3>
                  <p>Gain practical skills in Python, SQL, Excel, and Power BI to analyze and visualize data for insights.</p>

                  <div className="course-stats">
                    <div className="rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <span>(4.7)</span>
                    </div>
                    <div className="students">
                      <i className="bi bi-people-fill"></i>
                      <span>100+ students</span>
                    </div>
                  </div>
                  <a href="/data_analyst" className="btn-course">Enroll Now</a>
                </div>
              </div>
            </div>
            {/* <!-- End Course Item --> */}
          </div>
        </div>

      </section>
      {/* <!-- /Featured Courses Section --> */}


      {/* <!-- Testimonials Section --> */}
      <section id="testimonials" className="testimonials section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>What our students and professionals say about our training programs</p>
        </div>
        {/* End Section Title */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            <div className="col-12">
              {/* Critic Reviews */}
              <div
                className="critic-reviews"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="critic-review">
                      <div className="review-quote">"</div>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        “The Full Stack Development program gave me the confidence to
                        switch careers. The projects and mentorship were top-notch.”
                      </p>
                      <h6>- Rajesh Kumar</h6>
                      <span>Software Engineer at Infosys</span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="critic-review">
                      <div className="review-quote">"</div>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </div>
                      <p>
                        “The Digital Marketing course helped me grow my family
                        business online. Practical and easy-to-understand modules.”
                      </p>
                      <h6>- Priya Sharma</h6>
                      <span>Entrepreneur</span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="critic-review">
                      <div className="review-quote">"</div>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        “The Data Analyst program was very detailed. I cracked my
                        first analytics job within 2 months of finishing the course.”
                      </p>
                      <h6>- Neha Verma</h6>
                      <span>Data Analyst at TCS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Swiper */}
              <div className="testimonials-container">
                <div
                  className="swiper testimonials-slider init-swiper"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {/* Swiper Config */}
                  <script type="application/json" className="swiper-config">
                    {`
              {
                "loop": true,
                "speed": 600,
                "autoplay": { "delay": 5000 },
                "slidesPerView": 1,
                "spaceBetween": 30,
                "pagination": {
                  "el": ".swiper-pagination",
                  "type": "bullets",
                  "clickable": true
                },
                "breakpoints": {
                  "768": { "slidesPerView": 2 },
                  "992": { "slidesPerView": 3 }
                }
              }
            `}
                  </script>

                  <div className="swiper-wrapper">
                    {/* Testimonial 1 */}
                    <div className="swiper-slide">
                      <div className="testimonial-item">
                        <div className="stars">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <p>
                          “The trainers are very supportive, and the curriculum is
                          aligned with industry needs. Highly recommended.”
                        </p>
                        <h6>- Arjun Mehta</h6>
                        <span>Full Stack Graduate</span>
                      </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="swiper-slide">
                      <div className="testimonial-item">
                        <div className="stars">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <p>
                          “I learned more in 8 weeks of Digital Marketing training
                          than in my MBA electives. The live projects made all the
                          difference.”
                        </p>
                        <h6>- Kavya Reddy</h6>
                        <span>Marketing Professional</span>
                      </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="swiper-slide">
                      <div className="testimonial-item">
                        <div className="stars">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </div>
                        <p>
                          “Data visualization with Power BI was the highlight for me.
                          The case studies were real-world and practical.”
                        </p>
                        <h6>- Ankit Singh</h6>
                        <span>Business Analyst</span>
                      </div>
                    </div>

                    {/* Testimonial 4 */}
                    <div className="swiper-slide">
                      <div className="testimonial-item">
                        <div className="stars">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <p>
                          “The flexible learning schedule allowed me to continue
                          working full-time while upskilling. Fantastic experience.”
                        </p>
                        <h6>- Sneha Kapoor</h6>
                        <span>Working Professional</span>
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="row">
            <div className="col-12 text-center" data-aos="fade-up">
              <div className="overall-rating">
                <div className="rating-number">4.8</div>
                <div className="rating-stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                </div>
                <p>Based on 500+ student reviews</p>
                <div className="rating-platforms">
                  <span>Google Reviews</span>
                  <span>LinkedIn</span>
                  <span>Trustpilot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Testimonials Section --> */}
      {/* CTA Section */}
      <section id="cta" className="cta section light-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">

            {/* CTA Left Content */}
            <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
              <div className="cta-content">
                <h2>Unlock Your Potential with Industry-Leading Courses</h2>
                <p>
                  Learn from top professionals and gain in-demand skills that help you
                  land your dream job. Join our community of learners today!
                </p>

                <div className="features-list">
                  <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>50+ Industry Expert Instructors</span>
                  </div>
                  <div className="feature-item" data-aos="fade-up" data-aos-delay="350">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Recognized Certificates to Boost Your Resume</span>
                  </div>
                  <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Lifetime Access to Learning Materials</span>
                  </div>
                  <div className="feature-item" data-aos="fade-up" data-aos-delay="450">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Hands-on Projects & Real-World Assignments</span>
                  </div>
                </div>

                <div className="cta-actions" data-aos="fade-up" data-aos-delay="500">
                  <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                  <Link to="/enroll" className="btn btn-outline">Get Started</Link>
                </div>

                <div className="stats-row" data-aos="fade-up" data-aos-delay="600">
                  <div className="stat-item">
                    <h3>100+</h3>
                    <p>Active Students</p>
                  </div>

                  <div className="stat-item">
                    <h3>96%</h3>
                    <p>Career Growth Success</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Right Image */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
              <div className="cta-image">
                <img
                  src="/assets/img/education/courses-4.webp"
                  alt="Online Learning"
                  className="img-fluid"
                />
                <div
                  className="floating-element student-card"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <div className="card-content">
                    <i className="bi bi-person-check-fill"></i>
                    <div className="text">
                      <span className="number">100+</span>
                      <span className="label">New Enrollments This Month</span>
                    </div>
                  </div>
                </div>
                <div
                  className="floating-element course-card"
                  data-aos="zoom-in"
                  data-aos-delay="700"
                >
                  <div className="card-content">
                    <i className="bi bi-play-circle-fill"></i>
                    <div className="text">
                      <span className="number">1,000+</span>
                      <span className="label">Hours of Expert Content</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* <!-- /CTA Section --> */}

    </div>
  )
}

export default Home
