const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(ErrorHandler(404, "User Not Found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(ErrorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        data: {
          user: rest,
        },
      });
  } catch (err) {
    next(err);
  }
};

exports.google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random.toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      // console.log(rest);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
