///////////////// >>defaults<< //////////////////

let defaultPage = 1;

/////////////////// >>> SHOWING USER INFO <<< ///////////////////////////
//====== grabbing elenemts:
let userName_field = document.getElementById("userName");
let userImage_field = document.getElementById("userImage");
let userNameFieldCart = document.getElementById("userField");
let defaultRoom;

//===== inserting user info :
function fillUserInfo(userArr) {
  userName_field.innerText = userArr[0]["admin_name"];
  userImage_field.src = "../server/admin_images/" + userArr[0]["admin_pic"];
  userNameFieldCart.innerText = userArr[0]["admin_name"];

  // console.log(defaultRoom);
}

///////////////////////////////////// >>> FILL PRODUCT CARDS <<< /////////////////////////////
let productsZone = document.getElementById("productsZone");

function fillProducts(productsArr) {
  for (let i = 0; i < productsArr.length; i++) {
    let productsZone = document.getElementById("productsZone");
    let divParent = document.createElement("div");
    let divContainer = document.createElement("div"); ////
    let divHeader = document.createElement("div"); ////
    let imglink = document.createElement("a"); ////
    let img = document.createElement("img"); /////
    let divCardBody = document.createElement("div"); ////
    let cardBodyContainer = document.createElement("div"); ////
    let divNameInfo = document.createElement("div"); ////
    let h5Name = document.createElement("h5"); ////
    let hiddenId = document.createElement("span"); ////
    let divCatInfo = document.createElement("div"); ////
    let spanCat = document.createElement("span"); ////
    let spanPrice = document.createElement("span"); ////
    let addToCartContainer = document.createElement("div"); ////
    let addToCartBtn = document.createElement("button"); ////

    divParent.classList.add("col-xl-3", "col-md-6", "mb-xl-0", "mb-4", "mt-4");
    divContainer.classList.add("card", "card-blog", "card-plain");
    divHeader.classList.add("card-header", "p-0", "mt-n4", "mx-3");
    imglink.classList.add("d-block", "shadow-xl", "border-radius-xl");
    hiddenId.classList.add("d-none", "pId");
    img.setAttribute(
      "src",
      `../server/products_images/${productsArr[i]["product_picture"]}`
    );
    img.classList.add("img-fluid", "shadow", "border-radius-xl");
    divCardBody.classList.add("card-body", "p-3");
    cardBodyContainer.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
    h5Name.classList.add("product-name");
    h5Name.innerText = `${productsArr[i]["product_name"]}`;
    hiddenId.innerText = `${[productsArr[i]["product_id"]]}`;
    divCatInfo.classList.add("tags", "mb-2");
    spanCat.classList.add("badge", "bg-gradient-info");
    spanCat.innerText = `${productsArr[i]["category_name"]}`;
    spanPrice.classList.add("fs-4", "product-price");
    spanPrice.innerText = `${productsArr[i]["product_price"]}`;
    addToCartContainer.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-end",
      "gap-3"
    );
    addToCartBtn.setAttribute("type", "button");
    addToCartBtn.classList.add(
      "btn",
      "btn-primary",
      "btn-sm",
      "mb-0",
      "toast-btn",
      "customAlert",
      "addToCart"
    );
    addToCartBtn.innerText = "Add To Cart";
    addToCartBtn.dataset.target = "#infoToast";
    divContainer.appendChild(divHeader);
    divContainer.appendChild(divCardBody);
    divContainer.appendChild(addToCartContainer);
    divHeader.appendChild(imglink);
    imglink.appendChild(img);
    divCardBody.appendChild(cardBodyContainer);
    divCardBody.appendChild(addToCartContainer);
    cardBodyContainer.appendChild(divNameInfo);
    cardBodyContainer.appendChild(spanPrice);
    divNameInfo.appendChild(h5Name);
    divNameInfo.appendChild(hiddenId);
    divNameInfo.appendChild(divCatInfo);
    divCatInfo.appendChild(spanCat);
    addToCartContainer.appendChild(addToCartBtn);
    divParent.appendChild(divContainer);
    productsZone.appendChild(divParent);
  }
  // calling add to cart  function

  addToCart();
}

//////////////////////////////////////////////////// >>> SHOW TOAST <<< ///////////////////////////////////////////////////////////

