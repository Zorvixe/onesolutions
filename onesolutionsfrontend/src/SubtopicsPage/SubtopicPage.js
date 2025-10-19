import React, { useState } from "react";

import "./SubtopicPage.css";

// Python Cheat Sheets & Subtopics
import ProblemSol_Debugging_CS from "../Python/NestedConditions/ProblemSol_Debugging_CS";
import Problem_sol_Debugging_4_CS from "../Python/ComparingStr&NamingVar/Problem_sol_Debugging_4_CS";
import Problem_sol_Debugging_5_CS from "../Python/ComparingStr&NamingVar/Problem_sol_Debugging_5_CS";
import Problem_sol_6_CS from "../Python/LoopContronStmts/Problem_sol_6_CS";
import Problem_sol_7_CS from "../Python/LoopContronStmts/Problem_sol_7_Cs"; 

import Variables_DT_CS_2 from "../Python/IntroductiontoPython/Variables_DT_CS_2";
import Pro_W_P_CS_1 from "../Python/IntroductiontoPython/Pro_W_P_CS_1";
import Seq_OF_Instruction_CS_3 from "../Python/IntroductiontoPython/Seq_OF_Instruction_CS_3";
import Inp_Oup_Basics_CS_1 from "../Python/Inp_Oup_Basiscs/Inp_Oup_Basics_CS_1";
import Type_Con_CS_2 from "../Python/Inp_Oup_Basiscs/Type_Con_CS_2";
import ConditionalStmts_CS_3 from "../Python/Operators&ConditionalStmts/ConditionalStmts_CS_3";
import LogicalOperators_CS_2 from "../Python/Operators&ConditionalStmts/LogicalOperators_CS_2";
import RelationOperator_CS_1 from "../Python/Operators&ConditionalStmts/RelationOperator_CS_1";
import Nested_con_CS_1 from "../Python/NestedConditions/Nested_con_CS_1";
import ForLoop_CS_2 from "../Python/Loops/ForLoop_CS_2";
import Approachto_HollowPattern_CS from "../Python/Loops/Approachto_HelloPattern_CS";
import String_Methods_CS from "../Python/Loops/String_Methods_CS";
import Loops_CS_2 from "../Python/Loops/Loops_CS"; 
import NestedLoops_CS_1 from "../Python/LoopContronStmts/NestedLoops_CS_1";
import String_Methods_Additional_Material_CS from "../Python/Loops/String_Methods_Additional_Material_CS";
import LoopControlStmts_CS_2 from "../Python/LoopContronStmts/LoopConrolStmts_CS_2";
import ComparingStrAndNamingVar_CS_1 from "../Python/ComparingStr&NamingVar/ComparingStr&NamingVar_CS_1";
import List_CS_1 from "../Python/Lists/List_CS_1";
import Workingwith_Data_Time_CS from "../Python/Miscellaneous/Workingwith_Data_Time_CS.js";
import Lists_Strings_CS_1 from "../Python/Functions/Lists_String_CS_1";
import Functions_CS_2 from "../Python/Functions/Functions_CS_2";
import Function_Argu_CS_3 from "../Python/Functions/Function_Argu_CS_3";
import Built_in_Fun_CS_1 from "../Python/Recursion/Built_in_Fun_CS_1";
import FunCallStackRecursion from "../Python/Recursion/FunCallStack_Recursion";
import ListMethods from "../Python/Recursion/ListMethods";
import Tuples_Sequences_CS_1 from "../Python/Tuples&Sets/Tuples_Sequences_CS_1";
import Sets_CS_2 from "../Python/Tuples&Sets/Sets_CS_2";
import Set_Operations_CS_3 from "../Python/Tuples&Sets/Set_Operations_CS_3";
import Dictionaries_CS_2 from "../Python/Dictionaries/Dictionaries_CS_2";
import Builtin_Fun_Additional_Material_CS from "../Python/Dictionaries/Builtin_Fun_Additional_Material_CS.js";
import NestedList_StringFormatting_CS_1 from "../Python/Dictionaries/NestedList_StringFormating_CS_1";
import Working_With_Dictionaries_CS_3 from "../Python/Dictionaries/Working_With_Dictionaries_CS_3";
import Introductionto_OOP_CS_1 from "../Python/IntroductiontoOOP/Introductionto_OPP_CS_1";
import Introductionto_Opp_CS_2 from "../Python/IntroductiontoOOP/Introductionto_Opp_CS_2";
import Classes_Object_CS_3 from "../Python/IntroductiontoOOP/Classes_Object_CS_3";
import Attributes_Methods_CS_4 from "../Python/IntroductiontoOOP/Attributes_Methods_CS_4";
import Inheritance_Part1_CS_5 from "../Python/IntroductiontoOOP/Inheritance_Part1_CS_5";
import Inheritance_Part2_CS_2 from "../Python/IntroductiontoOOP/Inheritance_Part2_CS_2";
import Python_Standard_Library_CS_1 from "../Python/Miscellaneous/Python_Standard_Library_CS_1";
import Scope_Namespaces_CS_2 from "../Python/Miscellaneous/Scope_Namespaces_CS_2";
import Errors_Exceptions_CS_3 from "../Python/Miscellaneous/Errors_Exceptions_CS_3";
import Dates_Time_CS_4 from "../Python/Miscellaneous/Dates_Time_CS_4";
import Workingwith_Date_Time_CS from "../Python/Miscellaneous/Workingwith_Data_Time_CS.js";
import Python_Summary_CS_1 from "../Python/Revision/Python_Summary_CS_1";
import Python_Summary_CS_2 from "../Python/Revision/Python_Summary_CS_2";
import Python_Summary_CS_3 from "../Python/Revision/Python_Summary_CS_3";
import Python_Summary_CS_4 from "../Python/Revision/Python_Summary_CS_4";

