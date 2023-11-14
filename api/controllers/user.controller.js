const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/error");
const User = require("../models/usermodel");

exports.testRoute = (req, res) => {
  res.json({
    message: "Api route is working",
  });
};

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(ErrorHandler(401, "You can only update your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true, runValidators: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(err);
  }
};
