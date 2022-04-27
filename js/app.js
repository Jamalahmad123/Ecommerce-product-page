"use strict";

// UI ELEMENTS
const hamburgerMenu = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
const btnClose = document.querySelector(".close");
const btnCart = document.querySelector(".cart");
const cartCheckout = document.querySelector(".cart__checkouts");
const cartItemContainer = document.querySelector(".cart__item--container");
const slides = document.querySelectorAll(".slide");
const btnNext = document.querySelector(".slider__next");
const btnPrev = document.querySelector(".slider__prev");
const imgSliderContainer = document.querySelector(".desktop__slider");
const productCountEL = document.querySelector(".count");
const productPlus = document.querySelector(".plus");
const productMinus = document.querySelector(".minus");
const btnAdd = document.querySelector(".add");
const btnDelete = document.querySelector(".delete__img");

/////////////////////////////////////////////
// HAMBURGER MENU
function closeNav() {
  navList.classList.remove("show");
}

hamburgerMenu.addEventListener("click", function () {
  navList.classList.add("show");
});

btnClose.addEventListener("click", closeNav);

navList.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__list--item")) {
    closeNav();
  }
});

/////////////////////////////////////////////
// PRODUCT PURCHASE
const itemsCount = document.createElement("div");

// VAR
let productPrice = 125;
let productCount = 0;

// FUNCTIONS
function productIncrement() {
  productCount++;
  productCountEL.textContent = productCount;
}

function productDecrement() {
  if (productCount === 0) return;

  productCount--;
  productCountEL.textContent = productCount;
}

//////////////////////////////////////
// SLIDER COMPONENT
// VAR
let curSlides = 0;
const maxSlides = slides.length;

// FUNCTION
const goToSlides = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlides(0);

// create img slider based on imgs
function createSlideImgs() {
  slides.forEach((s, i) => {
    imgSliderContainer.insertAdjacentHTML(
      "beforeend",
      `<img
        src="./images/image-product-${i + 1}-thumbnail.jpg"
        alt="image-product-1-thumbnail"
        class="img__slider"
        data-slide="${i}"
        />`
    );
  });
}
createSlideImgs();

// active slider
function activateImgSlide(slide) {
  const imgSlide = document.querySelectorAll(".img__slider");
  // remove active class
  imgSlide.forEach((img) => img.classList.remove("active"));

  // add active class to curSlide
  document
    .querySelector(`.img__slider[data-slide="${slide}"]`)
    .classList.add("active");
}
activateImgSlide(0);

// nextSlide
function nextSlide() {
  if (curSlides === maxSlides - 1) {
    curSlides = 0;
  } else {
    curSlides++;
  }

  // next slide
  goToSlides(curSlides);
  activateImgSlide(curSlides);
}

// prevSlide
function prevSlide() {
  if (curSlides === 0) {
    curSlides = maxSlides - 1;
  } else {
    curSlides--;
  }

  // prev slide
  goToSlides(curSlides);
  activateImgSlide(curSlides);
}

// EVENTHANDLERS FOR PRODUCT PERCHASE
btnCart.addEventListener("click", function () {
  cartCheckout.classList.toggle("show");
});
productPlus.addEventListener("click", productIncrement);
productMinus.addEventListener("click", productDecrement);
btnAdd.addEventListener("click", function () {
  if (productCount === 0) {
    alert("please select an amount of piers you want!");
  } else {
    const totalPrice = productPrice * productCount;

    const html = `
    <div class="cart__item">
      <img
        src="./images/image-product-1-thumbnail.jpg"
        alt=""
        class="cart__img"
      />
      <div class="cart__details">
        <p class="title">Autumn limited Edition</p>
        <p class="cart__price">
          $${productPrice}.00 x ${productCount} <span>$${totalPrice}.00</span>
        </p>
      </div>
      <img
        src="./images/icon-delete.svg"
        alt="icon-delete"
        class="delete__img"
      />
    </div>
    <button class="btn checkout">checkout</button>`;
    cartItemContainer.innerHTML = html;
    itemsCount.classList.add("peirs__count");
    itemsCount.textContent = productCount;
    btnCart.parentNode.insertBefore(itemsCount, btnCart.nextSibling);
    document.querySelector(".empty").style.display = "none";
  }
});

cartCheckout.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete__img")) {
    productCount = 0;
    productCountEL.textContent = productCount;
    cartItemContainer.innerHTML = "";
    document.querySelector(".empty").style.display = "block";
    itemsCount.remove();
  }
});

// EVENTHANDLERS FOR SLIDER COMPONENT
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
imgSliderContainer.addEventListener("click", function (e) {
  if (e.target.matches(".img__slider")) {
    const { slide } = e.target.dataset;
    curSlides = Number(slide);
    goToSlides(slide);
    activateImgSlide(slide);
  }
});
