import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./SubtopicPage.css";
import { goalsData } from "../data/goalsData";

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
import Introductionto_OOP_CS_2 from "../Python/IntroductiontoOOP/Introductionto_OOP_CS_2.js";
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

//Python Coding Practices

import Coding_Practice_1 from "../Python/IntroductiontoPython/coding_Practice_1.js";
import Coding_Practice_2 from "../Python/IntroductiontoPython/coding_Practice_2.js";
import Coding_Practice_3 from "../Python/IntroductiontoPython/coding_Practice_3.js";

//Dynamic Web Application
import Introductionto_Dynamic_Application_CS from "../JavaScript/Introductionto_Js_Variables/Introductionto_Dynamic_Application_CS.js";
import DOM_Event_Fundamentals_CS from "../JavaScript/Introductionto_Js_Variables/DOM_Event_Fundamentals_CS.js";
import Primitive_Types_Conditionals_CS from "../JavaScript/Introductionto_Js_Variables/PrimitiveTypes_Conditionals_CS.js";
import InputEle_MathFunctions_CS from "../JavaScript/Introductionto_Js_Variables/InputEle_MathFunctions_CS.js";
import Arrays_Dom_Manipulations_CS from "../JavaScript/Arrays_Objects/Arrays_Dom_Manipulations_CS.js";
import Objects_CS from "../JavaScript/Arrays_Objects/Objects_CS.js";
import Todos_Applications_CS from "../JavaScript/Todos_Application/Todos_Applications_CS.js";
import On_Demand_Session_CS from "../JavaScript/Todos_Application/On_Demand_Session_CS.js";
import Todos_Application_CS_2 from "../JavaScript/Todos_Application/Todos_Application_CS_2.js";
import Todos_Application_CS_3 from "../JavaScript/Todos_Application_2/Todos_Application_CS_3.js";
import Todos_Application_CS_4 from "../JavaScript/Todos_Application_2/Todos_Application_CS_4.js";
import Todos_Application_CS_5 from "../JavaScript/Todos_Application_3/Todos_Application_CS_5.js";
import Todos_Application_CS_6 from "../JavaScript/Todos_Application_4/Todos_Application_CS_6.js";
import Callbacks_Schedulers_CS from "../JavaScript/Fetch_Callbacks/Callbacks_Schedulers_CS.js";
import Event_Listners_More_Events_CS from "../JavaScript/Fetch_Callbacks/Event_Listners_More_Events_CS.js";
import HTTP_Request_Using_JS_CS from "../JavaScript/Fetch_Callbacks_2/HTTP_Request_Using_JS_CS.js";
import Hypertext_Transfer_Protocal_CS from "../JavaScript/Fetch_Callbacks/Hypertext_Transfer_Protocal_CS.js";
import Wikipedia_Search_CS from "../JavaScript/Fetch_Callbacks_2/Wikipedia_Search_CS.js";
import Forms_CS from "../JavaScript/Forms/Forms_CS.js";
import Forms_CS_2 from "../JavaScript/Forms/Forms_CS_2.js";

//JavaScript Essentials

import More_Modern_JS_Concepts_CS from "../JavaScript_Essentials/More_Modern_JS_Concepts/More_Modern_JS_Concepts_CS.js";
import More_Modern_JS_Concepts_CS_2 from "../JavaScript_Essentials/More_Modern_JS_Concepts/More_Modern_JS_Concepts_CS_2.js";
import Factory_Constructor_Function_CS from "../JavaScript_Essentials/More_Modern_JS_Concepts/Factory_Constructor_Function_CS.js";
import More_Modern_JS_Concepts_CS_3 from "../JavaScript_Essentials/More_Modern_JS_Concepts/More_Modern_JS_Concepts_CS_3.js";
import Prototypal_Inheritance_CS from "../JavaScript_Essentials/Prototypes_Classes/Prototypal_Inheritance_CS.js";
import JS_Classes_CS from "../JavaScript_Essentials/Prototypes_Classes/JS_Classes_CS.js";
import JS_Promises_CS from "../JavaScript_Essentials/Promises_Array_Methods/JS_Promises_CS.js";
import JS_Promises_CS_2 from "../JavaScript_Essentials/Promises_Array_Methods/JS_Promises_CS_2.js";
import More_JS_Conceptes_CS from "../JavaScript_Essentials/Promises_Array_Methods/More_JS_Conceptes_CS.js";

// SQL DataBase
import Introduction_to_Databases_CS from "../SQL_Database/Introduction/Introduction_to_Databases_CS.js";
import Create_Table_CS from "../SQL_Database/Introdutionto_SQL/Create_Table_CS.js";
import Inserting_Row_CS from "../SQL_Database/Introdutionto_SQL/Inserting_Row_CS.js";
import Retrieving_Data_CS from "../SQL_Database/Introdutionto_SQL/Retrieving_Data_CS.js";
import Update_Rows_CS from "../SQL_Database/Introdutionto_SQL/Update_Rows_CS.js";
import Delete_Rows_CS from "../SQL_Database/Introdutionto_SQL/Delete_Rows_CS.js";
import Alter_Table_CS from "../SQL_Database/Introdutionto_SQL/Alert_Table_CS.js";
import Comparison_Operators_CS from "../SQL_Database/Quering_SQL/Comparision_Opeartors_CS.js";
import String_Operators_CS from "../SQL_Database/Quering_SQL/String_Operators_CS.js";
import Logical_Operators_CS from "../SQL_Database/Quering_SQL/Logical_Operators_CS.js";

