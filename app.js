const express = require('express'); // express 라이브러리를 변수에 할당
const app = express(); // express를 실행해서 app 객체 생성
const port = 3000; // 서버 포트
const goodsRouter = require('./routes/goods.js'); // goods.js 파일의 router 반환하기


// req.body를 사용하기 위해선 body-parse middleware(express.json())을 사용해야함
app.use(express.json());

// req.body
app.post("/", (req, res) => {
  console.log(req.body);
  res.send('기본 URL의 POST 메소드 정상 실행');
});

// req.query
app.get("/", (req, res) => {
  console.log(req.query);
  res.send('정상 반환');
});

// req.params
// /:id : url 뒤에 오는 값은 id라는 키의 value가 됨 
app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(':id URL 정상 반환');
});

// res.query
app.get("/", (req, res) => {
  console.log(req.query);
  const obj = {
    "Key1": "value1",
    "Key2": "value2"
  }
  res.json(obj);
  // res.status(400).json({
  //   "Key3": "value3",
  //   "Key4": "value4"
  // });
});

// get 메서드로 api 실행
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// use 메서드로 실행 순서 설정 (app.use가 실행된 후 다음 메서드들이 실행됨)
// app.use : 미들웨어
app.use("/api", goodsRouter); // localhost:3000/api

// listen 메서드로 서버 실행
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