import Introductionto_HTML_CS_1 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_HTML_CS_1";
import Introductionto_Css_CS_1 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_CS_1";
import Introductionto_Css_CS_2 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_CS_2";
import Introductionto_Css_CS_3 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_CS_3";
import Introductionto_Css_BoxModel_CS_1 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_CS_1";
import Introductionto_Css_BoxModel_CS_2 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_CS_2";
import Introductionto_BootStrap_CS_1 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_CS_1";
import Introductionto_BootStrap_CS_2 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_CS_2";
import Approachto_Develop_Layout_CS_1 from "../StaticWebsite/DevelopingLayouts/Approachto_Develop_Layout_CS_1";
import FavouritePlaces_DetailView_CS from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_DetailView_CS";
import FavouritePlaces_Section_CS_1 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_Section_CS_1";
import OnDemand_Session_CS from "../StaticWebsite/WebSiteIntegration/OnDemand_Sesstion_CS";
import HTML_HyperLinks_CS from "../StaticWebsite/WebSiteIntegration/HTML_HyperLinks_CS";
import Website_Integration_CS_1 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_CS_1";
import Website_Integration_CS_2 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_CS_2";
import StaticSummary_CS from "../StaticWebsite/Revision/Static_Summary_CS";

import Introductionto_Responsive_WD_CS from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Introductionto_Responsive_WD_CS";
import Bootstrap_Grid_Sys_CS_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_CS_1";
import Bootstrap_Grid_Sys_CS_2 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_CS_2";
import Bootstrap_Navbar_CS from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Navbar_CS";
import Css_Selector_Inheritance_CS from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Selector_Inheritance_CS";
import Css_Specificity_Cascade_CS from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Specificity_Cascade_CS";
import Banner_Section_CS from "../ResponsiveWebsite/Developing_Layouts1/Banner_Section_CS";
import Explore_Menu_Section_CS from "../ResponsiveWebsite/Developing_Layouts1/Explore_Menu_Section_CS";
import Healthy_Delivary_Payments_CS from "../ResponsiveWebsite/Developing_Layouts1/Healthy_Delivary_Payments_CS";
import Why_Chooseus_Section_CS from "../ResponsiveWebsite/Developing_Layouts1/Why_Chooseus_Section_CS";
import CSS_Gradience_CS from "../ResponsiveWebsite/Developing_Layouts2/CSS_Gradience_CS";
import Followus_More_Styles_CS from "../ResponsiveWebsite/Developing_Layouts2/Followus_More_Styles_CS";
import Responsive_Summary_CS from "../ResponsiveWebsite/Revision/Responsive_Summary_CS";

// If your file is in src/components or src/ somewhere
// import DOM_Event_Fundamentals_CS from "../JavaScript/Introductionto_Js_Variables/DOM_Event_Fundamentals_CS";


// MCQ Wrapper

import MCQWrapper from "../SubtopicsPage/MCQWrapper";



