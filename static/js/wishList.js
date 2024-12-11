import { loadCart } from "./cartPage.js"; // 장바구니 관련 함수 가져오기
import { createHTML } from "./loadItem.js"; // 상품 리스트 생성 HTML 템플릿 함수 가져오기

const wishContainer = document.querySelector(".wish-container"); // 위시리스트가 표시될 컨테이너
const wishEmpty = document.querySelector(".empty"); // 위시리스트가 비었을 때 표시되는 요소

// 위시리스트 저장소 초기화: 로컬스토리지에 저장된 데이터가 있으면 불러오고, 없으면 빈 배열 설정
export let saveWishGoods = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];

// 위시리스트를 로컬스토리지에 저장하는 함수
export function saveWish(saveWishGoods) {
  localStorage.setItem("wishList", JSON.stringify(saveWishGoods));
}

// 위시리스트 페이지 렌더링 함수
export function paintWishPage(shoesBox) {
  const loadWishGoods = localStorage.getItem("wishList"); // 로컬스토리지에서 위시리스트 데이터 로드
  if (wishContainer !== null) {
    // 위시리스트 컨테이너가 존재할 경우
    wishContainer.innerHTML = JSON.parse(loadWishGoods)
      .map((shoes) => createHTML(shoes)) // 저장된 데이터로 HTML 생성
      .join(""); // 생성된 HTML을 컨테이너에 추가
    if (wishContainer.children.length !== 0) {
      // 위시리스트에 상품이 있으면
      wishEmpty.classList.add("hidden"); // 빈 위시리스트 메시지 숨기기
    }
  }
  loadWish(shoesBox); // 위시리스트 상호작용 로드
  loadCart(shoesBox); // 장바구니 관련 상호작용 로드
}

// 위시리스트에서 상품 삭제 함수
function deletWish(cleanWish) {
  if (wishContainer !== null) {
    // 위시리스트 컨테이너가 존재할 경우
    wishContainer.removeChild(wishContainer.children[cleanWish]); // 특정 상품 요소를 삭제
    if (wishContainer.children.length === 0) {
      // 삭제 후 위시리스트가 비었다면
      wishEmpty.classList.remove("hidden"); // 빈 위시리스트 메시지 표시
    }
  }
}

// 위시리스트 기능 로드 함수
export function loadWish(shoesBox) {
  const likebtns = document.querySelectorAll(".like-icon"); // 모든 위시리스트 버튼 선택
  likebtns.forEach((likebtn) => {
    // 각 버튼에 클릭 이벤트 리스너 추가
    likebtn.addEventListener("click", (e) => {
      const goodsBtn = e.target.parentNode; // 클릭된 버튼의 부모 요소 가져오기
      goodsBtn &&
        shoesBox.find((shoes) => {
          // 해당 버튼의 상품 정보를 검색
          if (shoes.id === parseInt(goodsBtn.dataset.id)) {
            // 버튼과 상품 ID가 일치하면
            if (shoes.wish) {
              // 해당 상품이 이미 위시리스트에 있으면
              const cleanWish = saveWishGoods.findIndex((item) => {
                // 위시리스트에서 해당 상품의 인덱스 찾기
                return item.id === parseInt(goodsBtn.dataset.id);
              });
              saveWishGoods.splice(cleanWish, 1); // 로컬 데이터에서 해당 상품 제거
              shoes.wish = false; // 상품의 위시리스트 상태 해제
              goodsBtn.innerHTML = `<i class='bx bx-heart'></i>`; // 버튼 아이콘 변경
              console.log("위시리스트 지움"); // 콘솔 로그 출력
              deletWish(cleanWish); // UI에서 해당 상품 삭제
              return saveWishGoods; // 업데이트된 데이터 반환
            } else {
              // 해당 상품이 위시리스트에 없으면
              shoes.wish = true; // 상품을 위시리스트에 추가
              console.log("위시리스트 추가"); // 콘솔 로그 출력
              goodsBtn.innerHTML = `<i class='bx bxs-heart' style='color:#d64040'></i>`; // 버튼 아이콘 변경
              return saveWishGoods.push(shoes); // 로컬 데이터에 상품 추가
            }
          }
        });
      saveWish(saveWishGoods); // 변경된 위시리스트 데이터를 로컬스토리지에 저장
    });
  });
}
