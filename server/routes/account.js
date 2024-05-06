const express = require("express");
const router = express.Router();
const JWT_SECRET = require("../config");
const { default: mongoose } = require("mongoose");
const { userMiddleware } = require("../middleware");
const { Account } = require("../db");

router.get("/balance", userMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    const balance = account.balance;
    res.status(200).json({
      msg: "Balance Fetched succesfully",
      balance,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
    });
  }
});

router.post("/transfer", userMiddleware, async function (req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "Insufficient Balance" });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transfer Complete",
  });
});

module.exports = router;
