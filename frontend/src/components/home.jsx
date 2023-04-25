import React from "react";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { motion } from "framer-motion";

export default function Home() {
  const [RenderSignup, setRenderSignup] = useState(false);

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
              {RenderSignup ? (
                <Signup
                  renderState={RenderSignup}
                  changeRenderState={setRenderSignup}
                />
              ) : (
                <Login
                  renderState={RenderSignup}
                  changeRenderState={setRenderSignup}
                />
              )}
            </form>
          </div>
        </div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:flex w-2/5 h-full empty-container-bg rounded-lg"
        ></motion.div>
      </div>
    </div>
  );
}
