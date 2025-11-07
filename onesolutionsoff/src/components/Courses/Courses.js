import React, {useEffect} from 'react';

const Courses = () => {
  useEffect(() => {
      document.title = "Courses | One Solutions";
    }, []);
  return (
    <div>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Courses</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Courses</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

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
    </div>
  );
};

export default Courses;
