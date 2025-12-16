window.eventBus = new EventTarget();

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("search");
let products = [];

function renderProducts() {
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      products = response.data; 
      console.log(products);
      displayProducts(products)
    })
    .catch((err) => console.log(err));
}

function displayProducts(products) {
  grid.innerHTML = ""; 

  products.forEach((product) => {
    grid.innerHTML += `
                    <div class="product-card">
                        <div style="position: relative;">
                            <img src="${product.image}" alt="${
      product.name
    }" class="product-image">
                            <div class="product-rating">
                                <span class="star"><i class="fa-solid fa-star" style="color: #FFD43B;"></i></span> ${
                                  product.rating.rate
                                }
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${
                              product.category
                            }</div>
                            <div class="product-title">${
                              product.title.length > 40
                                ? product.title.slice(0, 40) + "..."
                                : product.title
                            }</div>
                            <div class="product-footer">
                                <div class="product-price">$${
                                  product.price
                                }</div>
                                <button class="add-to-cart" onclick="addToCart(${
                                  product.id
                                })">
                                    Savatga <i class="fa-solid fa-cart-arrow-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
  });
}

function searchProduct() {
  const value = searchInput.value.toLowerCase();
  const filteredProduct = products.filter(product => 
    product.title.toLowerCase().includes(value)
  )

  displayProducts(filteredProduct)
}

window.addToCart = function (productId) {
  const product = products.find((p) => p.id == productId);

  const addEvent = new CustomEvent("addToCart", {
    detail: product,
  });

  window.eventBus.dispatchEvent(addEvent);
};

renderProducts();
