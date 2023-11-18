const express = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/", userController.testRoute);

router.post("/update/:id", verifyToken, userController.updateUser);

router.delete("/delete/:id", verifyToken, userController.deleteUser);

router.get("/listings/:id", verifyToken, userController.getUserListings);

module.exports = router;
