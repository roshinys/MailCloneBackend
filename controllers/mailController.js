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

const getInboxMail = async (req, res) => {
  const user = req.user;
  const allMails = await Mail.find({
    receiver: user._id,
  }).sort({ createdAt: -1 });
  const inboxMails = allMails.map((email) => {
    const date = new Date(email.createdAt);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedTime = date.toLocaleString("en-US", options);
    return {
      ...email._doc,
      createdAt: formattedTime,
    };
  });
  res.json({
    success: true,
    message: "Mail Created",
    inboxMails,
  });
};

exports.controller = {
  createMail,
  getInboxMail,
};
