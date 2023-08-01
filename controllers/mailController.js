const User = require("../models/User");
const Mail = require("../models/User");

const createMail = async (req, res) => {
  const user = req.user;
  const { to, message, subject } = req.body;
  const toUserExists = await User.findOne({ email: to });
  if (!toUserExists) {
    return res
      .status(409)
      .json({ success: false, message: "To User Doesn't Exist" });
  }
  const mail = await Mail.create({
    sender: user.email,
    receiver: to,
    body: message,
    subject: subject,
  });
  res.json({ success: true, message: "Mail Created", mail });
};

exports.controller = {
  createMail,
};
