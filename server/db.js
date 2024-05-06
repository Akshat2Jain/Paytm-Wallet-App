const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://paytm:xtGcbHSPb4KUS4Gq@cluster0.vhrze3h.mongodb.net/paytmProject"
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  email: String,
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
