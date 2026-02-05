const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.post("/register", userController.register);
// router.post("/login", userController.login);
// router.get("/profile", userController.getProfile);
// router.put("/profile", userController.updateProfile);
// router.delete("/profile", userController.deleteProfile);

module.exports = router;
