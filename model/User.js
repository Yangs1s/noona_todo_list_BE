const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "이메일 형식이 올바르지 않습니다"],
    },
    password: {
      type: String,
      required: true,
      min: [8, "비밀번호는 최소 8자이상이여야 합니다."],
    },
  },
  { timestamps: true }
);
// 스키마에서 데이터를 던져줄때, 제외시켜주싶은 정보가 있다면,

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  // password는 삭제한다
  delete obj.password;

  return obj;
};

// 왜 여기서 만드나여?
// USER와 관련이 있는 내용이고,
// instance method
// - 스키마에 메서드를 정의해두면, 그 스키마로 만들어진 모든 instance에서 this로 자기 데이터에 접근해서 사용
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("user", userSchema);
module.exports = User;
