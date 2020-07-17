class Modal {
  constructor() {
    this.$modalTriggerToggle;
    this.$modalTriggerClose;
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

    this.$modalTriggerToggle.forEach(el =>
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

    this.$modalTriggerClose.forEach(el =>
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

    this.$topTrap.addEventListener(
      "focus",
      () => {
        lastFocusable.focus();
      },
      false
    );

    this.$bottomTrap.addEventListener(
      "focus",
      () => {
        firstFocusable.focus();
      },
      false
    );
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.$modalTriggerToggle = document.querySelectorAll(
        "[data-modal-trigger-toggle]"
      );

      this.$modalTriggerClose = document.querySelectorAll(
        "[data-modal-trigger-close]"
      );

      this.$modal = document.querySelectorAll("[data-modal]");
      this.$topTrap = document.getElementById("modal-focus-top");
      this.$bottomTrap = document.getElementById("modal-focus-bottom");

      // Only instantiate if modal exists
      if (this.$modal.length) {
        this.setupEventHandler();
      }
    });
  }
}

export { Modal };
