const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const mailController = require("../controllers/mailController");

router.post("/", authMiddleware, mailController.controller.createMail);

module.exports = router;
