const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

const _dirname = path.resolve();

const app = express();
app.listen(8000, () => {
  console.log("Listening on Port 8000  !");
});

// to get the req.body
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

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
