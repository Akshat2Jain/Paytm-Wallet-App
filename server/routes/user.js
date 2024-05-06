const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");

// const signupSchema = zod.object({
//   username: zod.string(),
//   password: zod.string(),
//   email: zod.string().email(),
// });

router.post("/signup", async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const userExits = await User.findOne({
      email: email,
    });
    if (userExits) {
      return res.status(411).json({ msg: "User alredy exits" });
    }
    const sanitizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: sanitizedEmail,
    });
    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 1000,
    });
    res.status(200).json({ msg: "User saved successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Something Went Wrong",
    });
  }
});

router.post("/signin", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: sanitizedEmail,
    });
    if (!user) {
      return res.status(411).json({ msg: "User not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(411).json({ msg: "Password is incorrect" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ msg: "Successfully sign in", token });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getFilterUser", async function (req, res) {
  const filter = req.query.filter || "";
  const users = await User.find({
    username: {
      $regex: filter,
    },
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      email: user.email,
      _id: user._id,
    })),
  });
});

module.exports = router;
