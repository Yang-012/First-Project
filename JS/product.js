//productDetail display start
let products = [];
fetch(
  "https://raw.githubusercontent.com/Yang-012/First-Project/refs/heads/master/JSON/products.json"
)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
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
