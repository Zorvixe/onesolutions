import React, { useState } from "react";

// Instructions
import MCQInstructions from "../SubtopicsPage/MCQInstructions.js";

// ---------- Python MCQs ----------
import Pro_W_P_MCQ from "../Python/IntroductiontoPython/Pro_W_P_MCQ.js";
import Variables_DT_MCQ from "../Python/IntroductiontoPython/Variables_DT_MCQ.js";
import Inp_Oup_Basics_MCQ from "../Python/Inp_Oup_Basiscs/Inp_Oup_Basics_MCQ.js";
import Seq_OF_Instruction_MCQ from "../Python/IntroductiontoPython/Seq_OF_Instruction_MCQ.js";
import ConditionalStmts_MCQ from "../Python/Operators&ConditionalStmts/ConditionalStmts_MCQ.js";
import LogicalOperators_MCQ from "../Python/Operators&ConditionalStmts/LogicalOperators_MCQ.js";
import RelationOperator_MCQ from "../Python/Operators&ConditionalStmts/RelationOperator_MCQ.js";
import Type_Con_MCQ from "../Python/Inp_Oup_Basiscs/Type_Con_MCQ.js";
import Nested_con_MCQ from "../Python/NestedConditions/Nested_con_MCQ.js";
import Loops_MCQ from "../Python/Loops/Loops_MCQ.js";
import ForLoop_MCQ from "../Python/Loops/ForLoop_MCQ.js";
import String_Methods_MCQ from "../Python/Loops/String_Methods_MCQ.js";
import LoopControlStmts_MCQ from "../Python/LoopContronStmts/LoopControlStmts_MCQ.js";
import NestedLoops_MCQ from "../Python/LoopContronStmts/NestedLoops_MCQ.js";
import ComparingStrAndNamingVar_MCQ from "../Python/ComparingStr&NamingVar/ComparingStrAndNamingVar_MCQ.js";
import List_MCQ from "../Python/Lists/List_MCQ.js";
import Workingwith_Lists_MCQ from "../Python/Lists/Workingwith_Lists_MCQ.js";
import Lists_String_MCQ from "../Python/Functions/Lists_String_MCQ.js";
import Functions_Argu_MCQ from "../Python/Functions/Functions_Argu_MCQ.js";
import Functions_CS_MCQ from "../Python/Functions/Functions_MCQ.js";
import Built_in_Fun_MCQ from "../Python/Recursion/Built_in_Fun_MCQ.js";
import FunCallStack_Recursion_MCQ from "../Python/Recursion/FunCallStack_Recursion_MCQ.js";
import ListMethods_MCQ from "../Python/Recursion/ListMethods_MCQ.js";
import SetOperations_MCQ from "../Python/Tuples&Sets/Set_Operations_MCQ.js";
import Sets_MCQ from "../Python/Tuples&Sets/Sets_MCQ.js";
import Tuples_Sequences_MCQ from "../Python/Tuples&Sets/Tuples_Sequences_MCQ.js";
import NestedList_StringFormatting_MCQ from "../Python/Dictionaries/NestedList_StringFormating_MCQ.js";
import Dictionaries_MCQ from "../Python/Dictionaries/Dictionaries_MCQ.js";
import Working_With_Dictionaries_MCQ from "../Python/Dictionaries/Working_With_Dictionaries_MCQ.js";
import Attributes_Methods_MCQ from "../Python/IntroductiontoOOP/Attributes_Methods_MCQ.js";
import Classes_Object_MCQ from "../Python/IntroductiontoOOP/Classes_Object_MCQ.js";
import Inheritance_Part1_MCQ from "../Python/IntroductiontoOOP/Inheritance_Part1_MCQ.js";
import Inheritance_Part2_MCQ from "../Python/IntroductiontoOOP/Inheritance_Part2_MCQ.js";
import Introductionto_OOP1_MCQ from "../Python/IntroductiontoOOP/Introductionto_OPP1_MCQ.js";
import Introduction_Opp_MCQ2 from "../Python/IntroductiontoOOP/Introduction_Opp_MCQ2.js";
import Dates_Time_MCQ from "../Python/Miscellaneous/Dates_Time_MCQ.js";
import Errors_Exceptions_MCQ from "../Python/Miscellaneous/Errors_Exceptions_MCQ.js";
import Python_Standard_Library_MCQ from "../Python/Miscellaneous/Python_Standard_Library_MCQ.js";
import Scope_Namespaces_MCQ from "../Python/Miscellaneous/Scope_Namespaces__MCQ.js";
import Workingwith_Data_Time_MCQ from "../Python/Miscellaneous/Workingwith_Date_Time_MCQ.js";
import ProblemSol_Debugging_MCQ from "../Python/NestedConditions/ProblemSol_Debugging_MCQ";

