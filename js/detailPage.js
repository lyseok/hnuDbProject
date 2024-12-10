// cartPage.js에서 총 상품 개수, 장바구니 데이터 저장 함수와 데이터를 가져옴
import { totalCartCount, saveCart, saveCartGoods } from "./cartPage.js";
// wishList.js에서 위시리스트 데이터 저장 함수와 데이터를 가져옴
import { saveWishGoods, saveWish } from "./wishList.js";

// 상세 페이지 요소 선택
const detailImage = document.querySelector(".detail-photo"); // 상품 이미지
const detailTitle = document.querySelector(".detail-name"); // 상품 이름
const detailWriter = document.querySelector(".detail-writer"); // 상품 이름
const detialPrice = document.querySelector(".detail-price"); // 상품 가격
const detialSummary = document.querySelector(".detail-summary"); // 상품 가격
const detialWishBtn = document.querySelector(".detail-wish"); // 위시리스트 버튼
const detialCartBtn = document.querySelector(".detail-cart"); // 장바구니 버튼
const detialBtnBox = document.querySelector(".detail-info-control"); // 버튼 컨트롤 박스

// 상세 페이지에 상품 데이터를 로드하는 함수
export function loadDetail(shoesBox) {
  let url = location.search; // 현재 URL의 쿼리 문자열을 가져옴
  let params = url.substring(url.indexOf("?") + 1, url.length); // ? 뒤의 값 추출

  const detailGoods = shoesBox.find((shoes) => {
    // 쿼리 문자열로 전달된 id 값과 일치하는 상품을 찾아 반환
    return shoes.id === parseInt(params);
  });

  paintDetail(detailGoods); // 상세 페이지 UI에 상품 정보 렌더링
  detailSelectGoods(detailGoods); // 버튼 클릭 이벤트 추가
}

// 상세 페이지에 상품 정보를 표시하는 함수
function paintDetail(detailGoods) {
  if (detailGoods) {
    detailImage.src = detailGoods.image; // 상품 이미지를 설정
    detailTitle.innerHTML = detailGoods.productName; // 상품 이름을 설정
    detailWriter.innerHTML = detailGoods.writer; // 상품 이름을 설정
    detialPrice.innerHTML = detailGoods.price.toLocaleString(); // 상품 가격을 설정 (천 단위로 쉼표 추가)
    detialSummary.innerHTML = detailGoods.summation; // 상품 이름을 설정
  }
}

// 위시리스트 및 장바구니 버튼 클릭 이벤트를 처리하는 함수
function detailSelectGoods(detailGoods) {
  detialBtnBox && // 버튼 컨트롤 박스가 존재할 경우
    detialBtnBox.addEventListener("click", (e) => {
      const targetBtn = e.target; // 클릭된 버튼을 가져옴
      if (targetBtn === detialWishBtn) { // 클릭된 버튼이 위시리스트 버튼인 경우
        if (detailGoods.wish) {
          // 상품이 이미 위시리스트에 있는 경우
          alert("위시리스트에 있는 상품입니다.");
        } else {
          // 상품을 위시리스트에 추가
          detailGoods.wish = true; // 위시리스트 여부를 true로 설정
          alert("위시리스트에 담았습니다.");
          saveWishGoods.push(detailGoods); // 위시리스트 데이터에 추가
          saveWish(saveWishGoods); // 위시리스트 데이터를 로컬 스토리지에 저장
        }
      } else if (targetBtn === detialCartBtn) { // 클릭된 버튼이 장바구니 버튼인 경우
        if (detailGoods.cart) {
          // 상품이 이미 장바구니에 있는 경우
          alert("장바구니에 있는 상품입니다.");
        } else {
          // 상품을 장바구니에 추가
          detailGoods.cart = true; // 장바구니 여부를 true로 설정
          detailGoods.order += 1; // 상품 수량을 1 증가
          alert("장바구니에 담았습니다.");
          saveCartGoods.push(detailGoods); // 장바구니 데이터에 추가
          saveCart(saveCartGoods); // 장바구니 데이터를 로컬 스토리지에 저장
          totalCartCount(); // 장바구니 총 상품 개수 갱신
        }
      }
    });
}
