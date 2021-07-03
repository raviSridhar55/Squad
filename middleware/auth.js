const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check the token
  if (!token) {
    res.status(401).json({ msg: "No Token Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));

    req.coach = decoded.coach;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
