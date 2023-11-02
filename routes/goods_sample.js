const express = require("express"); // express 라이브러리를 변수에 참조
const router = express.Router(); // router 함수를 변수에 참조

// API 생성하기
// 기본 경로(/)에 왔을 때 반환
// localhost:3000/api/
router.get('/', (req, res) => {
  res.send("default url for goods.js GET Method"); // res.send() : send 안에 있는 값을 반환
})

// /about 경로에 왔을 때 반환
// localhost:3000/api/about
router.get('/about', (req, res) => {
  res.send("goods.js about PATH");
})

// app.js로 router 변수 내보내기
module.exports = router; // module.exports : router 변수를 외부로 내보냄