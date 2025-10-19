import React, { useState } from "react";
import MCQInstructions from "./MCQInstructions";

// Import all MCQs
import Pro_W_P_MCQ from "./IntroductiontoPython/Pro_W_P_MCQ";
import Variables_DT_MCQ from "./IntroductiontoPython/Variables_DT_MCQ";
import Inp_Oup_Basics_MCQ from "./Inp_Oup_Basiscs/Inp_Oup_Basics_MCQ";
import Seq_OF_Instruction_MCQ from "./IntroductiontoPython/Seq_OF_Instruction_MCQ";
import ConditionalStmts_MCQ from "./Operators&ConditionalStmts/ConditionalStmts_MCQ";
import LogicalOperators_MCQ from "./Operators&ConditionalStmts/LogicalOperators_MCQ";
import RelationOperator_MCQ from "./Operators&ConditionalStmts/RelationOperator_MCQ";
import Type_Con_MCQ from "./Inp_Oup_Basiscs/Type_Con_MCQ";
import Nested_con_MCQ from "./NestedConditions/Nested_con_MCQ";
import Loops_MCQ from "./Loops/Loops_MCQ";
import ForLoop_MCQ from "./Loops/ForLoop_MCQ";
import LoopControlStmts_MCQ from "./LoopContronStmts/LoopControlStmts_MCQ";
import NestedLoops_MCQ from "./LoopContronStmts/NestedLoops_MCQ";
import ComparingStrAndNamingVar_MCQ from "./ComparingStr&NamingVar/ComparingStrAndNamingVar_MCQ";
import List_MCQ from "./Lists/List_MCQ";
import Lists_String_MCQ from "./Functions/Lists_String_MCQ";
import Functions_Argu_MCQ from "./Functions/Functions_Argu_MCQ";
import Functions_CS_MCQ from "./Functions/Functions_MCQ";
import Built_in_Fun_MCQ from "./Recursion/Built_in_Fun_MCQ";
import FunCallStack_Recursion_MCQ from "./Recursion/FunCallStack_Recursion_MCQ";
import ListMethods_MCQ from "./Recursion/ListMethods_MCQ";
import SetOperations_MCQ from "./Tuples&Sets/Set_Operations_MCQ";
import Sets_MCQ from "./Tuples&Sets/Sets_MCQ";
import Tuples_Sequences_MCQ from "./Tuples&Sets/Tuples_Sequences_MCQ";
import NestedList_StringFormatting_MCQ from "./Dictionaries/NestedList_StringFormating_MCQ"; // keep same as actual file
import Dictionaries_MCQ from "./Dictionaries/Dictionaries_MCQ";
import Working_With_Dictionaries_MCQ from "./Dictionaries/Working_With_Dictionaries_MCQ";
import Attributes_Methods_MCQ from "./IntroductiontoOOP/Attributes_Methods_MCQ";
import Classes_Object_MCQ from "./IntroductiontoOOP/Classes_Object_MCQ";
import Inheritance_Part1_MCQ from "./IntroductiontoOOP/Inheritance_Part1_MCQ";
import Inheritance_Part2_MCQ from "./IntroductiontoOOP/Inheritance_Part2_MCQ";
import Introductionto_OOP1_MCQ from "./IntroductiontoOOP/Introductionto_OPP1_MCQ";
import Introduction_Opp_MCQ2 from "./IntroductiontoOOP/Introduction_Opp_MCQ2";
import Dates_Time_MCQ from "./Miscellaneous/Dates_Time_MCQ";
import Errors_Exceptions_MCQ from "./Miscellaneous/Errors_Exceptions_MCQ";
import Python_Standard_Library_MCQ from "./Miscellaneous/Python_Standard_Library_MCQ";
import Scope_Namespaces_MCQ from "./Miscellaneous/Scope_Namespaces__MCQ";

