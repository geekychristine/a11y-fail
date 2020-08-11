import utils from "./utils";

class Modal {
  constructor() {
    this.$modalTrigger;
    this.$modalClose;
    this.$modal;
  }

  setupEventHandler() {
    this.$modalTrigger.forEach(el =>
      el.addEventListener(
        "click",
        event => {
          event.preventDefault();

          this.$modal[0].classList.toggle("show-modal");

          // Setting overflow:hidden on the <html> element prevents scrolling while also
          // preserving the scroll position.
          document.documentElement.style.overflow =
            document.documentElement.style.overflow === "hidden"
              ? ""
              : "hidden";
        },
        false
      )
    );

    this.$modalClose.forEach(el =>
      el.addEventListener(
        "click",
        event => {
          event.preventDefault();
          this.$modal[0].classList.toggle("show-modal");
          document.documentElement.style.overflow = "";
        },
        false
      )
    );

    // Click Outside Handler
    this.$modal[0].addEventListener(
      "click",
      event => {
        if (event.target === this.$modal[0]) {
          event.preventDefault();

          this.$modal[0].classList.toggle("show-modal");
          document.documentElement.style.overflow = "";
        }
      },
      false
    );
  }

  setupModal() {
    this.$modal = document.querySelectorAll("[data-modal]");
    this.$modalClose = document.querySelectorAll("[data-modal-close]");
    this.$modalTrigger = document.querySelectorAll(
      "[data-modal-trigger-toggle]"
    );
    this.$modalProducts = document.querySelectorAll("[data-modal-products]");
    this.$modalClose = document.querySelectorAll("[data-modal-trigger-close]");

    if (this.$modalProducts.length) {
      utils.loadProducts(this.$modalProducts);
      utils.loadProducts(this.$modalProducts);
      utils.loadProducts(this.$modalProducts);
    }

    // Only instantiate if modal exists
    if (this.$modal.length) {
      this.setupEventHandler();
    }
  }

  init() {
    // Document is already ready, just execute code here
    if (document.readyState !== "loading") {
      this.setupModal();
    } else {
      // Document was not ready, execute here
      document.addEventListener("DOMContentLoaded", function() {
        this.setupModal();
      });
    }
  }
}

export default Modal;
