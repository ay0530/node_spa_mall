const mongoose = require("mongoose");

// mongoose.Schema : 스키마 내용 정의 ~
const goodsSchema = new mongoose.Schema({
  // 상품 ID
  goodsId: { // 컬럼명
    type: Number, // 타입
    required: true, // 필수 여부
    unique: true // 중복 허용 여부
  },
  // 상품명
  name: {
    type: String,
    required: true,
    unique: true
  },
  // 상품 이미지 
  thumbnailUrl: {
    type: String,
  },
  // 상품 카테고리
  category: {
    type: String,
  },
  // 상품 가격
  price: {
    type: Number,
  }
});

// mongoose.model("모델명", 변수); : 모델 생성(모델명을 컬렉션명으로 지정)
module.exports = mongoose.model("Defaults", goodsSchema);