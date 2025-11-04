const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }

  try {
    const decode = jwt.verify(token, "loginKey");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Access Denied OR Token Expired" });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({ message: "Forbidden" });
  }
}

module.exports = { verifyToken, isAdmin };