//Flexbox
import Sizing_Ele_Handling_Overflow_CS from "../FlexBox/CSS_Flexbox/Sizing_Ele_Handling_Overflow_CS.js";
import Box_Sizing_CS from "../FlexBox/CSS_Flexbox/Box_Sizing_CS.js";
import Introductionto_CSS_Flexbox_CS from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_CS.js";
import Introductionto_CSS_Flexbox_CS_2 from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_CS_2.js";
import Introductionto_CSS_Flexbox_CS_3 from "../FlexBox/CSS_Flexbox/Introductionto_CSS_Flexbox_CS_3.js";

//Reactjs
import Introductionto_Reactjs_CS from "../Reactjs/Introductionto_Reactjs/Introductionto_Reactjs_CS.js";
import Components_Props_CS from "../Reactjs/Introductionto_Reactjs/Components_Props.CS.js";
import Lists_Keys_CS from "../Reactjs/Introductionto_Reactjs/Lists_Keys_CS.js";
// MCQ Wrapper
import MCQWrapper from "../SubtopicsPage/MCQWrapper";

//Static Website Classes
import Introductionto_Html from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_HTML.js";
import Introductionto_Css_1 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_1.js";
import Introductionto_Css_2 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_2.js";
import Introductionto_Css_3 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_3.js";
import Introductionto_Css_Boxmodel_1 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_1.js";
import Introductionto_Css_Boxmodel_2 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_2.js";
import Introductionto_Bootstrap_1 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_1.js";
import Introductionto_Bootstrap_2 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_2.js";
import FavouritePlaces_Section_1 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_Section_1.js";
import Approachto_Develop_Layout_1 from "../StaticWebsite/DevelopingLayouts/Approachto_Develop_Layout_1.js";
import Favouriteplaces_Detailview_1 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_DetailView_1.js";
import WebSite_Integration_1 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_1.js";
import WebSite_Integration_2 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_2.js";
import Html_HyperLinks_1 from "../StaticWebsite/WebSiteIntegration/HTML_HyperLinks_1.js";
import OnDemand_Session_1 from "../StaticWebsite/WebSiteIntegration/OnDemand_Session_1.js";
import Static_Mock_Test_1 from "../StaticWebsite/Mock_Tests/Static_Mock_Test_1.js";
import Static_Mock_Test_2 from "../StaticWebsite/Mock_Tests/Static_Mock_Test_2.js";
import Static_Website_Project from "../StaticWebsite/Mock_Tests/Static_Website_Project.js";
import Static_Coding_Assignment_1 from "../StaticWebsite/Assignments/Static_Coding_Assignment_1.js";
import Static_Coding_Assignment_2 from "../StaticWebsite/Assignments/Static_Coding_Assignment_2.js";
import Static_Coding_Assignment_3 from "../StaticWebsite/Assignments/Static_Coding_Assignment_3.js";

//Static Website Cheat Sheets

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
import OnDemand_Session_CS from "../StaticWebsite/WebSiteIntegration/OnDemand_Session_CS.js";
import HTML_HyperLinks_CS from "../StaticWebsite/WebSiteIntegration/HTML_HyperLinks_CS";
import Website_Integration_CS_1 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_CS_1";
import Website_Integration_CS_2 from "../StaticWebsite/WebSiteIntegration/WebSite_Integration_CS_2";
import StaticSummary_CS from "../StaticWebsite/Revision/Static_Summary_CS";

//Responsive Website Cheat Sheets

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

