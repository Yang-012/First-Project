//product display start
let products = [];
fetch(
  "https://raw.githubusercontent.com/Yang-012/First-Project/refs/heads/master/JSON/products.json"
)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
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