// set this function for genertaed dom by js
function showToast() {
  let btns = document.getElementsByClassName("addToCart");
  let infoToastDiv = document.getElementById("infoToast");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      infoToastDiv.classList.add("show");
      setTimeout(() => {
        infoToastDiv.classList.remove("show");
      }, 1200);
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////// >>>> ADD TO CART <<<< ////////////
let orderdProductName;
let orderdProductId;

let addBtns = document.getElementsByClassName("addToCart");
let productRow = document.getElementsByClassName("cartItem");

function addToCart() {
  for (let i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener("click", addToCartClicked);
  }
  // showing message of adding product to cart

  showToast();
}

//////////////// >>>> get the cart Info <<<< ////////////

function addToCartClicked(e) {
  //
  let clicked = e.target;
  let parent = clicked.parentElement.parentElement;
  orderdProductName = parent.firstChild.firstChild.firstChild.innerText;
  orderdProductId = parent.firstChild.firstChild.children[1].innerText;
  let orderdProductPrice = parent.firstChild.lastChild.innerText;
  console.log(orderdProductId);
  console.log(orderdProductPrice);
  addItemToCart(orderdProductName, orderdProductPrice, orderdProductId);
  updateCartPrice();
}

function addItemToCart(productName, productPrice, orderdProductId) {
  let cartContainer = document.getElementById("cartParent");

  let cartContainer2 = document.createElement("div");
  let cartContainer3 = document.createElement("div"); ////
  let cartProductDiv = document.createElement("div"); ////
  let cartProductName = document.createElement("h6"); ////
  let cartProductSpan = document.createElement("span"); ////
  let cartInputDiv = document.createElement("div"); ////
  let cartInput = document.createElement("input"); /////
  let cartPriceDiv = document.createElement("div"); ////
  let cartPriceCurrency = document.createElement("h6"); ////
  let cartPrice = document.createElement("span"); ////
  let cartCancelDiv = document.createElement("div"); ////
  let cartCancelBtn = document.createElement("button"); ////
  let cartCancelIcon = document.createElement("i"); ////

  //////////////// >>>> check avilablity in cart <<<< ////////////
  let cartName = document.getElementsByClassName("productName");
  let cartCount = document.getElementsByClassName("inputs");
  for (let i = 0; i < cartName.length; i++) {
    console.log(cartName);
    console.log(orderdProductName);
    if (cartName[i].innerText == orderdProductName) {
      let cartCountVal = parseInt(cartCount[i].value);
      cartCountVal[i] = parseInt(cartCount[i].value) + 1;
      cartCount[i].setAttribute("value", cartCountVal + 1);
      updateCartPrice();

      return;
    }
  }

  cartContainer2.classList.add(
    "d-flex",
    "flex-column",
    "mt-2",
    "justify-content-center",
    "align-items-center"
  );
  cartContainer3.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-baseline",
    "col-12",
    "cartItem"
  );
  cartProductDiv.classList.add("col-5");
  cartInputDiv.classList.add("input-group", "input-group-outline", "mx-1");
  cartInput.classList.add(
    "form-control",
    "fw-bolder",
    "text-warning",
    "inputs"
  );
  cartInput.setAttribute("type", "number");
  cartInput.setAttribute("onfocus", "focused(this)");
  cartInput.setAttribute("onfocusout", "defocused(this)");
  cartInput.setAttribute("min", "1");
  cartInput.setAttribute("value", "1");
  cartInput.style.width = "60px";
  cartPriceDiv.classList.add("col-3", "mx-2");
  cartCancelDiv.classList.add("col-1");
  cartCancelBtn.classList.add(
    "btn",
    "btn-link",
    "text-danger",
    "p-0",
    "text-center",
    "mt-2",
    "mx-1",
    "fw-bolder",
    "removeFromCart"
  );
  cartPrice.classList.add("cartPriceNumber");

  cartProductName.classList.add("productName");
  cartCancelIcon.classList.add("material-icons");
  cartProductSpan.classList.add("product-id", "d-none");

  cartPriceCurrency.innerText = "EPG ";
  cartCancelIcon.innerText = "clear";
  cartProductName.innerText = `${productName}`;
  cartProductSpan.innerText = `${orderdProductId}`;
  cartPrice.innerText = `${productPrice}`;
  cartContainer.appendChild(cartContainer2);
  cartContainer2.appendChild(cartContainer3);
  cartContainer3.appendChild(cartProductDiv);
  cartProductDiv.appendChild(cartProductName);
  cartProductDiv.appendChild(cartProductSpan);
  cartContainer3.appendChild(cartInputDiv);
  cartInputDiv.appendChild(cartInput);
  cartContainer3.appendChild(cartPriceDiv);
  cartPriceDiv.appendChild(cartPriceCurrency);
  cartPriceCurrency.appendChild(cartPrice);
  cartContainer3.appendChild(cartCancelDiv);
  cartCancelDiv.appendChild(cartCancelBtn);
  cartCancelBtn.appendChild(cartCancelIcon);

  console.log(cartProductName.innerText);

  let removeFromCartBtn = document.getElementsByClassName("removeFromCart");
  let catInputs = document.getElementsByClassName("inputs");
  for (let i = 0; i < removeFromCartBtn.length; i++) {
    removeFromCartBtn[i].addEventListener("click", removeItem);
    catInputs[i].addEventListener("change", changeQuantity);
    console.log(removeFromCartBtn[i]);
  }
  updateCartPrice();
}

