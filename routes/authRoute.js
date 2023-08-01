const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const router = express.Router();
const authMiddleware = require("../middleware/auth");

//controller
const authController = require("../controllers/authController");

//validators
const registerSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authController.controller.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authController.controller.postLogin
);

router.get("/test", authMiddleware, (req, res) => {
  res.json({ message: "token recognized" });
});

module.exports = router;
