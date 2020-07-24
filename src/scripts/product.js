import store from "../data/data.json";
import PubSub from "pubsub-js";

class Product {
  constructor() {
    this.selector = ".product";
    this.$productNodes;
    this.$store;
    this.$product;
    this.selectedProduct;

    this.handleClick = this.handleClick.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setupEventHandler() {
    this.$productNodes = document.querySelectorAll(this.selector);

    this.$productNodes.forEach(element => {
      element.addEventListener("click", this.handleClick);
    });
  }

  renderProduct(item) {
    const productNameSplit = item.product
      .replace(/[\,0-9-_\s+]+/, " ")
      .split(" ");
    const searchTerms = productNameSplit.join("/").toLowerCase();

    return `<div class="product product-${item.id}" data-id="${item.id}">
    <button class="product-button">
      <span class="product-image"><img src="https://source.unsplash.com/featured/200?${searchTerms}" alt="${item.alt}" /></span>
      <span class="product-name">${item.product}</span>
      <span class="product-cost">$${item.cost}</span>
    </button>
    </div>`;
  }

  renderProducts() {
    let inventory = "";

    store.forEach(item => {
      inventory += this.renderProduct(item);
    });

    const blob = document.createRange().createContextualFragment(inventory);
    return blob;
  }

  loadProducts() {
    const products = this.renderProducts();

    this.$inventory.appendChild(products);
  }

  handleClick(event) {
    const productId = event.currentTarget.dataset.id;
    this.selectedProduct = store.filter(
      item => item.id === Number(productId)
    )[0];

    this.addToCart(this.selectedProduct);
  }

  addToCart(item) {
    PubSub.publish("cart-add-item", item);
  }

  init() {
    this.$inventory = document.querySelector("[data-inventory]");

    this.loadProducts();
    this.setupEventHandler();
  }
}

export default Product;
