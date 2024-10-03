//product display start
let products = [];
fetch(
  "https://raw.githubusercontent.com/Yang-012/First-Project/refs/heads/master/JSON/products.json"
)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
    updateTotalCartQuantity();
  });
function addDataToHTML() {
  let listProducts = document.querySelector(".shopList__products");
  if (products != null) {
    products.forEach((product) => {
      let newProduct = document.createElement("a");
      newProduct.href = "/shopProduct.html?id=" + product.id;
      newProduct.classList.add("shopList__product");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
        <h2 class="shopList__name">${product.name}</h2>
        <div class="shopList__price">$${product.price}</div>`;
      listProducts.appendChild(newProduct);
    });
  }
}
//product display end
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
