/*---------------------------------------------------------Change Main Color----------------------------------------------------------------*/
function changeMainColor(colorName) {
  let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);

  html.style.setProperty("--main-color", newColor);

  localStorage.setItem("mainColor", colorName); //save it in localStorage(additional feature)
}

/*--------------------------------------------------Change Favicon(the img behind title----------------------------------------------------*/
function changeFavicon(imgName, same) {
  let currentFavicon = document.querySelector("#favicon"),
    currentFaviconArr = currentFavicon.href.split("/");

  currentFaviconArr[currentFaviconArr.length - 1] = `${imgName}-${same}.png`;
  console.log(currentFavicon);
  let newHref = currentFaviconArr.join("/");

  currentFavicon.setAttribute("href", newHref);
}

/*---------------------------------------------------------Nav Photo------------------------------------------------------------------------*/
function changeNavLogo(imgName, image, same) {
  let currentSrc = image.src,
    currentSrcArr = currentSrc.split("/");

  currentSrcArr[currentSrcArr.length - 1] = `${imgName}-${same}.png`;
  //note:when i split i convert the string to array
  //we get the imgName i want to get last -1

  let newSrc = currentSrcArr.join("/");
  //make it string again

  image.setAttribute("src", newSrc);
}

/*----------------------------------------------------Check if we scroll nav or No---------------------------------------------------------*/
function checkScrolled() {
  if (window.scrollY >= 10) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
}

/*---------------------------------------------------------Update NavLink------------------------------------------------------------------*/
function updateNavLink(sectionId) {
  let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionBottom = sectionTop + section.offsetHeight,
    currentPosition = window.scrollY + navBar.clientHeight;

  if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
    let navLinkOfSection = document.querySelector(`[href="#${sectionId}"]`),
      currentListItemActive = document.querySelector(".nav-link.active");

    currentListItemActive.classList.remove("active");
    navLinkOfSection.classList.add("active");
  }
}

/*------------------------------------------------Prepare List in latest and  featured-----------------------------------------------------*/
function prepareImagesList(imagesList) {
  let liElements = "";

  imagesList.forEach(function (image) {
    liElements += `<li><img src="./images/products/${image}" class="img-fluid" onclick="changeSelectedImg('${image}' , this)" /></li>`;
  });

  return liElements; //any function must have a return
}

/*---------------------------------------------------------Prepare Sizes-------------------------------------------------------------------*/
function prepareSizes(sizes, isProductIntoCard = null) {
  let liElements = "";

  sizes.forEach(function (size, index) {
    if (isProductIntoCard == null) {
      liElements += `<li class="${index === 0 ? "active" : ""}" onclick="changeActive(this) ; updateSize('${size}',this);">${size}</li>`;
    } else {
      liElements += `<li class="${isProductIntoCard.size == size ? "active" : ""}" onclick="changeActive(this) ; updateSize('${size}',this);">${size}</li>`;
    }
  });

  return liElements;
}

/*---------------------------------------------------------Prepare colors-------------------------------------------------------------------*/
function prepareColors(colors, isProductIntoCard = null) {
  let liElements = "";

  colors.forEach(function (color, index) {
    if (isProductIntoCard == null) {
      liElements += `<li class="${index === 0 ? "active" : ""}" onclick="changeActive(this) ; updateColors('${color}', this) " style="background-color: ${color}"></li>`;
    } else {
      liElements += `<li class="${isProductIntoCard.color == color ? "active" : ""}" onclick="changeActive(this) ; updateColors('${color}', this) " style="background-color: ${color}"></li>`;
    }
  });

  return liElements;
}

/*----------------------------------------------------------Prepare Price-------------------------------------------------------------------*/
function preparePrice(price, discount) {
  return `
    <p class="d-flex flex-row justify-content-center column-gap-2">
       <span class="text-decoration-line-through oldPrice ${discount === 0 ? "d-none" : ""}"> ${price}<sup>$</sup></span>
       <span class="currentPrice ">${(price * (1 - discount)).toFixed(2)}<sup>$</sup></span>
    </p>
  `;
}

/*----------------------------------------------------------Move Active In Sizes-------------------------------------------------------------------*/
function moveActiveSize() {
  let liElements = document.querySelectorAll(".size li"); //all sizes

  liElements.forEach(function (size) {
    //when i click on size removeActive from all sizes and add active to size i clicked on it
    size.addEventListener("click", function () {
      let allSizes = size.parentElement.querySelectorAll("li");

      allSizes.forEach(function (item) {
        item.classList.remove("active");
      });

      size.classList.add("active");
    });
  });
}