const modules = {
  Python: {
    displayName: "Python Programming",
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
  Static_Website : {
    displayName: "Static Website",
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
  Dynamic_Website : {
    displayName: "Responsive Website",
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
  JavaScript : {
    displayName: "Dynamic Web Application",
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
          "Build Your Own Dynamic Web Application Course Exam",

        ]
      }
     ]
  }

}

// Map subtopics to their components
const subtopicComponents = {

  "Problem Solving - Part 6 | Cheat Sheet": Problem_sol_6_CS,
  "Problem Solving - Part 7 | Cheat Sheet" : Problem_sol_7_CS ,

  "Problem Solving and Debugging | Cheat Sheet": ProblemSol_Debugging_CS,
   "Problem Solving and Debugging - Part 4 | Chaet Sheet":Problem_sol_Debugging_4_CS,
   "Problem Solving and Debugging - Part 5 | Chaet Sheet": Problem_sol_Debugging_5_CS,
 

  "Variables and Data Types | Cheat Sheet": Variables_DT_CS_2,
  "Programming with Python | Cheat Sheet": Pro_W_P_CS_1,
  "Sequence of Instructions | Cheat Sheet": Seq_OF_Instruction_CS_3,
  "Type Conversion | Cheat Sheet": Type_Con_CS_2,
  "Input and Output Basics | Cheat Sheet": Inp_Oup_Basics_CS_1,
  "Relational Operators | Cheat Sheet": RelationOperator_CS_1,
  "Logical Operators | Cheat Sheet": LogicalOperators_CS_2,
  "Conditional Statements | Cheat Sheet": ConditionalStmts_CS_3,
  "Loops | Cheat Sheet": Loops_CS_2,
  "For Loop | Cheat Sheet": ForLoop_CS_2,
  "Approach for Hollow Pattern | Cheat sheet": Approachto_HollowPattern_CS,
  "String Methods | Cheat Sheets":String_Methods_CS,
  "Nested Conditional Statements | Cheat Sheet": Nested_con_CS_1,
  "Nested Loops | Cheat Sheet": NestedLoops_CS_1,
  "String Methods | Additional Reading Material" : String_Methods_Additional_Material_CS,
  "Loop Control Statements | Cheat Sheet": LoopControlStmts_CS_2,
  "Comparing Strings & Naming Variables | Cheat Sheet": ComparingStrAndNamingVar_CS_1,
  "Lists | Cheat Sheet": List_CS_1 ,
  "List & Strings | Cheat Sheet": Lists_Strings_CS_1,
  "Functions | Cheat Sheet": Functions_CS_2,
  "Function Arguments | Cheat Sheet": Function_Argu_CS_3,
  "Built-in Functions | Cheat Sheet": Built_in_Fun_CS_1,
  "Function Call Stack & Recursion | Cheat Sheet": FunCallStackRecursion,
  "List Methods | Cheat Sheet": ListMethods,
 "Working with Lists | Cheat Sheet" :Workingwith_Data_Time_CS,
  "Tuples & Sequences | Cheat Sheet": Tuples_Sequences_CS_1,
  "Sets | Cheat Sheet": Sets_CS_2,
  "Set Operations | Cheat Sheet": Set_Operations_CS_3,
  "Nested Lists & String Formatting | Cheat Sheet": NestedList_StringFormatting_CS_1,
  "Dictionaries | Cheat Sheet": Dictionaries_CS_2,
  "Buil-in Functions | Additional Reading Material":Builtin_Fun_Additional_Material_CS,
  "Working with Dictionaries | Cheat Sheet": Working_With_Dictionaries_CS_3,
  "Introduction to Object Oriented Programming": Introductionto_OOP_CS_1,
  "Introduction to Object Oriented Programming | Cheat Sheet": Introductionto_OOP_CS_1,
  "Object Oriented Programming": Introductionto_Opp_CS_2,
  "Object Oriented Programming | Cheat Sheet": Introductionto_Opp_CS_2,
  "Classes & Objects": Classes_Object_CS_3,
  "Classes & Objects | Cheat Sheet": Classes_Object_CS_3,
  "Attribute Methods": Attributes_Methods_CS_4,
  "Attribute Methods | Cheat Sheet": Attributes_Methods_CS_4,
  "Inheritance Part1 | Cheat Sheet": Inheritance_Part1_CS_5,
  "Inheritance Part2 | Cheat Sheet": Inheritance_Part2_CS_2,
  "Python Standard Library | Cheat Sheet": Python_Standard_Library_CS_1,
  "Scope & Namespaces | Cheat Sheet": Scope_Namespaces_CS_2,
  "Errors & Exceptions | Cheat Sheet": Errors_Exceptions_CS_3,
  "Dates & Time | Cheat Sheet": Dates_Time_CS_4,
  "Working with Dates & Times | Cheat Sheet":Workingwith_Date_Time_CS,
  "Python Summary Cheat Sheet - 1": Python_Summary_CS_1,
  "Python Summary Cheat Sheet - 2": Python_Summary_CS_2,
  "Python Summary Cheat Sheet - 3": Python_Summary_CS_3,
  "Python Summary Cheat Sheet - 4": Python_Summary_CS_4,
  "MCQ Pratice": MCQWrapper,
  "MCQ Pratice - 1": MCQWrapper,
  "MCQ Pratice - 2": MCQWrapper,
   
  "Introduction to HTML | Cheat Sheet" : Introductionto_HTML_CS_1,
  "Introduction to CSS Prat 1 | Cheat Sheet" : Introductionto_Css_CS_1,
  "Introduction to CSS Prat 2 | Cheat Sheet" : Introductionto_Css_CS_2,
  "Introduction to CSS Prat 3 | Cheat Sheet" : Introductionto_Css_CS_3,
  "Introduction to CSS Box Model Part 1 | Cheat Sheet" : Introductionto_Css_BoxModel_CS_1,
  "Introduction to CSS Box Model Part 2 | Cheat Sheet" : Introductionto_Css_BoxModel_CS_2,
  "Introduction to Bootstrap Part 1 | Cheat Sheet" : Introductionto_BootStrap_CS_1,
  "Introduction to Bootstrap Part 2 | Cheat Sheet" : Introductionto_BootStrap_CS_2,
  "Approach to Develop a Layout | Cheat Sheet": Approachto_Develop_Layout_CS_1,
  "Favourite Place Detailed View Section | Cheat Sheet" : FavouritePlaces_DetailView_CS,
  "Favourite Places Section | Cheat Sheet" : FavouritePlaces_Section_CS_1,
  "On-Demand Session | Cheat Sheets" : OnDemand_Session_CS,
  "HTML Hyperlinks | Cheat Sheets" : HTML_HyperLinks_CS,
  "Website Integration Part 1 | Cheat Sheet" : Website_Integration_CS_1,
  "Website Integration Part 2 | Cheat Sheet" : Website_Integration_CS_2,
  "Static Summary CheatSheet" : StaticSummary_CS,

   "Introduction to Responsive Web Design | Cheat Sheet":Introductionto_Responsive_WD_CS,
  "BootStrap Grid System Prat 1 | Cheat Sheet": Bootstrap_Grid_Sys_CS_1,
  "BootStrap Grid System Part 2 | Cheat Sheet": Bootstrap_Grid_Sys_CS_2,
  "BootStrap Navbar | Cheat Sheet" : Bootstrap_Navbar_CS ,
  "CSS Selectors & Inheritance | Cheat Sheet" : Css_Selector_Inheritance_CS,
  "CSS Specificity & Cascade | Cheat Sheet" : Css_Specificity_Cascade_CS,
  "Banner Section | Cheat Sheet" : Banner_Section_CS,
  "Explore New Section | Cheat Sheet" : Explore_Menu_Section_CS,
  "Healthy Food, Delivery and Payment, Thanking Customers Section | Cheat Sheet" : Healthy_Delivary_Payments_CS,
  "Why Choose us? Section | Cheat Sheet" : Why_Chooseus_Section_CS,
  "CSS Gradients & More BootStrap Components | Cheat Sheet" : CSS_Gradience_CS,
  "Follow Us Section & More Styling | Cheat Sheet" : Followus_More_Styles_CS,
   "Responsive Summary CheatSheet" : Responsive_Summary_CS,
};


