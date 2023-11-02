const express = require("express"); // express 라이브러리를 변수에 참조
const router = express.Router(); // router 함수를 변수에 참조

const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];
// router로 API를 만들기 위해서는 앞에 router가 붙어야함
// 전체 상품 조회
router.get("/goods", (req, res) => {
  res.status(200).json({ goods }); // 변수만 입력하면 key가 변수명으로 자동 적용됨
})
// 개별 상품 조회~
router.get("/goods/:goodsId/cart", (req, res) => {
  // goosId에 params 값 할당
  const { goodsId } = req.params;

  // filter를 이용해 개별 상품 조회
  const [result] = goods.filter((goods) => Number(goodsId) === goods.goodsId);
  res.status(200).json({ detail: result });
})

// 장바구니  저장
const Cart = require("../schemas/cart.js") // 스키마 조회
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params; // params 값 조회
  const { quantity } = req.body; // body 값 조회

  // @@.find({}) : 장바구니에 해당 상품이 있는지 검색
  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    // 장바구니에 해당 상품이 존재할 경우 에러 출력
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당 상품이 존재합니다."
    })
  }

  await Cart.create({ goodsId, quantity }); // 데이터 저장
  res.json({ result: "success" });
})

// 장바구니 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params; // params 값 조회
  const { quantity } = req.body; // body 값 조회

  // @@.find({}) : 장바구니에 해당 상품이 있는지 검색
  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    // 장바구니에 해당 상품이 존재할 경우 실행
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }); // {$set: {}} : 수정할 값
  }
  res.status(200).json({ success: "true" });
})

// 장바구니 제거
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params; // params 값 조회

  // @@.find({}) : 장바구니에 해당 상품이 있는지 검색
  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    // 장바구니에 해당 상품이 존재할 경우 실행
    await Cart.deleteOne({ goodsId });
  }
  res.status(200).json({ result: "success" });
})

const Goods = require("../schemas/goods.js");
// async/await 추가해서 동기처리
router.post("/goods/", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body; // req.body 값 조회
  const goods = await Goods.find({ goodsId }); // 데이터 존재 여부 확인

  if (goods.length) {
    // goods.length가 있다면 에러 출력
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId 입니다."
    });
  }
  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price }); // create : DB에 저장
  res.json({ goods: createdGoods });
})

// app.js로 router 변수 내보내기
module.exports = router; // module.exports : router 변수를 외부로 내보냄