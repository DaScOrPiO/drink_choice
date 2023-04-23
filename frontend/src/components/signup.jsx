import React, { useRef, useState } from "react";
import Button from "./button";
import { Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";

export default function Signup({ renderState, changeRenderState }) {
  const iconRef1 = useRef(),
    iconRef2 = useRef(),
    iconRef3 = useRef(), // Refrence input fields
    iconRef4 = useRef();

  const [signup, setSignup] = useState({
    fname: "",
    mail: "",
    password: "",
    passwordConfirm: "",
  });

  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const toggleState = () => {
    changeRenderState((prev) => !prev);
  };

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    let error = {}; //catches errors on input fields
    if (renderState) {
      if (signup.fname !== "" && signup.fname.length >= 4) {
        iconRef1.current.classList.remove("hidden");
        error.fname = false;
        if (!iconRef1.current.nextSibling.classList.contains("hidden")) {
          iconRef1.current.nextSibling.classList.add("hidden");
        }
      } else {
        iconRef1.current.classList.add("hidden");
        iconRef1.current.nextSibling.classList.remove("hidden");
        error.fname = true;
      }

      if (signup.mail !== "" && signup.mail.match(mailRegex)) {
        iconRef2.current.classList.remove("hidden");
        error.mail = false;
        if (!iconRef2.current.nextSibling.classList.contains("hidden")) {
          iconRef2.current.nextSibling.classList.add("hidden");
        }
      } else {
        iconRef2.current.classList.add("hidden");
        iconRef2.current.nextSibling.classList.remove("hidden");
        error.mail = true;
      }

      if (
        signup.password !== signup.passwordConfirm ||
        signup.password.length <= 3
      ) {
        iconRef3.current.nextSibling.classList.remove("hidden");
        iconRef4.current.nextSibling.classList.remove("hidden");
        error.password = true;
        if (!iconRef3.current.classList.contains("hidden")) {
          iconRef3.current.classList.add("hidden");
        }
        if (!iconRef4.current.classList.contains("hidden")) {
          iconRef4.current.classList.add("hidden");
        }
      } else {
        iconRef3.current.nextSibling.classList.add("hidden");
        iconRef4.current.nextSibling.classList.add("hidden");
        iconRef3.current.classList.remove("hidden");
        iconRef4.current.classList.remove("hidden");
        error.password = false;
      }
      console.log(error);
    }

    if (!error.password && !error.fname && !error.mail) {
      const url = "http://localhost:5000/register";
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
            fname: signup.fname,
            email: signup.mail,
            password: signup.password,
          },
          config
        )
        .then((data) =>
          data.data.error
            ? console.log("Failed") //Create Ui for this
            : console.log(data, "user registered") //Create Ui for this
        )
        .catch((err) => console.log(err, "Something wrong"));
      // setTimeout(() => toggleState(), 3000);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          type="text"
          placeholder="name"
          className="input-1"
          onChange={handleChange}
          name="fname"
          value={signup.fname}
        />
        <div className="check-icon hidden" ref={iconRef1}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          name must have @least 4 characters
        </p>
      </div>

      <div className="relative">
        <input
          type="email"
          id=""
          placeholder="E-mail"
          className="input-1"
          onChange={handleChange}
          name="mail"
          value={signup.mail}
        />
        <div className="check-icon hidden" ref={iconRef2}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          invalid mail, valid mail format johndoe@mail.com
        </p>
      </div>

      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="input-1"
          onChange={handleChange}
          name="password"
          value={signup.password}
        />
        <div className="check-icon hidden" ref={iconRef3}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          invalid password or password doesn't match
        </p>
      </div>

      <div className="relative">
        <input
          type="password"
          placeholder="confirm Password"
          className="input-1"
          onChange={handleChange}
          name="passwordConfirm"
          value={signup.passwordConfirm}
        />
        <div className="check-icon hidden" ref={iconRef4}>
          <GiCheckMark color="green" />
        </div>
        <p className="-mt-4 text-xs text-red-500 hidden">
          invalid password or password doesn't match
        </p>
      </div>

      <div className="flex items-center mt-4">
        <Button
          btnText="Signup"
          click={handleSubmit}
          style={{ width: "auto" }}
        />
        <Link className="mx-4 text-blue-800" onClick={toggleState}>
          Have an account? Login now!
        </Link>
      </div>
    </div>
  );
}
