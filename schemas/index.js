const mongoose = require("mongoose"); // 변수에 mongoose 패키지 참조

const connect = () => {
  mongoose
    // .connect("mongodb://데이터베이스 URL:포트/DB명") : mongoDB에 접속 ~
    // .connect("mongodb://localhost:27017/spa_mall")
    .connect("mongodb+srv://ay0530:xf18696@cluster0.bstg7nd.mongodb.net/spa_mall")
    .then(() => console.log("DB Connected")) // .then() : DB 성공 문구 출력
    .catch(err => console.log(err)); // .catch() : 연결 실패 시 에러 로그 출력
};

// mongoose.connection.on("error", err =>{}) 
// : mongoose로 연결 중 에러가 발생했을 경우
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect; // connect 내보내기