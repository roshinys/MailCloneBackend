const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const mailController = require("../controllers/mailController");

router.post("/", authMiddleware, mailController.controller.createMail);
router.get("/inbox", authMiddleware, mailController.controller.getInboxMail);
router.put(
  "/:mailId",
  authMiddleware,
  mailController.controller.updateReadMail
);
router.get("/:mailId", authMiddleware, mailController.controller.getMailById);

module.exports = router;
