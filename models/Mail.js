const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: { type: String, ref: "User" },
  receiver: { type: String, res: "User" },
  body: { type: String },
  Subject: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
