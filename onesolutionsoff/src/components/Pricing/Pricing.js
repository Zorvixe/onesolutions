import React, { useState } from "react";

import { useEffect } from "react";

export default function Pricing() {
  const [selectedCourse, setSelectedCourse] = useState("digital_marketing");

  useEffect(() => {
    document.title = "Pricing | One Solutions"
  })

  return (
    <div className="pricing-page">
      {/* Dropdown to select course */}
      <div className="course-selector text-center mt-5">
        <label htmlFor="courseDropdown" className="me-2 fw-bold">
          Select Course:
        </label>
        <select
          id="courseDropdown"
          className="form-select d-inline-block w-auto"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="digital_marketing">Digital Marketing</option>
          <option value="full_stack">Full Stack Development</option>
          <option value="data_analyst">Data Analyst</option>
        </select>
      </div>

      {/* Pricing Section */}
      {selectedCourse === "digital_marketing" && (
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
                  <p className="price_description_digital_marketing">
                    Classroom-based intensive training
                  </p>
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
                <a href="/enroll" className="pricing_cta_digital_marketing">Enroll Now</a>
              </div>

              <div className="pricing_card_digital_marketing featured_digital_marketing">
                <div className="featured_badge_digital_marketing">Most Popular</div>
                <div className="pricing_header_digital_marketing">
                  <h3>Online Program</h3>
                  <div className="price_amount_digital_marketing">₹19,999</div>
                  <p className="price_description_digital_marketing">
                    Flexible online learning experience
                  </p>
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
                <a href="/enroll" className="pricing_cta_digital_marketing">Start Learning</a>
              </div>
            </div>

            <div className="pricing_guarantee_digital_marketing">
              <div className="guarantee_content_digital_marketing">
                <i className="fas fa-shield-alt guarantee_icon_digital_marketing"></i>
                <div>
                  <h4>Certification & Placement Guarantee</h4>
                  <p>
                    We're committed to your success. Get certified and receive placement support until you land your dream marketing job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedCourse === "full_stack" && (
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
                  <p className="price_description_full_stack">
                    Classroom-based intensive training
                  </p>
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
                <a href="/enroll" className="pricing_cta_full_stack">Enroll Now</a>
              </div>

              <div className="pricing_card_full_stack featured_full_stack">
                <div className="featured_badge_full_stack">Most Popular</div>
                <div className="pricing_header_full_stack">
                  <h3>Online Program</h3>
                  <div className="price_amount_full_stack">₹26,999</div>
                  <p className="price_description_full_stack">
                    Flexible online learning experience
                  </p>
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
                <a href="/enroll" className="pricing_cta_full_stack">Start Learning</a>
              </div>
            </div>

            <div className="pricing_guarantee_full_stack">
              <div className="guarantee_content_full_stack">
                <i className="fas fa-shield-alt guarantee_icon_full_stack"></i>
                <div>
                  <h4>100% Placement Guarantee</h4>
                  <p>
                    We're committed to your success. Get unlimited placement support until you land your dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedCourse === "data_analyst" && (
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
                  <p className="price_description_data_analyst">
                    Classroom-based intensive training
                  </p>
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
                <a href="/enroll" className="pricing_cta_data_analyst">Enroll Now</a>
              </div>

              <div className="pricing_card_data_analyst featured_data_analyst">
                <div className="featured_badge_data_analyst">Most Popular</div>
                <div className="pricing_header_data_analyst">
                  <h3>Online Program</h3>
                  <div className="price_amount_data_analyst">₹22,999</div>
                  <p className="price_description_data_analyst">
                    Flexible online learning experience
                  </p>
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
                <a href="/enroll" className="pricing_cta_data_analyst">Start Learning</a>
              </div>
            </div>

            <div className="pricing_guarantee_data_analyst">
              <div className="guarantee_content_data_analyst">
                <i className="fas fa-shield-alt guarantee_icon_data_analyst"></i>
                <div>
                  <h4>Placement Guarantee</h4>
                  <p>
                    We're committed to your success. Receive placement support until you land your dream data analyst job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