//Responsive WebSite Classes
import Introductionto_Responsive_WD_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Introductionto_Responsive_WD_1.js";
import Bootstrap_Grid_Sys_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_1.js";
import Bootstrap_Grid_Sys_2 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_2.js";
import Bootstrap_Navbar_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Navbar_1.js";
import Css_Selector_Inheritance_1 from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Selector_Inheritance_1.js";
import Css_Specificity_Cascade_1 from "../ResponsiveWebsite/CSS_Building_Blocks/Css_Specificity_Cascade_1.js";
import Banner_Section_1 from "../ResponsiveWebsite/Developing_Layouts1/Banner_Section_1.js";
import Explore_Menu_Section_1 from "../ResponsiveWebsite/Developing_Layouts1/Explore_Menu_Section_1.js";
import Why_Chooseus_Section_1 from "../ResponsiveWebsite/Developing_Layouts1/Why_Chooseus_Section_1.js";
import Healthy_Delivary_Payments_1 from "../ResponsiveWebsite/Developing_Layouts1/Healthy_Delivary_Payments_1.js";
import Followus_More_Styles_1 from "../ResponsiveWebsite/Developing_Layouts2/Followus_More_Styles_1.js";
import Css_Gradience_1 from "../ResponsiveWebsite/Developing_Layouts2/CSS_Gradience_1.js";
import Responsive_Coding_Pratice_1 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Responsive_Coding_Pratice_1.js";
import Responsive_Coding_Pratice_2 from "../ResponsiveWebsite/Responsive_WD_BS_Grid_Sys/Responsive_Coding_Pratice_2.js";
import Responsive_Coding_Pratice_3 from "../ResponsiveWebsite/CSS_Building_Blocks/Responsive_Coding_Pratice_3.js";
import Responsive_Coding_Pratice_4 from "../ResponsiveWebsite/CSS_Building_Blocks/Responsive_Coding_Pratice_4.js";
import Responsive_Coding_Pratice_5 from "../ResponsiveWebsite/Developing_Layouts1/Responsive_Coding_Pratice_5.js";
import Responsive_Coding_Pratice_6 from "../ResponsiveWebsite/Developing_Layouts1/Responsive_Coding_Pratice_6.js";
import Responsive_Coding_Pratice_7 from "../ResponsiveWebsite/Developing_Layouts1/Responsive_Coding_Pratice_7.js";
import Responsive_Coding_Pratice_8 from "../ResponsiveWebsite/Developing_Layouts1/Responsive_Coding_Pratice_8.js";
import Responsive_Coding_Pratice_9 from "../ResponsiveWebsite/Developing_Layouts1/Responsive_Coding_Pratice_9.js";
import Responsive_Coding_Pratice_10 from "../ResponsiveWebsite/Developing_Layouts2/Responsive_Coding_Pratice_10.js";
import Responsive_Coding_Pratice_11 from "../ResponsiveWebsite/Developing_Layouts2/Responsive_Coding_Pratice_11.js";
import Responsive_Coding_Pratice_12 from "../ResponsiveWebsite/Developing_Layouts2/Responsive_Coding_Pratice_12.js";
import Responsive_Coding_Pratice_13 from "../ResponsiveWebsite/Developing_Layouts2/Responsive_Coding_Pratice_13.js";
import Responsive_Coding_Pratice_14 from "../ResponsiveWebsite/Developing_Layouts_Pratice/Responsive_Coding_Pratice_14.js";
import Responsive_Coding_Pratice_15 from "../ResponsiveWebsite/Developing_Layouts_Pratice/Responsive_Coding_Pratice_15.js";
import Responsive_Coding_Pratice_16 from "../ResponsiveWebsite/Developing_Layouts_Pratice/Responsive_Coding_Pratice_16.js";
import Responsive_Coding_Assignment_1 from "../ResponsiveWebsite/Assignments/Responsive_Coding_Assignment_1.js";
import Responsive_Coding_Assignment_2 from "../ResponsiveWebsite/Assignments/Responsive_Coding_Assignment_2.js";
import Responsive_Coding_Assignment_3 from "../ResponsiveWebsite/Assignments/Responsive_Coding_Assignment_3.js";
import Responsive_Coding_Test_1 from "../ResponsiveWebsite/Mock_Tests/Responsive_Coding_Test_1.js";
import Responsive_Coding_Test_2 from "../ResponsiveWebsite/Mock_Tests/Responsive_Coding_Test_2.js";
import Responsive_Coding_Test_3 from "../ResponsiveWebsite/Mock_Tests/Responsive_Coding_Test_3.js";
import Responsive_Project from "../ResponsiveWebsite/Mock_Tests/Responsive_Project.js";
// Map subtopics to their components
const subtopicComponents = {
  //Responsive Website
  "Introduction to Dynamic Web Applications": Introductionto_Responsive_WD_1,
  "BootStrap Grid System Part 1": Bootstrap_Grid_Sys_1,
  "BootStrap Grid System Part 2": Bootstrap_Grid_Sys_2,
  "BootStrap Navbar": Bootstrap_Navbar_1,
  "CSS Selectors & Inheritance": Css_Selector_Inheritance_1,
  "CSS Specificity & Cascade": Css_Specificity_Cascade_1,
  "Banner Section": Banner_Section_1,
  "Why Choose Us? Section": Why_Chooseus_Section_1,
  "Explore New Section": Explore_Menu_Section_1,
  "Healthy Food, Delivery and Payment, Thanking Customers Section":
    Healthy_Delivary_Payments_1,
  "Follow Us Section & More Styling": Followus_More_Styles_1,
  "CSS Gradients & More BootStrap Components": Css_Gradience_1,
  "Responsive Coding Practice 1": Responsive_Coding_Pratice_1,
  "Responsive Coding Practice 2": Responsive_Coding_Pratice_2,
  "Responsive Coding Practice 3": Responsive_Coding_Pratice_3,
  "Responsive Coding Practice 4": Responsive_Coding_Pratice_4,
  "Responsive Coding Practice 5": Responsive_Coding_Pratice_5,
  "Responsive Coding Practice 6": Responsive_Coding_Pratice_6,
  "Responsive Coding Practice 7": Responsive_Coding_Pratice_7,
  "Responsive Coding Practice 8": Responsive_Coding_Pratice_8,
  "Responsive Coding Practice 9": Responsive_Coding_Pratice_9,
  "Responsive Coding Practice 10": Responsive_Coding_Pratice_10,
  "Responsive Coding Practice 11": Responsive_Coding_Pratice_11,
  "Responsive Coding Practice 12": Responsive_Coding_Pratice_12,
  "Responsive Coding Practice 13": Responsive_Coding_Pratice_13,
  "Responsive Coding Practice 14": Responsive_Coding_Pratice_14,
  "Responsive Coding Practice 15": Responsive_Coding_Pratice_15,
  "Responsive Coding Practice 16": Responsive_Coding_Pratice_16,
  "Responsive Coding Assignment 1": Responsive_Coding_Assignment_1,
  "Responsive Coding Assignment 2": Responsive_Coding_Assignment_2,
  "Responsive Coding Assignment 3": Responsive_Coding_Assignment_3,
  "Reponsive Coding Test 1": Responsive_Coding_Test_1,
  "Responsive Coding Test 2": Responsive_Coding_Test_2,
  "Responsive Coding Test 3": Responsive_Coding_Test_3,
  "Build Your Own Responsive Project": Responsive_Project,

  //Responsive Start
  "Introduction to Responsive Web Design | Cheat Sheet":
    Introductionto_Responsive_WD_CS,
  "BootStrap Grid System Part 1 | Cheat Sheet": Bootstrap_Grid_Sys_CS_1,
  "BootStrap Grid System Part 2 | Cheat Sheet": Bootstrap_Grid_Sys_CS_2,
  "BootStrap Navbar | Cheat Sheet": Bootstrap_Navbar_CS,
  "CSS Selectors & Inheritance | Cheat Sheet": Css_Selector_Inheritance_CS,
  "CSS Specificity & Cascade | Cheat Sheet": Css_Specificity_Cascade_CS,
  "Banner Section | Cheat Sheet": Banner_Section_CS,
  "Explore New Section | Cheat Sheet": Explore_Menu_Section_CS,
  "Healthy Food, Delivery and Payment, Thanking Customers Section | Cheat Sheet":
    Healthy_Delivary_Payments_CS,
  "Why Choose us? Section | Cheat Sheet": Why_Chooseus_Section_CS,
  "CSS Gradients & More BootStrap Components | Cheat Sheet": CSS_Gradience_CS,
  "Follow Us Section & More Styling | Cheat Sheet": Followus_More_Styles_CS,
  "Responsive Summary CheatSheet": Responsive_Summary_CS,

  //Responsive End

  //Static Website Class
  "Introduction to HTML": Introductionto_Html,
  "Introduction to CSS Part 1": Introductionto_Css_1,
  "Introduction to CSS Part 2": Introductionto_Css_2,
  "Introduction to CSS Part 3": Introductionto_Css_3,
  "Introduction to CSS Box Model Part 1": Introductionto_Css_Boxmodel_1,
  "Introduction to CSS Box Model Part 2": Introductionto_Css_Boxmodel_2,
  "Introduction to Bootstrap Part 1": Introductionto_Bootstrap_1,
  "Introduction to Bootstrap Part 2": Introductionto_Bootstrap_2,
  "Favourite Places Section": FavouritePlaces_Section_1,
  "Approach to Develop a Layout": Approachto_Develop_Layout_1,
  "Favourite Place Detailed View Section": Favouriteplaces_Detailview_1,
  "Website Integration Part 1": WebSite_Integration_1,
  "Website Integration | Part 2": WebSite_Integration_2,
  "HTML Hyperlinks": Html_HyperLinks_1,
  "On Demand Session": OnDemand_Session_1,
  "Static Coding Assignment 1": Static_Coding_Assignment_1,
  "Static Coding Assignment 2": Static_Coding_Assignment_2,
  "Static Coding Assignment 3": Static_Coding_Assignment_3,
  "Static Coding Test 1": Static_Mock_Test_1,
  "Static Coding Test 2": Static_Mock_Test_2,
  "Build Your Own Static Website Project": Static_Website_Project,

  //Static Website Cheat Sheet Start
  "Introduction to HTML | Cheat Sheet": Introductionto_HTML_CS_1,
  "Introduction to CSS Part 1 | Cheat Sheet": Introductionto_Css_CS_1,
  "Introduction to CSS Part 2 | Cheat Sheet": Introductionto_Css_CS_2,
  "Introduction to CSS Part 3 | Cheat Sheet": Introductionto_Css_CS_3,
  "Introduction to CSS Box Model Part 1 | Cheat Sheet":
    Introductionto_Css_BoxModel_CS_1,
  "Introduction to CSS Box Model Part 2 | Cheat Sheet":
    Introductionto_Css_BoxModel_CS_2,
  "Introduction to Bootstrap Part 1 | Cheat Sheet":
    Introductionto_BootStrap_CS_1,
  "Introduction to Bootstrap Part 2 | Cheat Sheet":
    Introductionto_BootStrap_CS_2,
  "Approach to Develop a Layout | Cheat Sheet": Approachto_Develop_Layout_CS_1,
  "Favourite Place Detailed View Section | Cheat Sheet":
    FavouritePlaces_DetailView_CS,
  "Favourite Places Section | Cheat Sheet": FavouritePlaces_Section_CS_1,
  "OnDemand Session | Cheat Sheet": OnDemand_Session_CS,
  "Hypertext Transfer Protocol (HTTP) | Cheat Sheet":
    Hypertext_Transfer_Protocal_CS,
  "Forms | Part 2 | Cheat sheet": Forms_CS_2,
  "HTML Hyperlinks | Cheat Sheets": HTML_HyperLinks_CS,
  "Website Integration Part 1 | Cheat Sheet": Website_Integration_CS_1,
  "Website Integration Part 2 | Cheat Sheet": Website_Integration_CS_2,
  "Static Summary CheatSheet": StaticSummary_CS,
  //Static End

  //Reactjs Cheat Sheet
  "Introduction to React JS | Cheat Sheet": Introductionto_Reactjs_CS,
  "Components & Pros | Cheat Sheet": Components_Props_CS,
  "Lists & Keys | Cheat Sheet": Lists_Keys_CS,
  //Flexbox Cheat Sheet
  "Sizing Elements and Handling Overflow | Cheat Sheet":
    Sizing_Ele_Handling_Overflow_CS,
  "Box Sizing | Cheat Sheet": Box_Sizing_CS,
  "Introduction to CSS Flexbox | Cheat Sheet": Introductionto_CSS_Flexbox_CS,
  "Introduction to CSS Flexbox | Part 2| Cheat Sheet":
    Introductionto_CSS_Flexbox_CS_2,
  "Introduction to CSS Flexbox | Part 3| Cheat Sheet":
    Introductionto_CSS_Flexbox_CS_3,
  //SQL Database
  "Introduction to Databases | Cheat Sheet": Introduction_to_Databases_CS,
  "Create Table Cheat Sheet": Create_Table_CS,
  "Inserting Rows Cheat Sheet": Inserting_Row_CS,
  "Retrieving Data Cheat Sheet": Retrieving_Data_CS,
  "Update Rows Cheat Sheet": Update_Rows_CS,
  "Delete Rows Cheat Sheet": Delete_Rows_CS,
  "Alter Table Cheat Sheet": Alter_Table_CS,
  "Comparison Operators Cheat Sheet": Comparison_Operators_CS,
  "String Operations Cheat Sheet": String_Operators_CS,
  "Logical Operators Cheat sheet": Logical_Operators_CS,

  //Python Coding Practices
  "Coding Practice - 1": Coding_Practice_1,
  "Coding Practice - 2": Coding_Practice_2,
  "Coding Practice - 3": Coding_Practice_3,

  //Python coding practices end

  "More Modern JS Concepts | Cheat Sheet": More_Modern_JS_Concepts_CS,
  "More Modern JS Concepts | Part 2 | Cheat Sheet":
    More_Modern_JS_Concepts_CS_2,
  "Factory and Constructor Function | Cheat Sheet":
    Factory_Constructor_Function_CS,
  "More Modern JS Concepts | Part 3 | Cheat Sheet":
    More_Modern_JS_Concepts_CS_3,
  "Prototypal Inheritance | Cheat Sheet": Prototypal_Inheritance_CS,
  "JS Classes | Cheat Sheet": JS_Classes_CS,
  "JS Promises | Cheat Sheet": JS_Promises_CS,
  "JS Promises | Part 2 | Cheat Sheet": JS_Promises_CS_2,
  "More JS Concepts | Cheat Sheet": More_JS_Conceptes_CS,

  // Python Cheat Sheet Start

  "Problem Solving Part 6 | Cheat Sheet": Problem_sol_6_CS,
  "Problem Solving Part 7 | Cheat Sheet": Problem_sol_7_CS,

  "Problem Solving and Debugging | Cheat Sheet": ProblemSol_Debugging_CS,
  "Problem Solving and Debugging Part 4 | Cheat Sheet":
    Problem_sol_Debugging_4_CS,
  "Problem Solving and Debugging Part 5 | Cheat Sheet":
    Problem_sol_Debugging_5_CS,

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
  "Approach for Hollow Pattern | Cheat Sheet": Approachto_HollowPattern_CS,
  "String Methods | Cheat Sheets": String_Methods_CS,
  "Nested Conditional Statements | Cheat Sheet": Nested_con_CS_1,
  "Nested Loops | Cheat Sheet": NestedLoops_CS_1,
  "String Methods | Additional Reading Material":
    String_Methods_Additional_Material_CS,
  "Loop Control Statements | Cheat Sheet": LoopControlStmts_CS_2,
  "Comparing Strings & Naming Variables | Cheat Sheet":
    ComparingStrAndNamingVar_CS_1,
  "Lists | Cheat Sheet": List_CS_1,
  "List & Strings | Cheat Sheet": Lists_Strings_CS_1,
  "Functions | Cheat Sheet": Functions_CS_2,
  "Function Arguments | Cheat Sheet": Function_Argu_CS_3,
  "Built-in Functions | Cheat Sheet": Built_in_Fun_CS_1,
  "Function Call Stack & Recursion | Cheat Sheet": FunCallStackRecursion,
  "List Methods | Cheat Sheet": ListMethods,
  "Working with Lists | Cheat Sheet": Workingwith_Data_Time_CS,
  "Tuples & Sequences | Cheat Sheet": Tuples_Sequences_CS_1,
  "Sets | Cheat Sheet": Sets_CS_2,
  "Set Operations | Cheat Sheet": Set_Operations_CS_3,
  "Nested Lists & String Formatting | Cheat Sheet":
    NestedList_StringFormatting_CS_1,
  "Dictionaries | Cheat Sheet": Dictionaries_CS_2,
  "Buil-in Functions | Additional Reading Material":
    Builtin_Fun_Additional_Material_CS,
  "Working with Dictionaries | Cheat Sheet": Working_With_Dictionaries_CS_3,
  "Introduction to Object Oriented Programming | Cheat Sheet":
    Introductionto_OOP_CS_1,
  "Object Oriented Programming | Cheat Sheet": Introductionto_OOP_CS_2,
  "Classes & Objects | Cheat Sheet": Classes_Object_CS_3,
  "Attribute Methods | Cheat Sheet": Attributes_Methods_CS_4,
  "Inheritance Part1 | Cheat Sheet": Inheritance_Part1_CS_5,
  "Inheritance Part2 | Cheat Sheet": Inheritance_Part2_CS_2,
  "Python Standard Library | Cheat Sheet": Python_Standard_Library_CS_1,
  "Scope & Namespaces | Cheat Sheet": Scope_Namespaces_CS_2,
  "Errors & Exceptions | Cheat Sheet": Errors_Exceptions_CS_3,
  "Dates & Time | Cheat Sheet": Dates_Time_CS_4,
  "Working with Dates & Times | Cheat Sheet": Workingwith_Date_Time_CS,
  "Python Summary Cheat Sheet - 1": Python_Summary_CS_1,
  "Python Summary Cheat Sheet - 2": Python_Summary_CS_2,
  "Python Summary Cheat Sheet - 3": Python_Summary_CS_3,
  "Python Summary Cheat Sheet - 4": Python_Summary_CS_4,
  "MCQ Practice": MCQWrapper,
  "MCQ Practice - 1": MCQWrapper,
  "MCQ Practice - 2": MCQWrapper,

  //Python End

  //JavaScript Start

  "Introduction to Dynamic Web Applications | Cheat Sheet":
    Introductionto_Dynamic_Application_CS,
  "DOM and Event Fundamentals | Cheat Sheet": DOM_Event_Fundamentals_CS,
  "Primitive Types & Conditionals | Cheat Sheet":
    Primitive_Types_Conditionals_CS,
  "Input Element and Math Functions | Cheat Sheet": InputEle_MathFunctions_CS,
  "Arrays & More DOM Manipulations | Cheat Sheet": Arrays_Dom_Manipulations_CS,
  "Objects | Cheat Sheet": Objects_CS,
  "Todos Application | Cheat Sheet": Todos_Applications_CS,
  "On-Demand Session | Cheat Sheet": On_Demand_Session_CS,
  "Todos Application | Part 2 | Cheat Sheet": Todos_Application_CS_2,
  "Todos Application | Part 3 | Cheat Sheet": Todos_Application_CS_3,
  "Todos Application | Part 4 | Cheat Sheet": Todos_Application_CS_4,
  "Todos Application | Part 5 | Cheat Sheet": Todos_Application_CS_5,
  "Todos Application | Part 6 | Cheat Sheet": Todos_Application_CS_6,
  "Callbacks & Schedulers | Cheat Sheet": Callbacks_Schedulers_CS,
  "Event Listeners & More Events | Cheat Sheet": Event_Listners_More_Events_CS,
  "Hypertext Transfer Protocal (HTTP) | Cheat Sheet":
    Hypertext_Transfer_Protocal_CS,
  "Wikipedia Search Application | Cheat Sheet": Wikipedia_Search_CS,
  "HTTP Requests using JS | Cheat Sheet": HTTP_Request_Using_JS_CS,
  "Forms | Cheat sheet": Forms_CS,
  "Forms | Part - 2 | Cheat sheet": Forms_CS_2,

  //JavaScript End

  //DataBase Cheet Sheets Start
};

