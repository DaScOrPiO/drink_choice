import React from "react";
import Button from "./button";

export default function Login(props) {
  return (
    <div className="flex flex-col w-full justify-center">
      <input type="username" placeholder="username" className="input" />
      <input type="password" placeholder="password" className="input" />
    </div>
  );
}
