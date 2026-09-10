/*------------------------------------------------------------Select Elements---------------------------------------------------------------*/
let nextCarousel = document.querySelector("button.next"),
  prevCarousel = document.querySelector("button.prev"),
  logo = document.querySelector("#logo"), //in nav
  correctImgLogo = document.querySelectorAll(".title img"), //in latest and featured
  navBar = document.querySelector("nav.navbar"),
  liElements = document.querySelectorAll(".nav-link"),
  loadingPage = document.querySelector(".loadingPage"),
  latestAllProducts = document.querySelector(".allProducts"),
  featuredAllProducts = document.querySelector("#featured .all"),
  popupBoxes = document.querySelectorAll(".popup .box"),
  CardProducts = [], //in start no products
  Favorites = []; //in start to favorite products

/*-----------------------------------------------------Functions Call in the first----------------------------------------------------------*/
checkScrolled();
updateNavLink("home");
updateNavLink("latest");
updateNavLink("featured");

/*------------------------------------------------------------LocalStorage---------------------------------------------------------------------*/
if (localStorage.getItem("CardProducts") == null) {
  updateLocalStorage();
} else {
  CardProducts = JSON.parse(localStorage.getItem("CardProducts"));
}
/*--------------------------------------------------------LocalStorage: Favorite--------------------------------------------------------------*/
if (localStorage.getItem("Favorites") == null) {
  updateFavoritesLocalStorage();
} else {
  Favorites = JSON.parse(localStorage.getItem("Favorites"));
}
/*------------------------------------------------------LocalStorage: Main Color-------------------------------------------------------------*/
if (localStorage.getItem("mainColor") != null) {
  let savedColor = localStorage.getItem("mainColor");

  changeMainColor(savedColor);
  changeNavLogo(savedColor, logo, "logo");
  changeFavicon(savedColor, "logo");

  correctImgLogo.forEach(function (image) {
    changeNavLogo(savedColor, image, "correct");
  });

  let currentSlide = document.querySelector(".main-carousel-item.active"),
    newSlide = document.querySelector(`.main-carousel-item[data-color-name="${savedColor}"]`);

  if (newSlide) {
    currentSlide.classList.remove("active");
    newSlide.classList.add("active");
  }
}
/*------------------------------------------------------------Next Slide---------------------------------------------------------------------*/
nextCarousel.addEventListener("click", function () {
  let currentSlide = document.querySelector(".main-carousel-item.active"),
    newSilde = currentSlide.nextElementSibling ?? document.querySelector(".main-carousel-item:first-child"); //he is first child

  currentSlide.classList.remove("active");
  newSilde.classList.add("active");

  changeMainColor(newSilde.dataset.colorName);

  changeNavLogo(newSilde.dataset.colorName, logo, "logo"); //colorName exit in first function as a parameter

  changeFavicon(newSilde.dataset.colorName, "logo"); //the patameters is colorName and same then when we call the function we must write them by order

  correctImgLogo.forEach(function (image) {
    changeNavLogo(newSilde.dataset.colorName, image, "correct");
  });
});

/*------------------------------------------------------------Previous Slide-----------------------------------------------------------------*/
prevCarousel.addEventListener("click", function () {
  let currentSlide = document.querySelector(".main-carousel-item.active"),
    newSilde = currentSlide.previousElementSibling ?? document.querySelector(".main-carousel-item:last-child");

  currentSlide.classList.remove("active");
  newSilde.classList.add("active");

  changeMainColor(newSilde.dataset.colorName);

  changeNavLogo(newSilde.dataset.colorName, logo, "logo");

  changeFavicon(newSilde.dataset.colorName, "logo");
  correctImgLogo.forEach(function (image) {
    changeNavLogo(newSilde.dataset.colorName, image, "correct");
  });
});

/*------------------------------------------------------------Scrolled NavBar----------------------------------------------------------------*/
window.addEventListener("scroll", function () {
  //the window is will have scrolled not the navBar
  //opacity of nav
  checkScrolled();

  updateNavLink("home");
  updateNavLink("latest");
  updateNavLink("featured");
});

/*------------------------------------------------------------Active List Item---------------------------------------------------------------*/
liElements.forEach(function (navLink) {
  navLink.addEventListener("click", function (e) {
    e.preventDefault(); //we stop the default of (scroll smooth when i go to another section)
    let currentListItemActive = document.querySelector(".nav-link.active"),
      currentId = navLink.getAttribute("href"),
      currentSection = document.querySelector(currentId),
      heightOfSections = currentSection.offsetTop;

    currentListItemActive.classList.remove("active");
    navLink.classList.add("active"); //that i will click on it

    window.scrollTo({
      top: heightOfSections - navBar.clientHeight,
      left: 0,
    });
    /*NOTE:
    i can replace it by
      - window.scrollTo(0 , heightOfSections - navBar.clientHeight);*/
  });
});

