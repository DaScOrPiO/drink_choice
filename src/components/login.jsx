import React, { useState } from "react";
import Button from "./button";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ renderState, changeRenderState }) {
  const [inputLogin, setInputLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };
  console.log(inputLogin);

  const toggleState = (e) => {
    e.preventDefault();
    changeRenderState((prev) => !prev);
  };

  const navigate = useNavigate();
  const navigateUser = (e) => {
    e.preventDefault();

    if (renderState) {
      console.log(inputLogin);
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <input
        type="username"
        placeholder="username"
        name="username"
        value={inputLogin.username}
        onChange={handleChange}
        className="input"
      />
      <input
        type="password"
        placeholder="password"
        className="input"
        name="password"
        value={inputLogin.password}
        onChange={handleChange}
      />

      <div className="flex items-center">
        <Button
          btnText="Login"
          click={navigateUser}
          style={{ width: "auto" }}
        />

        <Link className="mx-4 text-blue-800" onClick={toggleState}>
          Don't have an account? Signup
        </Link>
      </div>
    </div>
  );
}
