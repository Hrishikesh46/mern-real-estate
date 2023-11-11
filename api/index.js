const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(8000, () => {
  console.log("Listening on Port 8000  !");
});

// to get the req.body
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// to handle global error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});
