const mongoose = require("mongoose");

require("mongoose");

const signUpDetails = new mongoose.Schema(
  { fname: String, email: { type: String, unique: true }, password: String },
  { collection: "userSignup" }
);

mongoose.model("userSignup", signUpDetails);

//Collect Signup Info
