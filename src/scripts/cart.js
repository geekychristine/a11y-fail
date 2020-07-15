import PubSub from "pubsub-js";

class Cart {
  constructor() {
    this.selector = "[data-cart]";

    // Create Session Storage Cart (Move this to cart.js eventually)
    const cart = { items: [], total: 0.0 };
    sessionStorage.setItem("cart", JSON.stringify(cart));

    this.cart = JSON.parse(sessionStorage.getItem("cart"));
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
      inventory += `<li class="cart--product cart--product-${item.id}" data-id="${item.id}">${item.product} $${item.cost}</li>`;
    });

    const products = document.createRange().createContextualFragment(inventory);

    console.warn("products:", products);
    console.warn("cart:", cart);

    this.$cart.appendChild(products);
  }

  updateCart(msg, item) {
    const cart = this.cart;
    cart.items.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  init() {
    this.$cart = document.querySelector(this.selector);
    // Event
    PubSub.subscribe("cart-add-item", this.updateCart);
  }
}

export default Cart;
