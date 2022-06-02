const carouselConfig = {
  visibleItems: 2,
  initialIndex: 0
}
const buttons = document.querySelectorAll(".nav-button");
const items = document.querySelectorAll("#category-list .carousel-wrapper .item");

var currentIndex = carouselConfig.initialIndex;

function init() {
  let index = 0;
  items.forEach(item => {
    item.dataset.carouselIndex = index++;
  });

  swipeIconControl();

  toggleNavigation();
}

function toggleNavigation(el) {

  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselWrapperItems = document.querySelector('.carousel-wrapper-items');

  if (carouselWrapper && carouselWrapperItems) {
    const width = carouselWrapper.offsetWidth;
    const scrollWidth = carouselWrapperItems.scrollWidth;
    if (scrollWidth <= width) {
      hideNavigation();
    }
  }
}

function hideNavigation() {
  document.querySelectorAll('.nav-button').forEach(item => item.style.display = 'none');
}

function getItemByCurrentIndex() {
  return document.querySelector(`[data-carousel-index="${currentIndex}"]`);
}

function addEvents() {

  buttons.forEach(item => {
    item.addEventListener('click', (e) => {

      const isPrevButton = e.currentTarget.id === 'prev';
      const isNextButton = e.currentTarget.id === 'next';

      const count = carouselConfig.visibleItems;

      let delta = isPrevButton ? -1 * count : count;

      currentIndex += delta;
      let element = getItemByCurrentIndex();

      if (!element) {
        if (isNextButton)
          currentIndex = items.length - 1;
        else if (isPrevButton)
          currentIndex = 0;

        element = getItemByCurrentIndex();
      }
      element.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
        inline: "start"
      });
    });
  });
}


function swipeIconControl() {

  const swipeIcon = document.querySelector('.swipe-icon');

  if (swipeIcon) {
    setTimeout(__ => {
      swipeIcon.style.opacity = 0;
    }, 4000);
  
    setTimeout(__ => swipeIcon.remove(), 4500);
  }
}


function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}


init();
addEvents();

