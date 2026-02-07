const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");

// 모든 Task 라우트에 인증 적용
router.get("/", authController.authenticate, taskController.getTasks);
router.post("/", authController.authenticate, taskController.createTask);
router.put("/:id", authController.authenticate, taskController.updateTask);
router.delete("/:id", authController.authenticate, taskController.deleteTask);

module.exports = router;
