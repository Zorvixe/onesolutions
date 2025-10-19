"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Courses.css"

const goalsData = [
  {
    id: "goal-1",
    title: "Goal - 1",
    color: "#1e90ff", // blue
    dateRange: "July 1, 2024 - Sept 30, 2024",
    progress: 30,
    courses: [
      {
        id: "g1-c1",
        title: "Static Website: HTML CSS & Bootstrap",
        progress: 30,
         modules: [
          { name: "Introduction to HTML & CSS",  
            topic: [ 
      "Introduction to HTML",
      "Introduction to HTML | Cheat Sheet",
      "MCQ Practice - HTML",
      "Introduction to CSS Prat 1",
      "Introduction to CSS Prat 1 | Cheat Sheet",
      "MCQ Practice - CSS 1",
      "Introduction to CSS Prat 2",
      "Introduction to CSS Prat 2 | Cheat Sheet",
      "MCQ Practice - CSS 2",
      "Introduction to CSS Prat 3",
      "Introduction to CSS Prat 3 | Cheat Sheet",
      "MCQ Practice - CSS 3",
    ]
          },
          { name: "CSS Box Model",
            topic: [ 
      "Introduction to CSS Box Model Part 1",
      "Introduction to CSS Box Model Part 1 | Cheat Sheet",
      "MCQ Practice - BoxModel 1",
      "Introduction to CSS Box Model Part 2",
      "Introduction to CSS Box Model Part 2 | Cheat Sheet",
      "MCQ Practice - BoxModel 2",
      "Coding Platform Walk-through",
      "Coding Pratice 1",
    ]
          },
          { name: "Bootstrap", 
            topic: [ 
      "Introduction to Bootstrap Part 1",
      "Introduction to Bootstrap Part 1 | Cheat Sheet",
      "MCQ Practice - Bootstrap 1",
      "Introduction to Bootstrap Part 2",
      "Introduction to Bootstrap Part 2 | Cheat Sheet",
      "MCQ Practice - Bootstrap 2",
      "Coding Pratice 2",
      "Coding Pratice 3",
      "Coding Pratice 4",
    ]
          },
          { name: "Developing Layouts", 
             topic: [ 
      "Favourite Places Section",
      "Favourite Places Section | Cheat Sheet",
      "MCQ Practice - Layout 1",
      "Approach to Develop a Layout",
      "Approach to Develop a Layout | Cheat Sheet",
      "MCQ Practice - Layout 2",
      "A Note on BootStrap Versions",
      "Favourite Place Detailed View Section",
      "Favourite Place Detailed View Section | Cheat Sheet",
      "MCQ Practice - Layout 3",
      "Coding Pratice 5",
      "Coding Pratice 6",
      "Coding Pratice 7",
    ]
           },
          { name: "Website Integration",
            topic: [ 
      "Website Integration Part 1",
      "Website Integration Part 1 | Cheat Sheet",
      "MCQ Practice - Website 1",
      "Website Integration | Part 2",
      "Website Integration | Part 2 | Cheat Sheet",
      "MCQ Practice - Website 2",
      "Coding Pratice 8",
      "Coding Pratice 9",
      "Coding Pratice 10",
      "Website: Behind the Scenes",
      "MCQ Pratice - Behind the Scenes",
      "HTML Hyperlinks",
      "HTML Hyperlinks | Cheat Sheets",
      "MCQ Practice - HTML Hyperlinks",
      "On-Demand Session",
      "On-Demand Session | Cheat Sheets",
      "MCQ Practice - OnDemand",
      "Coding Pratice 11",
      "Coding Pratice 12",
      "Coding Pratice 13",
      

    ]
           },
          { name: "Revision",
             topic: [ 
      "Static Summary CheatSheet",
             ]

           },
          { name: "Assignments",
             topic: [ 
      "MCQ Assignment 1",
      "MCQ Assignment 2",
      "MCQ Assignment 3",
      "MCQ Assignment 4",
      "Coding Assignment 1",
      "Coding Assignment 2",
      "Coding Assignment 3",
      "Coding Assignment 4",
      

             ]
          },
          {
            name : "Mock Tests",
            topic : [
              "Coding Test 1",
              "Coding Test 2",

            ]
          },
          {
            name : "Build Your Own Static Website Course Exam",
            topic : [
              "Build Your Own Static Website Course Exam | Instructions",
              "Build Your Own Static Website Course Exam",
            ]
          }
        ]

      },
      {
        id: "g1-c2",
        title: "Responsive Website: HTML CSS & Bootstrap",
        progress: 30,
        modules: [
          { name: "Responsive Web Design & BootStrap Grid System", 
            topic: [ 
      "Introduction to Responsive Web Design",
      "Introduction to Responsive Web Design | Cheat Sheet",
      "MCQ Pratice - Res_WD",
      "BootStrap Grid System Part 1",
      "BootStrap Grid System Prat 1 | Cheat Sheet",
      "MCQ Pratice - B_GS_1",
      "BootStrap Grid System Part 2",
      "BootStrap Grid System Part 2 | Cheat Sheet",
      "MCQ Pratice - B_GS_2",
      "BootStrap Navbar",
      "BootStrap Navbar | Cheat Sheet",
      "MCQ Pratice - B_Nav",
      "Coding Pratice 1",
      "Coding Pratice 2",
     
    ]
          },
         {
  name: "CSS Building Blocks",
  topic: [
    "CSS Selectors & Inheritance",
    "CSS Selectors & Inheritance | Cheat Sheet",
    "MCQ Practice - CSS Selectors & Inheritance",
    "CSS Specificity & Cascade",
    "CSS Specificity & Cascade | Cheat Sheet",
    "MCQ Practice - CSS Specificity & Cascade",
    "Coding Pratice 3",
    "Coding Pratice 4",
  ]
},
{
  name: "Developing Layouts",
  topic: [
    "Banner Section",
    "Banner Section | Cheat Sheet",
    "MCQ Practice - Banner Section",
    "Coding Pratice 5",
    "Why Choose us? Section",
    "Why Choose us? Section | Cheat Sheet",
    "MCQ Practice - Why Choose Us Section",
    "Explore New Section",
    "Explore New Section | Cheat Sheet",
    "MCQ Practice - Explore Menu Section",
    "Healthy Food, Delivery and Payment, Thanking Customers Section",
    "Healthy Food, Delivery and Payment, Thanking Customers Section | Cheat Sheet",
    "MCQ Practice - Healthy Delivery & Payments",
    "Coding Pratice 6",
    "Coding Pratice 7",
    "Coding Pratice 8",
    "Coding Pratice 9",
  ]
},
          { name: "Developing Layouts 2", 
             topic: [ 
      "Follow Us Section & More Styling",
      "Follow Us Section & More Styling | Cheat Sheet",
      "MCQ Practice - Follow_us",
      "CSS Gradients & More BootStrap Components",
      "CSS Gradients & More BootStrap Components | Cheat Sheet",
      "MCQ Practice - CSS_Gradients",
      "Coding Pratice 10",
      "Coding Pratice 11",
      "Coding Pratice 12",
      "Coding Pratice 13",
      
    ]
           },
          { name: "Developing Layouts Pratice",
            topic: [ 
      "Coding Pratice 14",
      "Coding Pratice 15",
      "Coding Pratice 16",
      
      
    ]
           },
          { name: "Revision",
             topic: [ 
      "Responsive Summary CheatSheet",
             ]

           },
          { name: "Assignments",
             topic: [ 
      "MCQ Assignment 1",
      "MCQ Assignment 2",
      "MCQ Assignment 3",
      "MCQ Assignment 4",
      "Coding Assignment 1",

             ]
          },
          {
            name : "Mock Tests",
            topic : [
              "Coding Test 1",
              "Coding Test 2",
              "Coding Test 3",
            ]
          },
          {
            name : "Build Your Own Responsive Website Course Exam",
            topic : [
              "Build Your Own Responsive Website Course Exam | Instructions",
              "Build Your Own Responsive Website Course Exam"

            ]
          }
        ]
      },
      {
        id: "g1-c3",
        title: "Python",
        progress: 99,
        modules: [
      {
        name: "Introduction to Python",
        topic: [
          "Programming with Python",
          "Programming with Python | Cheat Sheet",
          "MCQ Pratice",
          "Coding Pratice Walkthrough | Part 1",
          "Coding Pratice - 1",
          "Variables and Data Types",
          "Variables and Data Types | Cheat Sheet",
          "MCQ Pratice - 1",
          "Coding Pratice - 2",
          "Sequence of Instructions",
          "Sequence of Instructions | Cheat Sheet",
          "MCQ Pratice - 2",
          "Coding Pratice - 3",
        ],
      },
      {
        name: "I/O Basics",
        topic: [
          "Input and Output Basics",
          "Input and Output Basics | Cheat Sheet",
          "Coding Pratice Walkthrough | Part 2",
          "MCQ Pratice - I/O",
          "Coding Pratice - 1A",
          "Coding Pratice - 1B",
          "Coding Pratice - 1C",
          "Assignment 1A", 
          "How to debug your code?",
          "Type Conversion",
          "Type Conversion | Cheat Sheet",
          "MCQ Pratice - Type Con",
           "Coding Pratice - 1D",
          "Coding Pratice - 1E",
          "Coding Pratice - 1F",
          "Assignment 1B",
        ],
      },
      {
        name: "Operators & Conditional Statements",
        topic: [
          "Relational Operators",
          "Relational Operators | Cheat Sheet",
          "MCQ Pratice - Rel Ope",
          "Coding Pratice - 2A",
          "Coding Pratice - 2B",
          "Assignment 2A",
          "Logical Operators",
          "Logical Operators | Cheat Sheet",
          "MCQ Pratice - Log Ope",
          "Coding Pratice - 2C",
          "Coding Pratice - 2D",
          "Coding Pratice - 2E",
          "Assignment 2B",
          "Conditional Statements",
          "Conditional Statements | Cheat Sheet",
          "MCQ Pratice - Con stmts",
          "Coding Pratice - 3A",
          "Coding Pratice - 3B",
          "Assignment 3",
        ],
      },
      {
        name: "Nested Conditions",
        topic: [
          "Problem Solving and Debugging",
          "Problem Solving and Debugging - Part 2",
          "Problem Solving and Debugging | Cheat Sheet",
          "MCQ Pratice - Problem Solv Debug",
          "Coding Pratice - 4A",
          "Coding Pratice - 4B",
          "Assignment 4",
          "Nested Conditional Statements",
          "Nested Conditional Statements | Cheat Sheet",
          "MCQ Pratice - Nested Con",
          "Problem solving | Part 1",
          "Coding Pratice 5",
          "Assignment 5",
          "Coding Pratice - 6A",
          "Coding Pratice - 6B",
          "Assignment 6",
          "Grand Assignment - 1"

        ],
      },
      {
        name: "Loops",
        topic: [
          "Loops",
          "Loops | Cheat Sheet",
          "MCQ Pratice - Loops",
          "Coding Pratice - 7A",
          "Coding Pratice - 7B",
          "Assignment 7",
          "For Loop",
          "For Loop | Cheat Sheet",
          "MCQ Pratice - For Loops",
          "Coding Pratice - 8A",
          "Problem Solving - Part 2",
          "Coding Pratice - 8B",
          "Assignment 8",
          "Coding Pratice - 9A",
          "Coding Pratice - 9B",
          "Assignment 9",
          "Coding Pratice - 10A",
          "Coding Pratice - 10B",
          "Problem Solving - Part 3",
          "Coding Pratice - 10C",
          "Coding Pratice - 10D",
          "Assignment 10A",
          "Problem Solving - Part 4",
          "Approach for Hollow Pattern | Cheat sheet",
          "Coding Pratice - 10E",
          "Coding Pratice - 10F",
          "Assignment 10B",
          "Foundations Exam - 1",
          "String Methods",
          "String Methods | Cheat Sheets",
          "MCQ Pratice -String Methods",
          "String Methods | Additional Reading Material",
          "Coding Pratice - 11A",
          "Coding Pratice - 11B",
          "Assignment 11",
        ],
      },
      {
        name: "Loop Control Statements",
        topic: [
          "Problem Solving and Debugging - Part 3",
          "MCQ Pratice - Problem_Sol",
          "Coding Pratice - 12",
          "Assignment 12",
          "Nested Loops",
          "Nested Loops | Cheat Sheet",
          "MCQ Pratice - Nested Loops",
          "Problem Solving - Part 5",
          "Problem Solving - Part 6",
          "Problem Solving - Part 6 | Cheat Sheet",
          "MCQ Pratice - Prob_Sol",
          "Coding Pratice - 13A",
          "Coding Pratice - 13B",
          "Assignment 13",
          "Problem Solving - Part 7",
          "Problem Solving - Part 7 | Cheat Sheet",
          "Coding Pratice - 14A",
          "Coding Pratice - 14B",
          "Assignment 14",
          "Coding Pratice - 15A",
          "Coding Pratice - 15B",
          "Loop Control Statements",
          "Loop Control Statements | Cheat Sheet",
          "MCQ Pratice - Loop Con Stmts",
          "Coding Pratice - 16",
          "Assignment 16",
          "Grand Assignment - 2",
        ],
      },
      {
        name: "Comparing Strings & Naming Variables",
        topic: [
          "Comparing Strings & Naming Variables",
          "Comparing Strings & Naming Variables | Cheat Sheet",
          "MCQ Pratice - ComStr_NamVar",
          "Coding Pratice - 17A",
          "Coding Pratice - 17B",
          "Assignment 17",
          "Problem Solving and Debugging - Part 4",
          "Problem Solving and Debugging - Part 4 | Chaet Sheet",
          "Coding Pratice - 18",
          "Assignment 18",
          "Problem Solving and Debugging - Part 5",
          "Problem Solving and Debugging - Part 5 | Chaet Sheet",
          "Coding Pratice - 19",
          "Assignment 19",
        ],
      },
      {
        name: "Lists",
        topic: [
          "Lists", 
          "Lists | Cheat Sheet",
          "MCQ Pratice - Lists",
          "Working with Lists",
          "Working with Lists | Cheat Sheet",
          "MCQ Pratice - Working_Lists",
          "Coding Pratice - 20",
          "Assignment 20",

        ],
      },
      {
        name: "Functions",
        topic: [
          "List & Strings",
          "List & Strings | Cheat Sheet",
          "MCQ Pratice - List_Str",
          "Coding Pratice - 21A",
          "Coding Pratice - 21B",
          "Assignment 21",
          "Functions",
          "Functions | Cheat Sheet",
          "MCQ Pratice - Functions",
          "Coding Pratice - 22A",
          "Coding Pratice - 22B",
          "Assignment 22",
          "Function Arguments",
          "Function Arguments | Cheat Sheet",
          "MCQ Pratice - Fun_Arg",
          "Coding Pratice - 23A",
          "Coding Pratice - 23B",
          "Assignment 23",
          "Foundations Exam - 2",
        ],
      },
      {
        name: "Recursion",
        topic: [
          "Built-in Functions",
          "Built-in Functions | Cheat Sheet",
          "MCQ Pratice - Builtin_Fun",
          "Coding Pratice - 24",
          "Assignment 24",
          "Function Call Stack & Recursion",
          "Function Call Stack & Recursion | Cheat Sheet",
          "MCQ Pratice - FunCallStack_Recursion",
          "Coding Pratice - 25",
          "Assignment 25",
          "List Methods",
          "List Methods | Cheat Sheet",
          "MCQ Pratice - List Methods",
          "Coding Pratice - 26",
          "Assignment 26",
        ],
      },
      {
        name: "Tuples & Sets",
        topic: [
          "Tuples & Sequences",
          "Tuples & Sequences | Cheat Sheet",
          "MCQ Pratice - Tuples_Seq",
          "Sets",
          "Sets | Cheat Sheet",
          "MCQ Pratice - Sets",
          "Set Operations",
          "Set Operations | Cheat Sheet",
          "MCQ Pratice - Set_Ope",
          "Coding Pratice - 27",
        ],
      },
      {
        name: "Dictionaries",
        topic: [
          "Problem Solving and Debugging - Part 6",
          "Coding Pratice 28",
          "Nested Lists & String Formatting",
          "Nested Lists & String Formatting | Cheat Sheet",
          "MCQ Pratice - NestedList_StrFormat",
          "Coding Pratice 29",
          "Coding Pratice 30",
          "Dictionaries",
          "Dictionaries | Cheat Sheet",
          "MCQ Pratice - Dictionaries",
          "Working with Dictionaries",
          "Working with Dictionaries | Cheat Sheet",
          "MCQ Pratice - Working_Dictionaries",
          "Problem Solving and Debugging - Part 7",
          "Buil-in Functions | Additional Reading Material",
          "Coding Pratice 31",
          "Grand Assignment - 3",
          "Grand Assignment - 4",
          "Foundations Exam - 3",
        ],
      },
      {
        name: "Introduction to Object Oriented Programming",
        topic: [
          "Introduction to Object Oriented Programming",
          "Introduction to Object Oriented Programming | Cheat Sheet",
          "MCQ Pratice - Intro_OOP",
          "Object Oriented Programming",
          "Object Oriented Programming | Cheat Sheet",
          "MCQ Pratice - OOP",
          "Classes & Objects",
          "Classes & Objects | Cheat Sheet",
          "MCQ Pratice - Classes_Obj",
          "Coding Pratice - 32",
          "Attribute Methods",
          "Attribute Methods | Cheat Sheet",
          "MCQ Pratice - Att_Meth",
          "Inheritance Part1",
          "Inheritance Part1 | Cheat Sheet",
          "MCQ Pratice - Inheritance1",
          "Inheritance Part2",
          "Inheritance Part2 | Cheat Sheet",
          "MCQ Pratice - Inheritance2",
          "Coding Pratice - 33",
          "OOP: On-Demand Session",
        ],
      },
      {
        name: "Miscellaneous Topics",
        topic: [
          "Python Standard Library",
          "Python Standard Library | Cheat Sheet",
          "MCQ Pratice - PythonLibrary",
          "Scope & Namespaces",
          "Scope & Namespaces | Cheat Sheet",
          "MCQ Pratice - Scope_Namespaces",
          "Errors & Exceptions",
          "Errors & Exceptions | Cheat Sheet",
          "MCQ Pratice - Errors_Excep",
          "Dates & Time",
          "Dates & Time | Cheat Sheet",
          "MCQ Pratice - Dates_Time",
          "Working with Dates & Times",
          "Working with Dates & Times | Cheat Sheet",
          "MCQ Pratice - Working with Dates & Times",
          "Coding Pratice 34",
          "Grand Assignment - 5",
        ],
      },
      {
        name: "Revision",
        topic: [
          "Python Summary Cheat Sheet - 1",
          "Python Summary Cheat Sheet - 2",
          "Python Summary Cheat Sheet - 3",
          "Python Summary Cheat Sheet - 4",
        ],
      },
      {
        name : "Programming Foundations Course Exam",
        topic : [
          "Programming Foundations Course Exam | Instructions",
          "Programming Foundations Course Exam",
        ]
      }
    ],
      },
    ],
  },
  {
    id: "goal-2",
    title: "Goal - 2",
    color: "#ff8c00", // orange
    dateRange: "July 1, 2024 - Sept 30, 2024",
    progress: 0,
    courses: [
      {
        id: "g2-c1",
        title: "Build Your Own Dynamic Web Application",
        progress: 0,
        modules: [ 
      {
        name : "Introduction to JS & Variables",
        topic : [
          "Introduction to Dynamic Web Applications",
          "Introduction to Dynamic Web Applications | Cheat Sheet",
          "MCQ Practice - Intro_Dynamic  Web App",
          "DOM and Event Fundamentals",
          "DOM and Event Fundamentals | Cheat Sheet",
          "MCQ Pratice - DOM Event Fund",
          "Primitive Types & Conditionals",
          "Primitive Types & Conditionals | Cheat Sheet",
          "MCQ Pratice - Primitive Types",
          "Input Element and Math Functions",
          "Input Element and Math Functions | Cheat Sheet",
          "MCQ Pratice - Input Elements",
          "Coding Pratice 1",
          "Coding Pratice 2",
          "Coding Pratice 3",
        ]
      },
      { name : "Arrays and Objects",
        topic : [
          "Arrays & More DOM Manipulations",
          "Arrays & More DOM Manipulations | Cheat Sheet",
          "MCQ Pratice - Array & DOM",
          "Objects",
          "Objects | Cheat Sheet",
          "MCQ Pratice - Objects",
          "Coding Pratice 4",
          "Coding Pratice 5",
          "Comments",
          "JS Coding Platform - Walk through",
          "JS Coding Pratice 1",
          "JS Coding Pratice 2",
          "JS Coding Pratice 3",
          "JS Coding Pratice 4",
          "A Note On Software Compatibility",
        ]
      },
      {
        name : "Todos Application",
        topic : [
           "Todos Application Introduction",
            "Todos Application | Part 1",
            "Todos Application | Cheat Sheet",
            "MCQ Pratice - Todos App",
            "Coding Pratice 5",
            "On-Demand Session",
            "On-Demand Session | Cheat Sheet",
            "MCQ Pratice - On-Demand Session",
            "Todos Application | Part 2",
            "Todos Application | Part 2 | Cheat Sheet",
            "MCQ Pratice - Todos App 2",
            "Coding Pratice 6",
            "Coding Pratice 7",
            "Coding Pratice 8",
        ]
      },
      {
        name : "Todos Application 2",
        topic : [
           "Todos Application | Part 3",
            "Todos Application | Part 3 | Cheat Sheet",
            "MCQ Pratice - Todos App 3",
            "Coding Pratice 9",
            "Todos Application | Part 4",
            "Todos Application | Part 4 | Cheat Sheet",
            "MCQ Pratice - Todos App 4",
            "Coding Pratice 10",
        ]
      },
       {
        name : "Todos Application 3",
        topic : [
           "Todos Application | Part 5",
            "Todos Application | Part 5 | Cheat Sheet",
            "MCQ Pratice - Todos App 5",
            "JS Coding Pratice 6",
            "JS Coding Pratice 7",
            "Array Methods | Pratice 1",
            "Array Methods | Pratice 2",
            "Array Methods | Pratice 3",
            "Coding Pratice 11",
        ]
      },
      {
        name : "Todos Application 4",
        topic : [
           "Todos Application | Part 6",
            "Todos Application | Part 6 | Cheat Sheet",
            "MCQ Pratice - Todos App 6",
            "Coding Pratice 12",
            "Coding Pratice 13",
        ]
      },
      {
        name : "Fetch & Callbacks",
        topic : [
          "Callbacks & Schedulers",
          "Callbacks & Schedulers | Cheat Sheet",
          "MCQ Pratice - Callbacks & Schedulers",
          "Event Listeners & More Events",
          "Event Listeners & More Events | Cheat Sheet",
          "MCQ Pratice - Event Listeners",
          "Hypertext Transfer Protocal (HTTP)",
          "Hypertext Transfer Protocal (HTTP) | Cheat Sheet",
          "MCQ Pratice - HTTP",
          "Coding Pratice 14",
          "Coding Pratice 15",
          "Coding Assignment 1",

        ]
      }, 
      {
        name : "Fetch & Callbacks 2",
        topic : [
          "HTTP Requests using JS",
          "HTTP Requests using JS | Cheat Sheet",
          "MCQ Pratice - HTTP Requests using JS",
          "Wikipedia Search Application",
          "Wikipedia Search Application | Cheat Sheet",
          "MCQ Pratice - Wikipedia Application",
          "Coding Pratice 16",
          "Coding Pratice 17",
          "Coding Pratice 18",

        ]
      },
      {
        name : "Forms",
        topic : [
          "Forms",
          "Forms | Cheat sheet",
          "MCQ Pratice - Forms",
          "Forms | Part - 2",
          "Forms | Part - 2 | Cheat sheet",
          "MCQ Pratice - Forms | Part - 2",
          "Coding Pratice - 19",
          "Coding Pratice - 20",

        ]
      },
      {
        name : "Assignment",
        topic : [
          "MCQ Assignment 1",
          "MCQ Assignment 2",
          "MCQ Assignment 3",
          "MCQ Assignment 4",
          "Coding Assignment 2",
          "Coding Assignment 3",
        ]
      },
      {
        name : "Mock Test",
        topic : [
          "Coding Test 1",
          "Coding Test 2",
          "Coding Test 3",
          "Coding Test 4",
          "JS Coding Test 1",
          "MCQ Test 1",
          "JS Coding Test 2",
          "MCQ Test 2",

        ]
      },
      {
        name : "Build Your Own Dynamic Web Application Course Exam",
        topic : [
          "Build Your Own Dynamic Web Application Course Exam | Instructions",
          "Build Your Own Dynamic Web Application Course Exam"
        ]
      }
     ]
      },
      {
        id: "g2-c2",
        title: "Introduction to Databases",
        progress: 0,
        modules: [{ name: "SQL", topic: ["SQL"] }],
      },
      {
        id: "g2-c3",
        title: "JavaScript Essentials",
        progress: 0,
        modules: [{ name: "JavaScript", topic: ["JavaScript"] }],
      },
      {
        id: "g2-c4",
        title: "Responsive Web Design using Flexbox",
        progress: 0,
        modules: [{ name: "Flexbox", topic: ["Flexbox"] }],
      },
    ],
  },
  {
    id: "goal-3",
    title: "Goal - 3",
    color: "#28a745", // green
    dateRange: "July 1, 2024 - Sept 30, 2024",
    progress: 0,
    courses: [
      {
        id: "g3-c1",
        title: "Git Commandline",
        progress: 0,
        modules: [{ name: "Git", topic: ["Commandline"] }],
      },
      {
        id: "g3-c2",
        title: "Node JS",
        progress: 0,
        modules: [{ name: "Node JS", topic: ["Node JS"] }],
      },
      {
        id: "g3-c3",
        title: "Python Interview Kit",
        progress: 0,
        modules: [{ name: "Python Interview Kit", topic: [] }],
      },
      {
        id: "g3-c4",
        title: "React JS - Getting started",
        progress: 0,
        modules: [{ name: "React JS", topic: ["React JS"] }],
      },
      {
        id: "g3-c5",
        title: "Frontend Interview Kit",
        progress: 0,
        modules: [{ name: "Frontend Interview Kit", topic: [] }],
      },
    ],
  },
]

