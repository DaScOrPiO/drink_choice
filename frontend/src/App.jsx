import React from "react";
import Home from "./components/home";
import UserDashboard from "./components/userDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="w-screeen h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