import Problem_sol_6_MCQ from "../Python/LoopContronStmts/Problem_sol_6_MCQ.js";
import Problem_sol_7_MCQ from "../Python/LoopContronStmts/Problem_sol_7_MCQ.js";

// ---------- Static Website MCQs ----------
import Introductionto_HTML_CS_MCQ from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_HTML_MCQ.js";
import Introductionto_Css_MCQ_1 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_1.js";
import Introductionto_Css_MCQ_2 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_2.js";
import Introductionto_Css_MCQ_3 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_3.js";
import Introductionto_Css_BoxModel_MCQ_1 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_MCQ_1.js";
import Introductionto_Css_BoxModel_MCQ_2 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_MCQ_2.js";
import Introductionto_BootStrap_MCQ_1 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_MCQ_1.js";
import Introductionto_BootStrap_MCQ_2 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_MCQ_2.js";
import FavouritePlaces_Section_MCQ_1 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_Section_MCQ_1.js";
import Approachto_Develop_Layout_MCQ_2 from "../StaticWebsite/DevelopingLayouts/Approachto_Develop_Layout_MCQ_2.js";
import FavouritePlaces_DetailView_MCQ_3 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_DetailView_MCQ_3.js";
import OnDemand_Session_MCQ from "../StaticWebsite/WebSiteIntegration/OnDemand_Session_MCQ.js";
import Website_Integration_MCQ_1 from "../StaticWebsite/WebSiteIntegration/Website_Integration_MCQ_1.js";
import Website_Integration_MCQ_2 from "../StaticWebsite/WebSiteIntegration/Website_Integration_MCQ_2.js";
import HTML_HyperLinks_MCQ from "../StaticWebsite/WebSiteIntegration/HTML_HyperLinks_MCQ.js";
import Static_MCQ_Assignment1 from "../StaticWebsite/Assignments/Static_MCQ_Assignment1.js";
import Static_MCQ_Assignment2 from "../StaticWebsite/Assignments/Static_MCQ_Assignment2.js";
import Static_MCQ_Assignment3 from "../StaticWebsite/Assignments/Static_MCQ_Assignment3.js";
import Static_MCQ_Assignment4 from "../StaticWebsite/Assignments/Static_MCQ_Assignment4.js";

// ---------- Responsive Website MCQs ----------
import Introductionto_Responsive_WD_MCQ from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Introductionto_Responsive_WD_MCQ.js";
import Bootstrap_Grid_Sys_MCQ_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_MCQ_1.js";
import Bootstrap_Grid_Sys_MCQ_2 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_MCQ_2.js";
import Bootstrap_Navbar_MCQ from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Navbar_MCQ.js";
import Banner_Section_MCQ from "../ResponsiveWebsite/Developing_Layouts1/Banner_Section_MCQ.js";
import Explore_Menu_Section_MCQ from "../ResponsiveWebsite/Developing_Layouts1/Explore_Menu_Section_MCQ.js";
import Healthy_Delivary_Payments_MCQ from "../ResponsiveWebsite/Developing_Layouts1/Healthy_Delivary_Payments_MCQ.js";
import Why_Chooseus_Section_MCQ from "../ResponsiveWebsite/Developing_Layouts1/Why_Chooseus_Section_MCQ.js";
import Css_Selector_Inheritance_MCQ from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Selector_Inheritance_MCQ.js";
// import Css_Specificity_Cascade_MCQ from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Specificity_Cascade_MCQ.js";
import Css_Specificity_Cascade_MCQ from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Specificity_Cascade_MCQ.js";
import Followus_More_Styles_MCQ from "../ResponsiveWebsite/Developing_Layouts2/Followus_More_Styles_MCQ.js";
import CSS_Gradience_MCQ from "../ResponsiveWebsite/Developing_Layouts2/CSS_Gradience_MCQ.js";
import Responsive_MCQ_Assignments_1 from "../ResponsiveWebsite/Assignments/Responsive_MCQ_Assignments_1.js";
import Responsive_MCQ_Assignments_2 from "../ResponsiveWebsite/Assignments/Responsive_MCQ_Assignments_2.js";
import Responsive_MCQ_Assignments_3 from "../ResponsiveWebsite/Assignments/Responsive_MCQ_Assignments_3.js";

