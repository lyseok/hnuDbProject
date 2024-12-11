// cartPage.js에서 필요한 함수와 데이터를 가져옴
import {
  totalCartCount, // 총 장바구니 상품 개수를 계산 및 표시하는 함수
  loadCart, // 장바구니 데이터를 로드하는 함수
  paintCartPage, // 장바구니 페이지를 렌더링하는 함수
  saveCartGoods, // 로컬 스토리지에 저장된 장바구니 데이터
} from "./cartPage.js";

// wishList.js에서 필요한 함수와 데이터를 가져옴
import { 
  loadWish, // 위시리스트 데이터를 로드하는 함수
  paintWishPage, // 위시리스트 페이지를 렌더링하는 함수
  saveWishGoods // 로컬 스토리지에 저장된 위시리스트 데이터
} from "./wishList.js";

// detailPage.js에서 상세 페이지 로드 함수 가져옴
import { loadDetail } from "./detailPage.js";

// 헤더와 푸터를 비동기로 가져와 HTML에 포함시키는 함수
async function asyncMarkupData() {
  const allElements = document.getElementsByTagName("*"); // 모든 HTML 요소를 선택
  Array.prototype.forEach.call(allElements, function (el) {
    const includePath = el.dataset.includePath; // data-include-path 속성을 확인
    if (includePath) {
      const xhttp = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText; // 요청 성공 시 HTML을 대체
        }
      };
      xhttp.open("GET", includePath, true); // GET 요청으로 데이터를 가져옴
      xhttp.send(); // 요청 전송
    }
  });
}

// 로컬 스토리지에 저장된 데이터와 JSON 데이터를 비교하여 상태를 업데이트하는 함수
function storageCheck(json, saveGoods, mode) {
  if (saveGoods) {
    for (let i = 0; i < json.shoesBox.length; i++) { // 모든 상품 데이터 반복
      saveGoods.forEach((goods) => {
        if (goods.id === json.shoesBox[i].id) { // ID가 일치하면 상태 업데이트
          json.shoesBox[i][mode] = true; // 위시리스트 또는 장바구니 상태를 true로 설정
        }
      });
    }
  }
}

// JSON 데이터를 로드하는 함수
async function loadItems() {
  const response = await fetch("/static/data/data.json"); // JSON 데이터 요청
  const json = await response.json(); // 응답 데이터를 JSON으로 변환
  storageCheck(json, saveWishGoods, "wish"); // 위시리스트 상태 업데이트
  storageCheck(json, saveCartGoods, "cart"); // 장바구니 상태 업데이트
  return json.shoesBox; // 상품 데이터 반환
}

// 상품 목록을 화면에 표시하는 함수
function displayItems(shoesBox, currentPageNum) {
  const itemContainer = document.querySelector(".goods-container"); // 상품 목록 컨테이너
  const pageBtns = document.querySelectorAll(".page-btn"); // 페이지 버튼들

  let dataPerPage = 6; // 한 페이지에 표시할 상품 개수
  let startIndexItem = currentPageNum - 1; // 현재 페이지 인덱스 계산

  let pageShowBox = shoesBox.slice(
    dataPerPage * startIndexItem,
    dataPerPage * currentPageNum
  ); // 현재 페이지에 해당하는 상품 데이터만 슬라이싱

  if (itemContainer !== null) {
    itemContainer.innerHTML = pageShowBox
      .map((shoes) => createHTML(shoes)) // 각 상품 데이터를 HTML로 변환
      .join(""); // HTML 문자열 결합
  }

  pageBtns.forEach((pageBtn) => {
    const pageNum = parseInt(pageBtn.innerHTML); // 버튼에 표시된 페이지 번호 가져오기
    if (pageNum === currentPageNum) {
      pageBtn.classList.add("active"); // 현재 페이지 버튼 활성화
    } else {
      pageBtn.classList.remove("active"); // 다른 버튼은 비활성화
    }
  });
}