// Explicit MCQ Mapping (no change)
const mcqMapping = {
  //Reactjs MCQs
  "MCQ Pratice - Introduction to React JS": "Introduction to React JS",
  "MCQ Pratice - Components & Pros": "Components & Pros",
  // "MCQ Pratice - Lists & Keys": "Lists & Keys",
  "MCQ Pratice - Sizing Elements and Handling Overflow":
    "Sizing Elements and Handling Overflow",
  "MCQ Pratice - Box Sizing": "Box Sizing",
  "MCQ Pratice - CSS Flexbox 1": "Introduction to CSS Flexbox",
  "MCQ Pratice - CSS Flexbox 2": "Introduction to CSS Flexbox | Part 2",
  "MCQ Pratice - CSS Flexbox 3": "Introduction to CSS Flexbox 3",

  //JavaScript MCQs
  "MCQ Practice - Intro_Dynamic Web App":
    "Introduction to Dynamic Web Applications",
  "MCQ Practice - Input Elements": "Input Element and Math Functions",
  "MCQ Practice - DOM Event Fund": "DOM and Event Fundamentals",
  "MCQ Practice - Primitive Types": "Primitive Types & Conditionals",
  "MCQ Practice - Objects": "Objects",
  "MCQ Practice - Array & DOM": "Arrays & More DOM Manipulations",
  "MCQ Practice - Todos App": "Todos Application Introduction",
  "MCQ Practice - On Demand Session": "On Demand Session",
  "MCQ Practice - Todos App 2": "Todos Application | Part 2",
  "MCQ Practice - Todos App 3": "Todos Application | Part 3",
  "MCQ Practice - Todos App 4": "Todos Application | Part 4",
  "MCQ Practice - Todos App 5": "Todos Application | Part 5",
  "MCQ Practice - Todos App 6": "Todos Application | Part 6",
  "MCQ Practice - Callbacks & Schedulers": "Callbacks & Schedulers",
  "MCQ Practice - Event Listeners": "Event Listeners & More Events",
  "MCQ Practice - HTTP": "Hypertext Transfer Protocol (HTTP)",
  "MCQ Practice - HTTP Requests using JS": "HTTP Requests using JS",
  "MCQ Practice - Wikipedia Application": "Wikipedia Search Application",
  "MCQ Practice - Forms": "Forms",
  "MCQ Practice - Forms Part 2": "Forms | Part 2",
  "MCQ Assignment 1": "MCQ Assignment 1",
  "MCQ Assignment 2": "MCQ Assignment 2",
  "MCQ Assignment 3": "MCQ Assignment 3",
  "MCQ Assignment 4": "MCQ Assignment 4",

  //Python MCQs Start

  "MCQ Practice": "Programming with Python",
  "MCQ Practice - 1": "Variables and Data Types",
  "MCQ Practice - 2": "Sequence of Instructions",
  "MCQ Practice - I/O": "Input and Output Basics",
  "MCQ Practice - Type Con": "Type Conversion",
  "MCQ Practice - Rel Ope": "Relational Operators",
  "MCQ Practice - Log Ope": "Logical Operators",
  "MCQ Practice - Con stmts": "Conditional Statements",
  "MCQ Practice - Nested Con": "Nested Conditions",
  "MCQ Practice - Problem Solv Debug": "Problem Solving and Debugging",
  "MCQ Practice - Prob_Sol": "Problem Solving - Part 6",
  "MCQ Practice - Prob_Sol7": "Problem Solving Part 7",

  "MCQ Practice - Loops": "Loops",
  "MCQ Practice - String Methods": "String Methods",
  "MCQ Practice - For Loops": "For Loop",
  "MCQ Practice - Nested Loops": "Nested Loops",
  "MCQ Practice - Loop Con Stmts": "Loop Control Stmts",
  "MCQ Practice - ComStr_NamVar": "Comparing Strings & Naming Variables",
  "MCQ Practice - Lists": "Lists",
  "MCQ Practice - Working_Lists": "Working with Lists",
  "MCQ Practice - List_Str": "List & Strings",
  "MCQ Practice - Functions": "Functions",
  "MCQ Practice - Fun_Arg": "Function Arguments",
  "MCQ Practice - Builtin_Fun": "Built-in Functions",
  "MCQ Practice - FunCallStack_Recursion": "Function Call Stack & Recursion",
  "MCQ Practice - List Methods": "List Methods",
  "MCQ Practice - Tuples_Seq": "Tuples & Sequences",
  "MCQ Practice - Sets": "Sets",
  "MCQ Practice - Set_Ope": "Set Operations",
  "MCQ Practice - NestedList_StrFormat": "Nested Lists & String Formatting",
  "MCQ Practice - Dictionaries": "Dictionaries",
  "MCQ Practice - Working_Dictionaries": "Working with Dictionaries",
  "MCQ Practice - Intro_OOP": "Introduction to OOP Part 1",
  "MCQ Practice - OOP": "Introduction to OOP Part 2",
  "MCQ Practice - Classes_Obj": "Classes & Objects",
  "MCQ Practice - Att_Meth": "Attributes & Methods",
  "MCQ Practice - Inheritance1": "Inheritance Part 1",
  "MCQ Practice - Inheritance2": "Inheritance Part 2",
  "MCQ Practice - PythonLibrary": "Python Standard Library",
  "MCQ Practice - Scope_Namespaces": "Scope & Namespaces",
  "MCQ Practice - Errors_Excep": "Errors & Exceptions",
  "MCQ Practice - Dates_Time": "Dates & Time",
  "MCQ Practice - Working with Dates & Times": "Working with Dates & Times",

  "MCQ Practice - HTML": "Introduction to HTML",
  "MCQ Practice - CSS 1": "Introduction to CSS Part 1",
  "MCQ Practice - CSS 2": "Introduction to CSS Part 2",
  "MCQ Practice - CSS 3": "Introduction to CSS Part 3",
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
  "Static MCQ Assignment 1": "Static MCQ Assignment 1",
  "Static MCQ Assignment 2": "Static MCQ Assignment 2",
  "Static MCQ Assignment 3": "Static MCQ Assignment 3",
  "Static MCQ Assignment 4": "Static MCQ Assignment 4",

  "MCQ Practice - Res_WD": "Introduction to Responsive Web Design",
  "MCQ Practice - B_GS_1": "Bootstrap Grid System Part 1",
  "MCQ Practice - B_GS_2": "Bootstrap Grid System Part 2",
  "MCQ Practice - B_Nav": "Bootstrap Navbar",

  "MCQ Practice - Banner Section": "Banner Section",
  "MCQ Practice - Explore Menu Section": "Explore Menu Section",
  "MCQ Practice - Healthy Delivery & Payments": "Healthy Delivery & Payments",
  "MCQ Practice - Why Choose Us Section": "Why Choose Us Section",
  "MCQ Practice - CSS Selectors & Inheritance": "CSS Selectors & Inheritance",
  "MCQ Practice - CSS Specificity & Cascade": "CSS Specificity & Cascade",
  "MCQ Practice - Follow_us": "Follow Us Section & More Styling",
  "MCQ Practice - CSS_Gradients": "CSS Gradients & More BootStrap Components",
  "Responsive MCQ Assignment 1": "Responsive MCQ Assignment 1",
  "Responsive MCQ Assignment 2": "Responsive MCQ Assignment 2",
  "Responsive MCQ Assignment 3": "Responsive MCQ Assignment 3",
};