/*----------------------------------------------------------Prepare li list in featured------------------------------------------------------*/
//it make the number of li == the number of images
function prepareLiList(imagesList) {
  let liElements = "";

  imagesList.forEach(function (image, index) {
    liElements += ` <li class="${index == 0 ? "active" : ""}" onclick="changeSelectedImg('${image}', this) ; changeActive(this)" ></li> `;
  });

  return liElements;
}

/*----------------------------------------------------------change selected image-----------------------------------------------------------------*/
function changeSelectedImg(imgName, that) {
  let selectedImg = that.closest(".product").querySelector(".selectedImg img"),
    srcArr = selectedImg.src.split("/");

  srcArr[srcArr.length - 1] = imgName;

  selectedImg.setAttribute("src", srcArr.join("/"));
}
//note:selestedImgSrc = "./images/products/" + imgName;
//true but it doesnt run at all beacause the src meight change the best to do it by make the imageList string to array after that return it such it was*/

/*----------------------------------------------------------change Active-----------------------------------------------------------------*/
function changeActive(that) {
  let currentActive = that.parentElement.querySelector(".active");
  currentActive.classList.remove("active");
  that.classList.add("active");
}

/*----------------------------------------------------------Open popup-----------------------------------------------------------------*/
function openPopup(popupName) {
  let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

  popupEle.classList.add("active");

  setTimeout(function () {
    popupEle.classList.add("show");
  }, 100);
}

/*----------------------------------------------------------Close popup-----------------------------------------------------------------*/
function closePopup(popupName) {
  let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

  popupEle.addEventListener("click", function () {
    popupEle.classList.remove("show");

    setTimeout(function () {
      popupEle.classList.remove("active");
    }, 1000);
  });
}

/*----------------------------------------------------------PopupExitKey-----------------------------------------------------------------*/
function popupExitKey() {
  let popupExitBtns = document.querySelectorAll(".popup .exit");

  popupExitBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let popupEle = btn.closest(".popup");

      popupEle.classList.remove("show");

      setTimeout(function () {
        popupEle.classList.remove("active");
      }, 1000);
    });
  });
}

/*----------------------------------------------------------Get Product-----------------------------------------------------------------*/
function getProduct(productId) {
  return products.filter((product) => product.id == productId)[0];
  /*NOTE:
      -filter return array have object or objects that contains the condition [the array have all components of product i selected]
      -find return object not array
  */
}

/*----------------------------------------------------------show product-----------------------------------------------------------------*/
//features
function showProduct(productId) {
  let popupProduct = document.querySelector('.popup[data-popup-name="product"] .box'),
    product = getProduct(productId);

  let isProductIntoCard = checkProductIntoCard(product.id);

  popupProduct.innerHTML = `
    <div class="row product"
      data-selected-size="${isProductIntoCard?.size ?? product.sizes[0]}"
      data-selected-color="${isProductIntoCard?.color ?? product.colors[0]}"
      >
    <div class="col-lg-6">
      <div class="item">
        <div class="selectedImg">
          <img src="./images/products/${product.images[0]}" alt="" class="img-fluid" />
        </div>
        <ul class="d-flex list-unstyled mb-0 column-gap-3">
          ${prepareImagesList(product.images)}
        </ul>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="item">
        <h2>${product.name}</h2>
        <div class="price d-flex">
          <div class="value">
            <p class="mb-0">
              <span class="oldPrice text-decoration-line-through oldPrice ${product.discount === 0 ? "d-none" : ""}">${product.price}<sup>$</sup></span>
              <span>${(product.price * (1 - product.discount)).toFixed(2)}<sup>$</sup></span>
            </p>
          </div>
        </div>
        <hr />
        <p>${product.description}</p>
        <div class="size d-flex">
          <div class="label me-3">
            <h5 class="fs-6 fw-bolder">Size :</h5>
          </div>
          <div class="value">
            <ul class="list-unstyled d-flex column-gap-3 sizes">
              ${prepareSizes(product.sizes, isProductIntoCard)}
            </ul>
          </div>
        </div>
        <div class="colors d-flex">
          <div class="label me-3">
            <h5 class="fs-6 fw-bolder">colors :</h5>
          </div>
          <div class="value">
            <ul class="list-unstyled d-flex column-gap-3 colors">
              ${prepareColors(product.colors, isProductIntoCard)}
            </ul>
          </div>
        </div>
          ${
            isProductIntoCard == null
              ? `<button class="btn mainColor" onclick="addToCard (${product.id},this)">Add To Card</button>` //no products
              : `<button class="btn mainColor remove" onclick="removeFromCard (${product.id},this)">Remove From Card</button>` //product exist
          }      </div>
    </div>
  </div>`;
}

