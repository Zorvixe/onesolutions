import React from "react";

const sections = [
  {
    title: "One Solutions 75",
    items: [
      {
         bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "Advanced algoritham Techniques",
    items: [
      {
        bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "SQL Power Play: Joins and Aggregates",
    items: [
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      { bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "SQL Stater Kit: SELECT and Beyond",
    items: [
      {
        bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
         bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "Algorithamic Journey",
    items: [
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
          bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "Advanced Algorithm Techniques",
    items: [
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
       bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
         bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "SQL Power Play: Joins and Aggregates",
    items: [
      {
        bgColor: "#cdf9ed75",
        iconColor: "#078866ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
  {
    title: "Sorting Algorithams",
    items: [
      {
        bgColor: "#f5d0e458",
        iconColor: "#d43b8cff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#0082801c",
        iconColor: "#008280ff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      },
      {
        bgColor: "#c0c9ee4a",
        iconColor: "#7272fcff",
        problems: 22,
        desc: "Enhance your problem-solving skills with more complex data structures and algorithms."
      }
    ]
  },
];

const Practice = () => {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={index}>
          <h1>
            {section.title}{" "}
            <i
              className="bi bi-question-circle"
              style={{ marginRight: "8px", padding: "10px" }}
            ></i>
          </h1><div className="live">{section.items.map((item, index) => (
              <div
                className="liveclasses-container"
                style={{ height: "40vh" }}
                key={index}>
                <div className="information">
                  <div
                    className="class-info"
                    style={{ backgroundColor: item.bgColor, minHeight: "80px" }}>
                    <i className="bi bi-trophy"
                      style={{backgroundColor: "white",color: item.iconColor,
                      padding: "10px",borderRadius: "50%", display: "inline-block"}}>
                      </i>
                      <div className="class-text">
                      <h3>Path To Proficiency</h3>
                      <p style={{ color: item.iconColor }}>
                        Intermediate Challenge
                      </p>
                    </div>
                    <div>
                      <h3>0%</h3>
                      <p>Progress</p>
                    </div>
                  </div>
                  <div className="progress-time">
                    <div className="row"  style={{ marginBottom: "10px" }}>
                      <p>Total Problems</p>
                      <p className="highlight">{item.problems}</p>
                    </div>
                    <p style={{color : "#464242ff", fontSize:"13px",marginBottom: "10px"}}>{item.desc}</p>
                    <div
                  className="progress-bar-container " 
                  style={{
                    backgroundColor: "#e0e0e0b0", borderRadius: "4px",height: "6px" }}>
                  </div>
                  </div>
                  <div className="actions"
                    style={{ backgroundColor: "white", marginTop: "0px" }}>
                    <button style={{
                        backgroundColor: "white",padding: "10px 20px",borderRadius: "5px",display: "flex",
                        border: "2px solid",alignItems: "center",
                        }}>
                      <i className="bi bi-book" style={{ marginRight: "8px" }}></i>
                      View Problems
                    </button>
                    <button
                      style={{
                        backgroundColor: "black",color: "white",padding: "10px 20px",border: "none",borderRadius: "5px",display: "flex",alignItems: "center",
                       }}>
                      <i className="bi bi-arrow-right" style={{ marginRight: "8px" }}></i>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Practice;
