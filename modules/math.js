// module.exports : 함수 내보내기
const add1 = (a, b) => a + b
module.exports = add1; // 함수 그대로 내보내기
moduel.exports = { add1: add1 } // 함수를 객체로 내보내기
exports.add1 = add1; // 함수를 객체로 내보내기

// exports.@@ : 함수를 객체로 내보내기
exports.add2 = (a, b) => a + b
