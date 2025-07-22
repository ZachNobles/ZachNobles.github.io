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
import Scrabble from "./pages/scrabble/scrabble"
import Miscellaneous from './pages/miscellaneous/miscellaneous';

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
              <Route exact path="/scrabble" element={<Scrabble />} />
              <Route exact path="/miscellaneous" element={<Miscellaneous />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
