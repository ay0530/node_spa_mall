// 함수로 내보낸 값 조회
const add1 = require("./math.js");
console.log(add1(10, 20));

// 객체로 내보낸 값 조회
// const {} : 구조분해할당으로 객체 분리
const { add2 } = require("./math.js");
console.log(add2(10, 30));