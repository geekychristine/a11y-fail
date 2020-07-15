import PubSub from "pubsub-js";

class Cart {
  constructor() {
    this.selector = "[data-cart]";
    this.cart = JSON.parse(sessionStorage.getItem("cart")) || {
      items: [],
      total: 0.0
    };
    this.updateCart = this.updateCart.bind(this);
  }

  getCart() {
    return JSON.parse(sessionStorage.getItem("cart"));
  }

  renderCart() {
    // Get Fresh Cart Data
    const cart = this.getCart();

    let inventory = "";

    cart.items.forEach(item => {
      inventory += `<div class="cart--product cart--product-${item.id}" data-id="${item.id}">${item.product} $${item.cost}</div>`;
    });

    const products = document.createRange().createContextualFragment(inventory);

    this.$cart.appendChild(products);
  }

  updateCart(msg, item) {
    const cart = this.cart;
    cart.items.push(item);
    this.renderCart();
  }

  init() {
    this.$cart = document.querySelector(this.selector);
    // Create Session Storage Cart (Move this to cart.js eventually)
    const cart = { items: [], total: 0.0 };
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Event
    PubSub.subscribe("cart-add-item", this.updateCart);
  }
}

export default Cart;
