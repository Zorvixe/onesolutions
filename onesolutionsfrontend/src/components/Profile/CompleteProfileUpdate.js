import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CompleteProfileUpdate.css";

const CompleteProfileUpdate = () => {
  const { completeProfile, updateCompleteProfile, addProject, addAchievement } =
    useAuth();
  const [activeSection, setActiveSection] = useState("basic");
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Example option lists (change as needed)
  const languageOptions = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];
  const technicalSkillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Java",
    "Python",
  ];
  const jobLocationOptions = [
    "Remote",
    "Hyderabad",
    "Bengaluru",
    "Chennai",
    "Mumbai",
  ];

  useEffect(() => {
    if (completeProfile) {
      setFormData({
        // Basic Details
        firstName: completeProfile.firstName || "",
        lastName: completeProfile.lastName || "",
        phone: completeProfile.phone || "",
        batchMonth: completeProfile.batchMonth || "",
        batchYear: completeProfile.batchYear || "",
        isCurrentBatch: completeProfile.isCurrentBatch || false,

        // Personal Details
        nameOnCertificate: completeProfile.nameOnCertificate || "",
        gender: completeProfile.gender || "",
        preferredLanguages: completeProfile.preferredLanguages || [],
        dateOfBirth: completeProfile.dateOfBirth || "",
        codePlaygroundUsername: completeProfile.codePlaygroundUsername || "",
        linkedinProfileUrl: completeProfile.linkedinProfileUrl || "",
        githubProfileUrl: completeProfile.githubProfileUrl || "",
        hackerrankProfileUrl: completeProfile.hackerrankProfileUrl || "",
        leetcodeProfileUrl: completeProfile.leetcodeProfileUrl || "",

        // Parent/Guardian Details
        parentFirstName: completeProfile.parentFirstName || "",
        parentLastName: completeProfile.parentLastName || "",
        parentRelation: completeProfile.parentRelation || "",

        // Current Address
        addressLine1: completeProfile.addressLine1 || "",
        addressLine2: completeProfile.addressLine2 || "",
        country: completeProfile.country || "India",
        state: completeProfile.state || "",
        district: completeProfile.district || "",
        city: completeProfile.city || "",
        postalCode: completeProfile.postalCode || "",

        // Current Expertise
        currentCodingLevel: completeProfile.currentCodingLevel || "",
        technicalSkills: completeProfile.technicalSkills || [],
        hasLaptop: completeProfile.hasLaptop || false,

        // Job Preferences
        jobSearchStatus: completeProfile.jobSearchStatus || "",
        preferredJobLocations: completeProfile.preferredJobLocations || [],
        expectedCtcRange: completeProfile.expectedCtcRange || "",
        preferredTeachingLanguage:
          completeProfile.preferredTeachingLanguage || "",
        preferredVideoLanguage: completeProfile.preferredVideoLanguage || "",

        // Education Details
        tenthMarksType: completeProfile.tenthMarksType || "",
        tenthMarks: completeProfile.tenthMarks || "",
        twelfthEducationType: completeProfile.twelfthEducationType || "",
        twelfthMarksType: completeProfile.twelfthMarksType || "",
        twelfthMarks: completeProfile.twelfthMarks || "",
        bachelorDegree: completeProfile.bachelorDegree || "",
        bachelorBranch: completeProfile.bachelorBranch || "",
        bachelorCgpa: completeProfile.bachelorCgpa || "",
        bachelorStartYear: completeProfile.bachelorStartYear || "",
        bachelorEndYear: completeProfile.bachelorEndYear || "",
        bachelorStatus: completeProfile.bachelorStatus || "",
        bachelorInstitute: completeProfile.bachelorInstitute || "",
        bachelorInstituteState: completeProfile.bachelorInstituteState || "",
        bachelorInstituteCity: completeProfile.bachelorInstituteCity || "",
        bachelorInstitutePincode:
          completeProfile.bachelorInstitutePincode || "",
        bachelorInstituteDistrict:
          completeProfile.bachelorInstituteDistrict || "",

        // Work Experience
        occupationStatus: completeProfile.occupationStatus || "",
        hasWorkExperience: completeProfile.hasWorkExperience || false,
      });

      setProjects(completeProfile.projects || []);
      setAchievements(completeProfile.achievements || []);
    }
  }, [completeProfile]);

  // Generic change for simple inputs and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Multi-select HTML <select multiple> handler
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };

  // For comma-separated string -> array inputs (if you prefer quick text entry)
  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(value)
        ? value
        : value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    }));
  };

  // Projects handling
  const addNewProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        projectTitle: "",
        projectDescription: "",
        projectLink: "",
        skills: [],
      },
    ]);
  };

  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    );
  };

  const updateProjectMultiSelect = (index, event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    updateProject(index, "skills", selected);
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Achievements handling
  const addNewAchievement = () => {
    setAchievements((prev) => [
      ...prev,
      {
        achievementTitle: "",
        achievementDescription: "",
        achievementLink: "",
        achievementDate: "",
      },
    ]);
  };

  const updateAchievement = (index, field, value) => {
    setAchievements((prev) =>
      prev.map((achievement, i) =>
        i === index ? { ...achievement, [field]: value } : achievement
      )
    );
  };

  const removeAchievement = (index) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const submitData = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          // Avoid appending undefined
          submitData.append(key, formData[key] ?? "");
        }
      });

      // Append projects and achievements as JSON strings
      submitData.append("projects", JSON.stringify(projects));
      submitData.append("achievements", JSON.stringify(achievements));

      const result = await updateCompleteProfile(submitData);
      // If your updateCompleteProfile returns { message } or a raw value adapt accordingly
      setMessage(result?.message || "Profile updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "basic", label: "Basic Details" },
    { id: "personal", label: "Personal Details" },
    { id: "parent", label: "Parent/Guardian" },
    { id: "address", label: "Current Address" },
    { id: "expertise", label: "Current Expertise" },
    { id: "preferences", label: "Job Preferences" },
    { id: "education", label: "Education Details" },
    { id: "work", label: "Work Experience" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="form-section">
            <h3>Basic Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <label>Name on Certificate</label>
              <input
                type="text"
                name="nameOnCertificate"
                value={formData.nameOnCertificate || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Languages (multi-select)</label>
              <select
                multiple
                name="preferredLanguages"
                value={formData.preferredLanguages || []}
                onChange={handleMultiSelectChange}
                size={Math.min(6, languageOptions.length)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <small>Hold Ctrl (Windows) / Cmd (Mac) to select multiple</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Code Playground Username</label>
                <input
                  type="text"
                  name="codePlaygroundUsername"
                  value={formData.codePlaygroundUsername || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinProfileUrl"
                  value={formData.linkedinProfileUrl || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  name="githubProfileUrl"
                  value={formData.githubProfileUrl || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case "parent":
        return (
          <div className="form-section">
            <h3>Parent / Guardian</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Parent First Name</label>
                <input
                  type="text"
                  name="parentFirstName"
                  value={formData.parentFirstName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Parent Last Name</label>
                <input
                  type="text"
                  name="parentLastName"
                  value={formData.parentLastName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Relation</label>
              <input
                type="text"
                name="parentRelation"
                value={formData.parentRelation || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case "address":
        return (
          <div className="form-section">
            <h3>Current Address</h3>
            <div className="form-group">
              <label>Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || "India"}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case "expertise":
        return (
          <div className="form-section">
            <h3>Current Expertise</h3>
            <div className="form-group">
              <label>Current Coding Level</label>
              <input
                type="text"
                name="currentCodingLevel"
                value={formData.currentCodingLevel || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Technical Skills (multi-select)</label>
              <select
                multiple
                name="technicalSkills"
                value={formData.technicalSkills || []}
                onChange={handleMultiSelectChange}
                size={Math.min(8, technicalSkillOptions.length)}
              >
                {technicalSkillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <small>Hold Ctrl (Windows) / Cmd (Mac) to select multiple</small>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="hasLaptop"
                  checked={!!formData.hasLaptop}
                  onChange={handleChange}
                />
                &nbsp;Have Laptop?
              </label>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="form-section">
            <h3>Job Preferences</h3>
            <div className="form-group">
              <label>Job Search Status</label>
              <select
                name="jobSearchStatus"
                value={formData.jobSearchStatus || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Actively looking">Actively looking</option>
                <option value="Open to offers">Open to offers</option>
                <option value="Not looking">Not looking</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Job Locations (multi-select)</label>
              <select
                multiple
                name="preferredJobLocations"
                value={formData.preferredJobLocations || []}
                onChange={handleMultiSelectChange}
                size={Math.min(6, jobLocationOptions.length)}
              >
                {jobLocationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <small>Hold Ctrl (Windows) / Cmd (Mac) to select multiple</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expected CTC Range</label>
                <input
                  type="text"
                  name="expectedCtcRange"
                  value={formData.expectedCtcRange || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Teaching Language</label>
                <input
                  type="text"
                  name="preferredTeachingLanguage"
                  value={formData.preferredTeachingLanguage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="form-section">
            <h3>Education Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>10th Marks Type</label>
                <input
                  type="text"
                  name="tenthMarksType"
                  value={formData.tenthMarksType || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>10th Marks</label>
                <input
                  type="text"
                  name="tenthMarks"
                  value={formData.tenthMarks || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>12th Marks Type</label>
                <input
                  type="text"
                  name="twelfthMarksType"
                  value={formData.twelfthMarksType || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>12th Marks</label>
                <input
                  type="text"
                  name="twelfthMarks"
                  value={formData.twelfthMarks || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h4>Bachelor Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  name="bachelorDegree"
                  value={formData.bachelorDegree || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input
                  type="text"
                  name="bachelorBranch"
                  value={formData.bachelorBranch || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>CGPA / Percentage</label>
                <input
                  type="text"
                  name="bachelorCgpa"
                  value={formData.bachelorCgpa || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Start Year</label>
                <input
                  type="text"
                  name="bachelorStartYear"
                  value={formData.bachelorStartYear || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case "work":
        return (
          <div className="form-section">
            <h3>Work Experience</h3>
            <div className="form-group">
              <label>Occupation Status</label>
              <input
                type="text"
                name="occupationStatus"
                value={formData.occupationStatus || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="hasWorkExperience"
                  checked={!!formData.hasWorkExperience}
                  onChange={handleChange}
                />
                &nbsp;Has Work Experience
              </label>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="form-section">
            <h3>Projects</h3>
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      value={project.projectTitle}
                      onChange={(e) =>
                        updateProject(index, "projectTitle", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={project.projectDescription}
                    onChange={(e) =>
                      updateProject(index, "projectDescription", e.target.value)
                    }
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="url"
                      value={project.projectLink}
                      onChange={(e) =>
                        updateProject(index, "projectLink", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Skills (multi-select)</label>
                    <select
                      multiple
                      value={project.skills || []}
                      onChange={(e) => updateProjectMultiSelect(index, e)}
                      size={Math.min(6, technicalSkillOptions.length)}
                    >
                      {technicalSkillOptions.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <small>
                      Hold Ctrl (Windows) / Cmd (Mac) to select multiple
                    </small>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={addNewProject} className="add-btn">
              Add Project
            </button>
          </div>
        );

      case "achievements":
        return (
          <div className="form-section">
            <h3>Achievements</h3>
            {achievements.map((ach, index) => (
              <div key={index} className="achievement-item">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={ach.achievementTitle}
                      onChange={(e) =>
                        updateAchievement(
                          index,
                          "achievementTitle",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={ach.achievementDescription}
                    onChange={(e) =>
                      updateAchievement(
                        index,
                        "achievementDescription",
                        e.target.value
                      )
                    }
                    rows="2"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Link</label>
                    <input
                      type="url"
                      value={ach.achievementLink}
                      onChange={(e) =>
                        updateAchievement(
                          index,
                          "achievementLink",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={ach.achievementDate}
                      onChange={(e) =>
                        updateAchievement(
                          index,
                          "achievementDate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addNewAchievement}
              className="add-btn"
            >
              Add Achievement
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!completeProfile) {
    return <div className="com-loading">Loading profile...</div>;
  }

  return (
    <div className="complete-profile-update">
      <h2>Complete Profile</h2>

      {message && (
        <div
          className={`message ${
            message.toLowerCase().includes("success") ||
            message.toLowerCase().includes("updated")
              ? "success"
              : "error"
          }`}
        >
          {message}
        </div>
      )}

      <div className="profile-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-btn ${
              activeSection === section.id ? "active" : ""
            }`}
            type="button"
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        {renderSection()}

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileUpdate;