let removeBtn = document.getElementsByClassName("removeFromCart");
for (let i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener("click", removeItem);
}
function removeItem(e) {
  btnClicked = e.target;
  btnClicked.parentElement.parentElement.parentElement.remove();
  updateCartPrice();
}
let quantityInput = document.getElementsByClassName("inputs");

for (let i = 0; i < quantityInput; i++) {
  input = quantityInput[i];
  input.addEventListener("change", changeQuantity);
}

function changeQuantity(e) {
  let input = e.target;
  // console.log("first");
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartPrice();
}

// let productRow = document.getElementsByClassName("cartItem");
function updateCartPrice() {
  let total = 0;
  // let Tcount = 0;
  for (let i = 0; i < productRow.length; i++) {
    console.log(productRow[i]);
    // cartRow = productRow[i];
    let priceElement = document.getElementsByClassName("cartPriceNumber")[i];
    let quantityElement = document.getElementsByClassName("inputs")[i];
    console.log(priceElement);
    console.log(quantityElement);
    let price = parseFloat(priceElement.innerText);
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementById("totalPay").innerText = total;

  // document.getElementsByClassName("inputs")[0].textContent = i /= 2;
}

//show rooms

let roomsInput = document.getElementById("userRoom");
console.log(roomsInput);

function fillRoomsInput(userArray) {
  roomsInput.innerText = "";
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "selected");
  defaultOption.setAttribute("disabled", "disabled");
  defaultOption.setAttribute("hidden", "hidden");
  defaultOption.innerText = "choose a room";
  roomsInput.appendChild(defaultOption);
  for (let i = 0; i < userArray.length; i++) {
    let selectOption = document.createElement("option");
    defaultRoom = userArray[i]["user_room"];
    selectOption.innerText = defaultRoom;
    roomsInput.appendChild(selectOption);
  }
}

let useridInput = document.getElementById("userid");
console.log(roomsInput);

function fillUserInput(userArray) {
  useridInput.innerText = "";
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "selected");
  defaultOption.setAttribute("disabled", "disabled");
  defaultOption.setAttribute("hidden", "hidden");
  defaultOption.innerText = "choose a user";
  useridInput.appendChild(defaultOption);
  for (let i = 0; i < userArray.length; i++) {
    let selectOption = document.createElement("option");
    defaultRoom = userArray[i]["user_id"];
    selectOption.innerText = defaultRoom;
    useridInput.appendChild(selectOption);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//add items to cart <====================================

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// fetch func. ////////////////////////////////
let userId;
async function get_products(currentPage) {
  let bodyFormat = { pageCount: currentPage };
  let response = await fetch(
    "http://localhost/php-project/server/HomeAdmin.php",
    {
      method: "POST",
      body: JSON.stringify(bodyFormat),
    }
  );
  let data = await response.json();
  console.log(data);
  fillProducts(data["products"]);
  // fillUserInfo(data["user"]);
  fillUserInput(data["userid"]);
  fillRoomsInput(data["allRooms"]);
  userId = data["user"][0]["user_id"];
}

let navigationContainer = document.getElementById("navigation");
console.log(navigationContainer);

function createPagination(requiredPages) {
  let paginationStart = document.getElementById("paginationContainer");
  paginationStart.innerText = "";
  for (let i = 0; i < requiredPages; i++) {
    let paginateContainer = document.createElement("li");
    paginateContainer.classList.add("page-item");
    let paginateLink = document.createElement("a");
    paginateLink.classList.add("page-link");
    paginateLink.setAttribute("href", "javascript:");
    paginateLink.innerText = i + 1;
    paginationStart.appendChild(paginateContainer);
    paginateContainer.appendChild(paginateLink);
  }
}

async function getPageCount() {
  let response = await fetch(
    "http://localhost/php-project/server/paginationHome.php",
    {
      method: "GET",
    }
  );
  let data = await response.json();
  console.log(data);

  createPagination(data);
  setActivePage();

  // get_products(currentPage);
}

function setActivePage() {
  let parentContainer = document.getElementById("paginationContainer");
  let pages = parentContainer.getElementsByClassName("page-item");
  let activepage = parentContainer.getElementsByClassName("active");
  pages[0].classList.add("active");
  get_products(1);
  for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", () => {
      activepage[0].classList.remove("active");
      pages[i].classList.add("active");
      activepage = parentContainer.getElementsByClassName("active");
      let activepageValue = parseInt(activepage[0].firstChild.innerText);
      console.log(activepageValue);
      productsZone.innerHTML = "";
      get_products(activepageValue);
    });
  }
}

getPageCount();

