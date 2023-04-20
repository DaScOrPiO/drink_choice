import React from "react";
import { useState, useRef } from "react";
import Login from "./login";
import Signup from "./signup";
import Button from "./button";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [RenderSignup, setRenderSignup] = useState(true);
  const navigate = useNavigate();
  const toggleState = (e) => {
    e.preventDefault();
    setRenderSignup((prev) => !prev);

  };

  const navigateUser = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="h-full w-full flex justify-center items-center main-container">
      <div
        className="lg:w-3/4 rounded-lg lg:h-3/4 sm:w-full bg-transparent flex hover:shadow-2xl
       transition-shadow duration-500 ease-in"
      >
        <div className="lg:w-3/5 lg:h-full sm:w-full sm:h-full flex flex-col items-center px-6">
          <h2 className="lg:text-3xl sm:text-2xl font-extrabold mt-4">
            Welcome To The Drink Choice Project
          </h2>
          <div className="flex flex-col justify-center mt-6 w-full">
            <form action="">
              {RenderSignup ? <Signup /> : <Login />}
              <Button
                btnText={RenderSignup ? "Signup" : "Login"}
                click={RenderSignup ? toggleState : navigateUser}
              />

              <Link className="mx-4 text-blue-800" onClick={toggleState}>
                {RenderSignup
                  ? "Have an account? Login now!"
                  : "Signup for an account"}
              </Link>
            </form>
          </div>
        </div>
        <div className="lg:flex w-2/5 h-full empty-container-bg rounded-lg"></div>
      </div>
    </div>
  );
}
