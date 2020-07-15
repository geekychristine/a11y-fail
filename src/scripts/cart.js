class Cart {
  constructor() {
    this.selector = ".cart";
  }

  init() {
    // Create Session Storage Cart (Move this to cart.js eventually)
    const cart = { items: [], total: 0.0 };
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

export default Cart;
