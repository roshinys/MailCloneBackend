const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  body: { type: String },
  subject: { type: String },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
