const authController = {};
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/User");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      return res.status(401).json({ message: "인증 실패" });
    }
    const token = tokenString.replace("Bearer ", "");

    // token 검증

    jwt.verify(token, JWT_SECRET, async (error, payload) => {
      if (error) {
        throw new Error("인증 실패");
      }
      // 인증 성공 시, userId를 요청 객체에 저장
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = authController;

// middleware
// 인증 과정을 거쳐야 하는 경로에 대해서 인증 과정을 거쳐야 한다.
