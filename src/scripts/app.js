const store = require("data.json");

class Product {
  constructor() {
    this.selector = ".product";
    this.$productList;
    this.$product;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const productId = event.currentTarget.dataset.id;
    // const productDetails = store.filter(item => item.id === productId);
    // console.warn("store:", store);
  }

  init() {
    this.$productList = document.querySelectorAll(this.selector);

    this.$productList.forEach(element => {
      element.addEventListener("click", this.handleClick);
    });
  }
}

class Cart {
  init() {
    // Create Session Storage Cart (Move this to cart.js eventually)
    const cart = { items: [], total: 0.0 };
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

class App {
  init() {
    // Initialize on Load.
    window.onload = () => {
      // Initialize all the things
      const product = new Product();
      product.init();

      const cart = new Cart();
      cart.init();
    };
  }
}

// Run the App
const app = new App();
app.init();