// Explicit MCQ Mapping (no change)
const mcqMapping = {
  "MCQ Pratice": "Programming with Python",
  "MCQ Pratice - 1": "Variables and Data Types",
  "MCQ Pratice - 2": "Sequence of Instructions",
  "MCQ Pratice - I/O": "Input and Output Basics",
  "MCQ Pratice - Type Con": "Type Conversion",
  "MCQ Pratice - Rel Ope": "Relational Operators",
  "MCQ Pratice - Log Ope": "Logical Operators",
  "MCQ Pratice - Con stmts": "Conditional Statements",
  "MCQ Pratice - Nested Con": "Nested Conditions",
  "MCQ Pratice - Problem Solv Debug" : "Problem Solving and Debugging",
  "MCQ Pratice - Prob_Sol" : "Problem Solving - Part 6",

  
  "MCQ Pratice - Loops": "Loops",
  "MCQ Pratice -String Methods" : "String Methods",
  "MCQ Pratice - For Loops": "For Loop",
  "MCQ Pratice - Nested Loops": "Nested Loops",
  "MCQ Pratice - Loop Con Stmts": "Loop Control Stmts",
  "MCQ Pratice - ComStr_NamVar": "Comparing Strings & Naming Variables",
  "MCQ Pratice - Lists": "Lists",
  "MCQ Pratice - Working_Lists": "Working with Lists",
  "MCQ Pratice - List_Str": "List & Strings",
  "MCQ Pratice - Functions": "Functions",
  "MCQ Pratice - Fun_Arg": "Function Arguments",
  "MCQ Pratice - Builtin_Fun": "Built-in Functions",
  "MCQ Pratice - FunCallStack_Recursion": "Function Call Stack & Recursion",
  "MCQ Pratice - List Methods": "List Methods",
  "MCQ Pratice - Tuples_Seq": "Tuples & Sequences",
  "MCQ Pratice - Sets": "Sets",
  "MCQ Pratice - Set_Ope": "Set Operations",
  "MCQ Pratice - NestedList_StrFormat": "Nested Lists & String Formatting",
  "MCQ Pratice - Dictionaries": "Dictionaries",
  "MCQ Pratice - Working_Dictionaries": "Working with Dictionaries",
  "MCQ Pratice - Intro_OOP": "Introduction to OOP Part 1",
  "MCQ Pratice - OOP": "Introduction to OOP Part 2",
  "MCQ Pratice - Classes_Obj": "Classes & Objects",
  "MCQ Pratice - Att_Meth": "Attributes & Methods",
  "MCQ Pratice - Inheritance1": "Inheritance Part 1",
  "MCQ Pratice - Inheritance2": "Inheritance Part 2",
  "MCQ Pratice - PythonLibrary": "Python Standard Library",
  "MCQ Pratice - Scope_Namespaces": "Scope & Namespaces",
  "MCQ Pratice - Errors_Excep": "Errors & Exceptions",
  "MCQ Pratice - Dates_Time": "Dates & Time",
   "MCQ Pratice - Working with Dates & Times": "Working with Dates & Times",


"MCQ Practice - HTML": "Introduction to HTML",
"MCQ Practice - CSS 1": "Introduction to CSS Prat 1",
"MCQ Practice - CSS 2": "Introduction to CSS Prat 2",
"MCQ Practice - CSS 3": "Introduction to CSS Prat 3",
"MCQ Practice - BoxModel 1": "Introduction to CSS Box Model Part 1",
"MCQ Practice - BoxModel 2": "Introduction to CSS Box Model Part 2",
"MCQ Practice - Bootstrap 1": "Introduction to Bootstrap Part 1",
"MCQ Practice - Bootstrap 2": "Introduction to Bootstrap Part 2",
"MCQ Practice - Layout 1": "Favourite Places Section",
"MCQ Practice - Layout 2": "Approach to Develop a Layout",
"MCQ Practice - Layout 3": "Favourite Place Detailed View Section",
"MCQ Practice - Website 1": "Website Integration Part 1",
"MCQ Practice - Website 2": "Website Integration Part 2",
"MCQ Practice - HTML Hyperlinks": "HTML Hyperlinks",
"MCQ Practice - OnDemand": "On-Demand Session",
"MCQ Assignment 1": "MCQ Assignment 1",
"MCQ Assignment 2": "MCQ Assignment 2",
"MCQ Assignment 3": "MCQ Assignment 3",
"MCQ Assignment 4": "MCQ Assignment 4",

"MCQ Pratice - Res_WD": "Introduction to Responsive Web Design",
"MCQ Pratice - B_GS_1": "Bootstrap Grid System Part 1",
"MCQ Pratice - B_GS_2": "Bootstrap Grid System Part 2",
"MCQ Pratice - B_Nav": "Bootstrap Navbar",


  "MCQ Practice - Banner Section": "Banner Section",
"MCQ Practice - Explore Menu Section": "Explore Menu Section",
"MCQ Practice - Healthy Delivery & Payments": "Healthy Delivery & Payments",
"MCQ Practice - Why Choose Us Section": "Why Choose Us Section",
"MCQ Practice - CSS Selectors & Inheritance": "CSS Selectors & Inheritance",
"MCQ Practice - CSS Specificity & Cascade": "CSS Specificity & Cascade",
"MCQ Practice - Follow_us" : "Follow Us Section & More Styling",
"MCQ Practice - CSS_Gradients" : "CSS Gradients & More BootStrap Components",
"MCQ Assignment 1": "MCQ Assignment 1",
  "MCQ Assignment 2": "MCQ Assignment 2",
  "MCQ Assignment 3": "MCQ Assignment 3",
  "MCQ Assignment 4": "MCQ Assignment 4",

};