import Introductionto_HTML_CS_MCQ from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_HTML_MCQ";
import Introductionto_Css_MCQ_1 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_1";
import Introductionto_Css_MCQ_2 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_2";
import Introductionto_Css_MCQ_3 from "../StaticWebsite/Introductionto_HTML_CSS/Introductionto_Css_MCQ_3";
import Introductionto_Css_BoxModel_MCQ_1 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_MCQ_1"
import Introductionto_Css_BoxModel_MCQ_2 from "../StaticWebsite/Css_BoxModel/Introductionto_Css_BoxModel_MCQ_2";
import Introductionto_BootStrap_MCQ_1 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_MCQ_1";
import Introductionto_BootStrap_MCQ_2 from "../StaticWebsite/BootStrap/Introductionto_BootStrap_MCQ_2";
import FavouritePlaces_Section_MCQ_1 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_Section_MCQ_1";
import Approachto_Develop_Layout_MCQ_2 from "../StaticWebsite/DevelopingLayouts/Approachto_Develop_Layout_MCQ_2";
import FavouritePlaces_DetailView_MCQ_3 from "../StaticWebsite/DevelopingLayouts/FavouritePlaces_DetailView_MCQ_3";

import OnDemand_Session_MCQ from "../StaticWebsite/WebSiteIntegration/OnDemand_Session_MCQ";
import Website_Integration_MCQ_1 from "../StaticWebsite/WebSiteIntegration/Website_Integration_MCQ_1";
import Website_Integration_MCQ_2 from "../StaticWebsite/WebSiteIntegration/Website_Integration_MCQ_2";
import HTML_HyperLinks_MCQ from "../StaticWebsite/WebSiteIntegration/HTML_HyperLinks_MCQ";
import MCQ_Assignment1 from "../StaticWebsite/Assignments/MCQ_Assignment1";
import MCQ_Assignment_2 from "../StaticWebsite/Assignments/MCQ_Assignment_2";
import MCQ_Assignment_3 from "../StaticWebsite/Assignments/MCQ_Assignment_3";
import MCQ_Assignment_4 from "../StaticWebsite/Assignments/MCQ_Assignment_4";

import Introductionto_Responsive_WD_MCQ from "../DynamicWebsite/Responsive_WD_BS_Grid_Sys/Introductionto_Responsive_WD_MCQ";
import Bootstrap_Grid_Sys_MCQ_1 from "../DynamicWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_MCQ_1";
import Bootstrap_Grid_Sys_MCQ_2 from "../DynamicWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Grid_Sys_MCQ_2";
import Bootstrap_Navbar_MCQ from "../DynamicWebsite/Responsive_WD_BS_Grid_Sys/Bootstrap_Navbar_MCQ";
import Banner_Section_MCQ from "../DynamicWebsite/Developing_Layouts1/Banner_Section_MCQ";
import Explore_Menu_Section_MCQ from "../DynamicWebsite/Developing_Layouts1/Explore_Menu_Section_MCQ";
import Healthy_Delivary_Payments_MCQ from "../DynamicWebsite/Developing_Layouts1/Healthy_Delivary_Payments_MCQ";
import Why_Chooseus_Section_MCQ from "../DynamicWebsite/Developing_Layouts1/Why_Chooseus_Section_MCQ";
import Css_Selector_Inheritance_MCQ from "../DynamicWebsite/CSS_Building_Blocks/Css_Selector_Inheritance_MCQ";
import Css_Specificity_Cascade_MCQ from "../DynamicWebsite/CSS_Building_Blocks/Css_Specificity_Cascade_MCQ";
import Followus_More_Styles_MCQ from "../DynamicWebsite/Developing_Layouts2/Followus_More_Styles_MCQ";
import CSS_Gradience_MCQ from "../DynamicWebsite/Developing_Layouts2/CSS_Gradience_MCQ";
import MCQ_Assignments_1 from "../DynamicWebsite/Assignments/MCQ_Assignments_1";
import MCQ_Assignments_2 from "../DynamicWebsite/Assignments/MCQ_Assignments_2";
import MCQ_Assignments_3 from "../DynamicWebsite/Assignments/MCQ_Assignments_3";
import MCQ_Assignments_4 from "../DynamicWebsite/Assignments/MCQ_Assignments_4";


