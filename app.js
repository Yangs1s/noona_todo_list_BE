const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes");
const cors = require("cors");
require("dotenv").config();
// api 요청에서 받은 body값을 파싱하는 라이브러리
const bodyParser = require("body-parser");
// mongodb 연결을 위한 라이브러리
const MONGO_URI = process.env.MONGO_URI;
// express 서버 생성
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

mongoose.connect(MONGO_URI).catch((err) => {
  console.log(MONGO_URI);
  console.log("MongoDB connection error:", err);
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
