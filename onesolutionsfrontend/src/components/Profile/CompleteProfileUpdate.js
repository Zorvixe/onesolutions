"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./CompleteProfileUpdate.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const CompleteProfileUpdate = () => {
  const { completeProfile, updateCompleteProfile } = useAuth(); // Use the imported useAuth hook
  const [activeSection, setActiveSection] = useState("basic");
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const languageOptions = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];
  const technicalSkillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Java",
    "Python",
    "MongoDB",
    "SQL",
    "TypeScript",
    "Vue.js",
    "Angular",
    "Express.js",
    "Next.js",
  ];
  const jobLocationOptions = [
    "Remote",
    "Hyderabad",
    "Bengaluru",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Pune",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const s = res.data.data.student;
          setPreview(s.profileImage);
          setFormData({
            firstName: s.firstName || "",
            lastName: s.lastName || "",
            email: s.email || "",
            phone: s.phone || "",
            password: "",
            batchMonth: s.batchMonth || "",
            batchYear: s.batchYear || "",
            isCurrentBatch: s.isCurrentBatch || false,
            nameOnCertificate: s.nameOnCertificate || "",
            gender: s.gender || "",
            preferredLanguages: s.preferredLanguages || [],
            dateOfBirth: s.dateOfBirth || "",
            codePlaygroundUsername: s.codePlaygroundUsername || "",
            linkedinProfileUrl: s.linkedinProfileUrl || "",
            githubProfileUrl: s.githubProfileUrl || "",
            hackerrankProfileUrl: s.hackerrankProfileUrl || "",
            leetcodeProfileUrl: s.leetcodeProfileUrl || "",
            parentFirstName: s.parentFirstName || "",
            parentLastName: s.parentLastName || "",
            parentRelation: s.parentRelation || "",
            addressLine1: s.addressLine1 || "",
            addressLine2: s.addressLine2 || "",
            country: s.country || "India",
            state: s.state || "",
            district: s.district || "",
            city: s.city || "",
            postalCode: s.postalCode || "",
            currentCodingLevel: s.currentCodingLevel || "",
            technicalSkills: s.technicalSkills || [],
            hasLaptop: s.hasLaptop || false,
            jobSearchStatus: s.jobSearchStatus || "",
            preferredJobLocations: s.preferredJobLocations || [],
            expectedCtcRange: s.expectedCtcRange || "",
            preferredTeachingLanguage: s.preferredTeachingLanguage || "",
            preferredVideoLanguage: s.preferredVideoLanguage || "",
            tenthMarksType: s.tenthMarksType || "",
            tenthMarks: s.tenthMarks || "",
            twelfthEducationType: s.twelfthEducationType || "",
            twelfthMarksType: s.twelfthMarksType || "",
            twelfthMarks: s.twelfthMarks || "",
            bachelorDegree: s.bachelorDegree || "",
            bachelorBranch: s.bachelorBranch || "",
            bachelorCgpa: s.bachelorCgpa || "",
            bachelorStartYear: s.bachelorStartYear || "",
            bachelorEndYear: s.bachelorEndYear || "",
            bachelorStatus: s.bachelorStatus || "",
            bachelorInstitute: s.bachelorInstitute || "",
            bachelorInstituteState: s.bachelorInstituteState || "",
            bachelorInstituteCity: s.bachelorInstituteCity || "",
            bachelorInstitutePincode: s.bachelorInstitutePincode || "",
            bachelorInstituteDistrict: s.bachelorInstituteDistrict || "",
            occupationStatus: s.occupationStatus || "",
            hasWorkExperience: s.hasWorkExperience || false,
          });
          setProjects(s.projects || []);
          setAchievements(s.achievements || []);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setMessage("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };

  const addNewProject = () => {
    setProjects((prev) => [
      ...prev,
      { projectTitle: "", projectDescription: "", projectLink: "", skills: [] },
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

  const cleanFormData = (data) => {
    const cleaned = { ...data };
    
    // Define fields that should be integers
    const integerFields = [
      "batchYear",
      "bachelorStartYear", 
      "bachelorEndYear",
      "bachelorInstitutePincode",
      "postalCode"
    ];
    
    // Define fields that should be floats (but keep as string for marks)
    const numericFields = ["tenthMarks", "twelfthMarks", "bachelorCgpa"];
    
    // Define date fields
    const dateFields = ["dateOfBirth"];
  
    // Handle integer fields
    integerFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      } else if (typeof cleaned[field] === "string") {
        // Remove any non-digit characters except decimal point for numeric fields
        const numericValue = cleaned[field].replace(/[^\d.]/g, '');
        const intValue = parseInt(numericValue);
        cleaned[field] = isNaN(intValue) ? null : intValue;
      }
    });
  
    // Handle numeric fields (keep as string since they can be percentages or CGPA)
    numericFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      }
      // Keep as string, don't convert to number
    });
  
    // Handle date fields
    dateFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      }
    });
  
    // Handle boolean fields
    const booleanFields = ["hasLaptop", "hasWorkExperience", "isCurrentBatch"];
    booleanFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = false;
      } else if (typeof cleaned[field] === "string") {
        cleaned[field] = cleaned[field] === "true";
      }
    });
  
    // Handle array fields - ensure they are proper arrays
    const arrayFields = ["preferredLanguages", "technicalSkills", "preferredJobLocations"];
    arrayFields.forEach((field) => {
      if (!cleaned[field] || cleaned[field] === "") {
        cleaned[field] = [];
      } else if (typeof cleaned[field] === "string") {
        try {
          const parsed = JSON.parse(cleaned[field]);
          cleaned[field] = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          // If not valid JSON, treat as comma-separated string
          cleaned[field] = cleaned[field].split(',').map(item => item.trim()).filter(item => item);
        }
      }
    });
  
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const cleanedFormData = cleanFormData(formData);
      const submitData = new FormData();

      Object.keys(cleanedFormData).forEach((key) => {
        const value = cleanedFormData[key];
        if (value === null || value === undefined) {
          submitData.append(key, "");
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          submitData.append(key, value.toString());
        } else {
          submitData.append(key, value);
        }
      });

      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const cleanedProjects = projects.map((project) => ({
        ...project,
        skills: Array.isArray(project.skills) ? project.skills : [],
      }));

      const cleanedAchievements = achievements.map((achievement) => ({
        ...achievement,
        achievementDate: achievement.achievementDate || null,
      }));

      submitData.append("projects", JSON.stringify(cleanedProjects));
      submitData.append("achievements", JSON.stringify(cleanedAchievements));

      const result = await updateCompleteProfile(submitData);
      setMessage(result?.message || "Profile updated successfully");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage(
        "Error updating profile: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: "👤" },
    { id: "personal", label: "Personal", icon: "🔒" },
    { id: "parent", label: "Guardian", icon: "👨‍👩‍👧‍👦" },
    { id: "address", label: "Address", icon: "🏠" },
    { id: "expertise", label: "Expertise", icon: "💻" },
    { id: "preferences", label: "Preferences", icon: "🎯" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "work", label: "Work", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
  ];

  const renderBasicInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Basic Information</h3>
        <p>Update your essential profile details</p>
      </div>
      <div className="form-grid">
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
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
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
        <div className="form-group">
          <label>Batch Year</label>
          <input
            type="number"
            name="batchYear"
            value={formData.batchYear || ""}
            onChange={handleChange}
            placeholder="e.g., 2023"
          />
        </div>
        <div className="form-group">
          <label>Batch Month</label>
          <input
            type="text"
            name="batchMonth"
            value={formData.batchMonth || ""}
            onChange={handleChange}
            placeholder="e.g., January"
          />
        </div>
        <div className="form-group full-width">
          <label>New Password (Optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
          />
        </div>
        <div className="checkbox-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isCurrentBatch"
              checked={!!formData.isCurrentBatch}
              onChange={handleChange}
            />
            <span className="checkbox-mark"></span>
            Current Batch Student
          </label>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Personal Details</h3>
        <p>Your personal information and social profiles</p>
      </div>
      <div className="form-grid">
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
        <div className="form-group full-width">
          <label>Preferred Languages</label>
          <select
            multiple
            name="preferredLanguages"
            value={formData.preferredLanguages || []}
            onChange={handleMultiSelectChange}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
        </div>
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
        <div className="form-group">
          <label>HackerRank URL</label>
          <input
            type="url"
            name="hackerrankProfileUrl"
            value={formData.hackerrankProfileUrl || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LeetCode URL</label>
          <input
            type="url"
            name="leetcodeProfileUrl"
            value={formData.leetcodeProfileUrl || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  const renderParentInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Guardian Information</h3>
        <p>Emergency contact details</p>
      </div>
      <div className="form-grid">
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
        <div className="form-group full-width">
          <label>Relation</label>
          <input
            type="text"
            name="parentRelation"
            value={formData.parentRelation || ""}
            onChange={handleChange}
            placeholder="e.g., Father, Mother, Guardian"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Current Address</h3>
        <p>Your residential address</p>
      </div>
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1 || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group full-width">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2 || ""}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
          />
        </div>
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

  const renderExpertiseInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Technical Expertise</h3>
        <p>Your skills and technical capabilities</p>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Coding Level</label>
          <select
            name="currentCodingLevel"
            value={formData.currentCodingLevel || ""}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label>Technical Skills</label>
          <select
            multiple
            name="technicalSkills"
            value={formData.technicalSkills || []}
            onChange={handleMultiSelectChange}
          >
            {technicalSkillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
        </div>
        <div className="checkbox-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="hasLaptop"
              checked={!!formData.hasLaptop}
              onChange={handleChange}
            />
            <span className="checkbox-mark"></span>I have a laptop for coding
          </label>
        </div>
      </div>
    </div>
  );

  const renderPreferencesInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Job Preferences</h3>
        <p>Your career preferences and expectations</p>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Job Search Status</label>
          <select
            name="jobSearchStatus"
            value={formData.jobSearchStatus || ""}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Actively looking">Actively looking</option>
            <option value="Open to offers">Open to offers</option>
            <option value="Not looking">Not looking</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label>Preferred Job Locations</label>
          <select
            multiple
            name="preferredJobLocations"
            value={formData.preferredJobLocations || []}
            onChange={handleMultiSelectChange}
          >
            {jobLocationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
        </div>
        <div className="form-group">
          <label>Expected CTC Range</label>
          <input
            type="text"
            name="expectedCtcRange"
            value={formData.expectedCtcRange || ""}
            onChange={handleChange}
            placeholder="e.g., 5-10 LPA"
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
        <div className="form-group">
          <label>Preferred Video Language</label>
          <input
            type="text"
            name="preferredVideoLanguage"
            value={formData.preferredVideoLanguage || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  const renderEducationInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Education Details</h3>
        <p>Your academic qualifications</p>
      </div>
      <div className="education-level">
        <h4>10th Grade</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Marks Type</label>
            <select
              name="tenthMarksType"
              value={formData.tenthMarksType || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
          <div className="form-group">
            <label>Marks</label>
            <input
              type="text"
              name="tenthMarks"
              value={formData.tenthMarks || ""}
              onChange={handleChange}
              placeholder="e.g., 9.2 or 92%"
            />
          </div>
        </div>
      </div>
      <div className="education-level">
        <h4>12th Grade</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Education Type</label>
            <input
              type="text"
              name="twelfthEducationType"
              value={formData.twelfthEducationType || ""}
              onChange={handleChange}
              placeholder="e.g., Science, Commerce"
            />
          </div>
          <div className="form-group">
            <label>Marks Type</label>
            <select
              name="twelfthMarksType"
              value={formData.twelfthMarksType || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
          <div className="form-group">
            <label>Marks</label>
            <input
              type="text"
              name="twelfthMarks"
              value={formData.twelfthMarks || ""}
              onChange={handleChange}
              placeholder="e.g., 8.5 or 85%"
            />
          </div>
        </div>
      </div>
      <div className="education-level">
        <h4>Bachelor's Degree</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              name="bachelorDegree"
              value={formData.bachelorDegree || ""}
              onChange={handleChange}
              placeholder="e.g., B.Tech, B.Sc"
            />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <input
              type="text"
              name="bachelorBranch"
              value={formData.bachelorBranch || ""}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
            />
          </div>
          <div className="form-group">
            <label>CGPA / Percentage</label>
            <input
              type="text"
              name="bachelorCgpa"
              value={formData.bachelorCgpa || ""}
              onChange={handleChange}
              placeholder="e.g., 8.5 or 85%"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="bachelorStatus"
              value={formData.bachelorStatus || ""}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Pursuing">Pursuing</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Year</label>
            <input
              type="number"
              name="bachelorStartYear"
              value={formData.bachelorStartYear || ""}
              onChange={handleChange}
              placeholder="e.g., 2020"
            />
          </div>
          <div className="form-group">
            <label>End Year</label>
            <input
              type="number"
              name="bachelorEndYear"
              value={formData.bachelorEndYear || ""}
              onChange={handleChange}
              placeholder="e.g., 2024"
            />
          </div>
          <div className="form-group full-width">
            <label>Institute</label>
            <input
              type="text"
              name="bachelorInstitute"
              value={formData.bachelorInstitute || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Institute State</label>
            <input
              type="text"
              name="bachelorInstituteState"
              value={formData.bachelorInstituteState || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Institute City</label>
            <input
              type="text"
              name="bachelorInstituteCity"
              value={formData.bachelorInstituteCity || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Institute District</label>
            <input
              type="text"
              name="bachelorInstituteDistrict"
              value={formData.bachelorInstituteDistrict || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Institute Pincode</label>
            <input
              type="text"
              name="bachelorInstitutePincode"
              value={formData.bachelorInstitutePincode || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Experience</h3>
        <p>Your professional background</p>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Occupation Status</label>
          <select
            name="occupationStatus"
            value={formData.occupationStatus || ""}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Student">Student</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>
        <div className="checkbox-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="hasWorkExperience"
              checked={!!formData.hasWorkExperience}
              onChange={handleChange}
            />
            <span className="checkbox-mark"></span>I have professional work
            experience
          </label>
        </div>
      </div>
    </div>
  );

  const renderProjectsInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Projects</h3>
        <p>Showcase your work and projects</p>
      </div>
      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h4>No projects added yet</h4>
          <p>Start by adding your first project to showcase your skills</p>
        </div>
      ) : (
        <div className="items-list">
          {projects.map((project, index) => (
            <div key={index} className="item-card">
              <div className="item-header">
                <h5>Project #{index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="btn-remove"
                >
                  🗑️ Remove
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={project.projectTitle}
                    onChange={(e) =>
                      updateProject(index, "projectTitle", e.target.value)
                    }
                    placeholder="Enter project title"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={project.projectDescription}
                    onChange={(e) =>
                      updateProject(index, "projectDescription", e.target.value)
                    }
                    rows="3"
                    placeholder="Describe your project..."
                  />
                </div>
                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="url"
                    value={project.projectLink}
                    onChange={(e) =>
                      updateProject(index, "projectLink", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group full-width">
                  <label>Skills Used</label>
                  <select
                    multiple
                    value={project.skills || []}
                    onChange={(e) => updateProjectMultiSelect(index, e)}
                  >
                    {technicalSkillOptions.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  <span className="form-hint">
                    Hold Ctrl/Cmd to select multiple
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={addNewProject} className="btn-add">
        + Add Project
      </button>
    </div>
  );

  const renderAchievementsInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Achievements</h3>
        <p>Your accomplishments and certifications</p>
      </div>
      {achievements.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h4>No achievements added yet</h4>
          <p>Add your achievements, certifications, or awards</p>
        </div>
      ) : (
        <div className="items-list">
          {achievements.map((ach, index) => (
            <div key={index} className="item-card">
              <div className="item-header">
                <h5>Achievement #{index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="btn-remove"
                >
                  🗑️ Remove
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
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
                    placeholder="Enter achievement title"
                  />
                </div>
                <div className="form-group full-width">
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
                    placeholder="Describe your achievement..."
                  />
                </div>
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
                    placeholder="https://..."
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
        </div>
      )}
      <button type="button" onClick={addNewAchievement} className="btn-add">
        + Add Achievement
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return renderBasicInfo();
      case "personal":
        return renderPersonalInfo();
      case "parent":
        return renderParentInfo();
      case "address":
        return renderAddressInfo();
      case "expertise":
        return renderExpertiseInfo();
      case "preferences":
        return renderPreferencesInfo();
      case "education":
        return renderEducationInfo();
      case "work":
        return renderWorkInfo();
      case "projects":
        return renderProjectsInfo();
      case "achievements":
        return renderAchievementsInfo();
      default:
        return null;
    }
  };

  if (!formData.firstName) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="complete-profile-update">
      <div className="profile-wrapper">
        <div className="profile-sidebar">
          <div className="sidebar-profile-card">
            {preview ? (
              <img
                src={preview || "/placeholder.svg"}
                alt="Profile"
                className="profile-image"
                onClick={handleImageClick}
              />
            ) : (
              <div className="profile-avatar" onClick={handleImageClick}>
                {formData.firstName?.charAt(0)}
                {formData.lastName?.charAt(0)}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <h3>
              {formData.firstName} {formData.lastName}
            </h3>
            <p>{formData.email}</p>
          </div>
          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="profile-main">
          {message && (
            <div
              className={`alert ${
                message.toLowerCase().includes("success")
                  ? "alert-success"
                  : "alert-error"
              }`}
            >
              <span className="alert-icon">
                {message.toLowerCase().includes("success") ? "✅" : "⚠️"}
              </span>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            {renderSection()}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className={`btn-submit ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="btn-spinner"></span> Updating...
                  </>
                ) : (
                  "💾 Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileUpdate;
