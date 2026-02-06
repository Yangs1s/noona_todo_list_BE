const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.post("/", userController.register);

// 왜 get을 쓰지 않고 포스트를 쓰는가?
// 유저의 비밀번호, 아이디 정보를 가져와야하는데
// get은 request body를 사용하지 못해서, url에 실어서 보내줘야한다.
// post가 get 방식보다 더 안전하다.
router.post("/login", userController.login);

// router.get("/profile", userController.getProfile);
// router.put("/profile", userController.updateProfile);
// router.delete("/profile", userController.deleteProfile);

module.exports = router;
