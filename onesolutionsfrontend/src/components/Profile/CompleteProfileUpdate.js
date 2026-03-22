"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./CompleteProfileUpdate.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const CompleteProfileUpdate = () => {
  const { completeProfile, updateCompleteProfile } = useAuth();
  const [activeSection, setActiveSection] = useState("basic");
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  
  // Mobile UI States
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const languageOptions = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];
  const technicalSkillOptions = [
    "HTML","CSS","JavaScript","React","Node.js","Java","Python",
    "MongoDB","SQL","TypeScript","Vue.js","Angular","Express.js","Next.js",
  ];
  const jobLocationOptions = [
    "Remote","Hyderabad","Bengaluru","Chennai","Mumbai","Delhi","Pune",
  ];
  const jobTypeOptions = ["Full-time","Part-time","Internship","Freelance","Contract"];
  const jobSectorOptions = [
    "IT","Finance","Healthcare","Education","E-commerce","Manufacturing","Consulting","Other",
  ];
  const workLocationOptions = [...jobLocationOptions, "Other"];

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const mapProjectsFromAPI = (projects) => {
    return (projects || []).map((p) => ({
      projectTitle: p.project_title || "",
      projectDescription: p.project_description || "",
      projectLink: p.project_link || "",
      skills: p.skills || [],
    }));
  };

  const mapAchievementsFromAPI = (achievements) => {
    return (achievements || []).map((a) => ({
      achievementTitle: a.achievement_title || "",
      achievementDescription: a.achievement_description || "",
      achievementLink: a.achievement_link || "",
      achievementDate: a.achievement_date || "",
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/student/complete-profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Profile fetch response:", res.data);
        if (res.data.success) {
          const s = res.data.data.student;
          if (s.profileImage) setPreview(s.profileImage);

          const formatDateForInput = (dateString) => {
            if (!dateString) return "";
            try {
              const date = new Date(dateString);
              if (isNaN(date.getTime())) return "";
              return date.toISOString().split("T")[0];
            } catch (e) {
              return "";
            }
          };

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
            dateOfBirth: formatDateForInput(s.dateOfBirth),
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

          setProjects(mapProjectsFromAPI(s.projects));
          setAchievements(mapAchievementsFromAPI(s.achievements));
          setWorkExperiences(s.workExperiences || []);
          console.log("Profile loaded successfully");
        } else {
          showToast(res.data.message || "Failed to load profile", "error");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        console.error("Error response:", err.response?.data);
        showToast("Failed to load profile. Please try again.", "error");
        try {
          const token = localStorage.getItem("token");
          const basicRes = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (basicRes.data.success) {
            const s = basicRes.data.data.student;
            setPreview(s.profileImage);
            setFormData((prev) => ({
              ...prev,
              firstName: s.firstName || "",
              lastName: s.lastName || "",
              email: s.email || "",
              phone: s.phone || "",
              batchMonth: s.batchMonth || "",
              batchYear: s.batchYear || "",
              isCurrentBatch: s.isCurrentBatch || false,
            }));
          }
        } catch (basicErr) {
          console.error("Basic profile fetch also failed:", basicErr);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle body scroll locking for mobile bottom sheet
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileModalOpen]);

  // Handle auto-closing the modal if screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileModalOpen) {
        setIsMobileModalOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size should be less than 5MB", "error");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showToast("Please select an image file", "error");
        return;
      }
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setIsImageUploading(true);
    showToast("Uploading image...", "info");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await axios.put(
        `${API_BASE_URL}/api/student/update-profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        showToast("Profile image updated successfully!", "success");
        if (response.data.data?.profileImage) {
          setPreview(response.data.data.profileImage);
        }
        setProfileImage(null);
      } else {
        showToast(response.data.message || "Failed to update profile image", "error");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      showToast(
        error.response?.data?.message || error.message || "Error uploading image",
        "error"
      );
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${API_BASE_URL}/api/student/complete-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success && res.data.data.student.profileImage) {
          setPreview(res.data.data.student.profileImage);
        }
      } catch (refreshError) {
        console.error("Failed to refresh profile:", refreshError);
      }
    } finally {
      setIsImageUploading(false);
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

  const addNewWorkExperience = () => {
    setWorkExperiences((prev) => [
      ...prev,
      {
        company_name: "",
        job_role: "",
        start_date: "",
        end_date: "",
        is_current: false,
        job_type: "",
        job_sector: "",
        key_skills: [],
        work_location: "",
        role_description: "",
        achievements: "",
      },
    ]);
  };

  const updateWorkExperience = (index, field, value) => {
    setWorkExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    );
  };

  const updateWorkExperienceMultiSelect = (index, event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    updateWorkExperience(index, "key_skills", selected);
  };

  const removeWorkExperience = (index) => {
    setWorkExperiences((prev) => prev.filter((_, i) => i !== index));
    showToast("Work experience removed", "info");
  };

  const addNewProject = () => {
    setProjects((prev) => [
      ...prev,
      { projectTitle: "", projectDescription: "", projectLink: "", skills: [] },
    ]);
  };

  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, i) => (i === index ? { ...project, [field]: value } : project))
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
    showToast("Project removed", "info");
  };

  const addNewAchievement = () => {
    setAchievements((prev) => [
      ...prev,
      { achievementTitle: "", achievementDescription: "", achievementLink: "", achievementDate: "" },
    ]);
  };

  const updateAchievement = (index, field, value) => {
    setAchievements((prev) =>
      prev.map((achievement, i) => (i === index ? { ...achievement, [field]: value } : achievement))
    );
  };

  const removeAchievement = (index) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
    showToast("Achievement removed", "info");
  };

  const cleanFormData = (data) => {
    const cleaned = { ...data };
    const integerFields = ["batchYear","bachelorStartYear","bachelorEndYear","bachelorInstitutePincode","postalCode"];
    const numericFields = ["tenthMarks","twelfthMarks","bachelorCgpa"];
    const dateFields = ["dateOfBirth"];
    const booleanFields = ["hasLaptop","hasWorkExperience","isCurrentBatch"];
    const arrayFields = ["preferredLanguages","technicalSkills","preferredJobLocations"];

    integerFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      } else if (typeof cleaned[field] === "string") {
        const numericValue = cleaned[field].replace(/[^\d.]/g, "");
        const intValue = parseInt(numericValue);
        cleaned[field] = isNaN(intValue) ? null : intValue;
      }
    });

    numericFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      }
    });

    dateFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = null;
      }
    });

    booleanFields.forEach((field) => {
      if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
        cleaned[field] = false;
      } else if (typeof cleaned[field] === "string") {
        cleaned[field] = cleaned[field] === "true";
      }
    });

    arrayFields.forEach((field) => {
      if (!cleaned[field] || cleaned[field] === "") {
        cleaned[field] = [];
      } else if (typeof cleaned[field] === "string") {
        try {
          const parsed = JSON.parse(cleaned[field]);
          cleaned[field] = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          cleaned[field] = cleaned[field].split(",").map((item) => item.trim()).filter((item) => item);
        }
      }
    });

    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      const cleanedProjects = projects.map((project) => ({
        ...project,
        skills: Array.isArray(project.skills) ? project.skills : [],
      }));
      const cleanedAchievements = achievements.map((achievement) => ({
        ...achievement,
        achievementDate: achievement.achievementDate || null,
      }));
      const cleanedWorkExperiences = workExperiences.map((exp) => ({
        ...exp,
        key_skills: Array.isArray(exp.key_skills) ? exp.key_skills : [],
      }));

      submitData.append("projects", JSON.stringify(cleanedProjects));
      submitData.append("achievements", JSON.stringify(cleanedAchievements));
      submitData.append("workExperiences", JSON.stringify(cleanedWorkExperiences));

      console.log("Submitting form data...");
      const result = await updateCompleteProfile(submitData);

      if (result?.message) {
        showToast(result.message, "success");
      } else {
        showToast("Profile updated successfully", "success");
      }

      setFormData((prev) => ({ ...prev, password: "" }));
      setEditMode(false);
      setEditingSection(null);

      const token = localStorage.getItem("token");
      const refreshRes = await axios.get(`${API_BASE_URL}/api/student/complete-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (refreshRes.data.success) {
        const s = refreshRes.data.data.student;
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0];
          } catch (e) {
            return "";
          }
        };

        setFormData((prev) => ({
          ...prev,
          dateOfBirth: formatDateForInput(s.dateOfBirth),
          firstName: s.firstName || prev.firstName,
          lastName: s.lastName || prev.lastName,
          phone: s.phone || prev.phone,
          nameOnCertificate: s.nameOnCertificate || prev.nameOnCertificate,
          gender: s.gender || prev.gender,
          preferredLanguages: s.preferredLanguages || prev.preferredLanguages,
          codePlaygroundUsername: s.codePlaygroundUsername || prev.codePlaygroundUsername,
          linkedinProfileUrl: s.linkedinProfileUrl || prev.linkedinProfileUrl,
          githubProfileUrl: s.githubProfileUrl || prev.githubProfileUrl,
          hackerrankProfileUrl: s.hackerrankProfileUrl || prev.hackerrankProfileUrl,
          leetcodeProfileUrl: s.leetcodeProfileUrl || prev.leetcodeProfileUrl,
          parentFirstName: s.parentFirstName || prev.parentFirstName,
          parentLastName: s.parentLastName || prev.parentLastName,
          parentRelation: s.parentRelation || prev.parentRelation,
          addressLine1: s.addressLine1 || prev.addressLine1,
          addressLine2: s.addressLine2 || prev.addressLine2,
          country: s.country || prev.country,
          state: s.state || prev.state,
          district: s.district || prev.district,
          city: s.city || prev.city,
          postalCode: s.postalCode || prev.postalCode,
          currentCodingLevel: s.currentCodingLevel || prev.currentCodingLevel,
          technicalSkills: s.technicalSkills || prev.technicalSkills,
          hasLaptop: s.hasLaptop || prev.hasLaptop,
          jobSearchStatus: s.jobSearchStatus || prev.jobSearchStatus,
          preferredJobLocations: s.preferredJobLocations || prev.preferredJobLocations,
          expectedCtcRange: s.expectedCtcRange || prev.expectedCtcRange,
          preferredTeachingLanguage: s.preferredTeachingLanguage || prev.preferredTeachingLanguage,
          preferredVideoLanguage: s.preferredVideoLanguage || prev.preferredVideoLanguage,
          tenthMarksType: s.tenthMarksType || prev.tenthMarksType,
          tenthMarks: s.tenthMarks || prev.tenthMarks,
          twelfthEducationType: s.twelfthEducationType || prev.twelfthEducationType,
          twelfthMarksType: s.twelfthMarksType || prev.twelfthMarksType,
          twelfthMarks: s.twelfthMarks || prev.twelfthMarks,
          bachelorDegree: s.bachelorDegree || prev.bachelorDegree,
          bachelorBranch: s.bachelorBranch || prev.bachelorBranch,
          bachelorCgpa: s.bachelorCgpa || prev.bachelorCgpa,
          bachelorStartYear: s.bachelorStartYear || prev.bachelorStartYear,
          bachelorEndYear: s.bachelorEndYear || prev.bachelorEndYear,
          bachelorStatus: s.bachelorStatus || prev.bachelorStatus,
          bachelorInstitute: s.bachelorInstitute || prev.bachelorInstitute,
          bachelorInstituteState: s.bachelorInstituteState || prev.bachelorInstituteState,
          bachelorInstituteCity: s.bachelorInstituteCity || prev.bachelorInstituteCity,
          bachelorInstitutePincode: s.bachelorInstitutePincode || prev.bachelorInstitutePincode,
          bachelorInstituteDistrict: s.bachelorInstituteDistrict || prev.bachelorInstituteDistrict,
          occupationStatus: s.occupationStatus || prev.occupationStatus,
          hasWorkExperience: s.hasWorkExperience || prev.hasWorkExperience,
        }));

        setProjects(mapProjectsFromAPI(s.projects));
        setAchievements(mapAchievementsFromAPI(s.achievements));
        setWorkExperiences(s.workExperiences || []);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      showToast(
        "Error updating profile: " + (error.response?.data?.message || error.message),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const startEditSection = (section) => {
    setEditingSection(section);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Not specified";
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "Not specified";
    }
  };

  const formatArray = (array) => {
    if (!array || array.length === 0) return "Not specified";
    return array.join(", ");
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

  const renderField = (label, value, isEditMode, name, type = "text", options = []) => {
    if (isEditMode) {
      if (type === "select") {
        return (
          <div className="form-group">
            <label>{label}</label>
            <select name={name} value={value || ""} onChange={handleChange}>
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      } else if (type === "multi-select") {
        const currentValue = value || [];
        return (
          <div className="form-group full-width">
            <label>{label}</label>
            <select multiple name={name} value={currentValue} onChange={handleMultiSelectChange}>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
          </div>
        );
      } else if (type === "checkbox") {
        return (
          <div className="checkbox-group full-width">
            <label className="checkbox-label">
              <input type="checkbox" name={name} checked={!!value} onChange={handleChange} />
              <span className="checkbox-mark"></span>
              {label}
            </label>
          </div>
        );
      } else if (type === "textarea") {
        return (
          <div className="form-group full-width">
            <label>{label}</label>
            <textarea
              name={name}
              value={value || ""}
              onChange={handleChange}
              rows="3"
              placeholder={`Enter ${label.toLowerCase()}...`}
            />
          </div>
        );
      } else {
        return (
          <div className="form-group">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={value || ""}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="detail-item">
          <span className="detail-label">{label}</span>
          <span className="detail-value">
            {value || value === 0 || value === false ? (
              type === "date" ? formatDate(value)
              : type === "checkbox" ? (value ? "Yes" : "No")
              : type === "array" ? formatArray(value)
              : value.toString()
            ) : (
              <span className="not-specified">—</span>
            )}
          </span>
        </div>
      );
    }
  };

  const renderBasicInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Basic Information</h3>
          <p>Your essential profile details</p>
        </div>
        {!editMode && editingSection !== "basic" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("basic")}>Edit</button>
        )}
        {editingSection === "basic" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "basic" ? "edit-mode" : "view-mode"}`}>
        {renderField("First Name", formData.firstName, editMode && editingSection === "basic", "firstName")}
        {renderField("Last Name", formData.lastName, editMode && editingSection === "basic", "lastName")}
        {renderField("Email Address", formData.email, editMode && editingSection === "basic", "email", "email")}
        {renderField("Phone Number", formData.phone, editMode && editingSection === "basic", "phone", "tel")}
        {renderField("Batch Year", formData.batchYear, false, "batchYear", "number")}
        {renderField("Batch Month", formData.batchMonth, false, "batchMonth")}
        {editMode && editingSection === "basic" && renderField("New Password (Optional)", formData.password, true, "password", "password")}
        {renderField("Current Batch Student", formData.isCurrentBatch, editMode && editingSection === "basic", "isCurrentBatch", "checkbox")}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Personal Details</h3>
          <p>Personal information and social profiles</p>
        </div>
        {!editMode && editingSection !== "personal" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("personal")}>Edit</button>
        )}
        {editingSection === "personal" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "personal" ? "edit-mode" : "view-mode"}`}>
        {renderField("Name on Certificate", formData.nameOnCertificate, editMode && editingSection === "personal", "nameOnCertificate")}
        {renderField("Gender", formData.gender, editMode && editingSection === "personal", "gender", "select", ["Male","Female","Transgender","Other"])}
        {renderField("Preferred Languages", formData.preferredLanguages, editMode && editingSection === "personal", "preferredLanguages", "multi-select", languageOptions)}
        {renderField("Date of Birth", formData.dateOfBirth, editMode && editingSection === "personal", "dateOfBirth", "date")}
        {renderField("Code Playground Username", formData.codePlaygroundUsername, editMode && editingSection === "personal", "codePlaygroundUsername")}
        {renderField("LinkedIn URL", formData.linkedinProfileUrl, editMode && editingSection === "personal", "linkedinProfileUrl", "url")}
        {renderField("GitHub URL", formData.githubProfileUrl, editMode && editingSection === "personal", "githubProfileUrl", "url")}
        {renderField("HackerRank URL", formData.hackerrankProfileUrl, editMode && editingSection === "personal", "hackerrankProfileUrl", "url")}
        {renderField("LeetCode URL", formData.leetcodeProfileUrl, editMode && editingSection === "personal", "leetcodeProfileUrl", "url")}
      </div>
    </div>
  );

  const renderParentInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Guardian Information</h3>
          <p>Emergency contact details</p>
        </div>
        {!editMode && editingSection !== "parent" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("parent")}>Edit</button>
        )}
        {editingSection === "parent" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "parent" ? "edit-mode" : "view-mode"}`}>
        {renderField("Parent First Name", formData.parentFirstName, editMode && editingSection === "parent", "parentFirstName")}
        {renderField("Parent Last Name", formData.parentLastName, editMode && editingSection === "parent", "parentLastName")}
        {renderField("Relation", formData.parentRelation, editMode && editingSection === "parent", "parentRelation")}
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Current Address</h3>
          <p>Your residential address</p>
        </div>
        {!editMode && editingSection !== "address" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("address")}>Edit</button>
        )}
        {editingSection === "address" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "address" ? "edit-mode" : "view-mode"}`}>
        {renderField("Address Line 1", formData.addressLine1, editMode && editingSection === "address", "addressLine1")}
        {renderField("Address Line 2", formData.addressLine2, editMode && editingSection === "address", "addressLine2")}
        {renderField("Country", formData.country, editMode && editingSection === "address", "country")}
        {renderField("State", formData.state, editMode && editingSection === "address", "state")}
        {renderField("District", formData.district, editMode && editingSection === "address", "district")}
        {renderField("City", formData.city, editMode && editingSection === "address", "city")}
        {renderField("Postal Code", formData.postalCode, editMode && editingSection === "address", "postalCode")}
      </div>
    </div>
  );

  const renderExpertiseInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Technical Expertise</h3>
          <p>Your skills and technical capabilities</p>
        </div>
        {!editMode && editingSection !== "expertise" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("expertise")}>Edit</button>
        )}
        {editingSection === "expertise" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "expertise" ? "edit-mode" : "view-mode"}`}>
        {renderField("Coding Level", formData.currentCodingLevel, editMode && editingSection === "expertise", "currentCodingLevel", "select", ["Beginner","Intermediate","Advanced"])}
        {renderField("Technical Skills", formData.technicalSkills, editMode && editingSection === "expertise", "technicalSkills", "multi-select", technicalSkillOptions)}
        {renderField("I have a laptop for coding", formData.hasLaptop, editMode && editingSection === "expertise", "hasLaptop", "checkbox")}
      </div>
    </div>
  );

  const renderPreferencesInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Job Preferences</h3>
          <p>Your career preferences and expectations</p>
        </div>
        {!editMode && editingSection !== "preferences" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("preferences")}>Edit</button>
        )}
        {editingSection === "preferences" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`form-grid ${editMode && editingSection === "preferences" ? "edit-mode" : "view-mode"}`}>
        {renderField("Job Search Status", formData.jobSearchStatus, editMode && editingSection === "preferences", "jobSearchStatus", "select", ["Actively looking","Open to offers","Not looking"])}
        {renderField("Preferred Job Locations", formData.preferredJobLocations, editMode && editingSection === "preferences", "preferredJobLocations", "multi-select", jobLocationOptions)}
        {renderField("Expected CTC Range", formData.expectedCtcRange, editMode && editingSection === "preferences", "expectedCtcRange")}
        {renderField("Preferred Teaching Language", formData.preferredTeachingLanguage, editMode && editingSection === "preferences", "preferredTeachingLanguage")}
        {renderField("Preferred Video Language", formData.preferredVideoLanguage, editMode && editingSection === "preferences", "preferredVideoLanguage")}
      </div>
    </div>
  );

  const renderEducationInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Education Details</h3>
          <p>Your academic qualifications</p>
        </div>
        {!editMode && editingSection !== "education" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("education")}>Edit</button>
        )}
        {editingSection === "education" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      <div className={`education-grid ${editMode && editingSection === "education" ? "edit-mode" : "view-mode"}`}>
        <div className="education-level">
          <h4>10th Grade</h4>
          <div className="form-grid">
            {renderField("Marks Type", formData.tenthMarksType, editMode && editingSection === "education", "tenthMarksType", "select", ["CGPA","Percentage"])}
            {renderField("Marks", formData.tenthMarks, editMode && editingSection === "education", "tenthMarks")}
          </div>
        </div>
        <div className="education-level">
          <h4>12th Grade</h4>
          <div className="form-grid">
            {renderField("Education Type", formData.twelfthEducationType, editMode && editingSection === "education", "twelfthEducationType")}
            {renderField("Marks Type", formData.twelfthMarksType, editMode && editingSection === "education", "twelfthMarksType", "select", ["CGPA","Percentage"])}
            {renderField("Marks", formData.twelfthMarks, editMode && editingSection === "education", "twelfthMarks")}
          </div>
        </div>
        <div className="education-level">
          <h4>Bachelor's Degree</h4>
          <div className="form-grid">
            {renderField("Degree", formData.bachelorDegree, editMode && editingSection === "education", "bachelorDegree")}
            {renderField("Branch", formData.bachelorBranch, editMode && editingSection === "education", "bachelorBranch")}
            {renderField("CGPA / Percentage", formData.bachelorCgpa, editMode && editingSection === "education", "bachelorCgpa")}
            {renderField("Status", formData.bachelorStatus, editMode && editingSection === "education", "bachelorStatus", "select", ["Completed","Pursuing","Discontinued"])}
            {renderField("Start Year", formData.bachelorStartYear, editMode && editingSection === "education", "bachelorStartYear", "number")}
            {renderField("End Year", formData.bachelorEndYear, editMode && editingSection === "education", "bachelorEndYear", "number")}
            {renderField("Institute", formData.bachelorInstitute, editMode && editingSection === "education", "bachelorInstitute")}
            {renderField("Institute State", formData.bachelorInstituteState, editMode && editingSection === "education", "bachelorInstituteState")}
            {renderField("Institute City", formData.bachelorInstituteCity, editMode && editingSection === "education", "bachelorInstituteCity")}
            {renderField("Institute District", formData.bachelorInstituteDistrict, editMode && editingSection === "education", "bachelorInstituteDistrict")}
            {renderField("Institute Pincode", formData.bachelorInstitutePincode, editMode && editingSection === "education", "bachelorInstitutePincode")}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Work Experience</h3>
          <p>Your professional background</p>
        </div>
        {!editMode && editingSection !== "work" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("work")}>Edit</button>
        )}
        {editingSection === "work" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>

      {editMode && editingSection === "work" ? (
        <>
          <div className="form-gri-compd">
            <div>
              {renderField("Occupation Status", formData.occupationStatus, true, "occupationStatus", "select", ["Student","Employed","Unemployed","Freelancer"])}
            </div>
            <div className="form-group full-width">
              <label>Do you have professional work experience?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="hasWorkExperience"
                    value="true"
                    checked={formData.hasWorkExperience === true}
                    onChange={() => setFormData((prev) => ({ ...prev, hasWorkExperience: true }))}
                  />
                  <span className="radio-mark"></span>
                  Yes, I have work experience
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="hasWorkExperience"
                    value="false"
                    checked={formData.hasWorkExperience === false}
                    onChange={() => setFormData((prev) => ({ ...prev, hasWorkExperience: false }))}
                  />
                  <span className="radio-mark"></span>
                  No, I don't have work experience
                </label>
              </div>
            </div>
          </div>

          {formData.hasWorkExperience ? (
            <>
              {workExperiences.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">💼</div>
                  <h4>No work experience added yet</h4>
                  <p>Click the button below to add your first experience.</p>
                </div>
              ) : (
                <div className="items-list">
                  {workExperiences.map((exp, index) => (
                    <div key={index} className="item-card">
                      <div className="item-header">
                        <h5>Experience #{index + 1}</h5>
                        <button type="button" onClick={() => removeWorkExperience(index)} className="btn-remove">
                          Remove
                        </button>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input type="text" value={exp.company_name || ""} onChange={(e) => updateWorkExperience(index, "company_name", e.target.value)} placeholder="e.g., Google, Internshala" />
                        </div>
                        <div className="form-group">
                          <label>Job Role</label>
                          <input type="text" value={exp.job_role || ""} onChange={(e) => updateWorkExperience(index, "job_role", e.target.value)} placeholder="e.g., Frontend Developer" />
                        </div>
                        <div className="form-group">
                          <label>Start Date</label>
                          <input type="date" value={exp.start_date || ""} onChange={(e) => updateWorkExperience(index, "start_date", e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>End Date</label>
                          <input type="date" value={exp.end_date || ""} onChange={(e) => updateWorkExperience(index, "end_date", e.target.value)} disabled={exp.is_current} />
                        </div>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input type="checkbox" checked={exp.is_current || false} onChange={(e) => updateWorkExperience(index, "is_current", e.target.checked)} />
                            <span className="checkbox-mark"></span>
                            I am currently working in this role
                          </label>
                        </div>
                        <div className="form-group">
                          <label>Job Type</label>
                          <select value={exp.job_type || ""} onChange={(e) => updateWorkExperience(index, "job_type", e.target.value)}>
                            <option value="">Select</option>
                            {jobTypeOptions.map((type) => (<option key={type} value={type}>{type}</option>))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Job Sector</label>
                          <select value={exp.job_sector || ""} onChange={(e) => updateWorkExperience(index, "job_sector", e.target.value)}>
                            <option value="">Select</option>
                            {jobSectorOptions.map((sector) => (<option key={sector} value={sector}>{sector}</option>))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Work Location</label>
                          <select value={exp.work_location || ""} onChange={(e) => updateWorkExperience(index, "work_location", e.target.value)}>
                            <option value="">Select</option>
                            {workLocationOptions.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
                          </select>
                        </div>
                        <div className="form-group full-width">
                          <label>Key Skills Used</label>
                          <select multiple value={exp.key_skills || []} onChange={(e) => updateWorkExperienceMultiSelect(index, e)}>
                            {technicalSkillOptions.map((skill) => (<option key={skill} value={skill}>{skill}</option>))}
                          </select>
                          <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
                        </div>
                        <div className="form-group full-width">
                          <label>Role Description</label>
                          <textarea value={exp.role_description || ""} onChange={(e) => updateWorkExperience(index, "role_description", e.target.value)} rows="3" placeholder="Describe your responsibilities and work..." />
                        </div>
                        <div className="form-group full-width">
                          <label>Achievements</label>
                          <textarea value={exp.achievements || ""} onChange={(e) => updateWorkExperience(index, "achievements", e.target.value)} rows="2" placeholder="Mention any achievements, awards, or notable outcomes (type NA if none)" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button type="button" onClick={addNewWorkExperience} className="btn-add">
                + Add Experience
              </button>
            </>
          ) : (
            <div className="info-message"><p></p></div>
          )}
        </>
      ) : (
        <>
          <div className="form-grid view-mode">
            {renderField("Occupation Status", formData.occupationStatus, false, "occupationStatus", "select", ["Student","Employed","Unemployed","Freelancer"])}
            {renderField("Has Work Experience", formData.hasWorkExperience ? "Yes" : "No", false, "hasWorkExperience", "text")}
          </div>
          {formData.hasWorkExperience && workExperiences.length > 0 ? (
            <div className="work-view">
              {workExperiences.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="experience-header">
                    <h5>{exp.company_name || "Company"}</h5>
                    <span className="experience-badge">#{index + 1}</span>
                  </div>
                  <div className="experience-details">
                    <p className="experience-role"><strong>{exp.job_role || "Role"}</strong></p>
                    <p className="experience-dates">
                      {exp.start_date ? formatDate(exp.start_date) : "Start"} –{" "}
                      {exp.is_current ? "Present" : exp.end_date ? formatDate(exp.end_date) : "End"}
                    </p>
                    {exp.job_type && <p>Type: {exp.job_type}</p>}
                    {exp.job_sector && <p>Sector: {exp.job_sector}</p>}
                    {exp.work_location && <p>Location: {exp.work_location}</p>}
                    {exp.key_skills && exp.key_skills.length > 0 && (
                      <div className="experience-skills">
                        <span className="skills-label">Skills:</span>
                        <div className="skills-tags">
                          {exp.key_skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {exp.role_description && <p className="experience-description">{exp.role_description}</p>}
                    {exp.achievements && (
                      <div className="experience-achievements">
                        <span className="achievements-label">Achievements:</span>
                        <p>{exp.achievements}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : formData.hasWorkExperience ? (
            <div className="empty-state">
              <div className="empty-icon">💼</div>
              <h4>No work experience details added</h4>
              <p>Edit the section to add your experiences.</p>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💼</div>
              <h4>No work experience indicated</h4>
              <p>The student has indicated no professional work experience.</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderProjectsInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Projects</h3>
          <p>Showcase your work and projects</p>
        </div>
        {!editMode && editingSection !== "projects" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("projects")}>Edit</button>
        )}
        {editingSection === "projects" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      {editMode && editingSection === "projects" ? (
        <>
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
                    <button type="button" onClick={() => removeProject(index)} className="btn-remove">Remove</button>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Project Title</label>
                      <input type="text" value={project.projectTitle || ""} onChange={(e) => updateProject(index, "projectTitle", e.target.value)} placeholder="Enter project title" />
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea value={project.projectDescription || ""} onChange={(e) => updateProject(index, "projectDescription", e.target.value)} rows="3" placeholder="Describe your project..." />
                    </div>
                    <div className="form-group">
                      <label>Project Link</label>
                      <input type="url" value={project.projectLink || ""} onChange={(e) => updateProject(index, "projectLink", e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="form-group full-width">
                      <label>Skills Used</label>
                      <select multiple value={project.skills || []} onChange={(e) => updateProjectMultiSelect(index, e)}>
                        {technicalSkillOptions.map((skill) => (<option key={skill} value={skill}>{skill}</option>))}
                      </select>
                      <span className="form-hint">Hold Ctrl/Cmd to select multiple</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button type="button" onClick={addNewProject} className="btn-add">+ Add Project</button>
        </>
      ) : (
        <>
          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h4>No projects added yet</h4>
              <p>Start by adding your first project to showcase your skills</p>
            </div>
          ) : (
            <div className="projects-view">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h5>{project.projectTitle || `Project #${index + 1}`}</h5>
                    <span className="project-badge">#{index + 1}</span>
                  </div>
                  <p className="project-description">{project.projectDescription || "No description provided"}</p>
                  {project.projectLink && (
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="project-link">🔗 View Project</a>
                  )}
                  {project.skills && project.skills.length > 0 && (
                    <div className="project-skills">
                      <span className="skills-label">Skills:</span>
                      <div className="skills-tags">
                        {project.skills.map((skill, idx) => (<span key={idx} className="skill-tag">{skill}</span>))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderAchievementsInfo = () => (
    <div className="form-section">
      <div className="section-header">
        <div className="section-header-text">
          <h3>Achievements</h3>
          <p>Your accomplishments and certifications</p>
        </div>
        {!editMode && editingSection !== "achievements" && (
          <button type="button" className="btn-edit" onClick={() => startEditSection("achievements")}>Edit</button>
        )}
        {editingSection === "achievements" && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
      {editMode && editingSection === "achievements" ? (
        <>
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
                    <button type="button" onClick={() => removeAchievement(index)} className="btn-remove">Remove</button>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Title</label>
                      <input type="text" value={ach.achievementTitle || ""} onChange={(e) => updateAchievement(index, "achievementTitle", e.target.value)} placeholder="Enter achievement title" />
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea value={ach.achievementDescription || ""} onChange={(e) => updateAchievement(index, "achievementDescription", e.target.value)} rows="2" placeholder="Describe your achievement..." />
                    </div>
                    <div className="form-group">
                      <label>Link</label>
                      <input type="url" value={ach.achievementLink || ""} onChange={(e) => updateAchievement(index, "achievementLink", e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" value={ach.achievementDate || ""} onChange={(e) => updateAchievement(index, "achievementDate", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button type="button" onClick={addNewAchievement} className="btn-add">+ Add Achievement</button>
        </>
      ) : (
        <>
          {achievements.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⭐</div>
              <h4>No achievements added yet</h4>
              <p>Add your achievements, certifications, or awards</p>
            </div>
          ) : (
            <div className="achievements-view">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-header">
                    <h5>{achievement.achievementTitle || `Achievement #${index + 1}`}</h5>
                    <span className="achievement-date">{achievement.achievementDate ? formatDate(achievement.achievementDate) : "No date"}</span>
                  </div>
                  <p className="achievement-description">{achievement.achievementDescription || "No description provided"}</p>
                  {achievement.achievementLink && (
                    <a href={achievement.achievementLink} target="_blank" rel="noopener noreferrer" className="achievement-link">🔗 View Achievement</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "basic": return renderBasicInfo();
      case "personal": return renderPersonalInfo();
      case "parent": return renderParentInfo();
      case "address": return renderAddressInfo();
      case "expertise": return renderExpertiseInfo();
      case "preferences": return renderPreferencesInfo();
      case "education": return renderEducationInfo();
      case "work": return renderWorkInfo();
      case "projects": return renderProjectsInfo();
      case "achievements": return renderAchievementsInfo();
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="complete-profile-update">
      {/* Toast */}
      <div className={`toast-container ${toast.visible ? "visible" : ""}`}>
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" && "✅"}
            {toast.type === "error" && "❌"}
            {toast.type === "info" && "ℹ️"}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={hideToast}>×</button>
        </div>
      </div>

      <div className="profile-wrapper">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="sidebar-profile-card">
            <div className="profile-image-container">
              {preview ? (
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Profile"
                  className="profile-image"
                  onClick={handleImageClick}
                />
              ) : (
                <div className="profile-avatar" onClick={handleImageClick}>
                  {formData.firstName?.charAt(0) || "U"}
                  {formData.lastName?.charAt(0) || "S"}
                </div>
              )}
              <div className="image-overlay" onClick={handleImageClick}>
                <span>Change Photo</span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="sidebar-profile-info">
              <h3>{formData.firstName || "User"} {formData.lastName || ""}</h3>
              <p className="sidebar-email">{formData.email || "No email"}</p>
              {isImageUploading && (
                <div className="image-upload-progress">
                  <span className="upload-spinner"></span>
                  Uploading...
                </div>
              )}
            </div>
          </div>

          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`nav-item ${activeSection === section.id ? "active" : ""}`}
                onClick={() => {
                  setActiveSection(section.id);
                  setEditMode(false);
                  setEditingSection(null);
                  // Only open mobile bottom sheet on small screens
                  if (window.innerWidth <= 1024) {
                    setIsMobileModalOpen(true);
                  }
                }}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
                {activeSection === section.id && <span className="nav-indicator"></span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Overlay */}
        <div 
          className={`mobile-overlay ${isMobileModalOpen ? "active" : ""}`}
          onClick={() => setIsMobileModalOpen(false)}
        ></div>

        {/* Main Content */}
        <div className={`profile-main ${isMobileModalOpen ? "mobile-open" : ""}`}>
          <div className="mobile-drag-handle" onClick={() => setIsMobileModalOpen(false)}></div>
          <form onSubmit={handleSubmit} className="profile-form">
            {renderSection()}
            {editMode && editingSection && (
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-submit-profile ${loading ? "loading" : ""}`}
                >
                  {loading ? (
                    <><span className="btn-spinner"></span> Saving...</>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileUpdate;