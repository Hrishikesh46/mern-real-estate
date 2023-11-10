const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

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
      status: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
