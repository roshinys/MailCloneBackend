const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

//routes
const authRoutes = require("./routes/authRoute");
const mailRoutes = require("./routes/mailRoute");

app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
