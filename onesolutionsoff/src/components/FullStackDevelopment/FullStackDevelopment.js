"use client"
import { useState, useEffect } from "react";

import AceEditor from "react-ace";

// Import mode + themes (with worker fix)
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

// Import this to fix worker issues
import "ace-builds/src-noconflict/ext-language_tools";

import "./FullStackDevelopment.css";

const FullStackDevelopment = () => {
  useEffect(() => {
    document.title = "Full Stack Development | One Solutions"
  }, [])

  const [activeFAQ, setActiveFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  return (
    
    <div className="main_container_full_stack">
          {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Full Stack Development</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Full Stack Development</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

      
      {/* Hero Section */}
      <section className="hero_full_stack">
        <div className="hero_background_full_stack"></div>
        <div className="hero_particles_full_stack"></div>
        <div className="container_full_stack">
          <div className="hero_content_full_stack">
            <div className="hero_badge_full_stack">
              🚀 #1 Full Stack Development Course
            </div>
            <h1 className="hero_title_full_stack">
              Master <span className="gradient_text_full_stack">Full-Stack Development</span>
              <br />From Zero to Hero
            </h1>
            <p className="hero_subtitle_full_stack">
              Transform your career with our comprehensive Java & Python Full Stack program.
              Build real-world projects, master cutting-edge technologies, and land your dream job.
            </p>

            <div className="hero_stats_full_stack">
              <div className="stat_item_full_stack">
                <span className="stat_number_full_stack">1000+</span>
                <span className="stat_label_full_stack">Students Placed</span>
              </div>
              <div className="stat_item_full_stack">
                <span className="stat_number_full_stack">95%</span>
                <span className="stat_label_full_stack">Success Rate</span>
              </div>
              <div className="stat_item_full_stack">
                <span className="stat_number_full_stack">50+</span>
                <span className="stat_label_full_stack">Partner Companies</span>
              </div>
            </div>

            <div className="hero_cta_full_stack">
              <a href="#" className="btn_primary_full_stack">
                <span>Download Syllabus</span>
                <i className="fas fa-download"></i>
              </a>
              <a href="#" className="btn_secondary_full_stack">
                <i className="fas fa-play"></i>
                <span>Watch Demo</span>
              </a>
            </div>

            <div className="code_terminal_full_stack">
              <div className="terminal_header_full_stack">
                <div className="terminal_controls_full_stack">
                  <span className="control_dot_full_stack red_full_stack"></span>
                  <span className="control_dot_full_stack yellow_full_stack"></span>
                  <span className="control_dot_full_stack green_full_stack"></span>
                </div>
                <span className="terminal_title_full_stack">OneSolutions_Career.js</span>
              </div>

              <AceEditor

                width="100%"
                placeholder="Programming"
                mode="javascript"
                theme="monokai"
                name="blah2"
                fontSize={14}
                lineHeight={19}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`// OneSolutions Journey: Student to Successfully Placed Professional
const OneSolutionsPlacement = {
  confidenceBoost: {
    mockInterviews: true,
    softSkillsTraining: true,
    personalizedMentorship: true,
  },

  technicalExcellence: [
    "Java Full Stack",
    "Python Programming",
    "Data Analyst",
    "Data Structures & Algorithms",
  ],

  securePlacement: () => {
    while (!placementAchieved) {
      attendOneSolutionsSessions();
      buildProjects();
      refineInterviewSkills();
      participateInPlacementDrives();
    }
    return "Successfully Placed 🎯";
  }
};
// OneSolutions believes: You deserve the best company and package 🚀`}
                setOptions={{
                  readOnly: true,
                  highlightActiveLine: false,
                  highlightGutterLine: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false, // This fixes the worker error
                  showFoldWidgets: false,
                  behavioursEnabled: false,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Why Choose OneSolutions</h2>
            <p className="section_subtitle_full_stack">
              Experience the difference with our industry-leading full stack development program
            </p>
          </div>

          <div className="features_grid_full_stack">
            <div className="feature_card_full_stack">
              <div className="feature_icon_container_full_stack">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M64 160C64 124.7 92.7 96 128 96L512 96C547.3 96 576 124.7 576 160L576 400L512 400L512 160L128 160L128 400L64 400L64 160zM0 467.2C0 456.6 8.6 448 19.2 448L620.8 448C631.4 448 640 456.6 640 467.2C640 509.6 605.6 544 563.2 544L76.8 544C34.4 544 0 509.6 0 467.2zM281 273L250 304L281 335C290.4 344.4 290.4 359.6 281 368.9C271.6 378.2 256.4 378.3 247.1 368.9L199.1 320.9C189.7 311.5 189.7 296.3 199.1 287L247.1 239C256.5 229.6 271.7 229.6 281 239C290.3 248.4 290.4 263.6 281 272.9zM393 239L441 287C450.4 296.4 450.4 311.6 441 320.9L393 368.9C383.6 378.3 368.4 378.3 359.1 368.9C349.8 359.5 349.7 344.3 359.1 335L390.1 304L359.1 273C349.7 263.6 349.7 248.4 359.1 239.1C368.5 229.8 383.7 229.7 393 239.1z" />
                </svg>

              </div>
              <h3 className="feature_title_full_stack">Live Interactive Training</h3>
              <p className="feature_description_full_stack">
                Learn through hands-on coding sessions with real-time feedback and instant doubt resolution
              </p>
              <div className="feature_highlight_full_stack">Real-time Learning</div>
            </div>

            <div className="feature_card_full_stack">
              <div className="feature_icon_container_full_stack">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z" />
                </svg>

              </div>
              <h3 className="feature_title_full_stack">Industry Challenges</h3>
              <p className="feature_description_full_stack">
                Participate in hackathons and mock interviews designed by industry professionals
              </p>
              <div className="feature_highlight_full_stack">Skill Testing</div>
            </div>

            <div className="feature_card_full_stack">
              <div className="feature_icon_container_full_stack">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z" />
                </svg>
              </div>
              <h3 className="feature_title_full_stack">Portfolio Development</h3>
              <p className="feature_description_full_stack">
                Build 6+ production-ready projects that showcase your expertise to top employers
              </p>
              <div className="feature_highlight_full_stack">Project Based</div>
            </div>

            <div className="feature_card_full_stack">
              <div className="feature_icon_container_full_stack">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M192 384L88.5 384C63.6 384 48.3 356.9 61.1 335.5L114 247.3C122.7 232.8 138.3 224 155.2 224L250.2 224C326.3 95.1 439.8 88.6 515.7 99.7C528.5 101.6 538.5 111.6 540.3 124.3C551.4 200.2 544.9 313.7 416 389.8L416 484.8C416 501.7 407.2 517.3 392.7 526L304.5 578.9C283.2 591.7 256 576.3 256 551.5L256 448C256 412.7 227.3 384 192 384L191.9 384zM464 224C464 197.5 442.5 176 416 176C389.5 176 368 197.5 368 224C368 250.5 389.5 272 416 272C442.5 272 464 250.5 464 224z" />
                </svg>
              </div>
              <h3 className="feature_title_full_stack">Guaranteed Placement</h3>
              <p className="feature_description_full_stack">
                100% placement assistance with unlimited support until you land your dream job
              </p>
              <div className="feature_highlight_full_stack">Career Success</div>
            </div>
          </div>
        </div>
      </section>


      {/* Technology Stack */}
      <section className="tech_stack_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Master Modern Technologies</h2>
            <p className="section_subtitle_full_stack">
              Learn the most in-demand technologies used by Fortune 500 companies
            </p>
          </div>

          <div className="tech_showcase_full_stack">
            {/* Backend */}
            <div className="tech_category_card_full_stack">
              <div className="tech_header_full_stack">
                <i className="fab fa-java tech_category_icon_full_stack"></i>
                <h3>Backend Technologies</h3>
              </div>
              <div className="tech_items_full_stack">
                <span className="tech_item_full_stack">Java</span>
                <span className="tech_item_full_stack">Spring Boot</span>
                <span className="tech_item_full_stack">Python</span>
                <span className="tech_item_full_stack">Django</span>
                <span className="tech_item_full_stack">REST APIs</span>
                <span className="tech_item_full_stack">Microservices</span>
              </div>
            </div>

            {/* Frontend */}
            <div className="tech_category_card_full_stack">
              <div className="tech_header_full_stack">
                <i className="fab fa-react tech_category_icon_full_stack"></i>
                <h3>Frontend Technologies</h3>
              </div>
              <div className="tech_items_full_stack">
                <span className="tech_item_full_stack">React.js</span>
                <span className="tech_item_full_stack">JavaScript ES6+</span>
                <span className="tech_item_full_stack">HTML5 & CSS3</span>
                <span className="tech_item_full_stack">TypeScript</span>
                <span className="tech_item_full_stack">Redux</span>
                <span className="tech_item_full_stack">Material-UI</span>
              </div>
            </div>

            {/* Database & Cloud */}
            <div className="tech_category_card_full_stack">
              <div className="tech_header_full_stack">
                <i className="fas fa-database tech_category_icon_full_stack"></i>
                <h3>Database & Cloud</h3>
              </div>
              <div className="tech_items_full_stack">
                <span className="tech_item_full_stack">MySQL</span>
                <span className="tech_item_full_stack">MongoDB</span>
                <span className="tech_item_full_stack">PostgreSQL</span>
                <span className="tech_item_full_stack">AWS Cloud</span>
                <span className="tech_item_full_stack">Docker</span>
                <span className="tech_item_full_stack">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Curriculum Section */}
      <section className="curriculum_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Comprehensive Curriculum</h2>
            <p className="section_subtitle_full_stack">
              6-8 months intensive program designed to make you industry-ready
            </p>
          </div>

          <div className="curriculum_timeline_full_stack">
            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">1</div>
              <div className="timeline_content_full_stack">
                <h3>Foundation & Core Java</h3>
                <p>Programming fundamentals, OOP concepts, data structures, and algorithms</p>
                <div className="timeline_duration_full_stack">Weeks 1-4</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">2</div>
              <div className="timeline_content_full_stack">
                <h3>Advanced Java & Frameworks</h3>
                <p>Spring Framework, Spring Boot, Hibernate, and enterprise development</p>
                <div className="timeline_duration_full_stack">Weeks 5-10</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">3</div>
              <div className="timeline_content_full_stack">
                <h3>Frontend Development</h3>
                <p>HTML5, CSS3, JavaScript, React.js, and modern UI/UX principles</p>
                <div className="timeline_duration_full_stack">Weeks 11-16</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">4</div>
              <div className="timeline_content_full_stack">
                <h3>Database & DevOps</h3>
                <p>SQL, NoSQL databases, cloud deployment, Docker, and CI/CD pipelines</p>
                <div className="timeline_duration_full_stack">Weeks 17-22</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">5</div>
              <div className="timeline_content_full_stack">
                <h3>Capstone Projects</h3>
                <p>Build real-world applications and prepare for placement interviews</p>
                <div className="timeline_duration_full_stack">Weeks 23-26</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section className="projects_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Build Real-World Projects</h2>
            <p className="section_subtitle_full_stack">
              Create an impressive portfolio with these industry-standard applications
            </p>
          </div>

          <div className="projects_showcase_full_stack">
            <div className="project_card_full_stack">
              <div className="project_image_full_stack">
                <div className="project_overlay_full_stack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                    <path fill="white" d="M335.9 84.2C326.1 78.6 314 78.6 304.1 84.2L80.1 212.2C67.5 219.4 61.3 234.2 65 248.2C68.7 262.2 81.5 272 96 272L128 272L128 480L128 480L76.8 518.4C68.7 524.4 64 533.9 64 544C64 561.7 78.3 576 96 576L544 576C561.7 576 576 561.7 576 544C576 533.9 571.3 524.4 563.2 518.4L512 480L512 272L544 272C558.5 272 571.2 262.2 574.9 248.2C578.6 234.2 572.4 219.4 559.8 212.2L335.8 84.2zM464 272L464 480L400 480L400 272L464 272zM352 272L352 480L288 480L288 272L352 272zM240 272L240 480L176 480L176 272L240 272zM320 160C337.7 160 352 174.3 352 192C352 209.7 337.7 224 320 224C302.3 224 288 209.7 288 192C288 174.3 302.3 160 320 160z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_full_stack">
                <h3>BankSecure Pro</h3>
                <p>Enterprise banking solution with advanced security features and transaction management</p>
                <div className="project_tech_stack_full_stack">
                  <span className="tech_badge_full_stack">Java</span>
                  <span className="tech_badge_full_stack">Spring Boot</span>
                  <span className="tech_badge_full_stack">MySQL</span>
                </div>
                <div className="project_features_full_stack">
                  <span>• Secure Authentication</span>
                  <span>• Transaction Processing</span>
                  <span>• Account Management</span>
                </div>
              </div>
            </div>

            <div className="project_card_full_stack">
              <div className="project_image_full_stack">
                <div className="project_overlay_full_stack">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_full_stack">
                <h3>E-Commerce Platform</h3>
                <p>Full-featured online store with payment integration and inventory management</p>
                <div className="project_tech_stack_full_stack">
                  <span className="tech_badge_full_stack">React</span>
                  <span className="tech_badge_full_stack">Node.js</span>
                  <span className="tech_badge_full_stack">MongoDB</span>
                </div>
                <div className="project_features_full_stack">
                  <span>• Payment Gateway</span>
                  <span>• Order Management</span>
                  <span>• Admin Dashboard</span>
                </div>
              </div>
            </div>

            <div className="project_card_full_stack">
              <div className="project_image_full_stack">
                <div className="project_overlay_full_stack">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M384 224L480 224L480 160L384 160L384 224zM96 224L96 144C96 117.5 117.5 96 144 96L496 96C522.5 96 544 117.5 544 144L544 240C544 266.5 522.5 288 496 288L144 288C117.5 288 96 266.5 96 240L96 224zM256 480L480 480L480 416L256 416L256 480zM96 480L96 400C96 373.5 117.5 352 144 352L496 352C522.5 352 544 373.5 544 400L544 496C544 522.5 522.5 544 496 544L144 544C117.5 544 96 522.5 96 496L96 480z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_full_stack">
                <h3>Project Management Tool</h3>
                <p>Collaborative workspace for teams with task tracking and real-time updates</p>
                <div className="project_tech_stack_full_stack">
                  <span className="tech_badge_full_stack">Python</span>
                  <span className="tech_badge_full_stack">Django</span>
                  <span className="tech_badge_full_stack">PostgreSQL</span>
                </div>
                <div className="project_features_full_stack">
                  <span>• Team Collaboration</span>
                  <span>• Task Assignment</span>
                  <span>• Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="learning_path_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Your Success Journey</h2>
            <p className="section_subtitle_full_stack">
              Follow our proven 5-step methodology to become a successful full-stack developer
            </p>
          </div>

          <div className="journey_steps_full_stack">
            <div className="step_card_full_stack">
              <div className="step_number_full_stack">01</div>
              <div className="step_icon_full_stack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                <path d="M320 216C368.6 216 408 176.6 408 128C408 79.4 368.6 40 320 40C271.4 40 232 79.4 232 128C232 176.6 271.4 216 320 216zM320 514.7L320 365.4C336.3 358.6 352.9 351.7 369.7 344.7C408.7 328.5 450.5 320.1 492.8 320.1L512 320.1L512 480.1L492.8 480.1C433.7 480.1 375.1 491.8 320.5 514.6L320 514.8zM320 296L294.9 285.5C248.1 266 197.9 256 147.2 256L112 256C85.5 256 64 277.5 64 304L64 496C64 522.5 85.5 544 112 544L147.2 544C197.9 544 248.1 554 294.9 573.5L307.7 578.8C315.6 582.1 324.4 582.1 332.3 578.8L345.1 573.5C391.9 554 442.1 544 492.8 544L528 544C554.5 544 576 522.5 576 496L576 304C576 277.5 554.5 256 528 256L492.8 256C442.1 256 391.9 266 345.1 285.5L320 296z" />
              </svg>
              </div>
              <h3>Learn Fundamentals</h3>
              <p>Master programming basics and core concepts</p>
            </div>

            <div className="step_card_full_stack">
              <div className="step_number_full_stack">02</div>
              <div className="step_icon_full_stack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
              </svg>
              </div>
              <h3>Build Projects</h3>
              <p>Apply knowledge through hands-on development</p>
            </div>

            <div className="step_card_full_stack">
              <div className="step_number_full_stack">03</div>
              <div className="step_icon_full_stack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
              </svg>
              </div>
              <h3>Industry Training</h3>
              <p>Learn best practices and industry standards</p>
            </div>

            <div className="step_card_full_stack">
              <div className="step_number_full_stack">04</div>
              <div className="step_icon_full_stack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
              </svg>
              </div>
              <h3>Interview Prep</h3>
              <p>Practice technical and soft skills interviews</p>
            </div>

            <div className="step_card_full_stack">
              <div className="step_number_full_stack">05</div>
              <div className="step_icon_full_stack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                <path fill="white" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z" />
              </svg></div>
              <h3>Land Your Job</h3>
              <p>Secure your dream position with our support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Investment in Your Future</h2>
            <p className="section_subtitle_full_stack">
              Choose the learning format that works best for you
            </p>
          </div>

          <div className="pricing_cards_full_stack">
            <div className="pricing_card_full_stack">
              <div className="pricing_header_full_stack">
                <h3>Offline Program</h3>
                <div className="price_amount_full_stack">₹31,999</div>
                <p className="price_description_full_stack">Classroom-based intensive training</p>
              </div>
              <div className="pricing_features_full_stack">
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>In-person mentorship</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Hands-on lab sessions</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Peer learning environment</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Direct instructor access</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Project collaboration</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_full_stack">Enroll Now</a>
            </div>

            <div className="pricing_card_full_stack featured_full_stack">
              <div className="featured_badge_full_stack">Most Popular</div>
              <div className="pricing_header_full_stack">
                <h3>Online Program</h3>
                <div className="price_amount_full_stack">₹26,999</div>
                <p className="price_description_full_stack">Flexible online learning experience</p>
              </div>
              <div className="pricing_features_full_stack">
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Live online sessions</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Flexible scheduling</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Recorded lectures access</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Virtual mentorship</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Online project reviews</span>
                </div>
                <div className="feature_item_full_stack">
                  <i className="fas fa-check"></i>
                  <span>Career counseling</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_full_stack">Start Learning</a>
            </div>
          </div>

          <div className="pricing_guarantee_full_stack">
            <div className="guarantee_content_full_stack">
              <i className="fas fa-shield-alt guarantee_icon_full_stack"></i>
              <div>
                <h4>100% Placement Guarantee</h4>
                <p>We're committed to your success. Get unlimited placement support until you land your dream job.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_full_stack">Frequently Asked Questions</h2>
            <p className="section_subtitle_full_stack">
              Got questions? We've got answers to help you make the right decision
            </p>
          </div>

          <div className="faq_container_full_stack">
            {[
              {
                question: "How do I enroll in the OneSolutions Full Stack program?",
                answer: "Simply click on the 'Enroll Now' button, fill out the registration form, and complete the payment process. Our team will contact you within 24 hours to guide you through the onboarding process and provide access to our learning platform."
              },
              {
                question: "What is the duration and schedule of the course?",
                answer: "The program runs for 6-8 months with flexible scheduling options. For online students, we offer evening batches (7-9 PM) and weekend intensive sessions. Offline students can choose from morning (9 AM-12 PM) or afternoon (2-5 PM) batches."
              },
              {
                question: "Do I need any prior programming experience?",
                answer: "No programming experience is required! Our curriculum starts from absolute basics and gradually progresses to advanced concepts. We've successfully trained complete beginners and helped them land jobs at top companies."
              },
              {
                question: "What kind of placement assistance do you provide?",
                answer: "We offer comprehensive placement support including resume building, mock interviews, soft skills training, and direct connections with 50+ hiring partners. Our placement team works with you until you secure a job that meets your career goals."
              },
              {
                question: "Can I access course materials after completion?",
                answer: "Yes! You get lifetime access to all course materials, recorded sessions, project resources, and our alumni community. We also provide free access to updated content and new technology modules as they're added."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq_item_full_stack ${activeFAQ === index ? 'active_full_stack' : ''}`}>
                <div
                  className="faq_question_full_stack"
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
                  <i className="fas fa-chevron-down faq_icon_full_stack"></i>
                </div>
                <div className="faq_answer_full_stack">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final_cta_full_stack">
        <div className="container_full_stack">
          <div className="cta_content_full_stack">
            <h2 className="cta_title_full_stack">Ready to Transform Your Career?</h2>
            <p className="cta_subtitle_full_stack">
              Join the next batch starting <strong>October 5th, 2025</strong>
            </p>
            <div className="cta_urgency_full_stack">
              <span className="urgency_text_full_stack">⚡ Limited seats available - Only 25 spots left!</span>
            </div>
            <div className="cta_buttons_full_stack">
              <a href="#" className="btn_primary_full_stack large_full_stack">
                <span>Secure Your Spot Now</span>
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#" className="btn_outline_full_stack">
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

export default FullStackDevelopment;