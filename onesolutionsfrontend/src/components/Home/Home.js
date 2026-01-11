import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../Footer/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import { useAuth } from "../../context/AuthContext";

import DescriptionToggle from "../DescriptionToggle/DescriptionToggle";

const API_OSE_URL = process.env.REACT_APP_API_OSE_URL;

const Home = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [practiceData, setPracticeData] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [placementAchievements, setPlacementAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch live classes from backend with batch filtering
  const fetchLiveClasses = async () => {
    try {
      // Get user's batch information
      const batchMonth = user?.batchMonth;
      const batchYear = user?.batchYear;

      let url = `${API_OSE_URL}api/live-classes`;

      // If user has batch information, filter classes by batch
      if (batchMonth && batchYear) {
        url += `?batch_month=${batchMonth}&batch_year=${batchYear}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLiveClasses(data);
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
        setPlacementAchievements(data);
      } else {
        console.error("Failed to fetch placement achievements");
      }
    } catch (error) {
      console.error("Error fetching placement achievements:", error);
    } finally {
      setAchievementsLoading(false);
    }
  };

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("codingPracticeProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Process practice data from codingPracticesData - Group by difficulty
  useEffect(() => {
    const processPracticeData = () => {
      // Initialize difficulty groups
      const difficultyGroups = {
        easy: {
          title: "Path To Proficiency",
          challenge: "Intermediate Challenge",
          questions: [],
          color: "#c0c9ee4a",
          iconColor: "#7272fcff",
        },
        medium: {
          title: "One Solutions 75",
          challenge: "Medium Challenge",
          questions: [],
          color: "#f5d0e458",
          iconColor: "#d43b8cff",
        },
        hard: {
          title: "Advanced Problem Solving",
          challenge: "Advanced Challenge",
          questions: [],
          color: "#cdf9ed75",
          iconColor: "#078866ff",
        },
      };

      // Collect all questions from all practices and group by difficulty
      Object.keys(codingPracticesData).forEach((language) => {
        codingPracticesData[language].forEach((practice) => {
          practice.questions.forEach((question) => {
            const difficulty = question.difficulty.toLowerCase();
            if (difficultyGroups[difficulty]) {
              difficultyGroups[difficulty].questions.push({
                ...question,
                language: language,
                practiceId: practice.id,
              });
            }
          });
        });
      });

      // Calculate progress for each difficulty group
      const practiceCards = Object.keys(difficultyGroups).map((difficulty) => {
        const group = difficultyGroups[difficulty];
        const totalQuestions = group.questions.length;
        const solvedQuestions = group.questions.filter(
          (question) => userProgress[question.id]?.status === "solved"
        ).length;
        const progress =
          totalQuestions > 0
            ? Math.round((solvedQuestions / totalQuestions) * 100)
            : 0;

        return {
          id: `${difficulty}-challenge`,
          title: group.title,
          challenge: group.challenge,
          progress: `${progress}%`,
          problems: totalQuestions,
          color: group.color,
          iconColor: group.iconColor,
          difficulty: difficulty,
          questions: group.questions,
        };
      });

      setPracticeData(practiceCards);
    };

    processPracticeData();
  }, [userProgress]);

  useEffect(() => {
    fetchLiveClasses();
    fetchPlacementAchievements();

    // Refresh classes every minute to update progress and status
    const interval = setInterval(fetchLiveClasses, 60000);
    return () => clearInterval(interval);
  }, [user]); // Add user as dependency to refetch when user changes

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

  const handlePracticeClick = (difficulty) => {
    const difficultyGroup = practiceData.find(
      (p) => p.difficulty === difficulty
    );
    if (difficultyGroup && difficultyGroup.questions.length > 0) {
      let targetPracticeId = null;
      let targetLanguage = null;

      Object.keys(codingPracticesData).forEach((language) => {
        if (targetPracticeId) return;
        codingPracticesData[language].forEach((practice) => {
          if (targetPracticeId) return;
          const hasDifficultyQuestions = practice.questions.some(
            (q) => q.difficulty.toLowerCase() === difficulty
          );
          if (hasDifficultyQuestions) {
            targetPracticeId = practice.id;
            targetLanguage = language;
          }
        });
      });

      if (targetPracticeId) {
        navigate(`/practice/${targetPracticeId}`);
      }
    }
  };

  const handleViewProblems = (difficulty, e) => {
    e.stopPropagation();
    navigate(`/practice?difficulty=${difficulty}`);
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
          <button>Chat with BroOne</button>
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

      <h1>
        Practice
        <i
          className="bi bi-question-circle"
          style={{ marginRight: "8px", padding: "10px" }}
        ></i>
      </h1>
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
                  style={{ backgroundColor: item.color, minHeight: "80px" }}
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
                        backgroundColor: item.iconColor,
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
                      border: "2px solid",
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
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-classes">
            <p>No practice challenges available at the moment.</p>
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

      <Footer />
    </div>
  );
};
export default Home;
