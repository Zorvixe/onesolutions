import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../Footer/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import { javascriptCodingPracticesData } from "../../codingPracticesData/javascriptCodingPracticesData";
import { useAuth } from "../../context/AuthContext";
import DescriptionToggle from "../DescriptionToggle/DescriptionToggle";
import CodingPracticeService from "../../services/codingPracticeService";

// Import AiApp component
import AiApp from "../AiApp/AiApp";
// import AiApp from "../AiApp/AiApp";

const API_OSE_URL = process.env.REACT_APP_API_OSE_URL;

const Home = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [practiceData, setPracticeData] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [placementAchievements, setPlacementAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [progressLoading, setProgressLoading] = useState(false);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(null);

  // State for AI app
  const [isAiAppOpen, setIsAiAppOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch live classes from backend with batch filtering
  const fetchLiveClasses = async () => {
    try {
      const batchMonth = user?.batchMonth;
      const batchYear = user?.batchYear;

      let url = `${API_OSE_URL}api/live-classes`;

      if (batchMonth && batchYear) {
        url += `?batch_month=${batchMonth}&batch_year=${batchYear}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        // Sort live classes: live first, then upcoming, then completed
        // Within each status, sort by time (most recent first)
        const sortedData = data.sort((a, b) => {
          // Priority: live > upcoming > completed
          const statusPriority = {
            live: 1,
            upcoming: 2,
            completed: 3,
          };

          if (statusPriority[a.status] !== statusPriority[b.status]) {
            return statusPriority[a.status] - statusPriority[b.status];
          }

          // If same status, sort by time (most recent first)
          // Assuming time is in format "HH:MM AM/PM"
          const convertTimeToMinutes = (timeStr) => {
            if (!timeStr) return 0;
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);

            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes;
          };

          return convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time);
        });

        setLiveClasses(sortedData);
      } else {
        console.error("Failed to fetch live classes");
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch placement achievements from backend
  const fetchPlacementAchievements = async () => {
    try {
      const response = await fetch(`${API_OSE_URL}api/placement-achievements`);
      if (response.ok) {
        const data = await response.json();

        // Sort placement achievements by most recent first
        // Assuming there's a date field like "created_at" or "placement_date"
        const sortedData = data.sort((a, b) => {
          // If there's a timestamp field
          if (a.created_at && b.created_at) {
            return new Date(b.created_at) - new Date(a.created_at);
          }

          // If there's a date field
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }

          // If there's an id that indicates recency (higher id = more recent)
          if (a.id && b.id) {
            return b.id - a.id;
          }

          return 0;
        });

        setPlacementAchievements(sortedData);
      } else {
        console.error("Failed to fetch placement achievements");
      }
    } catch (error) {
      console.error("Error fetching placement achievements:", error);
    } finally {
      setAchievementsLoading(false);
    }
  };

  // Load user progress from backend API (same as Practice component)
  const fetchUserProgress = async () => {
    // Don't fetch if already loading

    try {
      const response = await CodingPracticeService.getAllProgress();
      if (response.success) {
        const progressMap = {};
        response.data.progress.forEach((prog) => {
          progressMap[prog.question_id] = {
            status: prog.status,
            code: prog.code,
            score: prog.score,
            attempts: prog.attempts || [],
            lastAttempt: prog.last_attempt,
          };
        });
        setUserProgress(progressMap);
        setLastProgressUpdate(Date.now());

        // Also update localStorage for consistency
        localStorage.setItem(
          "codingPracticeProgress",
          JSON.stringify(progressMap)
        );
      } else {
        console.error("Failed to fetch progress from backend");
        // Fallback to localStorage if backend fails
        const savedProgress = localStorage.getItem("codingPracticeProgress");
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress));
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      // Fallback to localStorage if backend fails
      const savedProgress = localStorage.getItem("codingPracticeProgress");
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    } finally {
      setProgressLoading(false);
    }
  };

  // Merge JavaScript practices with existing data
  const allCodingPracticesData = React.useMemo(() => {
    const mergedData = { ...codingPracticesData };

    if (
      javascriptCodingPracticesData &&
      javascriptCodingPracticesData.javascript
    ) {
      mergedData.javascript = javascriptCodingPracticesData.javascript;
    }

    return mergedData;
  }, []);

  // Get language-specific title
  const getLanguageSpecificTitle = (language, difficulty) => {
    const languageNames = {
      python: "Python",
      javascript: "JavaScript",
      java: "Java",
      sql: "SQL",
    };

    const languageName = languageNames[language] || language;

    const difficultyTitles = {
      easy: {
        python: "Python Fundamentals",
        javascript: "JavaScript Essentials",
        java: "Java Basics",
        sql: "SQL Fundamentals",
      },
      medium: {
        python: "Python Intermediate Challenges",
        javascript: "JavaScript Intermediate Challenges",
        java: "Java Intermediate Challenges",
        sql: "SQL Intermediate Challenges",
      },
      hard: {
        python: "Advanced Python Problems",
        javascript: "Advanced JavaScript Problems",
        java: "Advanced Java Problems",
        sql: "Advanced SQL Problems",
      },
    };

    return (
      difficultyTitles[difficulty]?.[language] ||
      `${languageName} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenge`
    );
  };

  // Get challenge description
  const getChallengeDescription = (difficulty) => {
    const descriptions = {
      easy: "Beginner Challenge",
      medium: "Intermediate Challenge",
      hard: "Advanced Challenge",
    };
    return descriptions[difficulty] || `${difficulty} Challenge`;
  };

  // Get difficulty colors
  const getDifficultyColors = (difficulty) => {
    const colors = {
      easy: {
        backgroundColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        progressColor: "#7272fcff",
      },
      medium: {
        backgroundColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        progressColor: "#d43b8cff",
      },
      hard: {
        backgroundColor: "#cdf9ed75",
        iconColor: "#078866ff",
        progressColor: "#078866ff",
      },
    };
    return colors[difficulty] || colors.easy;
  };

  // Process practice data for selected language
  useEffect(() => {
    const processPracticeData = () => {
      if (!allCodingPracticesData[selectedLanguage]) {
        setPracticeData([]);
        return;
      }

      const difficultyGroups = {
        easy: {
          questions: [],
        },
        medium: {
          questions: [],
        },
        hard: {
          questions: [],
        },
      };

      // Collect all questions from selected language practices and group by difficulty
      allCodingPracticesData[selectedLanguage].forEach((practice) => {
        practice.questions.forEach((question) => {
          const difficulty = question.difficulty.toLowerCase();
          if (difficultyGroups[difficulty]) {
            difficultyGroups[difficulty].questions.push({
              ...question,
              language: selectedLanguage,
              practiceId: practice.id,
            });
          }
        });
      });

      // Calculate progress for each difficulty group
      const practiceCards = Object.keys(difficultyGroups)
        .filter(
          (difficulty) => difficultyGroups[difficulty].questions.length > 0
        )
        .map((difficulty) => {
          const group = difficultyGroups[difficulty];
          const totalQuestions = group.questions.length;
          const solvedQuestions = group.questions.filter(
            (question) => userProgress[question.id]?.status === "solved"
          ).length;
          const progress =
            totalQuestions > 0
              ? Math.round((solvedQuestions / totalQuestions) * 100)
              : 0;

          const colors = getDifficultyColors(difficulty);

          return {
            id: `${selectedLanguage}-${difficulty}-challenge`,
            title: getLanguageSpecificTitle(selectedLanguage, difficulty),
            challenge: getChallengeDescription(difficulty),
            progress: `${progress}%`,
            numericProgress: progress,
            problems: totalQuestions,
            backgroundColor: colors.backgroundColor,
            iconColor: colors.iconColor,
            progressColor: colors.progressColor,
            difficulty: difficulty,
            language: selectedLanguage,
            questions: group.questions,
          };
        });

      // Sort practice cards by progress (most progress first)
      // If same progress, sort by difficulty: easy -> medium -> hard
      const sortedPracticeCards = practiceCards.sort((a, b) => {
        // First sort by progress (descending - higher progress first)
        if (b.numericProgress !== a.numericProgress) {
          return b.numericProgress - a.numericProgress;
        }

        // Then sort by difficulty order: easy -> medium -> hard
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });

      setPracticeData(sortedPracticeCards);
    };

    processPracticeData();
  }, [userProgress, selectedLanguage, allCodingPracticesData]);

  // Initial data fetch
  useEffect(() => {
    fetchLiveClasses();
    fetchPlacementAchievements();
    fetchUserProgress(); // Fetch progress on initial load

    // Only poll live classes, not progress
    const liveClassesInterval = setInterval(fetchLiveClasses, 60000);

    return () => {
      clearInterval(liveClassesInterval);
    };
  }, [user]);

  // Listen for storage events to update progress when Practice component updates localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "codingPracticeProgress") {
        try {
          const newProgress = JSON.parse(e.newValue || "{}");
          setUserProgress(newProgress);
          setLastProgressUpdate(Date.now());
        } catch (error) {
          console.error("Error parsing progress from storage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Listen for custom event when practice is completed in Practice component
  useEffect(() => {
    const handlePracticeCompleted = () => {
      // Fetch updated progress after a short delay to allow backend to update
      setTimeout(() => {
        fetchUserProgress();
      }, 1000);
    };

    window.addEventListener("practiceCompleted", handlePracticeCompleted);

    return () => {
      window.removeEventListener("practiceCompleted", handlePracticeCompleted);
    };
  }, []);

  // Poll for progress updates less frequently (every 60 seconds instead of 10)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      // Only fetch if it's been at least 30 seconds since last update
      if (lastProgressUpdate && Date.now() - lastProgressUpdate > 30000) {
        fetchUserProgress();
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(progressInterval);
  }, [lastProgressUpdate]);

  // Only fetch progress on focus if it's been a while
  useEffect(() => {
    const handleFocus = () => {
      // Only fetch if it's been more than 30 seconds since last update
      if (!lastProgressUpdate || Date.now() - lastProgressUpdate > 30000) {
        fetchUserProgress();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [lastProgressUpdate]);

  const homeData = {
    BroOne: {
      title: "BroOne: Your Learning Ally at OneSolutions",
      description:
        "Unlock your potential with BroOne - your mentor, friend, coach, guide, and companion. Available 24/7 to support your journey, from learning to career success",
      image: "/assets/BroOneImg.png",
    },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return "bi bi-stopwatch";
      case "live":
        return "bi bi-broadcast";
      case "completed":
        return "bi bi-check-circle";
      default:
        return "bi bi-stopwatch";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "#ffa500";
      case "live":
        return "#28a745";
      case "completed":
        return "#6c757d";
      default:
        return "#ffa500";
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handlePracticeClick = (difficulty) => {
    const difficultyGroup = practiceData.find(
      (p) => p.difficulty === difficulty
    );
    if (difficultyGroup && difficultyGroup.questions.length > 0) {
      // Find the first practice that has questions of this difficulty
      let targetPracticeId = null;

      allCodingPracticesData[selectedLanguage].forEach((practice) => {
        if (targetPracticeId) return;
        const hasDifficultyQuestions = practice.questions.some(
          (q) => q.difficulty.toLowerCase() === difficulty
        );
        if (hasDifficultyQuestions) {
          targetPracticeId = practice.id;
        }
      });

      if (targetPracticeId) {
        navigate(`/practice/${targetPracticeId}`);
      }
    }
  };

  const handleViewProblems = (difficulty, e) => {
    e.stopPropagation();
    navigate(`/practice?language=${selectedLanguage}&difficulty=${difficulty}`);
  };

  const handleContinue = (difficulty, e) => {
    e.stopPropagation();
    const difficultyGroup = practiceData.find(
      (p) => p.difficulty === difficulty
    );
    if (difficultyGroup) {
      const unsolvedQuestion = difficultyGroup.questions.find(
        (question) => userProgress[question.id]?.status !== "solved"
      );

      if (unsolvedQuestion) {
        navigate(
          `/practice/${unsolvedQuestion.practiceId}/${unsolvedQuestion.id}`
        );
      } else if (difficultyGroup.questions.length > 0) {
        const firstQuestion = difficultyGroup.questions[0];
        navigate(`/practice/${firstQuestion.practiceId}/${firstQuestion.id}`);
      }
    }
  };

  const handlePrevLanguage = () => {
    const languages = Object.keys(allCodingPracticesData);
    const currentIndex = languages.indexOf(selectedLanguage);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : languages.length - 1;
    setSelectedLanguage(languages[prevIndex]);
  };

  const handleNextLanguage = () => {
    const languages = Object.keys(allCodingPracticesData);
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex =
      currentIndex < languages.length - 1 ? currentIndex + 1 : 0;
    setSelectedLanguage(languages[nextIndex]);
  };

  // AI App functions
  const toggleAiApp = () => {
    setIsAiAppOpen(!isAiAppOpen);
  };

  const closeAiApp = () => {
    setIsAiAppOpen(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="website">
      <div className="BroOne-container">
        <div className="BroOne-container-text">
          <h4>{homeData.BroOne.title}</h4>
          <p>{homeData.BroOne.description}</p>
          <button onClick={toggleAiApp}>Chat with BroOne</button>
        </div>
        <img src={homeData.BroOne.image} alt="BroOne" className="broone_img" />
      </div>

      <h1>Live Classes</h1>
      <div className="live">
        {liveClasses.length > 0 ? (
          liveClasses.map((classItem) => (
            <div key={classItem.id} className="liveclasses-container">
              <div
                className="indicator-bar"
                style={{
                  backgroundColor:
                    classItem.status === "live"
                      ? "#28a745"
                      : classItem.status === "completed"
                        ? "#6c757d"
                        : "#ffa500",
                }}
              ></div>
              <div className="information">
                <div className="class-info">
                  <button className="letter-tag">{classItem.letter}</button>
                  <div className="class-text">
                    <h3>{classItem.name}</h3>
                    <p>Mentor: {classItem.mentor}</p>
                    {classItem.batch_month && classItem.batch_year && (
                      <p className="batch-info">
                        Batch: {classItem.batch_month} {classItem.batch_year}
                      </p>
                    )}
                  </div>
                  <button
                    className="status"
                    style={{
                      backgroundColor: getStatusColor(classItem.status),
                      color: "white",
                      border: "none",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    <i
                      className={getStatusIcon(classItem.status)}
                      style={{ marginRight: "8px" }}
                    ></i>
                    {classItem.status.charAt(0).toUpperCase() +
                      classItem.status.slice(1)}
                  </button>
                </div>
                <div className="progress-time">
                  <div className="row">
                    <p>Progress</p>
                    <p className="highlight">{classItem.progress}</p>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: classItem.progress }}
                    ></div>
                  </div>
                  <div className="row highlights">
                    <p>Class Time</p>
                    <p>{classItem.time}</p>
                  </div>
                </div>
                <div className="actions">
                  <p>
                    <i
                      className="bi bi-question-circle"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Help Desk
                  </p>
                  {classItem.status === "live" && classItem.zoom_link && (
                    <a
                      href={classItem.zoom_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#28a745",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i
                        className="bi bi-box-arrow-right"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Join Class
                    </a>
                  )}
                  {classItem.status === "live" && !classItem.zoom_link && (
                    <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                      <i
                        className="bi bi-exclamation-triangle"
                        style={{ marginRight: "8px" }}
                      ></i>
                      No Zoom Link
                    </p>
                  )}
                  {classItem.status === "upcoming" && (
                    <p>
                      <i
                        className="bi bi-calendar-plus"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Add to Calendar
                    </p>
                  )}
                  {classItem.status === "completed" && (
                    <p>
                      <i
                        className="bi bi-play-circle"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Watch Recording
                    </p>
                  )}
                </div>
              </div>
              <DescriptionToggle text={classItem.description} />
            </div>
          ))
        ) : (
          <div className="no-classes">
            <p>No live classes.</p>
          </div>
        )}
      </div>

      {/* Language Selector */}
      <div className="practice-container-header">
        <h1>
          Practice
          <i
            className="bi bi-question-circle"
            style={{ marginRight: "8px", padding: "10px" }}
          ></i>
        </h1>
        <div
          className="practice-language-selector"
          style={{
            margin: "0px 8% -25px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "300px",
          }}
        >
          {" "}
          <button
            onClick={handlePrevLanguage}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>{" "}
          <button
            onClick={handleNextLanguage}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="live">
        {practiceData.length > 0 ? (
          practiceData.map((item) => (
            <div
              key={item.id}
              className="liveclasses-container card"
              onClick={() => handlePracticeClick(item.difficulty)}
              style={{ cursor: "pointer" }}
            >
              <div className="information">
                <div
                  className="class-info"
                  style={{
                    backgroundColor: item.backgroundColor,
                    minHeight: "80px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <i
                      className="bi bi-trophy"
                      style={{
                        backgroundColor: "white",
                        fontSize: "15px",
                        fontWeight: "900",
                        color: item.iconColor,
                        padding: "10px",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></i>
                  </div>
                  <div className="class-text">
                    <h3>{item.title}</h3>
                    <p style={{ color: item.iconColor }}>{item.challenge}</p>
                  </div>
                  <div>
                    <h3>{item.progress}</h3>
                    <p>Progress</p>
                  </div>
                </div>
                <div className="progress-time">
                  <div className="row">
                    <p>Total Problems</p>
                    <p className="highlight">{item.problems}</p>
                  </div>
                  <div
                    className="progress-bar-container"
                    style={{
                      backgroundColor: "#e0e0e0b0",
                      borderRadius: "4px",
                      height: "4px",
                    }}
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: item.progress,
                        backgroundColor: item.progressColor,
                        height: "100%",
                        transition: "width 0.4s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="actions" style={{ backgroundColor: "white" }}>
                  <button
                    onClick={(e) => handleViewProblems(item.difficulty, e)}
                    style={{
                      backgroundColor: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      border: "1px solid #ccc",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="bi bi-book"
                      style={{ marginRight: "8px" }}
                    ></i>
                    View Problems
                  </button>
                  <button
                    onClick={(e) => handleContinue(item.difficulty, e)}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="bi bi-arrow-right"
                      style={{ marginRight: "8px" }}
                    ></i>
                    {item.numericProgress > 0 ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-classes">
            <p>No practice challenges available for {selectedLanguage}.</p>
          </div>
        )}
      </div>

      <h1>
        Placement Achievements
        <i
          className="bi bi-question-circle"
          style={{ marginRight: "8px", padding: "10px" }}
        ></i>
      </h1>
      <div className="live">
        {achievementsLoading ? (
          <div className="no-classes">
            <p>Loading placement achievements...</p>
          </div>
        ) : placementAchievements.length > 0 ? (
          placementAchievements.map((item) => (
            <div
              key={item.id}
              className="liveclasses-container"
              style={{ paddingTop: "20px" }}
            >
              <div className="information">
                <div className="class-info" style={{ marginBottom: "5px" }}>
                  <img
                    src={item.image_url || "/assets/placements.jpg"}
                    alt={item.student_name}
                    className="placementimg"
                  />
                  <div className="class-text">
                    <h3>{item.student_name}</h3>
                    <p>{item.role}</p>
                    <p>{item.batch}</p>
                  </div>
                </div>
                <hr />
                <div className="progress-time" style={{ marginTop: "0" }}>
                  <div className="row">
                    <p className="span">College</p>
                    <p>{item.college}</p>
                  </div>
                  <div
                    className="placed-container"
                    style={{
                      background: "linear-gradient(to right, #e3f2fd, #e8f5e9)",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      marginBottom: "0",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      Got Placed in {item.company}
                    </p>
                    <h4 style={{ margin: 0, fontSize: "16px" }}>
                      {item.package}
                    </h4>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "1.6",
                    color: "#333",
                    margin: "0",
                    padding: "20px",
                  }}
                >
                  {item.feedback}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-classes">
            <p>No placement achievements.</p>
          </div>
        )}
      </div>

      {/* AI Bot Floating Button - Only on Home Page */}
      <div className={`ai-bot-container ${isAiAppOpen ? "open" : ""}`}>
        {isAiAppOpen && (
          <div className="ai-app-overlay" onClick={closeAiApp}></div>
        )}

        <button
          className="ai-bot-floating-btn"
          onClick={toggleAiApp}
          aria-label="Open BroOne AI Assistant"
        >
          <img
            src="/assets/BroOneImg.png"
            alt="BroOne AI Assistant"
            className="ai-bot-icon"
          />
          <span className="ai-bot-pulse"></span>
        </button>

        {isAiAppOpen && (
          <div className="ai-app-slide-up">
            <div className="ai-app-header">
              <div className="ai-app-header-content">
                <img
                  src="/assets/BroOneImg.png"
                  alt="BroOne"
                  className="ai-app-header-icon"
                />
                <div>
                  <h3>BroOne AI Assistant</h3>
                  <p>Your 24/7 Learning Ally</p>
                </div>
              </div>
              <button
                className="ai-app-close-btn"
                onClick={closeAiApp}
                aria-label="Close AI Assistant"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="ai-app-content">
              <AiApp />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Home;
