import './App.css';

import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
          </Routes>
      </Router>
      {/* <header className="App-header">
        <p>
          I'm working on it
        </p>
      </header> */}
    </div>
  );
}

export default App;
