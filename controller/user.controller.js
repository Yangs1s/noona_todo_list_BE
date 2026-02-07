const userController = {};
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
let saltCount = 10;
userController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // 빈값 체크
    if (!email || !password) {
      throw new Error("이메일과 비밀번호를 입력해주세요");
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "대문자, 소문자, 숫자 포함 8자 이상이여야 합니다." });
    }

    // 1. user가 기존 유저인지
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new Error("가입된 유저가 있습니다.");
    }
    // 2. 비밀번호 암호화
    const salt = await bcrypt.genSalt(saltCount);
    const hash = await bcrypt.hash(password, salt);

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

// login
/** 
     * 이메일을 가지고 유저 정보 가져오기
     * password가 패스워드와 일치하는지
      --> 어떻게 일치하는지 확인할 수 있을까?
      --> 내 생각은 DB에 저장된 암호된 password와 비교한다.
        ---> 어떻게?
         ----> 라이브러리?, 직접 함수를 만드나?
          ----> 
     * */

userController.login = async (req, res) => {
  // console.log(User);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

    // 암호화된 패스워드와 입력 패스워드를 비교
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      // 매칭이 된다면?
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({
          message: "로그인 성공",
          user,
          token,
        });
      }
    }
    // 이메일 / 비밀번호 중 뭐가 틀렸는지 구분
    throw new Error("아이디 혹은 비밀번호가 일치하지 않아요");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

userController.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-createdAt -updatedAt -__v");
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = userController;
