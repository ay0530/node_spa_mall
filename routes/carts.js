const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

router.get("/carts", async (req, res) => {
  // await @@.find({}) 
  // : 사용자 정보가 없으므로 한 사용자의 장바구니라고 가정하여 장바구니 모두 조회
  const carts = await Cart.find({});
  const goodsIds = carts.map((cart) => {
    // map으로 배열에 값 저장
    return cart.goodsId;
  });

  // goodsIds 변수 안에 존재하고 Goods에 존재하는 모든 정보 조회 ~
  const goods = await Goods.find({ goodsId: goodsIds });

  // 등록된 상품에서 장바구니에 저장한 상품들을 찾아 results에 할당
  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      // @@: array.find() : 조건에 해당하는 값을 @@에 넣기
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    }
  })

  // json으로
  res.json({
    "carts": results,
  })
})

module.exports = router;