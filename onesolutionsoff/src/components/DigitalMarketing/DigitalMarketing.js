"use client"
import { useState, useEffect } from "react";

import AceEditor from "react-ace";

// Import mode + themes (with worker fix)
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

// Import this to fix worker issues
import "ace-builds/src-noconflict/ext-language_tools";

import "./DigitalMarketing.css";

const DigitalMarketing = () => {
  useEffect(() => {
    document.title = "Digital Marketing | One Solutions"
  }, [])

  const [activeFAQ, setActiveFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  return (
    <div className="main_container_digital_marketing">

        {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Digital Marketing</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Digital Marketing</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

      {/* Hero Section */}
      <section className="hero_digital_marketing">
        <div className="hero_background_digital_marketing"></div>
        <div className="hero_particles_digital_marketing"></div>
        <div className="container_digital_marketing">
          <div className="hero_content_digital_marketing">
            <div className="hero_badge_digital_marketing">
              🚀 #1 Digital Marketing Course
            </div>
            <h1 className="hero_title_digital_marketing">
              Master <span className="gradient_text_digital_marketing">Digital Marketing</span>
              <br />Become an In-Demand Expert
            </h1>
            <p className="hero_subtitle_digital_marketing">
              Transform brands with cutting-edge digital strategies. Master SEO, SEM, social media,
              content marketing, and analytics to drive real business growth.
            </p>

            <div className="hero_stats_digital_marketing">
              <div className="stat_item_digital_marketing">
                <span className="stat_number_digital_marketing">850+</span>
                <span className="stat_label_digital_marketing">Students Certified</span>
              </div>
              <div className="stat_item_digital_marketing">
                <span className="stat_number_digital_marketing">92%</span>
                <span className="stat_label_digital_marketing">Placement Rate</span>
              </div>
              <div className="stat_item_digital_marketing">
                <span className="stat_number_digital_marketing">40+</span>
                <span className="stat_label_digital_marketing">Industry Partners</span>
              </div>
            </div>

            <div className="hero_cta_digital_marketing">
              <a href="#" className="btn_primary_digital_marketing">
                <span>Download Syllabus</span>
                <i className="fas fa-download"></i>
              </a>
              <a href="#" className="btn_secondary_digital_marketing">
                <i className="fas fa-play"></i>
                <span>Watch Demo</span>
              </a>
            </div>

            <div className="code_terminal_digital_marketing">
              <div className="terminal_header_digital_marketing">
                <div className="terminal_controls_digital_marketing">
                  <span className="control_dot_digital_marketing red_digital_marketing"></span>
                  <span className="control_dot_digital_marketing yellow_digital_marketing"></span>
                  <span className="control_dot_digital_marketing green_digital_marketing"></span>
                </div>
                <span className="terminal_title_digital_marketing">OneSolutions_Campaign.js</span>
              </div>

              <AceEditor
                width="100%"
                placeholder="Marketing Strategy"
                mode="javascript"
                theme="monokai"
                name="blah2"
                fontSize={14}
                lineHeight={19}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`// OneSolutions Digital Marketing Success Formula
const DigitalMarketingStrategy = {
  foundation: {
    marketResearch: true,
    audienceAnalysis: true,
    competitorAnalysis: true,
  },
  channels: [
    "SEO & Content Marketing",
    "Social Media Marketing",
    "PPC & SEM Advertising",
    "Email Marketing Automation",
    "Analytics & Data Insights"
  ],
  executeCampaign: () => {
    while (!campaignSuccess) {
      researchTargetAudience();
      createContentStrategy();
      optimizeForSEO();
      launchPaidCampaigns();
      analyzePerformance();
    }
    return "ROI Achieved 🎯";
  }
};
// OneSolutions formula: Data-driven strategies that deliver real results 🚀`}
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
      <section className="features_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Why Choose Our Digital Marketing Program</h2>
            <p className="section_subtitle_digital_marketing">
              Get certified with hands-on experience in the most in-demand digital marketing skills
            </p>
          </div>

          <div className="features_grid_digital_marketing">
            <div className="feature_card_digital_marketing">
              <div className="feature_icon_container_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_digital_marketing">Live Campaign Management</h3>
              <p className="feature_description_digital_marketing">
                Work on real client campaigns with budget allocation and performance tracking
              </p>
              <div className="feature_highlight_digital_marketing">Real Projects</div>
            </div>

            <div className="feature_card_digital_marketing">
              <div className="feature_icon_container_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_digital_marketing">Industry Tools Certification</h3>
              <p className="feature_description_digital_marketing">
                Get certified on Google Analytics, Ads, Facebook Blueprint, and more industry tools
              </p>
              <div className="feature_highlight_digital_marketing">Certifications</div>
            </div>

            <div className="feature_card_digital_marketing">
              <div className="feature_icon_container_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_digital_marketing">Portfolio Development</h3>
              <p className="feature_description_digital_marketing">
                Build a professional portfolio with 5+ successful campaign case studies
              </p>
              <div className="feature_highlight_digital_marketing">Case Studies</div>
            </div>

            <div className="feature_card_digital_marketing">
              <div className="feature_icon_container_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3 className="feature_title_digital_marketing">Placement Assistance</h3>
              <p className="feature_description_digital_marketing">
                100% job assistance with connections to top agencies and brands
              </p>
              <div className="feature_highlight_digital_marketing">Career Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech_stack_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Master Digital Marketing Tools</h2>
            <p className="section_subtitle_digital_marketing">
              Learn the most in-demand digital marketing platforms and technologies
            </p>
          </div>

          <div className="tech_showcase_digital_marketing">
            {/* SEO & Analytics */}
            <div className="tech_category_card_digital_marketing">
              <div className="tech_header_digital_marketing">
                <i className="fas fa-search tech_category_icon_digital_marketing"></i>
                <h3>SEO & Analytics</h3>
              </div>
              <div className="tech_items_digital_marketing">
                <span className="tech_item_digital_marketing">Google Analytics</span>
                <span className="tech_item_digital_marketing">Google Search Console</span>
                <span className="tech_item_digital_marketing">SEMrush</span>
                <span className="tech_item_digital_marketing">Ahrefs</span>
                <span className="tech_item_digital_marketing">Moz</span>
                <span className="tech_item_digital_marketing">Keyword Research</span>
              </div>
            </div>

            {/* Advertising */}
            <div className="tech_category_card_digital_marketing">
              <div className="tech_header_digital_marketing">
                <i className="fas fa-ad tech_category_icon_digital_marketing"></i>
                <h3>Advertising Platforms</h3>
              </div>
              <div className="tech_items_digital_marketing">
                <span className="tech_item_digital_marketing">Google Ads</span>
                <span className="tech_item_digital_marketing">Facebook Ads</span>
                <span className="tech_item_digital_marketing">Instagram Ads</span>
                <span className="tech_item_digital_marketing">LinkedIn Ads</span>
                <span className="tech_item_digital_marketing">Programmatic Ads</span>
                <span className="tech_item_digital_marketing">Retargeting</span>
              </div>
            </div>

            {/* Content & Social */}
            <div className="tech_category_card_digital_marketing">
              <div className="tech_header_digital_marketing">
                <i className="fas fa-share-alt tech_category_icon_digital_marketing"></i>
                <h3>Content & Social Media</h3>
              </div>
              <div className="tech_items_digital_marketing">
                <span className="tech_item_digital_marketing">Content Strategy</span>
                <span className="tech_item_digital_marketing">Social Media Management</span>
                <span className="tech_item_digital_marketing">Email Marketing</span>
                <span className="tech_item_digital_marketing">WordPress</span>
                <span className="tech_item_digital_marketing">Canva</span>
                <span className="tech_item_digital_marketing">Marketing Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* curriculum */}
      <section className="curriculum_full_stack">
        <div className="container_full_stack">
          <div className="section_header_full_stack">
            <h2 className="section_title_digital_marketing">Comprehensive Curriculum</h2>
            <p className="section_subtitle_digital_marketing">
              4-6 months intensive program covering all aspects of digital marketing
            </p>
          </div>

          <div className="curriculum_timeline_full_stack">
            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">1</div>
              <div className="timeline_content_full_stack">
                <h3>Digital Marketing Fundamentals</h3>
                <p>Introduction to digital marketing, consumer behavior, and marketing funnel</p>
                <div className="timeline_duration_digital_marketing">Weeks 1-3</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">2</div>
              <div className="timeline_content_full_stack">
                <h3>SEO & Content Marketing</h3>
                <p>Keyword research, on-page/off-page SEO, content strategy, and blogging</p>
                <div className="timeline_duration_digital_marketing">Weeks 4-7</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">3</div>
              <div className="timeline_content_full_stack">
                <h3>Social Media Marketing</h3>
                <p>Platform strategies, content creation, community management, and analytics</p>
                <div className="timeline_duration_digital_marketing">Weeks 8-10</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">4</div>
              <div className="timeline_content_full_stack">
                <h3>PPC & Advertising</h3>
                <p>Google Ads, social media advertising, retargeting, and campaign optimization</p>
                <div className="timeline_duration_digital_marketing">Weeks 11-14</div>
              </div>
            </div>

            <div className="timeline_item_full_stack">
              <div className="timeline_marker_full_stack">5</div>
              <div className="timeline_content_full_stack">
                <h3>Analytics & Strategy</h3>
                <p>Data analysis, ROI measurement, marketing strategy, and client presentation</p>
                <div className="timeline_duration_digital_marketing">Weeks 15-18</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* curriculum end */}


      {/* Projects Portfolio */}
      <section className="projects_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Real Marketing Campaigns</h2>
            <p className="section_subtitle_digital_marketing">
              Build an impressive portfolio with actual marketing campaigns
            </p>
          </div>

          <div className="projects_showcase_digital_marketing">
            <div className="project_card_digital_marketing">
              <div className="project_image_digital_marketing">
                <div className="project_overlay_digital_marketing">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                    <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_digital_marketing">
                <h3>E-commerce SEO Strategy</h3>
                <p>Complete SEO overhaul for an online store resulting in 200% organic traffic growth</p>
                <div className="project_tech_stack_digital_marketing">
                  <span className="tech_badge_digital_marketing">SEO</span>
                  <span className="tech_badge_digital_marketing">Content</span>
                  <span className="tech_badge_digital_marketing">Analytics</span>
                </div>
                <div className="project_features_digital_marketing">
                  <span>• Keyword Research</span>
                  <span>• Technical SEO Audit</span>
                  <span>• Content Strategy</span>
                </div>
              </div>
            </div>

            <div className="project_card_digital_marketing">
              <div className="project_image_digital_marketing">
                <div className="project_overlay_digital_marketing">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_digital_marketing">
                <h3>Social Media Campaign</h3>
                <p>Viral social media campaign generating 50K+ engagements and 500+ leads</p>
                <div className="project_tech_stack_digital_marketing">
                  <span className="tech_badge_digital_marketing">Facebook</span>
                  <span className="tech_badge_digital_marketing">Instagram</span>
                  <span className="tech_badge_digital_marketing">Content</span>
                </div>
                <div className="project_features_digital_marketing">
                  <span>• Content Calendar</span>
                  <span>• Community Management</span>
                  <span>• Performance Analysis</span>
                </div>
              </div>
            </div>

            <div className="project_card_digital_marketing">
              <div className="project_image_digital_marketing">
                <div className="project_overlay_digital_marketing">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 640 640">
                    <path d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                  </svg>
                </div>
              </div>
              <div className="project_details_digital_marketing">
                <h3>Google Ads Campaign</h3>
                <p>PPC campaign with 300% ROI and 50% reduction in customer acquisition cost</p>
                <div className="project_tech_stack_digital_marketing">
                  <span className="tech_badge_digital_marketing">Google Ads</span>
                  <span className="tech_badge_digital_marketing">Analytics</span>
                  <span className="tech_badge_digital_marketing">Conversion</span>
                </div>
                <div className="project_features_digital_marketing">
                  <span>• Keyword Strategy</span>
                  <span>• Ad Copy Testing</span>
                  <span>• Landing Page Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="learning_path_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Your Digital Marketing Journey</h2>
            <p className="section_subtitle_digital_marketing">
              Follow our proven 5-step methodology to become a successful digital marketer
            </p>
          </div>

          <div className="journey_steps_digital_marketing">
            <div className="step_card_digital_marketing">
              <div className="step_number_digital_marketing">01</div>
              <div className="step_icon_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M320 216C368.6 216 408 176.6 408 128C408 79.4 368.6 40 320 40C271.4 40 232 79.4 232 128C232 176.6 271.4 216 320 216zM320 514.7L320 365.4C336.3 358.6 352.9 351.7 369.7 344.7C408.7 328.5 450.5 320.1 492.8 320.1L512 320.1L512 480.1L492.8 480.1C433.7 480.1 375.1 491.8 320.5 514.6L320 514.8zM320 296L294.9 285.5C248.1 266 197.9 256 147.2 256L112 256C85.5 256 64 277.5 64 304L64 496C64 522.5 85.5 544 112 544L147.2 544C197.9 544 248.1 554 294.9 573.5L307.7 578.8C315.6 582.1 324.4 582.1 332.3 578.8L345.1 573.5C391.9 554 442.1 544 492.8 544L528 544C554.5 544 576 522.5 576 496L576 304C576 277.5 554.5 256 528 256L492.8 256C442.1 256 391.9 266 345.1 285.5L320 296z" />
                </svg>
              </div>
              <h3>Learn Fundamentals</h3>
              <p>Master digital marketing principles and consumer psychology</p>
            </div>

            <div className="step_card_digital_marketing">
              <div className="step_number_digital_marketing">02</div>
              <div className="step_icon_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
                </svg>
              </div>
              <h3>Execute Campaigns</h3>
              <p>Run real campaigns with actual budgets and measure results</p>
            </div>

            <div className="step_card_digital_marketing">
              <div className="step_number_digital_marketing">03</div>
              <div className="step_icon_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                </svg>
              </div>
              <h3>Get Certified</h3>
              <p>Earn industry-recognized certifications from Google, Facebook, and more</p>
            </div>

            <div className="step_card_digital_marketing">
              <div className="step_number_digital_marketing">04</div>
              <div className="step_icon_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30" fill="white">
                  <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                </svg>
              </div>
              <h3>Build Portfolio</h3>
              <p>Create case studies that demonstrate your ability to drive results</p>
            </div>

            <div className="step_card_digital_marketing">
              <div className="step_number_digital_marketing">05</div>
              <div className="step_icon_digital_marketing">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
                  <path fill="white" d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM512 128C512 220.1 468 301.9 400 352L400 480C400 497.7 385.7 512 368 512L272 512C254.3 512 240 497.7 240 480L240 352C171.1 301.9 128 220.1 128 128C128 57.3 185.3 0 256 0C292.8 0 326.1 16.8 348.8 44C371.5 16.8 404.9 0 441.7 0C512.4 0 569.7 57.3 569.7 128H512z" />
                </svg>
              </div>
              <h3>Land Your Job</h3>
              <p>Secure positions at top agencies or in-house marketing teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Investment in Your Future</h2>
            <p className="section_subtitle_digital_marketing">
              Choose the learning format that works best for you
            </p>
          </div>

          <div className="pricing_cards_digital_marketing">
            <div className="pricing_card_digital_marketing">
              <div className="pricing_header_digital_marketing">
                <h3>Offline Program</h3>
                <div className="price_amount_digital_marketing">₹24,999</div>
                <p className="price_description_digital_marketing">Classroom-based intensive training</p>
              </div>
              <div className="pricing_features_digital_marketing">
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>In-person mentorship</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Hands-on workshop sessions</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Peer learning environment</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Direct instructor access</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Campaign collaboration</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_digital_marketing">Enroll Now</a>
            </div>

            <div className="pricing_card_digital_marketing featured_digital_marketing">
              <div className="featured_badge_digital_marketing">Most Popular</div>
              <div className="pricing_header_digital_marketing">
                <h3>Online Program</h3>
                <div className="price_amount_digital_marketing">₹19,999</div>
                <p className="price_description_digital_marketing">Flexible online learning experience</p>
              </div>
              <div className="pricing_features_digital_marketing">
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Live online sessions</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Flexible scheduling</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Recorded lectures access</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Virtual mentorship</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Campaign reviews</span>
                </div>
                <div className="feature_item_digital_marketing">
                  <i className="fas fa-check"></i>
                  <span>Career counseling</span>
                </div>
              </div>
              <a href="#" className="pricing_cta_digital_marketing">Start Learning</a>
            </div>
          </div>

          <div className="pricing_guarantee_digital_marketing">
            <div className="guarantee_content_digital_marketing">
              <i className="fas fa-shield-alt guarantee_icon_digital_marketing"></i>
              <div>
                <h4>Certification & Placement Guarantee</h4>
                <p>We're committed to your success. Get certified and receive placement support until you land your dream marketing job.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq_digital_marketing">
        <div className="container_digital_marketing">
          <div className="section_header_digital_marketing">
            <h2 className="section_title_digital_marketing">Frequently Asked Questions</h2>
            <p className="section_subtitle_digital_marketing">
              Got questions? We've got answers to help you make the right decision
            </p>
          </div>

          <div className="faq_container_digital_marketing">
            {[
              {
                question: "Do I need any marketing background to join this course?",
                answer: "No prior marketing experience is required! Our curriculum is designed for complete beginners and covers everything from fundamentals to advanced strategies. We've successfully trained people from diverse backgrounds including engineers, graduates, and career changers."
              },
              {
                question: "What certifications will I receive after completing the course?",
                answer: "You'll receive the OneSolutions Digital Marketing Certification along with preparation for industry certifications like Google Analytics, Google Ads, Facebook Blueprint, and more. These certifications significantly boost your resume and credibility."
              },
              {
                question: "Will I get to work on real campaigns?",
                answer: "Absolutely! Our program includes hands-on projects with real budgets. You'll manage actual campaigns for mock clients or non-profits, giving you practical experience that employers value highly."
              },
              {
                question: "What kind of job roles can I apply for after completion?",
                answer: "Graduates typically secure roles as Digital Marketing Specialists, SEO Analysts, Social Media Managers, PPC Specialists, Content Marketers, and Marketing Coordinators at both agencies and in-house marketing teams."
              },
              {
                question: "How long does it take to complete the course and see results?",
                answer: "The program is designed to be completed in 4-6 months with part-time study. Many students start seeing tangible results from their campaign projects within the first 2-3 months of the program."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq_item_digital_marketing ${activeFAQ === index ? 'active_digital_marketing' : ''}`}>
                <div
                  className="faq_question_digital_marketing"
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
                  <i className="fas fa-chevron-down faq_icon_digital_marketing"></i>
                </div>
                <div className="faq_answer_digital_marketing">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final_cta_digital_marketing">
        <div className="container_digital_marketing">
          <div className="cta_content_digital_marketing">
            <h2 className="cta_title_digital_marketing">Ready to Launch Your Marketing Career?</h2>
            <p className="cta_subtitle_digital_marketing">
              Join the next batch starting <strong>November 15th, 2025</strong>
            </p>
            <div className="cta_urgency_digital_marketing">
              <span className="urgency_text_digital_marketing">⚡ Limited seats available - Only 20 spots left!</span>
            </div>
            <div className="cta_buttons_digital_marketing">
              <a href="#" className="btn_primary_digital_marketing large_digital_marketing">
                <span>Secure Your Spot Now</span>
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#" className="btn_outline_digital_marketing">
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

export default DigitalMarketing;