const mcqMap = {
  "Programming with Python": Pro_W_P_MCQ,
  "Variables and Data Types": Variables_DT_MCQ,
  "Sequence of Instructions": Seq_OF_Instruction_MCQ,
  "Input and Output Basics": Inp_Oup_Basics_MCQ,
  "Type Conversion": Type_Con_MCQ,
  "Conditional Statements": ConditionalStmts_MCQ,
  "Logical Operators": LogicalOperators_MCQ,
  "Relational Operators": RelationOperator_MCQ,
   "Nested Conditions" :  Nested_con_MCQ ,
   "Loops":Loops_MCQ,
    "For Loop": ForLoop_MCQ, 
    "Nested Loops": NestedLoops_MCQ,              
  "Loop Control Stmts": LoopControlStmts_MCQ, 
  "Comparing Strings & Naming Variables" : ComparingStrAndNamingVar_MCQ,
   "Functions":Functions_CS_MCQ,
   "Lists" :List_MCQ,
   "Function Arguments": Functions_Argu_MCQ,
   "List & Strings" : Lists_String_MCQ,
   "Built-in Functions": Built_in_Fun_MCQ,
   "Function Call Stack & Recursion": FunCallStack_Recursion_MCQ,
    "List Methods" : ListMethods_MCQ,
   "Tuples & Sequences": Tuples_Sequences_MCQ,
  "Sets": Sets_MCQ,
  "Set Operations": SetOperations_MCQ,
  "Nested Lists & String Formatting": NestedList_StringFormatting_MCQ,
  "Dictionaries": Dictionaries_MCQ,
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

  

 "Introduction to HTML": Introductionto_HTML_CS_MCQ,
 "Introduction to CSS Prat 1": Introductionto_Css_MCQ_1,
 "Introduction to CSS Prat 2": Introductionto_Css_MCQ_2,
 "Introduction to CSS Prat 3": Introductionto_Css_MCQ_3,
 "Introduction to CSS Box Model Part 1": Introductionto_Css_BoxModel_MCQ_1,
 "Introduction to CSS Box Model Part 2": Introductionto_Css_BoxModel_MCQ_2,
 "Introduction to Bootstrap Part 1" : Introductionto_BootStrap_MCQ_1,
 "Introduction to Bootstrap Part 2" : Introductionto_BootStrap_MCQ_2,
 "Favourite Places Section" :  FavouritePlaces_Section_MCQ_1,
"Approach to Develop a Layout" : Approachto_Develop_Layout_MCQ_2,
"Favourite Place Detailed View Section" : FavouritePlaces_DetailView_MCQ_3,
"Website Integration Part 1": Website_Integration_MCQ_1,
"Website Integration Part 2": Website_Integration_MCQ_2,
"HTML Hyperlinks": HTML_HyperLinks_MCQ,
"On-Demand Session": OnDemand_Session_MCQ,
"MCQ Assignment 1": MCQ_Assignment1,
"MCQ Assignment 2": MCQ_Assignment_2,
"MCQ Assignment 3": MCQ_Assignment_3,
"MCQ Assignment 4": MCQ_Assignment_4,

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
  "Follow Us Section & More Styling" : Followus_More_Styles_MCQ,
 "CSS Gradients & More BootStrap Components" : CSS_Gradience_MCQ ,
 "MCQ Assignment 1": MCQ_Assignments_1,
 "MCQ Assignment 2": MCQ_Assignments_2,
 "MCQ Assignment 3": MCQ_Assignments_3,
 "MCQ Assignment 4": MCQ_Assignments_4,
};

const MCQWrapper = ({ subtopic, onSubtopicComplete }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  // Show instructions first
  if (showInstructions) {
    return <MCQInstructions onStart={() => setShowInstructions(false)} />;
  }

  const MCQComponent = mcqMap[subtopic];

  if (!MCQComponent) {
    return <p>No MCQ found for "{subtopic}"</p>;
  }

  return (
    <div className="mcq-container">
      <MCQComponent onComplete={onSubtopicComplete} />
    </div>
  );
};

export default MCQWrapper;
