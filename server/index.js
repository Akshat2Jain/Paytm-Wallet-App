const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");
const port = 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// app.get("/api/v1/get", function (req, res) {
//   res.status(200).json({ msg: "Working" });
// });

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
