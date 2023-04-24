const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _KEy = "W;FKFJCafAqQreh;pkhjfdsiWQJvV";

//connection server
app.listen(5000, () => console.log("server started at port:5000"));

//Connect database
const connectUrl =
  "mongodb+srv://Faith:kolz15475@cluster0.tqogigo.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectUrl, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch((e) => console.log(e));

//Import Signup Details
require("./signupDetails");
const user = mongoose.model("userSignup");

// Register Api
app.post("/register", async (req, res) => {
  const { fname, email, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10); //Encrypt user password

  const userExist = await user.findOne({ email });

  try {
    if (userExist) {
      return res.json({ error: "user exists" });
    }
    await user.create({
      fname,
      email,
      password: encryptPassword,
    });
    return res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Somethin went wrong" });
  }
});

//Login Api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExist = await user.findOne({ email });
  if (!userExist) {
    return res.json({ error: "no users found!" });
  }
  if (await bcrypt.compare(password, userExist.password)) {
    const token = jwt.sign({ email: userExist.email }, _KEy);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "INVALID PASSWORD!" });
});

//GetDetails
app.post("/userDetails", async (req, res) => {
  const { token } = req.body;
  try {
    const users = jwt.verify(token, _KEy);
    const userEmail = users.email;
    user
      .findOne({ email: userEmail })
      .then((data) => {
        console.log(data);
        return res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        console.log(error);
        return res.send({ status: error, data: error });
      });
  } catch (error) {}
});
