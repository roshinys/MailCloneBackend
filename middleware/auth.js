const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"] || req.body.token;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Token required for authentication" });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user.user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
