const userController = {};
const User = require("../model/User");
const bcrypt = require("bcryptjs");
let saltCount = 10;
userController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // 1. user가 기존 유저인지
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new Error("가입된 유저가 있습니다.");
    }
    // 2. 비밀번호 암호화
    const salt = await bcrypt.genSaltSync(saltCount);
    const hash = await bcrypt.hashSync(password, salt);

    // 3. 유저 생성
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    // 패스워드 암호화
    res.status(200).json({
      message: "회원가입 성공",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = userController;