//JavaScript MCQ
import Introductionto_Dynamic_Application_MCQ from "../JavaScript/Introductionto_Js_Variables/Introductionto_Dynamic_Application_MCQ.js";
import Dom_Event_Fundamentals_MCQ from "../JavaScript/Introductionto_Js_Variables/Dom_Event_Fundamentals_MCQ.js";
import PrimitiveTypes_Conditionals_MCQ from "../JavaScript/Introductionto_Js_Variables/PrimitiveTypes_Conditionals_MCQ.js";
import InputEle_MathFunctions_MCQ from "../JavaScript/Introductionto_Js_Variables/InputEle_MathFunctions_MCQ.js";
import Arrays_Dom_Manipulations_MCQ from "../JavaScript/Arrays_Objects/Arrays_Dom_Manipulations_MCQ.js";
import Objects_MCQ from "../JavaScript/Arrays_Objects/Objects_MCQ.js";
import Todos_Applications_MCQ from "../JavaScript/Todos_Application/Todos_Applications_MCQ.js";
import On_Demand_Session_MCQ from "../JavaScript/Todos_Application/On_Demand_Session_MCQ.js";
import Todos_Application_MCQ_2 from "../JavaScript/Todos_Application/Todos_Application_MCQ_2.js";
import Todos_Application_MCQ_4 from "../JavaScript/Todos_Application_2/Todos_Application_MCQ_4.js";
import Todos_Application_MCQ_3 from "../JavaScript/Todos_Application_2/Todos_Application_MCQ_3.js";
import Todos_Application_MCQ_5 from "../JavaScript/Todos_Application_3/Todos_Application_MCQ_5.js";
import Todos_Application_MCQ_6 from "../JavaScript/Todos_Application_4/Todos_Application_MCQ_6.js";
import Callbacks_Schedulers_MCQ from "../JavaScript/Fetch_Callbacks/Callbacks_Schedulers_MCQ.js";
import Event_Listners_More_Events_MCQ from "../JavaScript/Fetch_Callbacks/Event_Listners_More_Events_MCQ.js";
import Hypertext_Transer_Protocal_MCQ from "../JavaScript/Fetch_Callbacks/Hypertext_Transer_Protocal_MCQ.js";
import HTTP_Request_Using_JS_MCQ from "../JavaScript/Fetch_Callbacks_2/HTTP_Request_Using_JS_MCQ.js";
import Wikipedia_Search_MCQ from "../JavaScript/Fetch_Callbacks_2/Wikipedia_Search_MCQ.js";
import Forms_MCQ_1 from "../JavaScript/Forms/Forms_MCQ_1.js";
import Forms_MCQ_2 from "../JavaScript/Forms/Forms_MCQ_2.js";
import JS_MCQ_Assignment_1 from "../JavaScript/Assignment/JS_MCQ_Assignment_1.js";
import JS_MCQ_Assignment_2 from "../JavaScript/Assignment/JS_MCQ_Assignment_2.js";
import JS_MCQ_Assignment_3 from "../JavaScript/Assignment/JS_MCQ_Assignment_3.js";
import JS_MCQ_Assignment_4 from "../JavaScript/Assignment/JS_MCQ_Assignment_4.js";

//Flexbox
import Box_Sizing_MCQ from "../FlexBox/CSS_Flexbox/Box_Sizing_MCQ.js";
import Sizing_Ele_Handling_Overflow_MCQ from "../FlexBox/CSS_Flexbox/Sizing_Ele_Handling_Overflow_MCQ.js";
import Introductionto_CSS_Flexbox_MCQ from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_MCQ.js";
import Introductionto_CSS_Flexbox_MCQ_2 from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_MCQ_2.js";
import Introductionto_CSS_Flexbox_MCQ_3 from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_MCQ_3.js";

