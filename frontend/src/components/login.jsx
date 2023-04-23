import React, { useRef, useState } from "react";
import Button from "./button";
import { useNavigate, Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { CgSmileSad } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

export default function Login({ renderState, changeRenderState }) {
  const [inputLogin, setInputLogin] = useState({
    mail: "",
    password: "",
  });

  const [login, setLogin] = useState(false);
  const closeErrorDiv = () => {
    setLogin(!login);
  };

  //Refrence input fiels
  const iconRef1 = useRef(),
    iconRef2 = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(inputLogin);

  const toggleState = (e) => {
    e.preventDefault();
    changeRenderState((prev) => !prev);
  };

  const navigate = useNavigate();
  const navigateUser = (e) => {
    // e.preventDefault();

    // if (renderState) {
    //   console.log(inputLogin);
    // }
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/login";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
        "Accept-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        url,
        {
          email: inputLogin.mail,
          password: inputLogin.password,
        },
        config
      )
      .then((data) => console.log(data, "logged In"))
      .catch((err) => console.log(err, "Something wrong"));
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="relative">
        <input
          type="email"
          placeholder="E-mail"
          name="mail"
          value={inputLogin.mail}
          onChange={handleChange}
          className="input"
        />
        {/* <div className="absolute right-28 top-10 hidden" ref={iconRef1}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          name must have @least 4 characters
        </p> */}
      </div>

      <div className="relative">
        <input
          type="password"
          placeholder="password"
          className="input"
          name="password"
          value={inputLogin.password}
          onChange={handleChange}
        />
        {/* <div className="absolute right-28 top-10 hidden" ref={iconRef2}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          name must have @least 4 characters
        </p> */}
      </div>

      {/*popup container */}
      {login && (
        <div className="w-full flex items-center justify-center bg-transparent">
          <div className="md:w-2/4 sm:w-3/4 bg-white flex py-2 px-2 rounded-sm relative">
            <CgSmileSad size="30px" color="yellow" />
            <p className="mx-4">User not found</p>

            <div
              className="absolute top-0 right-0 hover:cursor-pointer hover:text-gray-600"
              onClick={closeErrorDiv}
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        <Button
          btnText="Login"
          click={handleSubmit}
          style={{ width: "auto" }}
        />

        <Link className="mx-4 text-blue-800" onClick={toggleState}>
          Don't have an account? Signup
        </Link>
      </div>
    </div>
  );
}
