import React from "react";
import Home from "./components/home";
import UserDashboard from "./components/userDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const isLoggedIn = window.localStorage.getItem("LoggedIn");
  return (
    <div className="w-screeen h-screen">
      <Router>
        <Routes>
          <Route
            path="/"
            element={!isLoggedIn ? <Home /> : <UserDashboard />}
          />
        </Routes>
      </Router>
    </div>
  );
}