// 상품 하나의 HTML을 생성하는 함수
// export function createHTML(shoes) {
//   return /* html */`
//     <li class="goods-card">
//       <a href=detail.html?${shoes.id}>
//       <div class="card-img-box">
//           <img src="${shoes.image}" alt="${shoes.productName}" class="card-img">
//       </div>
//       <div class="card-info">
//           <div class="card-title">
//             <p>${shoes.productName}</p>
//             <p>${shoes.writer}</p>
//           </div>
//             </a>
//           <div class="card-precis">
//             <span class="card-price">${shoes.price.toLocaleString()}</span>
//             <button type="button" data-id=${shoes.id}
//               class="card-icon like-icon">${shoes.wish
//               ? `<i class='bx bxs-heart' style='color:#d64040'></i>` // 위시리스트에 있는 경우
//               : `<i class='bx bx-heart'></i>` // 위시리스트에 없는 경우
//             }</button>
//             <button type="button" data-id=${shoes.id} 
//             class="card-icon cart-icon"><i class='bx bx-cart'></i>
//             </button>
//           </div>               
//       </div>      
//     </li>
// `;
// }
export function createHTML(shoes) {
  return /* html */`
    <li class="goods-card">
      <a href=detail.html?${shoes.id} class="product">
        <img src="${shoes.image}" alt="${shoes.productName}" width="225">
        <div class="product-name">
          <p>${shoes.productName}</p>
          <p>${shoes.writer}</p>
          <p>${shoes.price.toLocaleString()}</p>
        </div>
      </a>
      <div class="card-precis">
        <button type="button" data-id=${shoes.id}
          class="card-icon like-icon">${shoes.wish
          ? `<i class='bx bxs-heart' style='color:#d64040'></i>` // 위시리스트에 있는 경우
          : `<i class='bx bx-heart'></i>` // 위시리스트에 없는 경우
        }</button>
        <button type="button" data-id=${shoes.id} 
        class="card-icon cart-icon"><i class='bx bx-cart'></i>
        </button>
      </div>               
    </div>      
  </li>
`;
}


// 페이지네이션을 설정하고 데이터를 렌더링하는 함수
function pagination(shoesBox) {
  const pageContainer = document.querySelector(".goods-pagination"); // 페이지네이션 컨테이너

  let pageArray = [];
  let totalCount = shoesBox.length; // 상품 총 개수
  let totalPage = Math.ceil(totalCount / 6); // 페이지 총 개수 계산
  let currentPage = 1; // 초기 페이지 설정

  for (let i = 1; i <= totalPage; i++) {
    pageArray.push(i); // 페이지 번호 배열 생성
  }

  if (pageContainer !== null) {
    pageContainer.innerHTML = pageArray
      .map((num) => paginationHTML(num)) // 각 페이지 번호를 HTML로 변환
      .join("");
  }

  function pageData(e) {
    if (e.target.tagName === "BUTTON") {
      let currentPage = parseInt(e.target.innerHTML); // 클릭된 페이지 번호 가져오기

      displayItems(shoesBox, currentPage); // 해당 페이지의 상품 데이터 표시

      loadCart(shoesBox); // 장바구니 데이터 로드
      loadWish(shoesBox); // 위시리스트 데이터 로드
    }
  }

  pageContainer && pageContainer.addEventListener("click", pageData); // 페이지 버튼 클릭 이벤트 추가

  displayItems(shoesBox, currentPage); // 초기 페이지 데이터 표시
}

// 페이지네이션 HTML 생성
function paginationHTML(num) {
  return `
  <li class="page-list">
    <button type="button" class="page-btn">${num}</button>
  </li>
  `;
}

// 사용자가 선택한 색상에 따라 상품을 필터링
function selectHandler(shoesBox) {
  const sortContainer = document.querySelector(".goods-sort"); // 필터링 컨테이너
  if (sortContainer !== null) {
    sortContainer.addEventListener("change", (e) =>
      selectColorFilter(e, shoesBox) // 필터링 실행
    );
  }
}

// 색상 필터링
function selectColorFilter(e, shoesBox) {
  const choiceSortBox = e.target; // 선택된 옵션
  const userChoiceColor =
    choiceSortBox.options[choiceSortBox.selectedIndex].dataset; // 선택된 색상 데이터
  const userSelect = shoesBox.filter(
    (shoes) => shoes[userChoiceColor.key] === userChoiceColor.value // 선택된 색상과 일치하는 상품 필터링
  );
  pagination(userSelect); // 필터링된 상품 페이지네이션 적용
  loadCart(userSelect); // 필터링된 장바구니 데이터 로드
  loadWish(userSelect); // 필터링된 위시리스트 데이터 로드
}

// 메인 실행
asyncMarkupData() // 헤더 및 푸터 데이터를 불러옴
  .then(() => {
    return loadItems(); // 상품 데이터 로드
  })
  .then((shoesBox) => {
    totalCartCount(); // 장바구니 총 개수 업데이트
    pagination(shoesBox); // 페이지네이션 설정 및 렌더링
    loadDetail(shoesBox); // 상세 페이지 로드
    selectHandler(shoesBox); // 필터링 이벤트 추가
    paintWishPage(shoesBox); // 위시리스트 렌더링
    paintCartPage(shoesBox); // 장바구니 렌더링
  });