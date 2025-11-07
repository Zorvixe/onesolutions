import React, { useEffect } from 'react';

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | One Solutions";
  }, []);

  return (
    <div>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Blog</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Blog</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog Hero Section */}
      <section id="blog-hero" className="blog-hero section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="blog-grid">
            {/* Featured Post (Large) - Web Development */}
            <article className="blog-item featured" data-aos="fade-up">
              <img
                src="assets/img/blog/blog-post-3.webp"
                alt="Modern Web Development Trends"
                className="img-fluid"
              />
              <div className="blog-content">
                <div className="post-meta">
                  <span className="date">Jan. 15th, 2025</span>
                  <span className="category">Web Development</span>
                </div>
                <h2 className="post-title">
                  <a href="/blog-details">
                    Top 10 Web Development Trends to Watch in 2025
                  </a>
                </h2>
                <p className="post-excerpt">
                  Explore the latest advancements in web development including AI integration, 
                  progressive web apps, and serverless architecture that are shaping the future of digital experiences.
                </p>
              </div>
            </article>

            {/* Regular Posts */}
            <article className="blog-item" data-aos="fade-up" data-aos-delay="100">
              <img
                src="assets/img/blog/blog-post-portrait-1.webp"
                alt="SEO Strategy"
                className="img-fluid"
              />
              <div className="blog-content">
                <div className="post-meta">
                  <span className="date">Jan. 12th, 2025</span>
                  <span className="category">Digital Marketing</span>
                </div>
                <h3 className="post-title">
                  <a href="/blog-details">
                    Mastering SEO: Advanced Strategies for 2025
                  </a>
                </h3>
                <p className="post-excerpt">
                  Learn how to optimize your website for voice search, featured snippets, and core web vitals.
                </p>
              </div>
            </article>

            <article className="blog-item" data-aos="fade-up" data-aos-delay="200">
              <img
                src="assets/img/blog/blog-post-9.webp"
                alt="Data Visualization"
                className="img-fluid"
              />
              <div className="blog-content">
                <div className="post-meta">
                  <span className="date">Jan. 10th, 2025</span>
                  <span className="category">Data Analytics</span>
                </div>
                <h3 className="post-title">
                  <a href="/blog-details">
                    Data Visualization Best Practices for Business Intelligence
                  </a>
                </h3>
                <p className="post-excerpt">
                  Transform complex data into actionable insights with effective visualization techniques.
                </p>
              </div>
            </article>

            <article className="blog-item" data-aos="fade-up" data-aos-delay="300">
              <img
                src="assets/img/blog/blog-post-7.webp"
                alt="React Framework"
                className="img-fluid"
              />
              <div className="blog-content">
                <div className="post-meta">
                  <span className="date">Jan. 8th, 2025</span>
                  <span className="category">Web Development</span>
                </div>
                <h3 className="post-title">
                  <a href="/blog-details">
                    React vs Vue vs Angular: Choosing the Right Framework
                  </a>
                </h3>
                <p className="post-excerpt">
                  Comprehensive comparison of popular JavaScript frameworks for modern web applications.
                </p>
              </div>
            </article>

            <article className="blog-item" data-aos="fade-up" data-aos-delay="400">
              <img
                src="assets/img/blog/blog-post-6.webp"
                alt="Social Media Marketing"
                className="img-fluid"
              />
              <div className="blog-content">
                <div className="post-meta">
                  <span className="date">Jan. 5th, 2025</span>
                  <span className="category">Digital Marketing</span>
                </div>
                <h3 className="post-title">
                  <a href="/blog-details">
                    Social Media Marketing Strategies That Drive Conversion
                  </a>
                </h3>
                <p className="post-excerpt">
                  Leverage social media platforms to build brand awareness and increase customer engagement.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog-posts" className="blog-posts section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {/* Web Development Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-1.webp"
                    className="img-fluid"
                    alt="JavaScript Development"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>15</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">Sarah Johnson</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Web Development</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Modern JavaScript ES6+ Features Every Developer Should Know
                  </h3>
                  <p>
                    Deep dive into arrow functions, destructuring, async/await, and other ES6+ features.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Digital Marketing Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-2.webp"
                    className="img-fluid"
                    alt="Content Marketing"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>12</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">Mike Chen</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Digital Marketing</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Content Marketing Strategies for B2B Companies
                  </h3>
                  <p>
                    Learn how to create compelling content that resonates with business decision-makers.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Data Analytics Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-4.webp"
                    className="img-fluid"
                    alt="Python Data Analysis"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>10</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">Dr. Emily Roberts</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Data Analytics</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Python for Data Analysis: Pandas and NumPy Mastery
                  </h3>
                  <p>
                    Essential Python libraries and techniques for efficient data manipulation and analysis.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Web Development Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-5.webp"
                    className="img-fluid"
                    alt="Responsive Design"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>8</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">Alex Thompson</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Web Development</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Responsive Web Design: Mobile-First Approach in 2025
                  </h3>
                  <p>
                    Implementing mobile-first responsive design principles for optimal user experience.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Digital Marketing Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-9.webp"
                    className="img-fluid"
                    alt="Email Marketing"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>5</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">Jessica Williams</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Digital Marketing</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Email Marketing Automation: Increasing ROI with Personalization
                  </h3>
                  <p>
                    Advanced email marketing strategies using automation and behavioral triggers.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Data Analytics Post */}
            <div className="col-lg-4">
              <article className="position-relative h-100">
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src="assets/img/blog/blog-post-6.webp"
                    className="img-fluid"
                    alt="Machine Learning"
                  />
                </div>
                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>3</span> January
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person"></i> <span className="ps-2">David Kim</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-folder2"></i> <span className="ps-2">Data Analytics</span>
                  </div>
                </div>
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">
                    Machine Learning for Predictive Analytics in Business
                  </h3>
                  <p>
                    Implementing ML algorithms to forecast trends and make data-driven business decisions.
                  </p>
                  <a href="/blog-details" className="readmore stretched-link">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;