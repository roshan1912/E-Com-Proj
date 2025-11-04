const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser } = require("../handlers/auth-handler");

authRouter.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    await registerUser(model);
    res.status(200).send({ message: "User Registered" });
  } else {
    res.status(400).json({
      error: "Please provide all the mandatory details",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    const result = await loginUser(model);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).json({ error: "Email or Password is Incorrect" });
    }
  } else {
    res.status(400).json({
      error: "Please Provide Email & Password",
    });
  }
});

module.exports = authRouter;
