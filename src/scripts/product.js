import store from "../data/data.json";

class Product {
  constructor() {
    this.selector = ".product";
    this.$productList;
    this.$product;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const productId = event.currentTarget.dataset.id;
    const productDetails = store.filter(item => item.id === productId);
    console.warn("store:", store);
    console.warn("productDetails:", productDetails);
  }

  init() {
    this.$productList = document.querySelectorAll(this.selector);

    this.$productList.forEach(element => {
      element.addEventListener("click", this.handleClick);
    });
  }
}

export default Product;
