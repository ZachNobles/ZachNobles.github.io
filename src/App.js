import './App.css';

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about/about";
import Projects from "./pages/projects/projects"
import Alex from "./pages/alex/alex"

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/projects" element={<Projects />} />
              <Route exact path="/alex" element={<Alex />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
