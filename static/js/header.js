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