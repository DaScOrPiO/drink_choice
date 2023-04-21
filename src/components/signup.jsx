import React, { useState } from "react";
import Button from "./button";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ renderState, changeRenderState }) {
  // const [renderForm, setRenderForm] = useState(renderState)
  const [signup, setSignup] = useState({
    fname: "",
    mail: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const toggleState = (e) => {
    e.preventDefault();
    changeRenderState((prev) => !prev);
  };

  const navigate = useNavigate();
  const navigateUser = (e) => {
    e.preventDefault();

    if (renderState) {
      console.log(signup);
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="name"
        className="input-1"
        onChange={handleChange}
        name="fname"
        value={signup.fname}
      />
      <input
        type="email"
        id=""
        placeholder="E-mail"
        className="input-1"
        onChange={handleChange}
        name="mail"
        value={signup.mail}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-1"
        onChange={handleChange}
        name="password"
        value={signup.password}
      />
      <input
        type="password"
        placeholder="confirm Password"
        className="input-1"
        onChange={handleChange}
        name="passwordConfirm"
        value={signup.passwordConfirm}
      />

      <div className="flex items-center">
        <Button
          btnText="Signup"
          click={renderState ? toggleState : navigateUser}
          style={{ width: "auto" }}
        />
        <Link className="mx-4 text-blue-800" onClick={toggleState}>
          Have an account? Login now!
        </Link>
      </div>
    </div>
  );
}
