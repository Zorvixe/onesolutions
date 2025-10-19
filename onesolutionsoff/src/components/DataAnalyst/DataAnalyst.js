"use client"
import { useState, useEffect } from "react";

import AceEditor from "react-ace";

// Import mode + themes (with worker fix)
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

// Import this to fix worker issues
import "ace-builds/src-noconflict/ext-language_tools";

import "./DataAnalyst.css";

const DataAnalyst = () => {
  useEffect(() => {
    document.title = "Data Analyst | One Solutions"
  }, [])

  const [activeFAQ, setActiveFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  return (
    <div className="main_container_data_analyst">

       {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Data Analyst</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Data Analyst</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}
      {/* Hero Section */}
      <section className="hero_data_analyst">
        <div className="hero_background_data_analyst"></div>
        <div className="hero_particles_data_analyst"></div>
        <div className="container_data_analyst">
          <div className="hero_content_data_analyst">
            <div className="hero_badge_data_analyst">
              📊 #1 Data Analyst Course
            </div>
            <h1 className="hero_title_data_analyst">
              Master <span className="gradient_text_data_analyst">Data Analytics</span>
              <br />Unlock Insights That Drive Decisions
            </h1>
            <p className="hero_subtitle_data_analyst">
              Transform raw data into actionable insights. Master SQL, Python, Tableau, and machine learning
              to become an in-demand data analyst who drives business growth.
            </p>

            <div className="hero_stats_data_analyst">
              <div className="stat_item_data_analyst">
                <span className="stat_number_data_analyst">720+</span>
                <span className="stat_label_data_analyst">Analysts Certified</span>
              </div>
              <div className="stat_item_data_analyst">
                <span className="stat_number_data_analyst">94%</span>
                <span className="stat_label_data_analyst">Placement Rate</span>
              </div>
              <div className="stat_item_data_analyst">
                <span className="stat_number_data_analyst">35+</span>
                <span className="stat_label_data_analyst">Hiring Partners</span>
              </div>
            </div>

            <div className="hero_cta_data_analyst">
              <a href="#" className="btn_primary_data_analyst">
                <span>Download Syllabus</span>
                <i className="fas fa-download"></i>
              </a>
              <a href="#" className="btn_secondary_data_analyst">
                <i className="fas fa-play"></i>
                <span>Watch Demo</span>
              </a>
            </div>

            <div className="code_terminal_data_analyst">
              <div className="terminal_header_data_analyst">
                <div className="terminal_controls_data_analyst">
                  <span className="control_dot_data_analyst red_data_analyst"></span>
                  <span className="control_dot_data_analyst yellow_data_analyst"></span>
                  <span className="control_dot_data_analyst green_data_analyst"></span>
                </div>
                <span className="terminal_title_data_analyst">OneSolutions_Analysis.py</span>
              </div>

              <AceEditor
                width="100%"
                height="700px"
                placeholder="Data Analysis"
                mode="javascript"
                theme="monokai"
                name="blah2"
                fontSize={14}
                lineHeight={19}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`# OneSolutions Data Analysis Success Formula
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

class DataAnalystCareer:
    def __init__(self):
        self.skills = ["SQL", "Python", "Tableau", "Statistics", "Machine Learning"]
        self.projects_completed = 0
        self.placement_achieved = False
    
    def learn_fundamentals(self):
        print("Mastering data manipulation and visualization...")
        return "Fundamentals Acquired"
    
    def build_portfolio(self):
        projects = ["Sales Analysis", "Customer Segmentation", "Predictive Modeling"]
        for project in projects:
            self.projects_completed += 1
            print(f"Completed project: {project}")
        return "Portfolio Ready"
    
    def secure_placement(self):
        while not self.placement_achieved:
            self.practice_interviews()
            self.network_with_companies()
            self.attend_placement_drives()
        return "🎯 Successfully Placed as Data Analyst"

# Start your journey today!
career = DataAnalystCareer()
career.learn_fundamentals()
career.build_portfolio()
result = career.secure_placement()
print(result)`}
                setOptions={{
                  readOnly: true,
                  highlightActiveLine: false,
                  highlightGutterLine: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                  showFoldWidgets: false,
                  behavioursEnabled: false,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Why Choose Our Data Analyst Program</h2>
            <p className="section_subtitle_data_analyst">
              Gain practical experience with real-world datasets and industry tools
            </p>
          </div>

          <div className="features_grid_data_analyst">
            <div className="feature_card_data_analyst">
              <div className="feature_icon_container_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M64 64C46.3 64 32 78.3 32 96L32 416C32 433.7 46.3 448 64 448L128 448L128 480C128 497.7 142.3 512 160 512L288 512C305.7 512 320 497.7 320 480L320 448L384 448C401.7 448 416 433.7 416 416L416 96C416 78.3 401.7 64 384 64L64 64zM288 448L160 448L160 480L288 480L288 448zM96 128C96 110.3 110.3 96 128 96C145.7 96 160 110.3 160 128C160 145.7 145.7 160 128 160C110.3 160 96 145.7 96 128zM256 128C256 145.7 270.3 160 288 160C305.7 160 320 145.7 320 128C320 110.3 305.7 96 288 96C270.3 96 256 110.3 256 128zM96 224C96 206.3 110.3 192 128 192C145.7 192 160 206.3 160 224C160 241.7 145.7 256 128 256C110.3 256 96 241.7 96 224zM256 224C256 241.7 270.3 256 288 256C305.7 256 320 241.7 320 224C320 206.3 305.7 192 288 192C270.3 192 256 206.3 256 224zM96 320C96 302.3 110.3 288 128 288C145.7 288 160 302.3 160 320C160 337.7 145.7 352 128 352C110.3 352 96 337.7 96 320zM256 320C256 337.7 270.3 352 288 352C305.7 352 320 337.7 320 320C320 302.3 305.7 288 288 288C270.3 288 256 302.3 256 320z" />
                </svg>
              </div>
              <h3 className="feature_title_data_analyst">Real Datasets</h3>
              <p className="feature_description_data_analyst">
                Work with actual business datasets from various industries including finance, healthcare, and e-commerce
              </p>
              <div className="feature_highlight_data_analyst">Practical Experience</div>
            </div>

            <div className="feature_card_data_analyst">
              <div className="feature_icon_container_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_data_analyst">Industry Tools</h3>
              <p className="feature_description_data_analyst">
                Master Python, SQL, Tableau, Power BI, Excel, and statistical analysis tools used by professionals
              </p>
              <div className="feature_highlight_data_analyst">Tool Mastery</div>
            </div>

            <div className="feature_card_data_analyst">
              <div className="feature_icon_container_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_data_analyst">Portfolio Projects</h3>
              <p className="feature_description_data_analyst">
                Build 5+ comprehensive data analysis projects that demonstrate your skills to employers
              </p>
              <div className="feature_highlight_data_analyst">Project Based</div>
            </div>

            <div className="feature_card_data_analyst">
              <div className="feature_icon_container_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_data_analyst">Career Support</h3>
              <p className="feature_description_data_analyst">
                100% placement assistance with resume building, interview preparation, and company connections
              </p>
              <div className="feature_highlight_data_analyst">Job Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech_stack_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Master Data Analytics Tools</h2>
            <p className="section_subtitle_data_analyst">
              Learn the most in-demand tools and technologies used by data analysts worldwide
            </p>
          </div>

          <div className="tech_showcase_data_analyst">
            {/* Programming & Databases */}
            <div className="tech_category_card_data_analyst">
              <div className="tech_header_data_analyst">
                <i className="fas fa-code tech_category_icon_data_analyst"></i>
                <h3>Programming & Databases</h3>
              </div>
              <div className="tech_items_data_analyst">
                <span className="tech_item_data_analyst">Python</span>
                <span className="tech_item_data_analyst">SQL</span>
                <span className="tech_item_data_analyst">Pandas</span>
                <span className="tech_item_data_analyst">NumPy</span>
                <span className="tech_item_data_analyst">MySQL</span>
                <span className="tech_item_data_analyst">PostgreSQL</span>
              </div>
            </div>

            {/* Visualization */}
            <div className="tech_category_card_data_analyst">
              <div className="tech_header_data_analyst">
                <i className="fas fa-chart-bar tech_category_icon_data_analyst"></i>
                <h3>Data Visualization</h3>
              </div>
              <div className="tech_items_data_analyst">
                <span className="tech_item_data_analyst">Tableau</span>
                <span className="tech_item_data_analyst">Power BI</span>
                <span className="tech_item_data_analyst">Matplotlib</span>
                <span className="tech_item_data_analyst">Seaborn</span>
                <span className="tech_item_data_analyst">Excel</span>
                <span className="tech_item_data_analyst">Google Sheets</span>
              </div>
            </div>

            {/* Analytics & Statistics */}
            <div className="tech_category_card_data_analyst">
              <div className="tech_header_data_analyst">
                <i className="fas fa-chart-line tech_category_icon_data_analyst"></i>
                <h3>Analytics & Statistics</h3>
              </div>
              <div className="tech_items_data_analyst">
                <span className="tech_item_data_analyst">Statistics</span>
                <span className="tech_item_data_analyst">Machine Learning</span>
                <span className="tech_item_data_analyst">A/B Testing</span>
                <span className="tech_item_data_analyst">Predictive Modeling</span>
                <span className="tech_item_data_analyst">Data Cleaning</span>
                <span className="tech_item_data_analyst">ETL Processes</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* curriculum */}
      <section className="curriculum_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Comprehensive Curriculum</h2>
            <p className="section_subtitle_full_stack">
              4-6 months intensive program designed to make you industry-ready
            </p>
          </div>

          <div className="curriculum_timeline_full_stack">
            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">1</div>
              <div className="timeline_content_full_stack">
                <h3>Data Fundamentals & Excel</h3>
                <p>Statistics basics, data types, Excel functions, and introductory data analysis</p>
                <div className="timeline_duration_data_analyst">Weeks 1-4</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">2</div>
              <div className="timeline_content_full_stack">
                <h3>SQL & Database Management</h3>
                <p>Database design, SQL queries, joins, subqueries, and data extraction</p>
                <div className="timeline_duration_data_analyst">Weeks 5-8</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">3</div>
              <div className="timeline_content_full_stack">
                <h3>Python for Data Analysis</h3>
                <p>Pandas, NumPy, data manipulation, cleaning, and exploratory analysis</p>
                <div className="timeline_duration_data_analyst">Weeks 9-14</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">4</div>
              <div className="timeline_content_full_stack">
                <h3>Data Visualization</h3>
                <p>Tableau, Power BI, creating dashboards, and storytelling with data</p>
                <div className="timeline_duration_data_analyst">Weeks 15-18</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">5</div>
              <div className="timeline_content_full_stack">
                <h3>Advanced Analytics & Projects</h3>
                <p>Machine learning basics, A/B testing, and comprehensive capstone projects</p>
                <div className="timeline_duration_data_analyst">Weeks 19-24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* curriculum end */}


      {/* Projects Portfolio */}
      <section className="projects_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Real-World Data Projects</h2>
            <p className="section_subtitle_data_analyst">
              Build an impressive portfolio with actual data analysis projects
            </p>
          </div>

          <div className="projects_showcase_data_analyst">
            <div className="project_card_data_analyst">
              <div className="project_image_data_analyst">
                <div className="project_overlay_data_analyst">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                    <path fill="white" d="M64 64C46.3 64 32 78.3 32 96L32 416C32 433.7 46.3 448 64 448L128 448L128 480C128 497.7 142.3 512 160 512L288 512C305.7 512 320 497.7 320 480L320 448L384 448C401.7 448 416 433.7 416 416L416 96C416 78.3 401.7 64 384 64L64 64zM288 448L160 448L160 480L288 480L288 448zM96 128C96 110.3 110.3 96 128 96C145.7 96 160 110.3 160 128C160 145.7 145.7 160 128 160C110.3 160 96 145.7 96 128zM256 128C256 145.7 270.3 160 288 160C305.7 160 320 145.7 320 128C320 110.3 305.7 96 288 96C270.3 96 256 110.3 256 128zM96 224C96 206.3 110.3 192 128 192C145.7 192 160 206.3 160 224C160 241.7 145.7 256 128 256C110.3 256 96 241.7 96 224zM256 224C256 241.7 270.3 256 288 256C305.7 256 320 241.7 320 224C320 206.3 305.7 192 288 192C270.3 192 256 206.3 256 224zM96 320C96 302.3 110.3 288 128 288C145.7 288 160 302.3 160 320C160 337.7 145.7 352 128 352C110.3 352 96 337.7 96 320zM256 320C256 337.7 270.3 352 288 352C305.7 352 320 337.7 320 320C320 302.3 305.7 288 288 288C270.3 288 256 302.3 256 320z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_data_analyst">
                <h3>Sales Performance Dashboard</h3>
                <p>Interactive Tableau dashboard analyzing sales trends, regional performance, and product insights</p>
                <div className="project_tech_stack_data_analyst">
                  <span className="tech_badge_data_analyst">Tableau</span>
                  <span className="tech_badge_data_analyst">SQL</span>
                  <span className="tech_badge_data_analyst">Excel</span>
                </div>
                <div className="project_features_data_analyst">
                  <span>• Sales Trend Analysis</span>
                  <span>• Regional Performance</span>
                  <span>• Product Insights</span>
                </div>
              </div>
            </div>

            <div className="project_card_data_analyst">
              <div className="project_image_data_analyst">
                <div className="project_overlay_data_analyst">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_data_analyst">
                <h3>Customer Segmentation Analysis</h3>
                <p>Python-based clustering analysis to identify customer segments for targeted marketing</p>
                <div className="project_tech_stack_data_analyst">
                  <span className="tech_badge_data_analyst">Python</span>
                  <span className="tech_badge_data_analyst">Pandas</span>
                  <span className="tech_badge_data_analyst">Scikit-learn</span>
                </div>
                <div className="project_features_data_analyst">
                  <span>• K-means Clustering</span>
                  <span>• Customer Profiling</span>
                  <span>• Marketing Strategy</span>
                </div>
              </div>
            </div>

            <div className="project_card_data_analyst">
              <div className="project_image_data_analyst">
                <div className="project_overlay_data_analyst">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_data_analyst">
                <h3>Predictive Sales Forecasting</h3>
                <p>Machine learning model to predict future sales based on historical data and market trends</p>
                <div className="project_tech_stack_data_analyst">
                  <span className="tech_badge_data_analyst">Python</span>
                  <span className="tech_badge_data_analyst">ML</span>
                  <span className="tech_badge_data_analyst">Time Series</span>
                </div>
                <div className="project_features_data_analyst">
                  <span>• Regression Analysis</span>
                  <span>• Trend Prediction</span>
                  <span>• Business Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="learning_path_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Your Data Analyst Journey</h2>
            <p className="section_subtitle_data_analyst">
              Follow our proven 5-step methodology to become a successful data analyst
            </p>
          </div>

          <div className="journey_steps_data_analyst">
            <div className="step_card_data_analyst">
              <div className="step_number_data_analyst">01</div>
              <div className="step_icon_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M320 216C368.6 216 408 176.6 408 128C408 79.4 368.6 40 320 40C271.4 40 232 79.4 232 128C232 176.6 271.4 216 320 216zM320 514.7L320 365.4C336.3 358.6 352.9 351.7 369.7 344.7C408.7 328.5 450.5 320.1 492.8 320.1L512 320.1L512 480.1L492.8 480.1C433.7 480.1 375.1 491.8 320.5 514.6L320 514.8zM320 296L294.9 285.5C248.1 266 197.9 256 147.2 256L112 256C85.5 256 64 277.5 64 304L64 496C64 522.5 85.5 544 112 544L147.2 544C197.9 544 248.1 554 294.9 573.5L307.7 578.8C315.6 582.1 324.4 582.1 332.3 578.8L345.1 573.5C391.9 554 442.1 544 492.8 544L528 544C554.5 544 576 522.5 576 496L576 304C576 277.5 554.5 256 528 256L492.8 256C442.1 256 391.9 266 345.1 285.5L320 296z" />
                </svg>
              </div>
              <h3>Learn Fundamentals</h3>
              <p>Master statistics, Excel, and basic data analysis concepts</p>
            </div>

            <div className="step_card_data_analyst">
              <div className="step_number_data_analyst">02</div>
              <div className="step_icon_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
                </svg>
              </div>
              <h3>Master Tools</h3>
              <p>Become proficient in SQL, Python, and data visualization platforms</p>
            </div>

            <div className="step_card_data_analyst">
              <div className="step_number_data_analyst">03</div>
              <div className="step_icon_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                </svg>
              </div>
              <h3>Build Portfolio</h3>
              <p>Complete real-world projects that showcase your analytical skills</p>
            </div>

            <div className="step_card_data_analyst">
              <div className="step_number_data_analyst">04</div>
              <div className="step_icon_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                </svg>
              </div>
              <h3>Interview Prep</h3>
              <p>Practice technical interviews and case studies with industry experts</p>
            </div>

            <div className="step_card_data_analyst">
              <div className="step_number_data_analyst">05</div>
              <div className="step_icon_data_analyst">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3>Land Your Job</h3>
              <p>Secure positions as data analyst, business analyst, or insights analyst</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Investment in Your Future</h2>
            <p className="section_subtitle_data_analyst">
              Choose the learning format that works best for you
            </p>
          </div>

          <div className="pricing_cards_data_analyst">
            <div className="pricing_card_data_analyst">
              <div className="pricing_header_data_analyst">
                <h3>Offline Program</h3>
                <div className="price_amount_data_analyst">₹28,999</div>
                <p className="price_description_data_analyst">Classroom-based intensive training</p>
              </div>
              <div className="pricing_features_data_analyst">
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>In-person mentorship</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Hands-on lab sessions</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Peer learning environment</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Direct instructor access</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Project collaboration</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_data_analyst">Enroll Now</a>
            </div>

            <div className="pricing_card_data_analyst featured_data_analyst">
              <div className="featured_badge_data_analyst">Most Popular</div>
              <div className="pricing_header_data_analyst">
                <h3>Online Program</h3>
                <div className="price_amount_data_analyst">₹22,999</div>
                <p className="price_description_data_analyst">Flexible online learning experience</p>
              </div>
              <div className="pricing_features_data_analyst">
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Live online sessions</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Flexible scheduling</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Recorded lectures access</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Virtual mentorship</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Project reviews</span>
                </div>
                <div className="feature_item_data_analyst">
                  <i className="fas fa-check"></i>
                  <span>Career counseling</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_data_analyst">Start Learning</a>
            </div>
          </div>

          <div className="pricing_guarantee_data_analyst">
            <div className="guarantee_content_data_analyst">
              <i className="fas fa-shield-alt guarantee_icon_data_analyst"></i>
              <div>
                <h4>Placement Guarantee</h4>
                <p>We're committed to your success. Receive placement support until you land your dream data analyst job.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq_data_analyst">
        <div className="container_data_analyst">
          <div className="section_header_data_analyst">
            <h2 className="section_title_data_analyst">Frequently Asked Questions</h2>
            <p className="section_subtitle_data_analyst">
              Got questions? We've got answers to help you make the right decision
            </p>
          </div>

          <div className="faq_container_data_analyst">
            {[
              {
                question: "Do I need a technical background to become a data analyst?",
                answer: "No technical background is required! Our curriculum starts from absolute basics and is designed for complete beginners. We've successfully trained individuals from diverse backgrounds including commerce, arts, and humanities. What's important is your curiosity about data and willingness to learn."
              },
              {
                question: "What kind of job roles can I apply for after this course?",
                answer: "Graduates typically secure roles as Data Analysts, Business Analysts, Reporting Analysts, Marketing Analysts, Operations Analysts, and Insights Analysts across various industries like IT, finance, healthcare, e-commerce, and consulting firms."
              },
              {
                question: "Will I get to work with real datasets?",
                answer: "Absolutely! Throughout the course, you'll work with real-world datasets from various industries. You'll analyze sales data, customer behavior, financial metrics, and operational data - exactly the kind of data you'll encounter in real jobs."
              },
              {
                question: "How much Python and SQL do I need to learn?",
                answer: "We cover Python and SQL comprehensively from basics to advanced levels. You'll learn enough to perform complex data analysis, build predictive models, write sophisticated SQL queries, and automate data processes - everything needed for an entry-level to mid-level data analyst position."
              },
              {
                question: "What makes your data analyst course different from others?",
                answer: "Our course focuses on practical, job-ready skills rather than just theoretical concepts. You'll build a portfolio of 5+ real projects, receive personalized career guidance, and get placement assistance with our network of 35+ hiring partners. Our instructors are industry professionals who bring real-world experience to the classroom."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq_item_data_analyst ${activeFAQ === index ? 'active_data_analyst' : ''}`}>
                <div
                  className="faq_question_data_analyst"
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(index)
                    }
                  }}
                  aria-expanded={activeFAQ === index}
                >
                  {faq.question}
                  <i className="fas fa-chevron-down faq_icon_data_analyst"></i>
                </div>
                <div className="faq_answer_data_analyst">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final_cta_data_analyst">
        <div className="container_data_analyst">
          <div className="cta_content_data_analyst">
            <h2 className="cta_title_data_analyst">Ready to Launch Your Data Career?</h2>
            <p className="cta_subtitle_data_analyst">
              Join the next batch starting <strong>December 10th, 2025</strong>
            </p>
            <div className="cta_urgency_data_analyst">
              <span className="urgency_text_data_analyst">📊 Limited seats available - Only 18 spots left!</span>
            </div>
            <div className="cta_buttons_data_analyst">
              <a href="#" className="btn_primary_data_analyst large_data_analyst">
                <span>Secure Your Spot Now</span>
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#" className="btn_outline_data_analyst">
                <i className="fas fa-phone"></i>
                <span>Talk to Counselor</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DataAnalyst;