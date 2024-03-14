import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./pages/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