async function getSearchProducts(searchdata) {
  let bodyFormat = { searchdata: searchdata };
  let response = await fetch(
    "http://localhost/php-project/server/home-Search.php",
    {
      method: "POST",
      body: JSON.stringify(bodyFormat),
    }
  );
  let data = await response.json();
  console.log(data["searchedPrdoucts"]);
  productsZone.innerHTML = "";
  let paginationContainer = document.getElementById("");
  console.log(paginationContainer);
  fillProducts(data["searchedPrdoucts"]);
}

function productSearch() {
  let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", () => {
    let searchData = searchInput.value;
    if (!searchData) {
      getPageCount();
    } else {
      getSearchProducts(searchData);
    }
  });
}

productSearch();

function initiateOrder() {
  let confirmBtn = document.getElementById("confirmBtn");
  let orderDetails = {};
  confirmBtn.addEventListener("click", () => {
    let cartItems = document.getElementsByClassName("cartItem");
    let noteValue = document.getElementById("userNote").value;
    let roomNumber = document.getElementById("userRoom").value;
    let userid = document.getElementById("userid").value;
    let productid = document.getElementsByClassName("product-id");
    let inputsCount = document.getElementsByClassName("inputs");
    console.log(productid);

    if (cartContainer.children.length == 0) {
      alert("Can not make your order");
    } else if (roomNumber == "choose a room") {
      alert("please select a room");
    } else if (userid == "choose a user") {
      alert("Please choose a user");
    } else {
      orderDetails.user_id = parseInt(userid);
      orderDetails.note = noteValue;
      orderDetails.room_no = parseInt(roomNumber);
      let products = {};
      let product_id = {};
      for (let i = 0; i < cartItems.length; i++) {
        let itemId = parseInt(productid[i].innerText);
        console.log(itemId);

        products[`p${i + 1}`] = {};
        products[`p${i + 1}`]["product_id"] = itemId;
        products[`p${i + 1}`]["quantity"] = parseInt(inputsCount[i].value);
        console.log(products[`p${i + 1}`]);
        orderDetails["products"] = products;
      }
    }

    sendOrderData(orderDetails);
  });
}

function initiateOrder() {
  let confirmBtn = document.getElementById("confirmBtn");
  let orderDetails = {};
  confirmBtn.addEventListener("click", () => {
    let cartItems = document.getElementsByClassName("cartItem");
    let noteValue = document.getElementById("userNote").value;
    let roomNumber = document.getElementById("userRoom").value;
    let productid = document.getElementsByClassName("product-id");
    let inputsCount = document.getElementsByClassName("inputs");
    let cartContainer = document.getElementById("cartParent");
    let total = document.getElementById("totalPay");
    console.log(productid);
    if (cartContainer.children.length == 0) {
      alert("Can not make your order");
    } else if (roomNumber == "choose a room") {
      alert("please select a room");
    } else {
      orderDetails.user_id = userId;
      orderDetails.note = noteValue;
      orderDetails.room_no = parseInt(roomNumber);
      let products = {};
      let product_id = {};
      for (let i = 0; i < cartItems.length; i++) {
        let itemId = parseInt(productid[i].innerText);
        console.log(itemId);

        products[`p${i + 1}`] = {};
        products[`p${i + 1}`]["product_id"] = itemId;
        products[`p${i + 1}`]["quantity"] = parseInt(inputsCount[i].value);
        console.log(products[`p${i + 1}`]);
        orderDetails["products"] = products;
      }

      sendOrderData(orderDetails);
      cartContainer.innerText = "";
      userNote.value = "";

      total.innerText = 0;
    }
  });
}

initiateOrder();

// '{"user_id": 2,
//             "note": "welcome",
//             "room_no": 214,
//             "products":{
//                 "p1":{
//                     "product_id": 1,
//                     "quantity": 3
//                 },
//                 "p2":{
//                     "product_id": 2,
//                     "quantity": 2
//                 }
//             }

//             }'

// alert("hi");

async function sendOrderData(orderDetails) {
  let response = await fetch(
    "http://localhost/php-project/server/initiateOrderUser.php",
    {
      method: "POST",
      body: JSON.stringify(orderDetails),
    }
  );
  let data = await response.json();
  console.log(data);
}

// alert("");

//---- grabbing elements for functions
let logout_Btn = document.getElementById("logoutBtn");
//////////////////////////////// LOUGOUT FUNCTION ////////////////////////////////////
logout_Btn.addEventListener("click", async function () {
  let formData = new FormData();
  formData.append("logout", true);
  let logoutSent = await fetch(
    "http://localhost/php-project/server/Admin_Sign_In.php",
    {
      method: "post",
      body: formData,
    }
  );
  let logoutResponse = await logoutSent.json();
  if (logoutResponse["loggedout"] == true) {
    window.location = "http://localhost/php-project/admin/AdminSign-in.html";
  }
});
