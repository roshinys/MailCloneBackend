const User = require("../models/User");
const Mail = require("../models/Mail");
const mongoose = require("mongoose");

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
      sender: new mongoose.Types.ObjectId(user._id),
      receiver: new mongoose.Types.ObjectId(toUserExists._id),
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
      deleted: false,
    })
      .populate("sender", "email")
      .sort({ createdAt: -1 });
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

const getSentMail = async (req, res) => {
  try {
    const user = req.user;
    const allMails = await Mail.find({
      sender: user._id,
    })
      .populate("receiver", "email")
      .sort({ createdAt: -1 });
    const sentMails = allMails.map((email) => {
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
      message: "All Sent Mails",
      sentMails,
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

const getMailById = async (req, res) => {
  try {
    const mailId = req.params.mailId;
    const mail = await Mail.findById(mailId);
    return res.json({
      success: true,
      message: "Mail Read Updated",
      mail,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Please try again" });
  }
};

const deleteMailById = async (req, res) => {
  try {
    const mailId = req.params.mailId;
    const mail = await Mail.findById(mailId);
    if (!mail.deleted && mail.receiver.toString() === req.user._id) {
      const updatedMail = await Mail.findByIdAndUpdate(
        mailId,
        { deleted: true },
        { new: true }
      );
      return res.json({
        success: true,
        message: "Deleted Mail At Receiver End",
        mail: updatedMail,
      });
    } else if (mail.sender.toString() === req.user_id) {
      await Mail.findByIdAndDelete(mailId);
      return res.json({
        success: true,
        message: "Deleted Mail",
      });
    }
    return res.json({ success: false, message: "Unable to delete Mail" });
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
  getSentMail,
  updateReadMail,
  getMailById,
  deleteMailById,
};