export default function Courses() {
  const [expandedGoal, setExpandedGoal] = useState(goalsData[0]?.id || null)
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [expandedModule, setExpandedModule] = useState(null)
  const [completedSubtopics, setCompletedSubtopics] = useState({})
  const [selectedSubtopic, setSelectedSubtopic] = useState(null)

  const toggleGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId)
    setExpandedCourse(null)
    setExpandedModule(null)
    setSelectedSubtopic(null)
  }

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
    setExpandedModule(null)
    setSelectedSubtopic(null)
  }

  const toggleModule = (moduleName) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName)
  }
 const navigate = useNavigate();

const isMCQ = (subtopic) => subtopic.toLowerCase().includes("mcq");

  const handleSubtopicClick = (moduleName, subtopic) => {
  setCompletedSubtopics((prev) => ({
    ...prev,
    [moduleName]: { ...prev[moduleName], [subtopic]: true },
  }));

  setSelectedSubtopic(subtopic);

  navigate(`/subtopics/${encodeURIComponent(subtopic)}`);
};


  const getSubtopicContent = (subtopic) => {
    return <p>Content for {subtopic}</p>
  }

  return (
    <div className="courses-container">
      {/* Goals List */}
      <div className="goals-wrapper">
        {goalsData.map((goal) => {
          return (
            <section className="goal-group" key={goal.id}>
              <div className="goal-rail" style={{ backgroundColor: goal.color }} aria-hidden="true" />
              <header className="goal-header" onClick={() => toggleGoal(goal.id)}>
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: goal.color }}>
                    {goal.title}
                  </h2>
                  {goal.dateRange ? <span className="goal-dates">({goal.dateRange})</span> : null}
                </div>
                <div className="goal-meta">
                  <div className="progress-section">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: `${goal.progress || 0}%`, backgroundColor: goal.color }} />
                    </div>
                    <span className="progress-percent" style={{ color: goal.color }}>{`${goal.progress || 0}%`}</span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {goal.courses.length === 0 ? (
                  <div className="no-courses">
                    <h4>No courses found</h4>
                    <p>You don't have any courses in this goal.</p>
                  </div>
                ) : (
                  goal.courses.map((course) => (
                    <div className="courses" key={course.id}>
                      {/* Course Header */}
                      <div className="couses-and-status">
                        <h4>{course.title}</h4>
                        <div className="progress-section_module">
                          <div className="circular-progress" style={{ "--progress": course.progress || 0 }}>
                            <span className="progress-value">{course.progress || 0}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Expand Modules Button */}
                      <div className="active-module">
                        <button onClick={() => toggleCourse(course.id)}>
                          {expandedCourse === course.id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                          )}
                        </button>
                        <p onClick={() => toggleCourse(course.id)}>Active Modules</p>
                      </div>

                      {/* Modules */}
                      {expandedCourse === course.id && (
                        <div className="module-details">
                          {(course.modules || []).map((module) => {
                            const subtopics = module.topic || []
                            const isExpanded = expandedModule === module.name

                            const completedCount = subtopics.filter(
                              (sub) => completedSubtopics[module.name]?.[sub],
                            ).length
                            const progressPercent = subtopics.length ? (completedCount / subtopics.length) * 100 : 0
                            const isModuleCompleted = progressPercent >= 100

                            return (
                              <div className={`module-container ${isExpanded ? "expanded" : ""}`} key={module.name}>
                                <div className="module-single-div" onClick={() => toggleModule(module.name)}>
                                  {/* Timeline Column */}
                                  <div className="timeline">
                                    <div className="circle-row module-circle-row">
                                      <div
                                        className={`circle module-circle ${isModuleCompleted ? "completed" : ""}`}
                                        style={{
                                          "--progress": `${progressPercent}%`,
                                        }}
                                      >
                                        {isModuleCompleted ? "✓" : ""}
                                      </div>
                                    </div>

                                    {isExpanded && (
                                      <>
                                        {subtopics.map((subtopic, index) => (
                                          <div
                                            className="circle-row subtopic-circle-row"
                                            key={`${subtopic}-${index}`}
                                          >
                                            <div
                                              className={`circle subtopic-circle ${completedSubtopics[module.name]?.[subtopic] ? "completed" : ""
                                                }`}
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handleSubtopicClick(module.name, subtopic)
                                              }}
                                            >
                                              {completedSubtopics[module.name]?.[subtopic] ? "✓" : ""}
                                            </div>
                                          </div>
                                        ))}
                                        {subtopics.length > 0 && <div className="vertical-line"></div>}
                                      </>
                                    )}
                                  </div>

                                  {/* Content Column */}
                                  <div className="content-area">
                                    <div className="module_topic_names">
                                      <div className="module-header-row">
                                        <div className="topic-label">
                                          <h6>TOPIC</h6>
                                        </div>
                                        <div className="module-title">
                                          <h5>{module.name}</h5>
                                        </div>
                                      </div>

                                      {/* Expand Modules Button */}
                                      <div className="active-module_subtopic">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            toggleModule(module.name)
                                          }}
                                          aria-label={isExpanded ? "Collapse module" : "Expand module"}
                                        >
                                          {isExpanded ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="22"
                                              height="22"
                                              fill="currentColor"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                            </svg>
                                          ) : (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="22"
                                              height="22"
                                              fill="currentColor"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                          )}
                                        </button>
                                      </div>
                                    </div>

                                    {isExpanded && (
                                      <div className="subtopics-section">
                                        {subtopics.map((subtopic) => (
                                          <div
                                            className="subtopic-content-row"
                                            key={subtopic}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleSubtopicClick(module.name, subtopic)
                                            }}
                                          >
                                            <span className="subtopic-text">
  {isMCQ(subtopic) ? "MCQ Practice" : subtopic}
</span>

                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Right Side Lesson Content */}
                                {isExpanded && selectedSubtopic && (
                                  <div className="lesson-content">{getSubtopicContent(selectedSubtopic)}</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
