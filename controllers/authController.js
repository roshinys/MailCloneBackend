const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashPass,
    });
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY);
    return res.status(201).json({
      success: true,
      message: "User created success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "User Doesnt Exists" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(409)
        .json({ success: false, message: "Password Not Match" });
    }
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY);
    return res.status(201).json({
      success: true,
      message: "User Logged in success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

exports.controller = {
  postLogin,
  postRegister,
};
