const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  body: { type: String },
  Subject: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