/*----------------------------------------------------------Add To Card-----------------------------------------------------------------*/
function addToCard(productId, that) {
  let productEle = that.closest(".product"),
    newOrder = {
      id: productId,
      size: productEle.dataset.selectedSize,
      color: productEle.dataset.selectedColor,
    };

  CardProducts.push(newOrder);
  updateLocalStorage();

  toggleBtnAddOrRemove(that, "remove"); //that => btn
  that.setAttribute("onclick", `removeFromCard(${productId},this)`); //onclik remove the first onclick [addToCard]**********************

  showMessage("Product added to card !");
}

/*----------------------------------------------------------Remove To Card-----------------------------------------------------------------*/
function removeFromCard(productId, that) {
  CardProducts = CardProducts.filter((product) => product.id != productId);

  updateLocalStorage();

  if (that != null) {
    toggleBtnAddOrRemove(that, "add");
    that.setAttribute("onclick", `addToCard(${productId},this)`);
  }
  showMessage("Product removed from card !", "danger");
}

/*----------------------------------------------------------Change Add Or Remove From Card--------------------------------------------------*/
function toggleBtnAddOrRemove(btn, status) {
  if (status == "add") {
    btn.classList.remove("remove");
    btn.textContent = "Add To Card";
  } else if (status == "remove") {
    btn.classList.add("remove");
    btn.textContent = "Remove From Card";
  }
}

/*----------------------------------------------------------Update Size-----------------------------------------------------------------*/
function updateSize(size, that) {
  let productEle = that.closest(".product");

  productEle.dataset.selectedSize = size;
}

/*----------------------------------------------------------Update Color-----------------------------------------------------------------*/
function updateColors(color, that) {
  let productEle = that.closest(".product");

  productEle.dataset.selectedColor = color; //change selectedColor[the first] to the color i choose
}

/*----------------------------------------------------------Update Local Storage------------------------------------------------------------*/
function updateLocalStorage() {
  localStorage.setItem("CardProducts", JSON.stringify(CardProducts)); //to storage
}

/*-------------Check if the product i add into card or no because if i add it to card save that in localStorage -----------------------------*/
function checkProductIntoCard(productId) {
  let result = CardProducts.filter((product) => product.id == productId);
  return result.length == 1 ? result[0] : null;
}

/*----------------------------------------------------------add to cart put the product in popup------------------------------------------------------------*/
function showCart() {
  let contentOfPopupShopping = document.querySelector(`.popup#popupShopping .row`);

  if (CardProducts.length == 0) {
    contentOfPopupShopping.innerHTML = `<p class="text-center w-100 alert alert-warning">There are no products</p>`;
    let btnBuy = document.querySelector("button.buy");
    btnBuy.classList.add("d-none");
  } else {
    let btnBuy = document.querySelector("button.buy");
    btnBuy.classList.remove("d-none");
    contentOfPopupShopping.innerHTML = "";
    CardProducts.forEach(function (cardProduct) {
      let product = getProduct(cardProduct.id);

      contentOfPopupShopping.innerHTML += `
        <div class="col-lg-4">
        <div class="item">
        <div class="product bg-light px-3 py-4 mb-3" data-product-id="${product.id}">
          <img src="./images/products/${product.images[0]}" alt="" class="img-fluid" />
          <h2 class="fs-5 mb-3">${product.name.slice(0, 12)}.....</h2>

          <div class="price d-flex">
            <div class="label me-3">
              <h5 class="fs-6 fw-bolder">Price :</h5>
            </div>
            <div class="value">
              <p>
              ${product.discount > 0 ? `<span class="oldPrice text-decoration-line-through">${product.price}<sup>$</sup></span>` : ""}
                <span>${(product.price - product.price * product.discount).toFixed(2)}<sup>$</sup></span>
              </p>
            </div>
          </div>
          
           <div class="size d-flex">
          <div class="label me-3">
            <h5 class="fs-6 fw-bolder">Size :</h5>
          </div>
          <div class="value">
            <ul class="list-unstyled d-flex column-gap-3 sizes">
          ${prepareSizes([cardProduct.size])}
            </ul>
          </div>
        </div>
        <div class="colors d-flex">
          <div class="label me-3">
            <h5 class="fs-6 fw-bolder">colors :</h5>
          </div>
          <div class="value">
            <ul class="list-unstyled d-flex column-gap-3 colors">
              ${prepareColors([cardProduct.color])}
            </ul>
          </div>
        </div>

          <button class="btn btn-danger mt-3 text-light w-100" onclick="removeFromShoppingPopup(${product.id})">Remove</button>
        </div>
      </div>
    </div>
    
    `;
    });
  }

  openPopup("shopping");
}
/*----------------------------------------------------------remove from popup------------------------------------------------------------*/
function removeFromShoppingPopup(productId) {
  let contentOfPopupShopping = document.querySelector(`.popup#popupShopping .row`);

  let product = document.querySelector(`.popup#popupShopping .row .product[data-product-id="${productId}"]`);
  product.parentElement.parentElement.remove();

  let btnOfLatest = document.querySelector(`#latest .product[data-product-id="${productId}"] button`);
  removeFromCard(productId, btnOfLatest);

  if (CardProducts.length == 0) {
    contentOfPopupShopping.innerHTML = `<p class="text-center w-100 alert alert-warning">There are no products</p>`;
    let btnBuy = document.querySelector("button.buy");
    btnBuy.classList.add("d-none");
  } else {
    let btnBuy = document.querySelector("button.buy");
    btnBuy.classList.remove("d-none");
  }
}

