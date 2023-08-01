const User = require("../models/User");
const Mail = require("../models/Mail");

const createMail = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

const getInboxMail = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

const updateReadMail = async (req, res) => {
  try {
    const mailId = req.params.mailId;
    await Mail.findByIdAndUpdate(mailId, { isRead: true });
    res.json({
      success: true,
      message: "Mail Read Updated",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

exports.controller = {
  createMail,
  getInboxMail,
  updateReadMail,
};
