
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { usermodel } = require("../model/usermodel");

const userrouter = Router();


userrouter.get("/", (req, res) => {
  res.send("hi");
});

userrouter.post("/register", async (req, res) => {
  const {name, email, password,  gender } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your passwordword DB.
      const userer = new usermodel({ email, name, gender, password: hash });
      await userer.save();
      res.send({ msg: "new user registered" });
    });
  } catch (error) {
    res.send(error);
  }
});
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorid: user._id },
            "masai"
          );

          res.status(200).send({ msg: "login successfull", token: token });
        } else {
          res.status(200).send({ msg: "wrong" });
        }
        // result == false
      });
    } else {
      res.status(200).send({ msg: "wrong" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  userrouter,
};
