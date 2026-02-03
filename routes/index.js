const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");

router.use("/task", taskApi);

module.exports = router;
