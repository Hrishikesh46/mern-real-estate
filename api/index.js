const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user.route");

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

app.use("/api/user", userRouter);
