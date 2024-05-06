const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const jwttoken = token.split(" ")[1];
    const decode = jwt.verify(jwttoken, JWT_SECRET);
    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.stats(403).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
}

module.exports = {
  userMiddleware,
};
