import React, {useEffect} from 'react'

const Events = () => {

  useEffect(() => {
      document.title = "Events | One Solutions";
    }, []);

  return (
    <div>
    {/* <!-- Page Title --> */}
    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">Events</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="current">Events</li>
          </ol>
        </nav>
      </div>
    </div>
    {/* <!-- End Page Title --> */}

    {/* <!-- Courses Events Section --> */}
    <section id="courses-events" className="courses-events section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row">

          <div className="col-lg-8">

            {/* <!-- Event Item --> */}
            <article className="event-card" data-aos="fade-up" data-aos-delay="200">
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="event-image">
                    <img src="assets/img/education/events-3.webp" className="img-fluid" alt="Event Image"/>
                    <div className="date-badge">
                      <span className="day">15</span>
                      <span className="month">Dec</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="time"><i className="bi bi-clock"></i> 2:00 PM - 4:00 PM</span>
                      <span className="location"><i className="bi bi-geo-alt"></i> Online Webinar</span>
                    </div>
                    <h3 className="event-title">
                      <a href="#">Advanced Data Science Techniques Workshop</a>
                    </h3>
                    <p className="event-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    <div className="event-footer">
                      <div className="instructor">
                        <img src="assets/img/person/person-f-8.webp" alt="Instructor" className="instructor-avatar"/>
                        <span>Dr. Sarah Johnson</span>
                      </div>
                      <div className="event-price">
                        <span className="price">$49</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <a href="#" className="btn btn-primary">Register Now</a>
                      <a href="#" className="btn btn-outline">Learn More</a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            {/* <!-- End Event Item --> */}

            {/* <!-- Event Item --> */}
            <article className="event-card" data-aos="fade-up" data-aos-delay="300">
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="event-image">
                    <img src="assets/img/education/events-7.webp" className="img-fluid" alt="Event Image"/>
                    <div className="date-badge">
                      <span className="day">22</span>
                      <span className="month">Dec</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="time"><i className="bi bi-clock"></i> 6:00 PM - 8:30 PM</span>
                      <span className="location"><i className="bi bi-geo-alt"></i> Hybrid Event</span>
                    </div>
                    <h3 className="event-title">
                      <a href="#">Machine Learning for Beginners MasterclassName</a>
                    </h3>
                    <p className="event-description">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris viverra veniam sit amet lacus cursus, at tempor nunc dignissim.</p>
                    <div className="event-footer">
                      <div className="instructor">
                        <img src="assets/img/person/person-m-12.webp" alt="Instructor" className="instructor-avatar"/>
                        <span>Prof. Michael Chen</span>
                      </div>
                      <div className="event-price">
                        <span className="price free">Free</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <a href="#" className="btn btn-primary">Register Now</a>
                      <a href="#" className="btn btn-outline">Learn More</a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            {/* <!-- End Event Item --> */}

            {/* <!-- Event Item --> */}
            <article className="event-card" data-aos="fade-up" data-aos-delay="400">
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="event-image">
                    <img src="assets/img/education/events-5.webp" className="img-fluid" alt="Event Image"/>
                    <div className="date-badge">
                      <span className="day">28</span>
                      <span className="month">Dec</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="time"><i className="bi bi-clock"></i> 10:00 AM - 12:00 PM</span>
                      <span className="location"><i className="bi bi-geo-alt"></i> Online Platform</span>
                    </div>
                    <h3 className="event-title">
                      <a href="#">Web Development Career Summit</a>
                    </h3>
                    <p className="event-description">Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Dignissim convallis aenean et tortor at risus viverra adipiscing at.</p>
                    <div className="event-footer">
                      <div className="instructor">
                        <img src="assets/img/person/person-f-3.webp" alt="Instructor" className="instructor-avatar"/>
                        <span>Emily Rodriguez</span>
                      </div>
                      <div className="event-price">
                        <span className="price">$75</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <a href="#" className="btn btn-primary">Register Now</a>
                      <a href="#" className="btn btn-outline">Learn More</a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            {/* <!-- End Event Item --> */}

            {/* <!-- Pagination --> */}
            <nav className="pagination-wrapper" data-aos="fade-up" data-aos-delay="500">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#"><i className="bi bi-chevron-left"></i></a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"><i className="bi bi-chevron-right"></i></a>
                </li>
              </ul>
            </nav>

          </div>

          {/* <!-- Sidebar --> */}
          <div className="col-lg-4">

            {/* <!-- Search Widget --> */}
            <div className="sidebar-widget search-widget" data-aos="fade-up" data-aos-delay="200">
              <h4 className="widget-title">Search Events</h4>
              <form className="search-form">
                <input type="text" placeholder="Search events..." className="form-control"/>
                <button type="submit" className="search-btn">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            {/* <!-- End Search Widget --> */}

            {/* <!-- Filter Widget --> */}
            <div className="sidebar-widget filter-widget" data-aos="fade-up" data-aos-delay="300">
              <h4 className="widget-title">Filter Events</h4>
              <div className="filter-content">
                <div className="filter-group">
                  <label className="filter-label">Event Type</label>
                  <select className="form-select">
                    <option value="">All Types</option>
                    <option value="webinar">Webinar</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="masterclassName">MasterclassName</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Date Range</label>
                  <select className="form-select">
                    <option value="">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">Next 3 Months</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Price</label>
                  <select className="form-select">
                    <option value="">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <button className="btn btn-primary filter-apply-btn">Apply Filters</button>
              </div>
            </div>
            {/* <!-- End Filter Widget --> */}

            {/* <!-- Upcoming Events Widget --> */}
            <div className="sidebar-widget upcoming-widget" data-aos="fade-up" data-aos-delay="400">
              <h4 className="widget-title">Upcoming Events</h4>
              <div className="upcoming-list">

                <div className="upcoming-item">
                  <div className="upcoming-date">
                    <span className="day">18</span>
                    <span className="month">Dec</span>
                  </div>
                  <div className="upcoming-content">
                    <h5 className="upcoming-title">
                      <a href="#">Python Programming Bootcamp</a>
                    </h5>
                    <div className="upcoming-meta">
                      <span className="time"><i className="bi bi-clock"></i> 3:00 PM</span>
                      <span className="price">$95</span>
                    </div>
                  </div>
                </div>

                <div className="upcoming-item">
                  <div className="upcoming-date">
                    <span className="day">25</span>
                    <span className="month">Dec</span>
                  </div>
                  <div className="upcoming-content">
                    <h5 className="upcoming-title">
                      <a href="#">Digital Marketing Strategies</a>
                    </h5>
                    <div className="upcoming-meta">
                      <span className="time"><i className="bi bi-clock"></i> 7:00 PM</span>
                      <span className="price free">Free</span>
                    </div>
                  </div>
                </div>

                <div className="upcoming-item">
                  <div className="upcoming-date">
                    <span className="day">02</span>
                    <span className="month">Jan</span>
                  </div>
                  <div className="upcoming-content">
                    <h5 className="upcoming-title">
                      <a href="#">UX Design Fundamentals</a>
                    </h5>
                    <div className="upcoming-meta">
                      <span className="time"><i className="bi bi-clock"></i> 1:00 PM</span>
                      <span className="price">$125</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* <!-- End Upcoming Events Widget --> */}

            {/* !-- Newsletter Widget -- */}
            <div className="sidebar-widget newsletter-widget" data-aos="fade-up" data-aos-delay="500">
              <h4 className="widget-title">Stay Updated</h4>
              <p>Subscribe to our newsletter and never miss important events and course announcements.</p>
              <form action="forms/newsletter.php" method="post" className="php-email-form newsletter-form">
                <input type="email" name="email" placeholder="Your email address" required=""/>
                <button type="submit">Subscribe</button>
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your subscription request has been sent. Thank you!</div>
              </form>
             </div>

          </div>

        </div>

      </div>

    </section>
    {/* <!-- /Courses Events Section --> */}

    </div>
  )
}

export default Events
