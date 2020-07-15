import PubSub from "pubsub-js";
import round from "lodash/round";

class Cart {
  constructor() {
    this.selector = "[data-cart]";
    this.$cartTotal = document.querySelector("[data-cart-total]");

    // Create Session Storage Cart (Move this to cart.js eventually)
    const cart = { items: [], total: 0.0 };
    sessionStorage.setItem("cart", JSON.stringify(cart));

    this.cart = JSON.parse(sessionStorage.getItem("cart"));
    this.updateCart = this.updateCart.bind(this);
  }

  getCart() {
    return JSON.parse(sessionStorage.getItem("cart"));
  }

  renderItem(item) {
    return `<li class="cart--product cart--product-${item.id}" data-id="${item.id}">
        ${item.product} $${item.cost}
      </li>`;
  }

  renderTotal(total) {
    const totalNode = total && `$${total.toFixed(2)}`;
    this.$cartTotal.innerHTML = totalNode;
  }

  renderCart() {
    // Get Fresh Cart Data
    const cart = this.getCart();

    let inventory = "";
    cart.items.forEach(item => {
      inventory += this.renderItem(item);
    });

    const products = document.createRange().createContextualFragment(inventory);

    // A little Janky. Find the proper way to do this.
    this.$cart.innerHTML = "";
    this.$cart.appendChild(products);
  }

  updateCart(msg, item) {
    const cart = this.cart;

    cart.items.push(item);

    // Update total
    const total = cart.items.reduce((total, item) => {
      total += item.cost;
      return round(total, 2);
    }, 0);

    cart.total = total;

    // Update store with latest cart data
    sessionStorage.setItem("cart", JSON.stringify(cart));

    this.renderCart();
    this.renderTotal(cart.total);
  }

  init() {
    this.$cart = document.querySelector(this.selector);

    // Events
    PubSub.subscribe("cart-add-item", this.updateCart);
  }
}

export default Cart;
