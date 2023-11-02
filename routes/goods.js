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
  // res.status(200).json({ "goods": goods }); // res.json.({"key":변수})
  res.status(200).json({ goods }); // 변수만 입력하면 key가 변수명으로 자동 적용됨
})
res.status(200).json({ goods }); // 변수만 입력하면 key가 변수명으로 자동 적용됨

// 개별 상품 조회
router.get("/goods/:goodsId", (req, res) => {
  // goosId에 params 값 할당
  const { goodsId } = req.params;

  let result1 = null; // 상품이 없을 경우 null 출력
  // 반복문으로 개별 상품 조회
  for (const good of goods) {
    if (Number(goodsId) === good.goodsId) {
      result1 = good;
    }
  }

  // filter를 이용해 개별 상품 조회
  const [result2] = goods.filter((goods) => Number(goodsId) === goods.goodsId);
  res.status(200).json({ detail: result2 });
})



// app.js로 router 변수 내보내기
module.exports = router; // module.exports : router 변수를 외부로 내보냄