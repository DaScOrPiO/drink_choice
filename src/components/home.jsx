import React from "react";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import Button from "./button";

export default function Home() {
  const [RenderSignup, setRenderSignup] = useState(false);
  return (
    <div>
      <form action="">
        {RenderSignup ? <Signup /> : <Login />}
        <Button btnText={RenderSignup ? "Signup" : "Login"} />
      </form>
    </div>
  );
}
