import Product from "./product";
import Cart from "./cart";
import Modal from "./modal";

class App {
  init() {
    // Initialize on Load.
    window.onload = () => {
      // Initialize all the things
      const product = new Product();
      product.init();

      const cart = new Cart();
      cart.init();

      const modal = new Modal();
      modal.init();

      const instructions = document.getElementById("modal-intro");
      instructions.style.display = "block";
    };
  }
}

export default App;
