const User = require("../models/User");
const Mail = require("../models/Mail");

const createMail = async (req, res) => {
  const user = req.user;
  const { to, message, subject } = req.body;
  const toUserExists = await User.findOne({ email: to });
  if (!toUserExists) {
    return res
      .status(409)
      .json({ success: false, message: "To User Doesn't Exist" });
  }
  const mail = new Mail({
    sender: user._id,
    receiver: toUserExists._id,
    body: message,
    subject: subject,
  });
  await mail.save();
  res.json({ success: true, message: "Mail Created", mail });
};

exports.controller = {
  createMail,
};
