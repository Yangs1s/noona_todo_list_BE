const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
router.get("/", taskController.getTasks);
router.post("/", authController.authenticate, taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
