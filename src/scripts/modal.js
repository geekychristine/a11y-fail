class Modal {
  constructor() {
    this.$modalTrigger;
    this.$modalClose;
    this.$modal;
    this.$topTrap;
    this.$bottomTrap;
  }

  setupEventHandler() {
    let focusable = this.$modal[0].querySelectorAll(
      "button, [href], input, select, textarea"
    );

    let firstFocusable = focusable[0];
    let lastFocusable = focusable[focusable.length - 1];

    this.$modalTrigger.forEach(el =>
      el.addEventListener(
        "click",
        event => {
          event.preventDefault();

          console.warn("Showing Modal...");

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

    // this.$topTrap.addEventListener(
    //   "focus",
    //   () => {
    //     lastFocusable.focus();
    //   },
    //   false
    // );

    // this.$bottomTrap.addEventListener(
    //   "focus",
    //   () => {
    //     firstFocusable.focus();
    //   },
    //   false
    // );

    console.log("done setting up handler for modal");
  }

  init() {
    document.addEventListener("DOMContentLoaded", event => {
      console.log("dom loaded", event);

      this.$modal = document.querySelectorAll("[data-modal]");
      this.$modalClose = document.querySelectorAll("[data-modal-close]");
      this.$modalTrigger = document.querySelectorAll(
        "[data-modal-trigger-toggle]"
      );

      console.log(this.$modalTrigger);

      this.$modalClose = document.querySelectorAll(
        "[data-modal-trigger-close]"
      );

      // this.$topTrap = document.getElementById("modal-focus-top");
      // this.$bottomTrap = document.getElementById("modal-focus-bottom");

      console.log("this.$modal:", this.$modal);

      // Only instantiate if modal exists
      if (this.$modal.length) {
        this.setupEventHandler();
      }
    });
  }
}

export default Modal;