const SubtopicPage = () => {
  const { topicId, subtopicId } = useParams();
  const { completedContent } = useAuth();
  const [selectedSubtopicSub, setSelectedSubtopicSub] = useState(null);
  const [selectedModuleSub, setSelectedModuleSub] = useState(null);
  const [selectedCourseSub, setSelectedCourseSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (topicId && subtopicId && goalsData) {
      let foundSubtopicSub = null;
      let foundModuleSub = null;
      let foundCourseSub = null;
      let foundGoalSub = null;

      // Search through goalsData to find the matching subtopic
      goalsData.forEach((goal) => {
        goal.courses.forEach((course) => {
          course.modules.forEach((module) => {
            if (module.topic) {
              module.topic.forEach((subtopic) => {
                if (subtopic.id === subtopicId && module.id === topicId) {
                  foundSubtopicSub = subtopic;
                  foundModuleSub = module;
                  foundCourseSub = course;
                  foundGoalSub = goal;
                }
              });
            }
          });
        });
      });

      setSelectedSubtopicSub(foundSubtopicSub);
      setSelectedModuleSub(foundModuleSub);
      setSelectedCourseSub(foundCourseSub);
      setSelectedGoalSub(foundGoalSub);

      // AUTO-EXPAND THE ACTIVE MODULE
      setExpandedModuleSub(topicId);
    }
  }, [topicId, subtopicId]);

  // NEW: Auto-scroll to active element
  useEffect(() => {
    if (expandedModuleSub && selectedSubtopicSub) {
      const timer = setTimeout(() => {
        const activeSubtopicElementSub = document.querySelector(
          ".subtopic-page-sub__item-sub.active-sub"
        );

        if (activeSubtopicElementSub) {
          const leftPanelSub = document.querySelector(
            ".subtopic-page-sub__left-panel-sub"
          );
          if (leftPanelSub) {
            const scrollPositionSub =
              activeSubtopicElementSub.offsetTop -
              leftPanelSub.clientHeight / 3;

            leftPanelSub.scrollTo({
              top: scrollPositionSub,
              behavior: "smooth",
            });
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [expandedModuleSub, selectedSubtopicSub]);

  const handleModuleClickSub = (moduleId) => {
    setExpandedModuleSub((prev) => (prev === moduleId ? null : moduleId));
  };

  // Handle subtopic click - only navigate
  const handleSubtopicClickSub = (subtopic) => {
    navigate(`/topic/${selectedModuleSub.id}/subtopic/${subtopic.id}`);
  };

  // Universal MCQ check
  const isMCQSub = (subtopic) => {
    if (typeof subtopic === "string") {
      return subtopic.toLowerCase().includes("mcq");
    } else if (subtopic && subtopic.name) {
      return subtopic.name.toLowerCase().includes("mcq");
    }
    return false;
  };

  const renderContentSub = () => {
    if (!selectedSubtopicSub) return <p>Please select a subtopic</p>;

    // Check if subtopic exists in the current course
    const subtopicExistsSub = selectedCourseSub?.modules?.some((module) =>
      module.topic?.some((sub) => sub.id === selectedSubtopicSub.id)
    );

    if (!subtopicExistsSub) {
      return <p>Subtopic not available in this course</p>;
    }

    if (isMCQSub(selectedSubtopicSub)) {
      const actualSubtopicSub = mcqMapping[selectedSubtopicSub.name];
      if (!actualSubtopicSub) return <p>No MCQ found for this section</p>;

      return (
        <MCQWrapper
          subtopic={actualSubtopicSub}
          subtopicId={selectedSubtopicSub.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          onSubtopicComplete={() => {
            console.log("MCQ completed for:", selectedSubtopicSub.name);
          }}
        />
      );
    }

    const ComponentSub = subtopicComponents[selectedSubtopicSub.name];
    return ComponentSub ? (
      <ComponentSub
        subtopicId={selectedSubtopicSub.id}
        goalName={selectedGoalSub?.title}
        courseName={selectedCourseSub?.title}
        subtopic={selectedSubtopicSub.name}
      />
    ) : (
      <div>
        <h3>{selectedSubtopicSub.name}</h3>
        <p>Content for this subtopic is coming soon...</p>
        {completedContent.includes(selectedSubtopicSub.id) && (
          <p style={{ color: "green", marginTop: "10px" }}>
            ✓ This subtopic has been completed
          </p>
        )}
      </div>
    );
  };

  // Helper function to render content based on subtopic type
  const renderSubtopicContentSub = (subtopic) => {
    if (!subtopic) return <p>No subtopic selected</p>;

    if (subtopic.name.toLowerCase().includes("cheat sheet")) {
      const ComponentSub = subtopicComponents[subtopic.name];
      return ComponentSub ? (
        <ComponentSub
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          subtopic={subtopic.name}
        />
      ) : (
        <p>Cheat sheet content not available for "{subtopic.name}"</p>
      );
    } else if (subtopic.name.toLowerCase().includes("mcq")) {
      const actualSubtopicSub = mcqMapping[subtopic.name];
      return actualSubtopicSub ? (
        <MCQWrapper
          subtopic={actualSubtopicSub}
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          onSubtopicComplete={() => {
            console.log("MCQ completed for:", subtopic.name);
          }}
        />
      ) : (
        <p>MCQ content not available for "{subtopic.name}"</p>
      );
    } else {
      const ComponentSub = subtopicComponents[subtopic.name];
      return ComponentSub ? (
        <ComponentSub
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          subtopic={subtopic.name}
        />
      ) : (
        <div>
          <h3>{subtopic.name}</h3>
          <p>Content for this subtopic is coming soon...</p>
        </div>
      );
    }
  };

  return (
    <div className="subtopic-page-sub">
      <div className="subtopic-page-sub__left-panel-sub">
        {selectedCourseSub ? (
          <div className="subtopic-page-sub__navigation-sub">
            <h3 className="subtopic-page-sub__course-title-sub">
              {selectedCourseSub.title}
            </h3>
            {selectedCourseSub.modules.map((module) => (
              <div
                key={module.id}
                className="subtopic-page-sub__module-section-sub"
              >
                <h4
                  className={`subtopic-page-sub__module-title-sub ${
                    module.id === topicId
                      ? "subtopic-page-sub__module-title-sub--active"
                      : ""
                  }`}
                  onClick={() => handleModuleClickSub(module.id)}
                >
                  {module.name}
                  <span className="subtopic-page-sub__chevron-sub">
                    {expandedModuleSub === module.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    )}
                  </span>
                </h4>

                {expandedModuleSub === module.id && (
                  <div className="subtopic-page-sub__topics-sub">
                    {module.topic?.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        className={`subtopic-page-sub__item-sub ${
                          subtopic.id === subtopicId ? "active-sub" : ""
                        } ${
                          completedContent.includes(subtopic.id)
                            ? "completed-sub"
                            : ""
                        }`}
                        onClick={() => handleSubtopicClickSub(subtopic)}
                      >
                        <div className="subtopic-page-sub__item-content-sub">
                          <span className="subtopic-page-sub__item-text-sub">
                            {subtopic.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="subtopic-page-sub__loading-sub">
            <p>Loading course content...</p>
          </div>
        )}
      </div>

      <div className="subtopic-page-sub__right-panel-sub">
        {selectedSubtopicSub ? (
          <div className="subtopic-page-sub__content-area-sub">
            {renderSubtopicContentSub(selectedSubtopicSub)}
          </div>
        ) : (
          <div className="subtopic-page-sub__welcome-sub">
            <h3>Welcome to the Learning Platform</h3>
            <p>Select a subtopic from the left panel to start learning.</p>
            {!selectedCourseSub && (
              <p className="subtopic-page-sub__error-sub">
                Could not find the requested content. Please check the URL or
                navigate from the courses page.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtopicPage;
