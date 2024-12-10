// cart-container, total-price, cart-container-box, empty 요소 선택
const cartContainer = document.querySelector(".cart-container");
const cartTotalPrice = document.querySelector(".total-price");
const cartBox = document.querySelector(".cart-container-box");
const cartEmpty = document.querySelector(".empty");

// cart-storage: 로컬 스토리지에서 장바구니 데이터를 가져오거나 초기화
export let saveCartGoods = localStorage.getItem("cartList")
  ? JSON.parse(localStorage.getItem("cartList")) // JSON 데이터를 JavaScript 객체로 변환
  : []; // 저장된 데이터가 없을 경우 빈 배열로 초기화

// 장바구니 아이템의 HTML 생성
function cartCreateHTML(shoes) {
  return `
    <li class="cart-goods">
      <div class="goods-thumb">
        <img src="${shoes.image}" alt="${shoes.productName}" />
      </div>
      <div class="cart-info-box">
        <div class="item-info">
          <dl>
            <dt class="info-name">${shoes.productName}</dt> <!-- 상품 이름 -->
            <dd class="info-price">${shoes.price.toLocaleString()}</dd> <!-- 가격 -->
          </dl>
          <button class="item-remove" type="button" data-id=${
            shoes.id
          }>Remove</button> <!-- 삭제 버튼 -->
        </div>
        <div class="item-control">
          <div class="item-count">
            <button class="count-minus" type="button" data-id=${
              shoes.id
            } data-value="minus">
              <i class="bx bx-minus"></i> <!-- 수량 감소 버튼 -->
            </button>
            <span class="count">${shoes.order}</span> <!-- 현재 수량 -->
            <button class="count-plus" type="button" data-id=${
              shoes.id
            } data-value="plus">
              <i class="bx bx-plus"></i> <!-- 수량 증가 버튼 -->
            </button>
          </div>
          <strong class="single-total-price">
            ${(shoes.price * shoes.order).toLocaleString()} <!-- 총 가격 -->
          </strong>
        </div>
      </div>
    </li>`;
}

// 장바구니 총 가격 계산
function totalPrice() {
  const priceBox = saveCartGoods.reduce((prev, curr) => {
    return prev + curr.price * curr.order; // 가격 * 수량의 합계
  }, 0); // 초기값 0
  if (cartTotalPrice) {
    cartTotalPrice.innerHTML = priceBox.toLocaleString(); // 가격을 표시
  }
}

// 장바구니 페이지 렌더링
export function paintCartPage() {
  const loadCartGoods = localStorage.getItem("cartList"); // 로컬 스토리지에서 데이터 로드
  if (cartContainer !== null) {
    cartContainer.innerHTML = JSON.parse(loadCartGoods)
      .map((shoes) => cartCreateHTML(shoes)) // 각 상품의 HTML 생성
      .join(""); // HTML 문자열 합치기
    if (cartContainer.children.length !== 0) {
      cartEmpty.classList.add("hidden"); // 빈 장바구니 메시지 숨기기
      cartBox.classList.remove("hidden"); // 장바구니 표시
    }
  }
  totalPrice(); // 총 가격 계산
}

// 장바구니 데이터 저장
export function saveCart(saveCartGoods) {
  localStorage.setItem("cartList", JSON.stringify(saveCartGoods)); // 객체를 JSON 문자열로 변환하여 저장
}

// 장바구니에 상품 추가
export function loadCart(shoesBox) {
  const cartbtns = document.querySelectorAll(".cart-icon");
  cartbtns.forEach((cartbtn) => {
    cartbtn.addEventListener("click", (e) => {
      const goodsCart = e.target.parentNode; // 클릭된 버튼의 부모 요소
      goodsCart &&
        shoesBox.find((shoes) => {
          if (shoes.id === parseInt(goodsCart.dataset.id)) {
            if (saveCartGoods.some((cart) => cart.id === shoes.id)) {
              // 이미 장바구니에 있는 경우
              alert("장바구니에 있는 상품입니다.");
            } else {
              // 장바구니에 추가
              shoes.cart = true;
              shoes.order += 1; // 수량 증가
              alert("장바구니에 담았습니다.");
              return saveCartGoods.push(shoes); // 배열에 상품 추가
            }
          }
        });
      saveCart(saveCartGoods); // 변경된 데이터 저장
      totalCartCount(); // 장바구니 상품 수 갱신
    });
  });
}

// 장바구니 상품 삭제
function deleteCart(e) {
  const cartRemoveBtns = document.querySelectorAll(".item-remove");
  cartRemoveBtns.forEach((cartRemoveBtn) => {
    if (e.target === cartRemoveBtn) {
      const cleanCart = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(cartRemoveBtn.dataset.id); // ID 일치하는 상품 찾기
      });
      saveCartGoods.splice(cleanCart, 1); // 데이터에서 삭제
      cartContainer.removeChild(cartContainer.children[cleanCart]); // 페이지에서 삭제
      saveCart(saveCartGoods); // 변경된 데이터 저장
      totalPrice(); // 총 가격 갱신
      totalCartCount(); // 장바구니 수량 갱신
    }
  });
  if (cartContainer.children.length === 0) {
    // 장바구니가 비었을 경우
    cartEmpty.classList.remove("hidden"); // 빈 메시지 표시
    cartBox.classList.add("hidden"); // 장바구니 숨기기
  }
}

// 단일 상품 수량 및 가격 조정
function singleGoodsControl(e, plusMinusBtns) {
  const goodsCount = document.querySelectorAll(".count");
  const singleGoodsPrice = document.querySelectorAll(".single-total-price");

  plusMinusBtns.forEach((plusMinusBtn) => {
    if (e.target.parentNode === plusMinusBtn) {
      const cartdataId = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(plusMinusBtn.dataset.id); // ID로 상품 찾기
      });
      const pickGoods = saveCartGoods[cartdataId];
      if (plusMinusBtn.dataset.value === "plus") {
        pickGoods.order++; // 수량 증가
      } else {
        pickGoods.order > 1 && pickGoods.order--; // 수량 감소
      }
      goodsCount[cartdataId].innerHTML = pickGoods.order; // 페이지에 수량 표시
      singleGoodsPrice[cartdataId].innerHTML = (
        pickGoods.price * pickGoods.order
      ).toLocaleString(); // 페이지에 총 가격 표시
      saveCart(saveCartGoods); // 변경된 데이터 저장
    }
  });
}

// 장바구니 총 상품 수량 표시
export function totalCartCount() {
  const totalCounts = document.querySelectorAll(".top-cart-count");
  totalCounts.forEach((totalCount) => {
    totalCount.innerHTML = saveCartGoods.length; // 상품 수량 표시
    if (saveCartGoods.length === 0) {
      totalCount.innerHTML = ""; // 비어 있을 경우 표시 없음
    }
  });
}

// 페이지 로드 시 총 상품 수량 갱신
window.addEventListener("load", totalCartCount);

// 장바구니 이벤트 핸들러
function cartListHandler(e) {
  const plusBtns = document.querySelectorAll(".count-plus");
  const minusBtns = document.querySelectorAll(".count-minus");

  singleGoodsControl(e, plusBtns); // 수량 증가
  singleGoodsControl(e, minusBtns); // 수량 감소

  deleteCart(e); // 삭제 처리
  totalPrice(); // 총 가격 갱신
}

// 장바구니 클릭 이벤트 연결
if (cartContainer !== null) {
  cartContainer.addEventListener("click", cartListHandler);
}