//Reactjs MCQ
import Introductionto_Reactjs_MCQ from "../Reactjs/Introductionto_Reactjs/Introductionto_Reactjs_MCQ.js";
import Components_Props_MCQ from "../Reactjs/Introductionto_Reactjs/Components_Props_MCQ.js";
// import Lists_Keys_MCQ from "../Reactjs/Introductionto_Reactjs/Lists_Keys_MCQ.js";
// ---------- MCQ Map ----------
const mcqMap = {
  //Reactjs
  "Introduction to React JS": Introductionto_Reactjs_MCQ,
  "Components & Pros": Components_Props_MCQ,
  // "Lists & Keys": Lists_Keys_MCQ,
  //Flexbox
  "Sizing Elements and Handling Overflow": Sizing_Ele_Handling_Overflow_MCQ,
  "Box Sizing": Box_Sizing_MCQ,
  "Introduction to CSS Flexbox": Introductionto_CSS_Flexbox_MCQ,
  "Introduction to CSS Flexbox | Part 2": Introductionto_CSS_Flexbox_MCQ_2,
  "Introduction to CSS Flexbox 3": Introductionto_CSS_Flexbox_MCQ_3,
  //JavaScript MCQs
  "Introduction to Dynamic Web Applications":
    Introductionto_Dynamic_Application_MCQ,
  "Input Element and Math Functions": InputEle_MathFunctions_MCQ,
  "DOM and Event Fundamentals": Dom_Event_Fundamentals_MCQ,
  "Primitive Types & Conditionals": PrimitiveTypes_Conditionals_MCQ,
  Objects: Objects_MCQ,
  "Arrays & More DOM Manipulations": Arrays_Dom_Manipulations_MCQ,
  "Todos Application Introduction": Todos_Applications_MCQ,
  "On Demand Session": On_Demand_Session_MCQ,
  "Todos Application | Part 2": Todos_Application_MCQ_2,
  "Todos Application | Part 3": Todos_Application_MCQ_3,
  "Todos Application | Part 4": Todos_Application_MCQ_4,
  "Todos Application | Part 5": Todos_Application_MCQ_5,
  "Todos Application | Part 6": Todos_Application_MCQ_6,
  "Callbacks & Schedulers": Callbacks_Schedulers_MCQ,
  "Event Listeners & More Events": Event_Listners_More_Events_MCQ,
  "Hypertext Transfer Protocol (HTTP)": Hypertext_Transer_Protocal_MCQ,
  "HTTP Requests using JS": HTTP_Request_Using_JS_MCQ,
  "Wikipedia Search Application": Wikipedia_Search_MCQ,
  Forms: Forms_MCQ_1,
  "Forms | Part 2": Forms_MCQ_2,
  "MCQ Assignment 1": JS_MCQ_Assignment_1,
  "MCQ Assignment 2": JS_MCQ_Assignment_2,
  "MCQ Assignment 3": JS_MCQ_Assignment_3,
  "MCQ Assignment 4": JS_MCQ_Assignment_4,

  //Python MCQs Start
  "Programming with Python": Pro_W_P_MCQ,
  "Variables and Data Types": Variables_DT_MCQ,
  "Sequence of Instructions": Seq_OF_Instruction_MCQ,
  "Input and Output Basics": Inp_Oup_Basics_MCQ,
  "Type Conversion": Type_Con_MCQ,
  "Conditional Statements": ConditionalStmts_MCQ,
  "Logical Operators": LogicalOperators_MCQ,
  "Relational Operators": RelationOperator_MCQ,
  "Problem Solving and Debugging": ProblemSol_Debugging_MCQ,
  "Nested Conditions": Nested_con_MCQ,
  Loops: Loops_MCQ,
  "For Loop": ForLoop_MCQ,
  "String Methods": String_Methods_MCQ,
  "Nested Loops": NestedLoops_MCQ,

  "Problem Solving - Part 6": Problem_sol_6_MCQ,
  "Problem Solving Part 7": Problem_sol_7_MCQ,

  "Loop Control Stmts": LoopControlStmts_MCQ,
  "Comparing Strings & Naming Variables": ComparingStrAndNamingVar_MCQ,
  Functions: Functions_CS_MCQ,
  Lists: List_MCQ,
  "Working with Lists": Workingwith_Lists_MCQ,
  "Function Arguments": Functions_Argu_MCQ,
  "List & Strings": Lists_String_MCQ,
  "Built-in Functions": Built_in_Fun_MCQ,
  "Function Call Stack & Recursion": FunCallStack_Recursion_MCQ,
  "List Methods": ListMethods_MCQ,
  "Tuples & Sequences": Tuples_Sequences_MCQ,
  Sets: Sets_MCQ,
  "Set Operations": SetOperations_MCQ,
  "Nested Lists & String Formatting": NestedList_StringFormatting_MCQ,
  Dictionaries: Dictionaries_MCQ,
  "Working with Dictionaries": Working_With_Dictionaries_MCQ,
  "Introduction to OOP Part 1": Introductionto_OOP1_MCQ,
  "Introduction to OOP Part 2": Introduction_Opp_MCQ2,
  "Classes & Objects": Classes_Object_MCQ,
  "Attributes & Methods": Attributes_Methods_MCQ,
  "Inheritance Part 1": Inheritance_Part1_MCQ,
  "Inheritance Part 2": Inheritance_Part2_MCQ,
  "Python Standard Library": Python_Standard_Library_MCQ,
  "Scope & Namespaces": Scope_Namespaces_MCQ,
  "Errors & Exceptions": Errors_Exceptions_MCQ,
  "Dates & Time": Dates_Time_MCQ,
  "Working with Dates & Times": Workingwith_Data_Time_MCQ,

  "Introduction to HTML": Introductionto_HTML_CS_MCQ,
  "Introduction to CSS Part 1": Introductionto_Css_MCQ_1,
  "Introduction to CSS Part 2": Introductionto_Css_MCQ_2,
  "Introduction to CSS Part 3": Introductionto_Css_MCQ_3,
  "Introduction to CSS Box Model Part 1": Introductionto_Css_BoxModel_MCQ_1,
  "Introduction to CSS Box Model Part 2": Introductionto_Css_BoxModel_MCQ_2,
  "Introduction to Bootstrap Part 1": Introductionto_BootStrap_MCQ_1,
  "Introduction to Bootstrap Part 2": Introductionto_BootStrap_MCQ_2,
  "Favourite Places Section": FavouritePlaces_Section_MCQ_1,
  "Approach to Develop a Layout": Approachto_Develop_Layout_MCQ_2,
  "Favourite Place Detailed View Section": FavouritePlaces_DetailView_MCQ_3,
  "Website Integration Part 1": Website_Integration_MCQ_1,
  "Website Integration Part 2": Website_Integration_MCQ_2,
  "HTML Hyperlinks": HTML_HyperLinks_MCQ,
  "On-Demand Session": OnDemand_Session_MCQ,

  "Static MCQ Assignment 1": Static_MCQ_Assignment1,
  "Static MCQ Assignment 2": Static_MCQ_Assignment2,
  "Static MCQ Assignment 3": Static_MCQ_Assignment3,
  "Static MCQ Assignment 4": Static_MCQ_Assignment4,

  "Introduction to Responsive Web Design": Introductionto_Responsive_WD_MCQ,
  "Bootstrap Grid System Part 1": Bootstrap_Grid_Sys_MCQ_1,
  "Bootstrap Grid System Part 2": Bootstrap_Grid_Sys_MCQ_2,
  "Bootstrap Navbar": Bootstrap_Navbar_MCQ,
  "Banner Section": Banner_Section_MCQ,
  "Explore Menu Section": Explore_Menu_Section_MCQ,
  "Healthy Delivery & Payments": Healthy_Delivary_Payments_MCQ,
  "Why Choose Us Section": Why_Chooseus_Section_MCQ,
  "CSS Selectors & Inheritance": Css_Selector_Inheritance_MCQ,
  "CSS Specificity & Cascade": Css_Specificity_Cascade_MCQ,
  "Follow Us Section & More Styling": Followus_More_Styles_MCQ,
  "CSS Gradients & More BootStrap Components": CSS_Gradience_MCQ,
  "Responsive MCQ Assignment 1": Responsive_MCQ_Assignments_1,
  "Responsive MCQ Assignment 2": Responsive_MCQ_Assignments_2,
  "Responsive MCQ Assignment 3": Responsive_MCQ_Assignments_3,
};

// ---------- MCQ Wrapper Component ----------
const MCQWrapper = ({
  subtopic,
  onSubtopicComplete,
  subtopicId,
  goalName,
  courseName,
}) => {
  const [showInstructions, setShowInstructions] = useState(true);

  if (showInstructions) {
    return <MCQInstructions onStart={() => setShowInstructions(false)} />;
  }

  const MCQComponent = mcqMap[subtopic];

  if (!MCQComponent) {
    return (
      <div className="mcq-container">
        <p>No MCQ component found for "{subtopic}"</p>
      </div>
    );
  }

  return (
    <div className="mcq-container">
      <MCQComponent
        onComplete={onSubtopicComplete}
        subtopicId={subtopicId}
        goalName={goalName}
        courseName={courseName}
      />
    </div>
  );
};

export default MCQWrapper;
