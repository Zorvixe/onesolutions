import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Courses from "./components/Courses/Courses";
import Pricing from "./components/Pricing/Pricing";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import Enroll from "./components/Enroll/Enroll";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";
import NotFound from "./components/NotFound/NotFound";
import Maintenance from "./components/Maintaince/Maintaince";
import FullStackDevelopment from "./components/FullStackDevelopment/FullStackDevelopment";
import DigitalMarketing from "./components/DigitalMarketing/DigitalMarketing";
import DataAnalyst from "./components/DataAnalyst/DataAnalyst";
import Blog from "./components/Blog/Blog";


function App() {
  const isMaintenance = false; 

  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <Router>
      <Header />

      {/* Page Routes */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/maintaince" element={<Maintenance />} />
          <Route path="/fullstackdevelopment" element={<FullStackDevelopment />} />
          <Route path="/digital_marketing" element={<DigitalMarketing />} />
          <Route path="/data_analyst" element={<DataAnalyst />} />
          <Route path="/blog" element={<Blog />} />


          {/* 404 Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
