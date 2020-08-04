import PubSub from "pubsub-js";
import utils from "./utils";

class Product {
  constructor() {
    this.selector = ".product";
    this.$productNodes;
    this.store = utils.getStore() || [];
    this.$product;
    this.selectedProduct;

    this.handleClick = this.handleClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setupEventHandler() {
    this.$productNodes = document.querySelectorAll(this.selector);

    this.$productNodes.forEach(element => {
      element.addEventListener("click", this.handleClick);
    });
  }

  handleClick(event) {
    const productId = event.currentTarget.dataset.id;
    this.selectedProduct = this.store.filter(
      item => item.id === Number(productId)
    )[0];

    this.addToCart(this.selectedProduct);
  }

  addToCart(item) {
    PubSub.publish("cart-add-item", item);
  }

  init() {
    this.$inventory = document.querySelectorAll("[data-inventory]");

    utils.loadProducts(this.$inventory);
    this.setupEventHandler();
  }
}

export default Product;