/*--------------------------------------------------------------LOADING PAGE-----------------------------------------------------------------*/
window.addEventListener("DOMContentLoaded", function () {
  loadingPage.classList.add("hide");

  setTimeout(function () {
    loadingPage.classList.add("d-none");
  }, 1000);
});

/*--------------------------------------------------------------Latest-----------------------------------------------------------------------*/
latest.forEach(function (product) {
  let isProductIntoCard = checkProductIntoCard(product.id);

  latestAllProducts.innerHTML += `
    <div class="product mb-3"
    data-product-id="${product.id}"
    data-selected-size="${isProductIntoCard?.size ?? product.sizes[0]}"
    data-selected-color="${isProductIntoCard?.color ?? product.colors[0]}"
    ondblclick="toggleFavorite(${product.id}, this)"
    >
    <i class="fa-heart favIcon ${checkProductIntoFavorites(product.id) ? "fa-solid favorited" : "fa-regular"}" onclick="event.stopPropagation(); toggleFavorite(${product.id}, this.closest('.product'))"></i>
    <div class="row">
      <div class="col-lg-6 part part1">
        <div class="item">
          <div class="row">
            <div class="col-lg-2 box1">
              <div class="item">
                <ul class="list-unstyled d-flex flex-row flex-lg-column gap-lg-4 m-0 p-0 column-gap-3">
                ${prepareImagesList(product.images)}           
                </ul>
              </div>
            </div>
            <div class="col-lg-10 box2">
              <div class="item">
                <div class="selectedImg">
                  <img src="./images/products/${product.images[0]}" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 part part2">
        <div class="item">
          <h2>${product.name}</h2>
          <p class="text">${product.description}</p>
          <div class="price d-flex">
            <div class="label me-3">
              <h5>Price :</h5>
            </div>
            <div class="value">
              <p>
              ${product.discount > 0 ? `<span class="oldPrice text-decoration-line-through">${product.price}<sup>$</sup></span>` : ""}
                <span>${product.price - product.price * product.discount}<sup>$</sup></span>
              </p>
            </div>
          </div>
          <div class="size d-flex">
            <div class="label me-3">
              <h5>Size :</h5>
            </div>
            <div class="value">
              <ul class="list-unstyled d-flex column-gap-3">
              ${prepareSizes(product.sizes, isProductIntoCard)}
              
              </ul>
            </div>
          </div>
          ${isProductIntoCard == null ? `<button class="btn mainColor" onclick="addToCard (${product.id},this)">Add To Card</button>` : `<button class="btn mainColor remove" onclick="removeFromCard (${product.id},this)">Remove From Card</button>`}
        </div>
      </div>
    </div>
  </div>
  `;
});

moveActiveSize();

/*--------------------------------------------------------------Featured----------------------------------------------------------------------*/
features.forEach(function (product) {
  featuredAllProducts.innerHTML += `
    <div class="col-lg-3 mb-3">
    <div class="item">
        <div class="product text-center" data-product-id="${product.id}" ondblclick="toggleFavorite(${product.id}, this)">
        <p class="sale" ><span class=' ${product.discount == 0 ? "d-none" : ""} ' > -${product.discount * 100}% </span></p>
        <div class="head">
          <div class="selectedImg">
            <img src="./images/products/${product.images[0]}" class="img-fluid" />
          </div>
          <i class="fa-solid fa-magnifying-glass" onclick="openPopup('product') ;closePopup('product');showProduct(${product.id})" ></i>
          <i class="fa-heart favIcon ${checkProductIntoFavorites(product.id) ? "fa-solid favorited" : "fa-regular"}" onclick="event.stopPropagation(); toggleFavorite(${product.id}, this.closest('.product'))"></i>
          <ul class="list-unstyled d-flex flex-row column-gap-3 justify-content-center my-4">
            ${prepareLiList(product.images)}
          </ul>
          
        </div>
        <div class="body">
          <h6>${product.name}</h6>
         ${preparePrice(product.price, product.discount)}
       </div>
      </div>
    </div>
  </div>
  `;
});

/*--------------------------------------------------------------Popup boxes------------------------------------------------------------------*/
//stop propagation
popupBoxes.forEach(function (popupBox) {
  popupBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

/*--------------------------------------------------------------popup exit key---------------------------------------------------------------*/
popupExitKey();

/*----------------------------------------------------------Button of to up-----------------------------------------------------------------*/
let backToTop = document.querySelector(".back-to-top");

//if i reach to more than 500 or first section(home) its show
window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0, //return to the first
    behavior: "smooth", //scroll-behavior
  });
});
