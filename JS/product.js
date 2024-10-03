//productDetail display start
let products = [];
fetch(
  "https://raw.githubusercontent.com/Yang-012/First-Project/refs/heads/master/JSON/products.json"
)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
    setupAddToCart();
    updateTotalCartQuantity();
  });
function showDetail() {
  let detail = document.querySelector(".productDetails__details");
  let otherProductsList = document.querySelector(".shopList__products");
  let productId = new URLSearchParams(window.location.search).get("id");
  let thisProduct = products.filter((value) => value.id == productId)[0];
  if (!thisProduct) {
    window.location.href = "/";
  }

  detail.querySelector(".productDetails__image img").src = thisProduct.image;
  detail.querySelector(".productDetails__name").innerText = thisProduct.name;
  detail.querySelector(".productDetails__price").innerText =
    "$" + thisProduct.price;
  detail.querySelector(".productDetails__description").innerText =
    thisProduct.description;

  products
    .filter((value) => value.id != productId)
    .slice(0, 8)
    .forEach((product) => {
      let newProduct = document.createElement("a");
      newProduct.href = "/shopProduct.html?id=" + product.id;
      newProduct.classList.add("shopList__product");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
            <h2 class="shopList__name">${product.name}</h2>
            <div class="shopList__price">$${product.price}</div>`;
      otherProductsList.appendChild(newProduct);
    });
}
//productDetail display end

//productCart display start
function setupAddToCart() {
  const addToCartButton = document.getElementById("productCart");
  addToCartButton.addEventListener("click", () => {
    let productId = new URLSearchParams(window.location.search).get("id");
    let thisProduct = products.filter((value) => value.id == productId)[0];
    let productQuantity = document.querySelector(
      ".productDetails__quantityContainer--number"
    );
    addToCart(thisProduct.name, thisProduct.price, productQuantity.value);
    alert(`${thisProduct.name} 已添加到購物車`);
    updateTotalCartQuantity();
  });
}
function addToCart(name, price, quantity, cartQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    name: name,
    price: price,
    quantity: quantity,
    cartQuantity: cartQuantity,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}
//productCart display end

//product "+,-" start
document
  .querySelector(".productDetails__quantityContainer--increase")
  .addEventListener("click", function () {
    let quantityInput = document.querySelector(
      ".productDetails__quantityContainer--number"
    );
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

document
  .querySelector(".productDetails__quantityContainer--decrease")
  .addEventListener("click", function () {
    let quantityInput = document.querySelector(
      ".productDetails__quantityContainer--number"
    );
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });
//product "+,-" end
//cartQuantity display start

let cartQuantityElement = document.querySelector(".N-nav__openCart");
function getTotalCartQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + Number(item.quantity), 0);
}

function updateTotalCartQuantity() {
  const totalQuantity = getTotalCartQuantity();
  cartQuantityElement.textContent = totalQuantity;
  if (totalQuantity > 0) {
    cartQuantityElement.classList.remove("openCart--close");
  } else {
    cartQuantityElement.classList.add("openCart--close");
  }
}

//cartQuantity display end
