// =====================
// 장바구니 관련 코드
// =====================

// 장바구니 아이콘을 감싸는 요소 선택
const basketStarterEl = document.querySelector('header .basket-starter');
// 장바구니 실제 콘텐츠 요소 선택
const basketEl = basketStarterEl.querySelector('.basket');

// 장바구니 아이콘 클릭 시 이벤트 추가
basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation(); // 이벤트 전파를 막음 (다른 클릭 이벤트에 영향 방지)
  if (basketEl.classList.contains('show')) { // 장바구니가 열려 있는 경우
    hideBasket(); // 장바구니 닫기
  } else { // 장바구니가 닫혀 있는 경우
    showBasket(); // 장바구니 열기
  }
});

// 장바구니 요소 클릭 시 이벤트 전파 막기 (닫힘 방지)
basketEl.addEventListener('click', function(event) {
  event.stopPropagation();
});

// 화면 어디를 클릭하든 장바구니 닫기
window.addEventListener('click', function () {
  hideBasket(); // 장바구니 닫기
});

// 장바구니를 여는 함수
function showBasket() {
  basketEl.classList.add('show'); // 'show' 클래스 추가 (열림 표시)
}

// 장바구니를 닫는 함수
function hideBasket() {
  basketEl.classList.remove('show'); // 'show' 클래스 제거 (닫힘 표시)
}

// =====================
// 검색 관련 코드
// =====================

// 헤더 전체 요소 선택
const headerEl = document.querySelector('header');
// 헤더의 메뉴 리스트(배열로 변환) 선택
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
// 검색 영역 감싸는 요소 선택
const searchWarpEl = headerEl.querySelector('.search-wrap');
// 검색 시작 버튼 선택
const searchStarterEl = headerEl.querySelector('.search-starter');
// 검색 닫기 버튼 선택
const searchCloserEl = searchWarpEl.querySelector('.search-closer');
// 검색 영역 그림자 요소 선택
const searchShadowEl = searchWarpEl.querySelector('.shadow');
// 검색 입력 필드 선택
const searchInputEl = searchWarpEl.querySelector('input');
// 검색 딜레이 효과를 위한 리스트 요소 선택
const searchDelayEls = [...searchWarpEl.querySelectorAll('li')];

// 검색 시작 버튼 클릭 시 검색 열기
searchStarterEl.addEventListener('click', showSearch);
// 검색 닫기 버튼 클릭 시 검색 닫기
searchCloserEl.addEventListener('click', hideSearch);
// 검색 그림자 클릭 시 검색 닫기
searchShadowEl.addEventListener('click', hideSearch);

// 검색을 여는 함수
function showSearch() {
  headerEl.classList.add('searching'); // 검색 중 상태를 표시하는 클래스 추가
  document.documentElement.classList.add('fixed'); // 스크롤 고정
  // 헤더 메뉴의 역순 애니메이션 딜레이 적용
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  // 검색 리스트의 순차적 애니메이션 딜레이 적용
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  // 검색 입력 필드에 초점을 맞춤
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

// 검색을 닫는 함수
function hideSearch() {
  headerEl.classList.remove('searching'); // 'searching' 클래스 제거
  document.documentElement.classList.remove('fixed'); // 스크롤 고정 해제
  // 헤더 메뉴의 역순 애니메이션 딜레이 재적용
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  // 검색 리스트의 애니메이션 딜레이 제거
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse(); // 검색 리스트 순서 복원
  searchInputEl.value = ''; // 검색 입력 필드 초기화
}

// =====================
// 슬라이더 초기화
// =====================

// 공지사항 슬라이더
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 세로 방향 슬라이더
  autoplay: true, // 자동 재생
  loop: true // 무한 반복
});

// 프로모션 슬라이더
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한 번에 3개 슬라이드 표시
  spaceBetween: 10, // 슬라이드 간격
  centeredSlides: true, // 현재 슬라이드 가운데 정렬
  autoplay: {
    delay: 5000 // 5초마다 슬라이드 변경
  },
  loop: true, // 무한 반복
  pagination: { // 페이지 네비게이션
    el: '.promotion .swiper-pagination', // 페이지 버튼 위치
    clickable: true // 버튼 클릭 가능
  },
  navigation: { // 좌우 네비게이션 버튼
    prevEl: '.promotion .swiper-prev', // 이전 버튼
    nextEl: '.promotion .swiper-next' // 다음 버튼
  }
});

