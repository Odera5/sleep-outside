import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

  <div class="cart-card__quantity">
    <button type="button" class="quantity-decrease" data-id="${item.Id}">−</button>
    <span>qty: ${quantity}</span>
    <button type="button" class="quantity-increase" data-id="${item.Id}">+</button>
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateQuantity(id, change) {
  const cartItems = getLocalStorage("so-cart") || [];

  const product = cartItems.find((item) => item.Id === id);

  if (!product) return;

  product.quantity = Math.max(1, (product.quantity || 1) + change);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("quantity-increase")) {
    updateQuantity(e.target.dataset.id, 1);
  }

  if (e.target.classList.contains("quantity-decrease")) {
    updateQuantity(e.target.dataset.id, -1);
  }
});

renderCartContents();