const SubtopicPage = () => {
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [completedSubtopics, setCompletedSubtopics] = useState({});
  const [selectedCourseKey, setSelectedCourseKey] = useState("");
  const [expandedModule, setExpandedModule] = useState(null);

  const selectedCourse = selectedCourseKey ? modules[selectedCourseKey] : null;

  const handleSubtopicComplete = (subtopic) => {
    setCompletedSubtopics((prev) => ({ ...prev, [subtopic]: true }));
  };

  const handleModuleClick = (moduleName) => {
    setExpandedModule((prev) => (prev === moduleName ? null : moduleName));
    setSelectedSubtopic(null);
  };

  // Universal MCQ check
  const isMCQ = (subtopic) => subtopic.toLowerCase().includes("mcq");

  const renderContent = () => {
    if (!selectedSubtopic) return <p>Please select a subtopic</p>;

    if (!selectedCourse.modules.some((module) => module.topic.includes(selectedSubtopic))) {
      return <p>Subtopic not available in this course</p>;
    }

    if (isMCQ(selectedSubtopic)) {
      const actualSubtopic = mcqMapping[selectedSubtopic];
      if (!actualSubtopic) return <p>No MCQ found for this section</p>;
      return (
        <MCQWrapper
          subtopic={actualSubtopic}
          onSubtopicComplete={() => handleSubtopicComplete(selectedSubtopic)}
        />
      );
    }

    const Component = subtopicComponents[selectedSubtopic];
    return Component ? (
      <Component
        subtopic={selectedSubtopic}
        onSubtopicComplete={() => handleSubtopicComplete(selectedSubtopic)}
      />
    ) : (
      <p>Content not found</p>
    );
  };

  return (
    <div className="subtopic-page">
      <div className="left-panel">
        {/* Course Selector */}
        <div className="course-selector">
          <label>Select Course: </label>
          <select
            value={selectedCourseKey}
            onChange={(e) => {
              setSelectedCourseKey(e.target.value);
              setExpandedModule(null);
              setSelectedSubtopic(null);
            }}
          >
            <option value="">-- Select a course --</option>
            {Object.keys(modules).map((key) => (
              <option key={key} value={key}>
                {modules[key].displayName}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse ? (
          <>
            <h2>{selectedCourse.displayName} </h2>
            {selectedCourse.modules.map((module) => (
              <div key={module.name} className="module-section">
               <h4 onClick={() => handleModuleClick(module.name)}>
                  {module.name}
                  <span className="chevron-icon">
                    {expandedModule === module.name ? (
                      <i className="bi bi-chevron-bar-down"></i>
                    ) : (
                      <i className="bi bi-chevron-bar-right"></i>
                    )}
                  </span>
                </h4>


                {expandedModule === module.name && (
                  <div className="subtopics">
                    {module.topic.map((sub) => {
                      const displayName = isMCQ(sub) ? "MCQ Pratice" : sub;
                      return (
                        <div
                          key={sub}
                          className={`subtopic-item ${
                            selectedSubtopic === sub ? "active" : ""
                          } ${completedSubtopics[sub] ? "completed" : ""}`}
                          onClick={() => setSelectedSubtopic(sub)}
                        >
                          {displayName}
                          {completedSubtopics[sub] && <span className="completion-tick">✓</span>}
                        </div>
                      );
                      
                    })}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>Please select a course to see modules</p>
        )}
      </div>

      <div className="right-panel">{renderContent()}</div>
    </div>
  );
};

export default SubtopicPage