// 수상 내역 슬라이더
new Swiper('.awards .swiper-container', {
  autoplay: true, // 자동 재생
  loop: true, // 무한 반복
  spaceBetween: 30, // 슬라이드 간격
  slidesPerView: 5, // 한 번에 5개 슬라이드 표시
  navigation: { // 좌우 네비게이션 버튼
    prevEl: '.awards .swiper-prev', // 이전 버튼
    nextEl: '.awards .swiper-next' // 다음 버튼
  }
});

// =====================
// 프로모션 토글 버튼
// =====================

// 프로모션 영역 선택
const promotionEl = document.querySelector('.promotion');
// 프로모션 토글 버튼 선택
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 프로모션 상태 저장 변수
let isHidePromotion = false;

// 프로모션 토글 버튼 클릭 시 동작
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion; // 상태 반전
  if (isHidePromotion) { // 숨김 상태
    promotionEl.classList.add('hide'); // 'hide' 클래스 추가
  } else { // 표시 상태
    promotionEl.classList.remove('hide'); // 'hide' 클래스 제거
  }
});




// --------------------------------------구분선---------------------------------------





// // 사이드바 메뉴 열기/닫기 처리 함수
// function slideMenuHandler(e) {
//   const slideOpenBtn = document.querySelector(".top-nav-modal"); // 슬라이드 메뉴 열기 버튼
//   const slideCloseBtn = document.querySelector(".category-close"); // 슬라이드 메뉴 닫기 버튼
//   const slideMenu = document.querySelector(".top-nav-category"); // 슬라이드 메뉴 요소

//   const target = e.target; // 클릭된 요소
//   const parentTarget = e.target.parentNode; // 클릭된 요소의 부모 요소
//   const activetarget = e.currentTarget.document.activeElement; // 현재 활성화된 요소

//   if (parentTarget === slideOpenBtn) { 
//     // 클릭된 요소의 부모가 슬라이드 열기 버튼인 경우
//     slideMenu.classList.add("open"); // 슬라이드 메뉴 열기
//   } else if (activetarget === slideCloseBtn || target !== slideMenu) {
//     // 클릭된 요소가 닫기 버튼이거나 슬라이드 메뉴 외부 클릭 시
//     slideMenu.classList.remove("open"); // 슬라이드 메뉴 닫기
//   }
// }

// window.addEventListener("click", slideMenuHandler); // 클릭 이벤트 리스너 추가

// 새 상품 영역의 가로 스크롤 처리 함수
// function newItemWheel(e) {
//   const newListBox = document.querySelector(".new-box"); // 새 상품 리스트 박스

//   if (e.path[3] === newListBox) {
//     // 이벤트 경로 상에서 새 상품 리스트 박스가 포함된 경우
//     document.body.classList.add("stop-scrolling"); // 수직 스크롤 중지
//     e.deltaY > 0
//       ? (newListBox.scrollLeft += 40) // 아래로 스크롤하면 가로 스크롤 오른쪽으로 이동
//       : (newListBox.scrollLeft -= 40); // 위로 스크롤하면 가로 스크롤 왼쪽으로 이동
//   } else {
//     document.body.classList.remove("stop-scrolling"); // 리스트 박스 외부에서는 스크롤 중지 해제
//   }
// }

// window.addEventListener("wheel", newItemWheel); // 마우스 휠 이벤트 리스너 추가

// // 상단 네비게이션 바 스크롤 감지 함수
// function scrollControll() {
//   const topNav = document.querySelector(".top-nav"); // 상단 네비게이션 바
//   const topScroll = document.documentElement.scrollTop; // 현재 문서의 스크롤 위치

//   topScroll
//     ? topNav && topNav.classList.add("back-color") // 스크롤 위치가 0 이상이면 배경색 추가
//     : topNav.classList.remove("back-color"); // 스크롤 위치가 0이면 배경색 제거
// }

// window.addEventListener("scroll", scrollControll); // 스크롤 이벤트 리스너 추가
