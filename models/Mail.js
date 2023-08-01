const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  body: { type: String },
  subject: { type: String },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