/*----------------------------------------------------------Update Favorites Local Storage------------------------------------------------------*/
function updateFavoritesLocalStorage() {
  localStorage.setItem("Favorites", JSON.stringify(Favorites));
}

/*----------------------------------------------------------Check if product is favorite-----------------------------------------------------------------*/
function checkProductIntoFavorites(productId) {
  return Favorites.includes(productId); //to dont like a product if it was liked
}

/*----------------------------------------------------------Toggle Favorite-----------------------------------------------------------------*/
function toggleFavorite(productId, productEle) {
  let heartIconInNav = document.querySelector(".icons .fa-heart"),
    heartIconInCard = productEle.querySelector(".favIcon");

  if (checkProductIntoFavorites(productId)) {
    Favorites = Favorites.filter((id) => id != productId);

    heartIconInCard.classList.remove("fa-solid", "favorited");
    heartIconInCard.classList.add("fa-regular");
  } else {
    Favorites.push(productId);

    heartIconInCard.classList.remove("fa-regular");
    heartIconInCard.classList.add("fa-solid", "favorited");

    heartIconInNav.classList.add("pulse");
    setTimeout(function () {
      heartIconInNav.classList.remove("pulse");
    }, 1000);
  }

  updateFavoritesLocalStorage();
}

/*----------------------------------------------------------Show Favorites Popup-----------------------------------------------------------------*/
function showFavorites() {
  let contentOfPopupFavorites = document.querySelector(`.popup#popupFavorites .row`);

  if (Favorites.length == 0) {
    contentOfPopupFavorites.innerHTML = `<p class="text-center w-100 alert alert-warning">No favorites</p>`;
  } else {
    contentOfPopupFavorites.innerHTML = "";

    Favorites.forEach(function (productId) {
      let product = getProduct(productId);
      if (!product) return;

      contentOfPopupFavorites.innerHTML += `
        <div class="col-lg-4">
          <div class="item">
            <div class="product bg-light px-3 py-4 mb-3 rounded-3" data-product-id="${product.id}">
              <img src="./images/products/${product.images[0]}" alt="" class="img-fluid" />
              <h2 class="fs-6 mb-3 text-center">${product.name.slice(0, 12)}.....</h2>
              <button class="btn btn-danger mt-3 text-light w-100" onclick="removeFromFavoritesPopup(${product.id})">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
  }
  //save favorites the open popup
  openPopup("favorites");
}

/*----------------------------------------------------------Remove From Favorite Popup-----------------------------------------------------------------*/
function removeFromFavoritesPopup(productId) {
  Favorites = Favorites.filter((id) => id != productId);
  updateFavoritesLocalStorage();

  let cardInPopup = document.querySelector(`.popup#popupFavorites .product[data-product-id="${productId}"]`);
  cardInPopup.parentElement.parentElement.remove();

  let mainCard = document.querySelector(`#latest .product[data-product-id="${productId}"], #featured .product[data-product-id="${productId}"]`);
  if (mainCard) {
    let heartIcon = mainCard.querySelector(".favIcon");
    heartIcon.classList.remove("fa-solid", "favorited");
    heartIcon.classList.add("fa-regular");
  }

  if (Favorites.length == 0) {
    let contentOfPopupFavorites = document.querySelector(`.popup#popupFavorites .row`);
    contentOfPopupFavorites.innerHTML = `<p class="text-center w-100 alert alert-warning">No favorite Products</p>`;
  }
}

/*----------------------------------------------------------Message-----------------------------------------------------------------*/
function showMessage(text, type = "success") {
  let message = document.querySelector(".message");

  message.textContent = text; //the content i will type in add and remove functions********

  message.className = `message ${type}`; //the name of class= className

  setTimeout(function () {
    message.classList.add("show");
  }, 10);

  setTimeout(function () {
    message.classList.remove("show");
  }, 1000);
}
// note:the default value of type of message success
