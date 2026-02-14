import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../Footer/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import { javascriptCodingPracticesData } from "../../codingPracticesData/javascriptCodingPracticesData";
import { useAuth } from "../../context/AuthContext";
import DescriptionToggle from "../DescriptionToggle/DescriptionToggle";
import CodingPracticeService from "../../services/codingPracticeService";
import AiApp from "../AiApp/AiApp";

const API_OSE_URL =
  process.env.REACT_APP_API_OSE_URL || "https://ose.onesolutionsekam.in/";

const Home = () => {
  // --- General State ---
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placementAchievements, setPlacementAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [isAiAppOpen, setIsAiAppOpen] = useState(false);
  const [filterDebug, setFilterDebug] = useState(null);

  // --- Web Development State ---
  const [practiceData, setPracticeData] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [lastProgressUpdate, setLastProgressUpdate] = useState(null);

  // --- Digital Marketing State ---
  const [digitalProgress, setDigitalProgress] = useState({});

  const navigate = useNavigate();
  const {
    user,
    // Digital Marketing Context Items
    digitalMarketingGoals,
    loadDigitalMarketingAllStructure,
    completedContent,
    digitalMarketingLoading,
  } = useAuth();

  const isDigitalUser = user?.courseSelection === "digital_marketing";

  // ==========================================
  // 1. FETCH LIVE CLASSES & ACHIEVEMENTS
  // ==========================================
  const fetchLiveClasses = async () => {
    try {
      setLoading(true);

      const batchMonth = user?.batchMonth || "";
      const batchYear = user?.batchYear || "";
      const studentType = user?.studentType || "zorvixe_core";
      const courseSelection = user?.courseSelection || "web_development";

      const filterInfo = {
        batchMonth,
        batchYear,
        studentType,
        courseSelection,
        timestamp: new Date().toISOString(),
      };

      setFilterDebug(filterInfo);

      let url = `${API_OSE_URL}api/live-classes`;
      const params = new URLSearchParams();

      params.append("batch_month", batchMonth || "");
      params.append("batch_year", batchYear || "");
      params.append("student_type", studentType);
      params.append("course_selection", courseSelection);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setLiveClasses([]);
        return;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Sort live classes
        const sortedData = data.sort((a, b) => {
          const statusPriority = { live: 1, upcoming: 2, completed: 3 };
          const aPriority = statusPriority[a.status] || 4;
          const bPriority = statusPriority[b.status] || 4;

          if (aPriority !== bPriority) {
            return aPriority - bPriority;
          }
          return new Date(a.start_time) - new Date(b.start_time);
        });

        setLiveClasses(sortedData);
      } else {
        setLiveClasses([]);
      }
    } catch (error) {
      console.error("❌ Error fetching live classes:", error);
      setLiveClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlacementAchievements = async () => {
    try {
      const response = await fetch(`${API_OSE_URL}api/placement-achievements`);
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return new Date(b.created_at) - new Date(a.created_at);
          }
          if (a.id && b.id) {
            return b.id - a.id;
          }
          return 0;
        });
        setPlacementAchievements(sortedData);
      }
    } catch (error) {
      console.error("Error fetching placement achievements:", error);
    } finally {
      setAchievementsLoading(false);
    }
  };

  // ==========================================
  // 2. WEB DEVELOPMENT LOGIC (Coding Practice)
  // ==========================================

  const fetchUserProgress = async () => {
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
        localStorage.setItem(
          "codingPracticeProgress",
          JSON.stringify(progressMap)
        );
      } else {
        const savedProgress = localStorage.getItem("codingPracticeProgress");
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress));
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      const savedProgress = localStorage.getItem("codingPracticeProgress");
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    }
  };

  const allCodingPracticesData = React.useMemo(() => {
    const mergedData = { ...codingPracticesData };
    if (javascriptCodingPracticesData?.javascript) {
      mergedData.javascript = javascriptCodingPracticesData.javascript;
    }
    return mergedData;
  }, []);

  // Helper functions for Web Dev UI
  const getLanguageSpecificTitle = (language, difficulty) => {
    const languageNames = {
      python: "Python",
      javascript: "JavaScript",
      java: "Java",
      sql: "SQL",
    };
    const languageName = languageNames[language] || language;
    return `${languageName} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenge`;
  };

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

  useEffect(() => {
    if (!isDigitalUser && user) {
      const processPracticeData = () => {
        if (!allCodingPracticesData[selectedLanguage]) {
          setPracticeData([]);
          return;
        }

        const difficultyGroups = {
          easy: { questions: [] },
          medium: { questions: [] },
          hard: { questions: [] },
        };

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
              challenge: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenge`,
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

        setPracticeData(practiceCards);
      };
      processPracticeData();
    }
  }, [
    userProgress,
    selectedLanguage,
    allCodingPracticesData,
    isDigitalUser,
    user,
  ]);

  // ==========================================
  // 3. DIGITAL MARKETING LOGIC
  // ==========================================

  // Check content completion helper
  const checkIsDigitalContentCompleted = useCallback(
    (content) => {
      if (!content) return false;
      const isRx = completedContent.some(
        (id) => String(id) === String(content.id)
      );
      const isDb = content.is_completed === true || content.is_completed === 1;
      return isRx || isDb;
    },
    [completedContent]
  );

  // Calculate Progress Logic for Digital
  const calculateDigitalProgress = useCallback(() => {
    const progressMap = {};

    digitalMarketingGoals.forEach((goal) => {
      // Use backend stats if available, else calculate manually
      if (goal.stats && goal.stats.progress_percentage !== undefined) {
        progressMap[goal.id] = goal.stats.progress_percentage;
      } else if (goal.modules) {
        let total = 0;
        let completed = 0;
        goal.modules.forEach((m) => {
          m.topics?.forEach((t) => {
            t.subtopics?.forEach((s) => {
              s.content?.forEach((c) => {
                total++;
                if (checkIsDigitalContentCompleted(c)) completed++;
              });
            });
          });
        });
        progressMap[goal.id] = total === 0 ? 0 : (completed / total) * 100;
      } else {
        progressMap[goal.id] = 0;
      }
    });
    setDigitalProgress(progressMap);
  }, [digitalMarketingGoals, checkIsDigitalContentCompleted]);

  // Fetch Digital Structure
  useEffect(() => {
    if (isDigitalUser && user) {
      loadDigitalMarketingAllStructure().catch((e) => console.error(e));
    }
  }, [isDigitalUser, user, loadDigitalMarketingAllStructure]);

  // Update Digital Stats when completed content changes
  useEffect(() => {
    if (isDigitalUser && digitalMarketingGoals.length > 0) {
      calculateDigitalProgress();
    }
  }, [
    completedContent,
    digitalMarketingGoals,
    isDigitalUser,
    calculateDigitalProgress,
  ]);

  // ==========================================
  // 4. INITIALIZATION
  // ==========================================
  useEffect(() => {
    if (user) {
      fetchLiveClasses();
      fetchPlacementAchievements();

      if (!isDigitalUser) {
        fetchUserProgress();
      }

      const liveClassesInterval = setInterval(fetchLiveClasses, 60000);
      return () => {
        clearInterval(liveClassesInterval);
      };
    }
  }, [user, isDigitalUser]);

  // Listen for storage events (Web Dev)
  useEffect(() => {
    if (!isDigitalUser) {
      const handleStorageChange = (e) => {
        if (e.key === "codingPracticeProgress") {
          try {
            const newProgress = JSON.parse(e.newValue || "{}");
            setUserProgress(newProgress);
            setLastProgressUpdate(Date.now());
          } catch (error) {
            console.error("Error parsing progress:", error);
          }
        }
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [isDigitalUser]);

  // ==========================================
  // 5. EVENT HANDLERS
  // ==========================================

  const handleWebDevPracticeClick = (difficulty) => {
    // Logic for finding practice ID
    const difficultyGroup = practiceData.find(
      (p) => p.difficulty === difficulty
    );
    if (difficultyGroup?.questions.length > 0) {
      let targetPracticeId = null;
      allCodingPracticesData[selectedLanguage].forEach((practice) => {
        if (targetPracticeId) return;
        const hasDifficultyQuestions = practice.questions.some(
          (q) => q.difficulty.toLowerCase() === difficulty
        );
        if (hasDifficultyQuestions) targetPracticeId = practice.id;
      });
      if (targetPracticeId) navigate(`/practice/${targetPracticeId}`);
    }
  };

  const handleWebDevContinue = (difficulty, e) => {
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

  const handleDigitalContinue = () => {
    navigate("/digital");
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

  // Helper UI methods
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

  const toggleAiApp = () => setIsAiAppOpen(!isAiAppOpen);
  const closeAiApp = () => setIsAiAppOpen(false);

  // Loading Screen
  if (loading && !user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your personalized content...</p>
      </div>
    );
  }

  // Define colors for digital cards to cycle through
  const digitalCardColors = [
    { bg: "#c0c9ee4a", icon: "#7272fcff" },
    { bg: "#f5d0e458", icon: "#d43b8cff" },
    { bg: "#cdf9ed75", icon: "#078866ff" },
    { bg: "#fff3cd", icon: "#ffc107" },
  ];

  return (
    <div className="website">
      {/* BroOne Banner */}
      <div className="BroOne-container">
        <div className="BroOne-container-text">
          <h4>BroOne: Your Learning Ally at OneSolutions</h4>
          <p>
            Unlock your potential with BroOne - your mentor, friend, coach,
            guide, and companion. Available 24/7 to support your journey.
          </p>
          <button onClick={toggleAiApp}>Chat with BroOne</button>
        </div>
        <img src="/assets/BroOneImg.png" alt="BroOne" className="broone_img" />
      </div>

      {/* Live Classes Section */}
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
            <p>No live classes available for your batch and course.</p>
          </div>
        )}
      </div>

      {/* =======================================================
          CONDITIONAL RENDER: PRACTICE vs COURSE PROGRESS
         ======================================================= */}
      {isDigitalUser ? (
        /* DIGITAL MARKETING VIEW */
        <>
          <div className="practice-container-header">
            <h1>
              Course Progress
              <i
                className="bi bi-info-circle"
                style={{ marginLeft: "10px", fontSize: "0.8em" }}
              ></i>
            </h1>
          </div>

          <div className="live">
            {digitalMarketingGoals && digitalMarketingGoals.length > 0 ? (
              digitalMarketingGoals.map((goal, index) => {
                const percent = digitalProgress[goal.id] || 0;
                const formattedPercent = `${percent.toFixed(0)}%`;
                const styleIndex = index % digitalCardColors.length;
                const colors = digitalCardColors[styleIndex];

                return (
                  <div
                    key={goal.id}
                    className="liveclasses-container card"
                    onClick={handleDigitalContinue}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="information">
                      <div
                        className="class-info"
                        style={{
                          backgroundColor: colors.bg,
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
                            className="bi bi-graph-up-arrow"
                            style={{
                              backgroundColor: "white",
                              fontSize: "15px",
                              fontWeight: "900",
                              color: colors.icon,
                              padding: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          ></i>
                        </div>
                        <div className="class-text">
                          <h3>{goal.name || goal.title}</h3>
                          <p style={{ color: colors.icon }}>Course Module</p>
                        </div>
                        <div>
                          <h3>{formattedPercent}</h3>
                          <p>Completed</p>
                        </div>
                      </div>
                      <div className="progress-time">
                        <div className="row">
                          <p>Completion Status</p>
                          <p className="highlight">{formattedPercent}</p>
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
                              width: formattedPercent,
                              backgroundColor: colors.icon,
                              height: "100%",
                              transition: "width 0.4s ease-in-out",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="actions"
                        style={{ backgroundColor: "white" }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/digital");
                          }}
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className="bi bi-journal-bookmark"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-classes">
                <p>Loading your courses...</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* WEB DEVELOPMENT VIEW (Standard Practice) */
        <>
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
              </button>
              <span style={{ margin: "0 10px", fontWeight: "500" }}>
                {selectedLanguage.charAt(0).toUpperCase() +
                  selectedLanguage.slice(1)}
              </span>
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
                  onClick={() => handleWebDevPracticeClick(item.difficulty)}
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
                        <p style={{ color: item.iconColor }}>
                          {item.challenge}
                        </p>
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
                    <div
                      className="actions"
                      style={{ backgroundColor: "white" }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/practice?language=${selectedLanguage}&difficulty=${item.difficulty}`
                          );
                        }}
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
                        onClick={(e) =>
                          handleWebDevContinue(item.difficulty, e)
                        }
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
        </>
      )}

      {/* Placement Achievements Section */}
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

      {/* AI Bot Floating Button */}
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
