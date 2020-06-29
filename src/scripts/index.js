import "../styles/index.scss";
import Product from "./product.js";

console.log("webpack starterkit");

class App {
  init() {
    // Initialize on Load.
    window.onload = () => {
      // Initialize all the things
      const product = new Product();
      product.init();
    };
  }
}

// Run the App
const app = new App();
app.init();
